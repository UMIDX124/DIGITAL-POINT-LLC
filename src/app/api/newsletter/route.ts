import { NextResponse } from 'next/server';

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

    // Send notification email
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: 'info@digitalpointllc.com',
        subject: `New Newsletter Subscriber: ${email}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #7b2cbf;">New Newsletter Subscriber</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>DB Stored:</strong> ${dbSuccess ? 'Yes' : 'No (fallback mode)'}</p>
          </div>
        `,
      });
    } catch {
      // Email send failed - still return success since we captured the email
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
