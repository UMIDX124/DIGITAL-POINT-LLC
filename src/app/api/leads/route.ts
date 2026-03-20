import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmail, escapeHtml } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, name, email, company, phone, interest, qualityScore, conversationSummary } = body;

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    // Validate email if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
      }
    }

    // Upsert lead — update if session already has a lead
    const lead = await db.chatLead.upsert({
      where: { sessionId },
      create: {
        sessionId,
        name: name || null,
        email: email || null,
        company: company || null,
        phone: phone || null,
        interest: interest || null,
        qualityScore: qualityScore || 0,
        conversationSummary: conversationSummary || null,
      },
      update: {
        ...(name && { name }),
        ...(email && { email }),
        ...(company && { company }),
        ...(phone && { phone }),
        ...(interest && { interest }),
        ...(qualityScore !== undefined && { qualityScore }),
        ...(conversationSummary && { conversationSummary }),
      },
    });

    // Notify founder for high-quality leads
    if (qualityScore >= 70 && email) {
      await sendEmail({
        to: 'admin@digitalpointllc.com',
        subject: `High-Intent Lead from Chatbot — ${escapeHtml(name || 'Unknown')}`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0815; color: #f4f0f9; padding: 32px; border-radius: 12px;">
            <h2 style="color: #c77dff; margin: 0 0 16px;">New High-Intent Lead</h2>
            <p style="color: #b794c7; font-size: 13px;">Captured via the AI chatbot (Cosmo)</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 8px 0; color: #b794c7; font-size: 13px; width: 120px;">Name</td>
                <td style="padding: 8px 0; color: #f4f0f9; font-size: 14px;">${escapeHtml(name || 'Not provided')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #b794c7; font-size: 13px;">Email</td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #c77dff; text-decoration: none;">${escapeHtml(email)}</a>
                </td>
              </tr>
              ${company ? `<tr><td style="padding: 8px 0; color: #b794c7; font-size: 13px;">Company</td><td style="padding: 8px 0; color: #f4f0f9; font-size: 14px;">${escapeHtml(company)}</td></tr>` : ''}
              ${interest ? `<tr><td style="padding: 8px 0; color: #b794c7; font-size: 13px;">Interest</td><td style="padding: 8px 0; color: #f4f0f9; font-size: 14px;">${escapeHtml(interest)}</td></tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: #b794c7; font-size: 13px;">Lead Score</td>
                <td style="padding: 8px 0; color: #10b981; font-size: 14px; font-weight: 600;">${qualityScore}/100</td>
              </tr>
            </table>

            ${conversationSummary ? `
            <hr style="border: none; border-top: 1px solid rgba(157,78,221,0.3); margin: 16px 0;" />
            <div style="background: rgba(26, 15, 46, 0.6); padding: 16px; border-radius: 8px; border: 1px solid rgba(157,78,221,0.15);">
              <p style="color: #b794c7; font-size: 12px; margin: 0 0 8px; text-transform: uppercase;">Conversation Summary</p>
              <p style="color: #f4f0f9; font-size: 13px; line-height: 1.5; margin: 0; white-space: pre-wrap;">${escapeHtml(conversationSummary)}</p>
            </div>
            ` : ''}

            <p style="color: #7c5a8a; font-size: 11px; margin: 16px 0 0; text-align: center;">
              Lead ID: ${lead.id} | Captured: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Lead capture error:', error);
    }
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}
