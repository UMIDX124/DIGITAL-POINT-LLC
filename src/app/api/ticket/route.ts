import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmail, escapeHtml } from '@/lib/email';

// ─── Rate Limiting ───────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour
let cleanupCounter = 0;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

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

// ─── Sanitize ────────────────────────────────────────────────────────────────
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

// ─── POST Handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate priority
    const priority = body.priority === 'high' ? 'high' : 'normal';

    // Sanitize inputs
    const name = sanitize(body.name) || '';
    const email = sanitize(body.email) || '';
    const subject = sanitize(body.subject) || '';
    const message = sanitize(body.message) || '';

    // Try to save to database (may fail on serverless with SQLite)
    let ticketId = 'no-db';
    try {
      const ticket = await db.supportTicket.create({
        data: {
          name,
          email,
          subject,
          message,
          priority,
          status: 'open',
        },
      });
      ticketId = ticket.id;
    } catch {
      // Database unavailable (e.g. SQLite on serverless) — continue with email
    }

    // Route email based on priority (best-effort)
    const recipientEmail =
      priority === 'high'
        ? 'ADMIN@DIGITALPOINTLLC.COM'
        : 'info@digitalpointllc.com';

    const priorityLabel = priority === 'high' ? 'HIGH PRIORITY' : 'Normal';
    const priorityColor = priority === 'high' ? '#ff6b9d' : '#c77dff';

    try {
      await sendEmail({
        to: recipientEmail,
        subject: `[${priorityLabel}] Support Ticket: ${escapeHtml(subject)}`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0815; color: #f4f0f9; padding: 32px; border-radius: 12px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px;">
              <h2 style="color: #c77dff; margin: 0;">Support Ticket</h2>
              <span style="background: ${priorityColor}22; color: ${priorityColor}; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-left: 8px;">
                ${priorityLabel}
              </span>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #b794c7; font-size: 13px; vertical-align: top; width: 100px;">From</td>
                <td style="padding: 10px 0; color: #f4f0f9; font-size: 14px;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #b794c7; font-size: 13px; vertical-align: top;">Email</td>
                <td style="padding: 10px 0;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #c77dff; text-decoration: none;">${escapeHtml(email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #b794c7; font-size: 13px; vertical-align: top;">Subject</td>
                <td style="padding: 10px 0; color: #f4f0f9; font-size: 14px;">${escapeHtml(subject)}</td>
              </tr>
            </table>

            <hr style="border: none; border-top: 1px solid rgba(157,78,221,0.3); margin: 16px 0;" />

            <div style="background: rgba(26, 15, 46, 0.6); padding: 16px; border-radius: 8px; border: 1px solid rgba(157,78,221,0.15);">
              <p style="color: #b794c7; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
              <p style="color: #f4f0f9; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>

            <hr style="border: none; border-top: 1px solid rgba(157,78,221,0.3); margin: 16px 0;" />

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="color: #7c5a8a; font-size: 11px;">Ticket ID: ${ticketId}</td>
                <td style="color: #7c5a8a; font-size: 11px; text-align: right;">Created: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</td>
              </tr>
            </table>

            <p style="color: #7c5a8a; font-size: 11px; margin: 12px 0 0; text-align: center;">
              This ticket was created via the Digital Point LLC support chatbot.
            </p>
          </div>
        `,
      });
    } catch {
      // Email service unavailable — still return success to user
    }

    return NextResponse.json({
      success: true,
      message: 'Support ticket created successfully',
      ticketId,
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Ticket creation error:', error);
    }

    return NextResponse.json(
      { success: false, message: 'An error occurred while creating your ticket' },
      { status: 500 }
    );
  }
}
