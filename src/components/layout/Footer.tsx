import { Linkedin } from 'lucide-react';
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
                We don&apos;t list a generic support inbox. Most agencies hide
                behind a hello@ queue where your message lines up with
                everyone else&apos;s. We don&apos;t run that way.
              </p>
              <p className="text-[color:var(--muted)] text-xs leading-relaxed" style={{ maxWidth: '24rem' }}>
                Reach out through Cosmo or our audit form — your inquiry
                routes directly to the operator best matched to your stage,
                not a ticket pool. We answer from our personal accounts
                because we&apos;re personally accountable for what we ship.
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
