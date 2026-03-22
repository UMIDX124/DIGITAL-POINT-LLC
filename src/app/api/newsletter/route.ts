import { NextResponse } from 'next/server';
import { sendEmail, escapeHtml } from '@/lib/email';

// In-memory rate limiter
const rateLimiter = new Map<string, { count: number; reset: number }>();

export async function POST(req: Request) {
  try {
    // Rate limit: 3 per hour per IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    const limit = rateLimiter.get(ip);
    if (limit && now < limit.reset) {
      if (limit.count >= 3) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
      }
      limit.count++;
    } else {
      rateLimiter.set(ip, { count: 1, reset: now + 3600000 });
    }

    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const safeEmail = escapeHtml(email);

    // Store subscriber - try database first
    let dbSuccess = false;
    try {
      const { PrismaClient } = await import('@prisma/client');
      const prisma = new PrismaClient();
      await prisma.$executeRawUnsafe(
        `INSERT INTO NewsletterSubscriber (id, email, createdAt) VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING`,
        crypto.randomUUID(),
        email.toLowerCase(),
        new Date().toISOString()
      );
      await prisma.$disconnect();
      dbSuccess = true;
    } catch {
      // DB might not have the table yet - continue with email notification
    }

    // Send welcome email to the subscriber
    await sendEmail({
      to: email,
      subject: 'Welcome to Digital Point — Growth Insights',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0815; color: #e0d6eb; padding: 40px 30px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c77dff; font-size: 24px; margin: 0;">Welcome to Digital Point</h1>
            <p style="color: #9080a0; font-size: 14px; margin-top: 8px;">Growth insights from $50M+ in managed ad spend</p>
          </div>
          <div style="background: rgba(123, 44, 191, 0.1); border: 1px solid rgba(199, 125, 255, 0.2); border-radius: 8px; padding: 24px; margin-bottom: 24px;">
            <p style="margin: 0 0 12px; font-size: 15px; color: #e0d6eb;">Hey there 👋</p>
            <p style="margin: 0 0 12px; font-size: 14px; color: #b794c7; line-height: 1.6;">
              Thanks for subscribing! You'll receive frameworks, benchmarks, and case studies that help performance marketers scale profitably.
            </p>
            <p style="margin: 0; font-size: 14px; color: #b794c7; line-height: 1.6;">
              Here's what to expect:
            </p>
            <ul style="color: #b794c7; font-size: 14px; line-height: 1.8; padding-left: 20px;">
              <li>ROAS optimization strategies</li>
              <li>CAC benchmarks by industry</li>
              <li>Attribution & analytics insights</li>
              <li>Growth systems that actually scale</li>
            </ul>
          </div>
          <div style="text-align: center; margin-bottom: 24px;">
            <a href="https://digitalpointllc.com/blog" style="display: inline-block; background: linear-gradient(135deg, #7b2cbf, #9d4edd); color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 600;">Read Our Latest Insights</a>
          </div>
          <div style="text-align: center; border-top: 1px solid rgba(199, 125, 255, 0.15); padding-top: 20px;">
            <p style="color: #7c5a8a; font-size: 12px; margin: 0;">Digital Point LLC — Performance Marketing & Growth Systems</p>
            <p style="color: #7c5a8a; font-size: 11px; margin-top: 4px;">You're receiving this because you subscribed at digitalpointllc.com</p>
          </div>
        </div>
      `,
    });

    // Send admin notification
    await sendEmail({
      to: 'info@digitalpointllc.com',
      subject: `New Newsletter Subscriber: ${email}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #7b2cbf;">New Newsletter Subscriber</h2>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>DB Stored:</strong> ${dbSuccess ? 'Yes' : 'No (fallback mode)'}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
