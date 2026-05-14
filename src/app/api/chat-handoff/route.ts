import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { db } from '@/lib/db';
import { sendEmail, escapeHtml, FOUNDER_EMAILS } from '@/lib/email';
import { ChatHandoffSchema } from '@/lib/schemas';
import { chatLimiter, getClientIp } from '@/lib/ratelimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const verification = await checkBotId();
    if (verification.isBot && !verification.isVerifiedBot) {
      return NextResponse.json(
        { success: false, message: 'Request blocked.' },
        { status: 403 },
      );
    }

    const ip = getClientIp(request.headers);
    const { success } = await chatLimiter.limit(ip);
    if (!success) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again in a minute.' },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = ChatHandoffSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const { email, name, currentPath, messages } = parsed.data;

    let handoffId = 'no-db';
    try {
      const record = await db.chatHandoff.create({
        data: {
          email,
          name: name ?? null,
          currentPath: currentPath ?? null,
          transcript: JSON.stringify(messages),
          ip,
        },
      });
      handoffId = record.id;
    } catch (dbErr) {
      console.error('[chat-handoff] db.create failed:', dbErr);
    }

    const transcriptHtml = messages
      .map((m) => {
        const who =
          m.role === 'user'
            ? escapeHtml(name ?? email)
            : m.role === 'assistant'
              ? 'Cosmo'
              : 'System';
        const body = escapeHtml(m.content).replace(/\n/g, '<br>');
        return `<p style="margin: 12px 0; color: #F5F5F7;"><strong style="color: #FF8800;">${who}:</strong><br>${body}</p>`;
      })
      .join('');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #0A0A0B; color: #F5F5F7; padding: 32px;">
        <h2 style="color: #FF8800; margin-top: 0;">Chat handoff requested</h2>
        <p style="color: #969aa3;">User started a Cosmo conversation on <strong style="color: #F5F5F7;">${escapeHtml(currentPath ?? '/')}</strong> and asked for a founder reply.</p>
        <p style="color: #969aa3;">Email: <a href="mailto:${escapeHtml(email)}" style="color: #FF8800;">${escapeHtml(email)}</a></p>
        ${name ? `<p style="color: #969aa3;">Name: ${escapeHtml(name)}</p>` : ''}
        <hr style="border: none; border-top: 1px solid rgba(255, 136, 0, 0.3); margin: 24px 0;" />
        <h3 style="color: #FF8800;">Transcript</h3>
        ${transcriptHtml}
        <hr style="border: none; border-top: 1px solid rgba(255, 136, 0, 0.3); margin: 24px 0;" />
        <p style="color: #969aa3; font-size: 12px;">Handoff ID: ${escapeHtml(handoffId)}</p>
      </div>
    `;

    const sent = await sendEmail({
      to: FOUNDER_EMAILS,
      subject: `Cosmo handoff: ${name ?? email}`,
      replyTo: email,
      html,
    });

    if (!sent.success) {
      console.error('[chat-handoff] email send failed:', sent.error);
      return NextResponse.json(
        { success: false, message: 'Could not deliver transcript. Please email us directly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, handoffId });
  } catch (err) {
    console.error('[chat-handoff] exception', err);
    return NextResponse.json(
      { success: false, message: 'Internal error.' },
      { status: 500 },
    );
  }
}
