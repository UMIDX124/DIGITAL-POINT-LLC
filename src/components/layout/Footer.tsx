import { Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
    <footer className="relative mt-auto" style={{ background: '#0A0A0B', borderTop: '1px solid var(--amber)' }}>
      <div className="container-wide">
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/Dp-logo1.png"
                alt="Digital Point LLC"
                width={128}
                height={128}
                style={{ width: '64px', height: 'auto' }}
              />
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg text-[color:var(--ivory)]">Digital Point</span>
                <span className="text-[color:var(--muted)] text-[10px] tracking-[0.2em] uppercase mt-1">LLC · Since 2017</span>
              </div>
            </Link>
            <p className="text-[color:var(--ivory-dim)] text-sm leading-relaxed max-w-xs">
              Pod-based operators and AI workflows that run marketing, back-office, and reporting. One team. Three practices. You pay for outcomes, not headcount.
            </p>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Practices</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[color:var(--ivory-dim)] hover:text-[color:var(--amber)] text-sm transition-colors">
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
                  <Link href={link.href} className="text-[color:var(--ivory-dim)] hover:text-[color:var(--amber)] text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Connect</h4>
            <div className="space-y-4">
              <a href="mailto:info@digitalpointllc.com" className="flex items-center gap-3 text-[color:var(--ivory-dim)] hover:text-[color:var(--amber)] text-sm transition-colors">
                <Mail className="w-4 h-4" />
                info@digitalpointllc.com
              </a>
              <a
                href="https://linkedin.com/company/digitalpointllc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[color:var(--ivory-dim)] hover:text-[color:var(--amber)] text-sm transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <Link
                href="/free-growth-audit"
                className="inline-block mt-2 px-4 py-2 text-[13px] font-medium text-[#0A0A0B] rounded-md"
                style={{ background: 'var(--amber-bright)' }}
              >
                Book a free audit
              </Link>
            </div>
          </div>
        </div>

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #27272A' }}>
          <p className="text-[color:var(--muted)] text-xs">
            &copy; {currentYear} Digital Point LLC. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="text-[color:var(--muted)] text-xs hover:text-[color:var(--ivory-dim)] transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="text-[color:var(--muted)] text-xs hover:text-[color:var(--ivory-dim)] transition-colors">Terms</Link>
            <Link href="/contact" className="text-[color:var(--muted)] text-xs hover:text-[color:var(--ivory-dim)] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
