import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { db } from '@/lib/db';
import { sendEmail, escapeHtml } from '@/lib/email';
import { AuditSubmissionSchema } from '@/lib/schemas';

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
    const verification = await checkBotId();
    if (verification.isBot && !verification.isVerifiedBot) {
      return NextResponse.json(
        { success: false, message: 'Request blocked.' },
        { status: 403 }
      );
    }

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

    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      return NextResponse.json({ success: true, message: 'Audit request received successfully' });
    }

    const parsed = AuditSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;

    const name = sanitize(data.name) || '';
    const email = sanitize(data.email) || '';
    const company = sanitize(data.company);
    const bottleneck = sanitize(data.bottleneck);

    let submissionId = 'no-db';
    try {
      const submission = await db.auditSubmission.create({
        data: {
          name,
          email,
          company,
          website: sanitize(data.website),
          businessType: sanitize(data.businessType),
          adSpend: sanitize(data.adSpend),
          teamSize: sanitize(data.teamSize),
          bottleneck,
          services: data.services?.map((s) => sanitize(s)).filter(Boolean).join(',') || null,
          notes: sanitize(data.notes) || '',
          utmSource: sanitize(data.utmSource),
          utmMedium: sanitize(data.utmMedium),
          utmCampaign: sanitize(data.utmCampaign),
        },
      });
      submissionId = submission.id;
    } catch {
      // SQLite on serverless can fail; continue with email
    }

    // Send email with escaped user input (best-effort)
    try {
      await sendEmail({
        to: 'info@digitalpointllc.com',
        subject: `New Free Growth Audit Request: ${escapeHtml(name)}`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0B; color: #F5F1E8; padding: 32px; border-radius: 12px;">
            <h2 style="color: #FF8800; margin-top: 0;">New Audit Request</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #D6D0C2;">Name</td><td style="padding: 8px 0; color: #F5F1E8;">${escapeHtml(name)}</td></tr>
              <tr><td style="padding: 8px 0; color: #D6D0C2;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #FF8800;">${escapeHtml(email)}</a></td></tr>
              ${company ? `<tr><td style="padding: 8px 0; color: #D6D0C2;">Company</td><td style="padding: 8px 0; color: #F5F1E8;">${escapeHtml(company)}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; color: #D6D0C2;">Biggest Challenge</td><td style="padding: 8px 0; color: #F5F1E8;">${escapeHtml(bottleneck || '')}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid rgba(255, 136, 0,0.3); margin: 16px 0;" />
            <p style="color: #D6D0C2; font-size: 12px; margin-bottom: 0;">Submission ID: ${submissionId}</p>
          </div>
        `,
      });
    } catch {
      // Email service unavailable. Still return success to user
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
