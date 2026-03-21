import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmail, escapeHtml } from '@/lib/email';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000;
let cleanupCounter = 0;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Cleanup expired entries every 100 requests
  if (++cleanupCounter % 100 === 0) {
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetTime) rateLimitMap.delete(key);
    }
  }

  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

function sanitize(input: string | undefined | null): string | null {
  if (!input) return null;
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
    .slice(0, 5000);
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (!body.name || !body.email || !body.bottleneck) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    const name = sanitize(body.name) || '';
    const email = sanitize(body.email) || '';
    const company = sanitize(body.company);
    const bottleneck = sanitize(body.bottleneck);

    // Try to save to database (may fail on serverless with SQLite)
    let submissionId = 'no-db';
    try {
      const submission = await db.auditSubmission.create({
        data: {
          name,
          email,
          company,
          website: sanitize(body.website),
          businessType: sanitize(body.businessType),
          adSpend: sanitize(body.adSpend),
          teamSize: sanitize(body.teamSize),
          bottleneck,
          services: body.services?.map((s: string) => sanitize(s)).filter(Boolean).join(',') || null,
          notes: sanitize(body.notes) || '',
          utmSource: sanitize(body.utmSource),
          utmMedium: sanitize(body.utmMedium),
          utmCampaign: sanitize(body.utmCampaign),
        },
      });
      submissionId = submission.id;
    } catch {
      // Database unavailable (e.g. SQLite on serverless) — continue with email
    }

    // Send email with escaped user input (best-effort)
    try {
      await sendEmail({
        to: 'info@digitalpointllc.com',
        subject: `New Free Growth Audit Request — ${escapeHtml(name)}`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0815; color: #f4f0f9; padding: 32px; border-radius: 12px;">
            <h2 style="color: #c77dff; margin-top: 0;">New Audit Request</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #b794c7;">Name</td><td style="padding: 8px 0; color: #f4f0f9;">${escapeHtml(name)}</td></tr>
              <tr><td style="padding: 8px 0; color: #b794c7;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #c77dff;">${escapeHtml(email)}</a></td></tr>
              ${company ? `<tr><td style="padding: 8px 0; color: #b794c7;">Company</td><td style="padding: 8px 0; color: #f4f0f9;">${escapeHtml(company)}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; color: #b794c7;">Biggest Challenge</td><td style="padding: 8px 0; color: #f4f0f9;">${escapeHtml(bottleneck || '')}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid rgba(157,78,221,0.3); margin: 16px 0;" />
            <p style="color: #b794c7; font-size: 12px; margin-bottom: 0;">Submission ID: ${submissionId}</p>
          </div>
        `,
      });
    } catch {
      // Email service unavailable — still return success to user
    }

    return NextResponse.json({
      success: true,
      message: 'Audit request received successfully',
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Audit form error:', error);
    }

    return NextResponse.json(
      { success: false, message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
