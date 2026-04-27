import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import CookiePrefsLink from '@/components/compliance/CookiePrefsLink';

const footerLinks = {
  services: [
    { name: 'Remote Workforce', href: '/remote-workforce' },
    { name: 'Automation', href: '/automation' },
    { name: 'Performance Marketing', href: '/performance-marketing' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Results', href: '/results' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    /* Phase 17b 3-reversal E1 — Contact link replaced by "How we work"
       anchored to the footer's #contact-philosophy block (no `/contact`
       page, no email, Cosmo + audit form are the official routes). */
    { name: 'How we work', href: '/#contact-philosophy' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto" style={{ background: '#0A0A0B', borderTop: '1px solid var(--accent)' }}>
      <div className="container-wide">
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/Dp-logo1.png"
                alt="Digital Point"
                width={160}
                height={160}
                style={{ width: '80px', height: 'auto' }}
              />
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl text-[color:var(--ivory)]">Digital Point LLC</span>
                <span className="text-[color:var(--muted)] text-[10px] tracking-[0.2em] uppercase mt-1.5">Est. 2017</span>
              </div>
            </Link>
            <p className="text-[color:var(--ivory-dim)] text-sm leading-relaxed max-w-xs">
              AI + operator infrastructure for companies that want to scale without scaling team. AI agents lead, automation handles the repeat, operators back the loop.
            </p>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Practices</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[color:var(--ivory-dim)] hover:text-[color:var(--accent)] text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[color:var(--ivory-dim)] hover:text-[color:var(--accent)] text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Connect</h4>
            {/* Phase 17b 3-reversal E1 — generic email surface removed.
                Per Phase 12 contact strategy: pure-AI route (Cosmo) + audit
                form, no `hello@` queue. Verbatim brand copy block below. */}
            <div
              id="contact-philosophy"
              className="space-y-4"
              style={{ maxWidth: '56ch' }}
            >
              <p
                className="text-sm font-medium"
                style={{ color: 'var(--text-primary)', fontWeight: 500 }}
              >
                Why we don&apos;t list a generic support inbox.
              </p>
              <p
                className="text-sm"
                style={{ color: 'var(--text-muted)', lineHeight: 1.65 }}
              >
                Most agencies hide behind a{' '}
                <code
                  style={{
                    background: 'var(--ring-stroke)',
                    color: 'var(--text-primary)',
                    padding: '1px 6px',
                    borderRadius: '3px',
                    fontFamily: 'var(--font-mono), ui-monospace, monospace',
                    fontSize: '12px',
                  }}
                >
                  hello@
                </code>{' '}
                queue where your message lines up with everyone else&apos;s. We don&apos;t run that way.
              </p>
              <p
                className="text-sm"
                style={{ color: 'var(--text-muted)', lineHeight: 1.65 }}
              >
                When you reach out through Cosmo or our audit form, your inquiry goes directly to the operator best matched to your stage — not a ticket pool. We answer from our personal accounts because we&apos;re personally accountable for what we ship.
              </p>
              <p
                className="text-sm"
                style={{ color: 'var(--text-muted)', lineHeight: 1.65 }}
              >
                If you&apos;d rather talk to a human first, just tell Cosmo. We&apos;ll route the conversation to the right operator within one business day.
              </p>
              <p className="text-[color:var(--muted)] text-sm" style={{ marginTop: '1.25rem' }}>
                Lahore, PK · UTC+5
              </p>
              <a
                href="https://linkedin.com/company/digitalpointllc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link flex items-center gap-3 text-[color:var(--ivory-dim)] hover:text-[color:var(--accent)] text-sm transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <Link
                href="/free-growth-audit"
                className="inline-block mt-2 px-4 py-2 text-[13px] font-medium text-[#0A0A0B] rounded-md"
                style={{ background: 'var(--accent-bright)' }}
              >
                Talk to a co-founder
              </Link>
            </div>
          </div>
        </div>

        {/* Phase 17b 3-restructured E4 — trust badges. SOC 2 Ready halted
            per K5 substantiation gap. GDPR Compliant ships post-A3 cookie
            banner. 5-day plan ships per existing CTA copy ("Written plan
            within 5 business days"). */}
        <div
          className="py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.18em]"
          style={{ borderTop: '1px solid #27272A', color: 'var(--text-muted)' }}
        >
          <span>GDPR Compliant</span>
          <span aria-hidden="true">·</span>
          <span>5-Day Written Plan Guaranteed</span>
        </div>

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #27272A' }}>
          <p className="text-[color:var(--muted)] text-xs">
            &copy; {currentYear} Digital Point LLC. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="text-[color:var(--muted)] text-xs hover:text-[color:var(--ivory-dim)] transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="text-[color:var(--muted)] text-xs hover:text-[color:var(--ivory-dim)] transition-colors">Terms</Link>
            {/* Phase 17b 3-restructured A3 — Cookies link reopens the
                consent preference banner via a tiny client wrapper. */}
            <CookiePrefsLink
              href="/cookies"
              className="text-[color:var(--muted)] text-xs hover:text-[color:var(--ivory-dim)] transition-colors"
            >
              Cookies
            </CookiePrefsLink>
            <Link href="/#contact-philosophy" className="text-[color:var(--muted)] text-xs hover:text-[color:var(--ivory-dim)] transition-colors">How we work</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
