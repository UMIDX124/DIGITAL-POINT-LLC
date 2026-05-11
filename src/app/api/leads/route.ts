import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmail, escapeHtml } from '@/lib/email';
import { computeLeadQualityScore } from '@/lib/lead-scoring';
import { LeadSubmissionSchema } from '@/lib/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = LeadSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { sessionId, name, email, company, phone, interest, conversationSummary } = parsed.data;
    const qualityScore = computeLeadQualityScore({ company, phone, interest, conversationSummary });

    const lead = await db.chatLead.upsert({
      where: { sessionId },
      create: {
        sessionId,
        name: name || null,
        email: email || null,
        company: company || null,
        phone: phone || null,
        interest: interest || null,
        qualityScore,
        conversationSummary: conversationSummary || null,
      },
      update: {
        ...(name && { name }),
        ...(email && { email }),
        ...(company && { company }),
        ...(phone && { phone }),
        ...(interest && { interest }),
        qualityScore,
        ...(conversationSummary && { conversationSummary }),
      },
    });

    // Notify founder for high-quality leads
    if (qualityScore >= 70 && email) {
      await sendEmail({
        to: 'admin@digitalpointllc.com',
        subject: `High-Intent Lead from Chatbot: ${escapeHtml(name || 'Unknown')}`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0B; color: #F5F1E8; padding: 32px; border-radius: 12px;">
            <h2 style="color: #FF8800; margin: 0 0 16px;">New High-Intent Lead</h2>
            <p style="color: #D6D0C2; font-size: 13px;">Captured via the DPL AI chatbot</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 8px 0; color: #D6D0C2; font-size: 13px; width: 120px;">Name</td>
                <td style="padding: 8px 0; color: #F5F1E8; font-size: 14px;">${escapeHtml(name || 'Not provided')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #D6D0C2; font-size: 13px;">Email</td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #FF8800; text-decoration: none;">${escapeHtml(email)}</a>
                </td>
              </tr>
              ${company ? `<tr><td style="padding: 8px 0; color: #D6D0C2; font-size: 13px;">Company</td><td style="padding: 8px 0; color: #F5F1E8; font-size: 14px;">${escapeHtml(company)}</td></tr>` : ''}
              ${interest ? `<tr><td style="padding: 8px 0; color: #D6D0C2; font-size: 13px;">Interest</td><td style="padding: 8px 0; color: #F5F1E8; font-size: 14px;">${escapeHtml(interest)}</td></tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: #D6D0C2; font-size: 13px;">Lead Score</td>
                <td style="padding: 8px 0; color: #10b981; font-size: 14px; font-weight: 600;">${qualityScore}/100</td>
              </tr>
            </table>

            ${conversationSummary ? `
            <hr style="border: none; border-top: 1px solid rgba(255, 136, 0,0.3); margin: 16px 0;" />
            <div style="background: rgba(20,20,22, 0.6); padding: 16px; border-radius: 8px; border: 1px solid rgba(255, 136, 0,0.15);">
              <p style="color: #D6D0C2; font-size: 12px; margin: 0 0 8px; text-transform: uppercase;">Conversation Summary</p>
              <p style="color: #F5F1E8; font-size: 13px; line-height: 1.5; margin: 0; white-space: pre-wrap;">${escapeHtml(conversationSummary)}</p>
            </div>
            ` : ''}

            <p style="color: #8E8E96; font-size: 11px; margin: 16px 0 0; text-align: center;">
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
