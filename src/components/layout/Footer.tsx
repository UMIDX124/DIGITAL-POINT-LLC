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
    { name: 'Contact', href: '/contact' },
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
            <div className="space-y-4">
              <p className="text-[color:var(--ivory-dim)] text-sm leading-relaxed" style={{ maxWidth: '24rem' }}>
                Reach out directly. Your inquiry routes to the operator best
                matched to your stage — not a ticket pool — because we&apos;re
                personally accountable for what we ship.
              </p>
              {/* Phase 17b 3-restructured E1+E2+E3 — direct mailto, location +
                  timezone, response-time commitment. */}
              <ul className="text-[color:var(--ivory-dim)] text-sm space-y-2 leading-relaxed">
                <li>
                  <a
                    href="mailto:hello@digitalpointllc.com"
                    className="text-link hover:text-[color:var(--accent)] transition-colors"
                  >
                    hello@digitalpointllc.com
                  </a>
                </li>
                <li className="text-[color:var(--muted)]">Lahore, PK · UTC+5</li>
                <li className="text-[color:var(--muted)]">We reply within 24h on weekdays</li>
              </ul>
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
            <Link href="/#cta" className="text-[color:var(--muted)] text-xs hover:text-[color:var(--ivory-dim)] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
