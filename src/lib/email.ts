import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

// Founder routing — every form submission CCs both founders' personal
// addresses, never a shared inbox. Falls back to info@ if either env var
// is unset so builds don't break; dedupes if both fall back.
export const FOUNDER_EMAILS: string[] = [
  process.env.FOUNDER_EMAIL_FAIZAN || 'info@digitalpointllc.com',
  process.env.FOUNDER_EMAIL_ANWAAR || 'info@digitalpointllc.com',
].filter((v, i, arr) => arr.indexOf(v) === i);

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams): Promise<{ success: boolean; error?: string }> {
  const toField = Array.isArray(to) ? to.join(', ') : to;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: toField,
        subject,
        html,
        replyTo,
      });
      return { success: true };
    } catch (error) {
      if (attempt === 1) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Email send failed after retry:', error);
        }
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
      // Wait 2 seconds before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  return { success: false, error: 'Failed after retries' };
}
