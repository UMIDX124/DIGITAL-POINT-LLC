import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmail, escapeHtml } from '@/lib/email';

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 3;
let cleanupCounter = 0;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  if (++cleanupCounter % 100 === 0) {
    for (const [key, val] of rateLimitMap) {
      if (now - val.lastRequest > RATE_LIMIT_WINDOW) rateLimitMap.delete(key);
    }
  }

  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastRequest > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  record.lastRequest = now;
  return true;
}

function sanitize(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
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

    const name = sanitize(body.name || '');
    const email = sanitize(body.email || '');
    const message = sanitize(body.message || '');
    const utmSource = body.utmSource ? sanitize(body.utmSource) : undefined;
    const utmMedium = body.utmMedium ? sanitize(body.utmMedium) : undefined;
    const utmCampaign = body.utmCampaign ? sanitize(body.utmCampaign) : undefined;

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid name' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    let submissionId = 'no-db';
    try {
      const submission = await db.founderSubmission.create({
        data: { name, email, message, utmSource, utmMedium, utmCampaign },
      });
      submissionId = submission.id;
    } catch {
      // Database unavailable (e.g. SQLite on serverless) — continue with email
    }

    try {
      await sendEmail({
        to: 'ADMIN@DIGITALPOINTLLC.COM',
        subject: `Founder Contact — ${escapeHtml(name)}`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0815; color: #f4f0f9; padding: 32px; border-radius: 12px;">
            <h2 style="color: #ff6b9d; margin-top: 0;">New Founder Contact</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #b794c7;">Name</td><td style="padding: 8px 0; color: #f4f0f9;">${escapeHtml(name)}</td></tr>
              <tr><td style="padding: 8px 0; color: #b794c7;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #c77dff;">${escapeHtml(email)}</a></td></tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: rgba(26,15,46,0.8); border-radius: 8px; border: 1px solid rgba(157,78,221,0.2);">
              <p style="color: #b794c7; font-size: 12px; margin-top: 0;">Message</p>
              <p style="color: #f4f0f9; margin-bottom: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
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
      message: 'Message received! A Co-Founder will get back to you within 24 hours.',
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Founder contact form error:', error);
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
