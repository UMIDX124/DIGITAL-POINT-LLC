import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { db } from '@/lib/db';
import { sendEmail, escapeHtml } from '@/lib/email';
import { FounderSubmissionSchema } from '@/lib/schemas';
import { founderLimiter, getClientIp } from '@/lib/ratelimit';

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
    const verification = await checkBotId();
    if (verification.isBot && !verification.isVerifiedBot) {
      return NextResponse.json(
        { success: false, message: 'Request blocked.' },
        { status: 403 }
      );
    }

    const ip = getClientIp(request.headers);
    const { success } = await founderLimiter.limit(ip);
    if (!success) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      return NextResponse.json({ success: true, message: 'Message received! A Co-Founder will get back to you within 24 hours.' });
    }

    const parsed = FounderSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const name = sanitize(parsed.data.name);
    const email = sanitize(parsed.data.email);
    const message = sanitize(parsed.data.message);
    const utmSource = parsed.data.utmSource ? sanitize(parsed.data.utmSource) : undefined;
    const utmMedium = parsed.data.utmMedium ? sanitize(parsed.data.utmMedium) : undefined;
    const utmCampaign = parsed.data.utmCampaign ? sanitize(parsed.data.utmCampaign) : undefined;

    let submissionId = 'no-db';
    try {
      const submission = await db.founderSubmission.create({
        data: { name, email, message, utmSource, utmMedium, utmCampaign },
      });
      submissionId = submission.id;
    } catch {
      // Database unavailable (e.g. sQLite on serverless). Continue with email
    }

    try {
      await sendEmail({
        to: 'ADMIN@DIGITALPOINTLLC.COM',
        subject: `Founder Contact: ${escapeHtml(name)}`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0B; color: #F5F1E8; padding: 32px; border-radius: 12px;">
            <h2 style="color: #FF8800; margin-top: 0;">New Founder Contact</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #D6D0C2;">Name</td><td style="padding: 8px 0; color: #F5F1E8;">${escapeHtml(name)}</td></tr>
              <tr><td style="padding: 8px 0; color: #D6D0C2;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #FF8800;">${escapeHtml(email)}</a></td></tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: rgba(20,20,22,0.8); border-radius: 8px; border: 1px solid rgba(255, 136, 0,0.2);">
              <p style="color: #D6D0C2; font-size: 12px; margin-top: 0;">Message</p>
              <p style="color: #F5F1E8; margin-bottom: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
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
