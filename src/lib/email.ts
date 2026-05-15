import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

let _transporter: Transporter | null = null;
function getTransporter(): Transporter | null {
  if (_transporter) return _transporter;
  if (!smtpConfigured()) return null;
  _transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return _transporter;
}

export async function verifySmtp(): Promise<{ ok: boolean; error?: string }> {
  if (!smtpConfigured()) return { ok: false, error: 'SMTP env not configured' };
  const t = getTransporter();
  if (!t) return { ok: false, error: 'Transporter init failed' };
  try {
    await t.verify();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'verify failed' };
  }
}

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
  const transporter = getTransporter();
  if (!transporter) {
    console.error('[email] SMTP not configured — message dropped', { to, subject });
    return { success: false, error: 'SMTP not configured' };
  }
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
        console.error('[email] send failed after retry', {
          to: toField,
          subject,
          error: error instanceof Error ? error.message : error,
        });
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
      // Wait 2 seconds before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  return { success: false, error: 'Failed after retries' };
}
