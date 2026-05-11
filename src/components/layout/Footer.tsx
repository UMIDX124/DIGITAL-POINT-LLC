import Link from 'next/link';
import { Logomark } from '@/components/brand/Logomark';

const cols = [
  {
    heading: 'Services',
    links: [
      { label: 'AI Agents', href: '/agents' },
      { label: 'Workflow Automation', href: '/automation' },
      { label: 'Remote Operators', href: '/operators' },
      { label: 'Recovery', href: '/recovery' },
    ],
  },
  {
    heading: 'Engagement',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Process', href: '/process' },
      { label: 'Stack', href: '/stack' },
      { label: 'Book audit', href: '/audit' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Case studies', href: '/case-studies' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="dpl-footer" role="contentinfo">
      <div className="container-wide">
        <div className="dpl-footer__grid">
          <div className="dpl-footer__col">
            <Link href="/" className="dpl-nav__brand" style={{ marginBlockEnd: '1rem' }}>
              <Logomark size={32} />
              <span>Digital Point</span>
            </Link>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', maxWidth: '28rem', lineHeight: 1.6 }}>
              Production AI agent operations. We deploy and run agent stacks for B2B
              SaaS, e-commerce ops, and professional services teams. Operator-backed.
              No license to manage.
            </p>
            <p
              className="font-mono"
              style={{
                marginBlockStart: '1rem',
                color: 'var(--color-text-muted)',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              DPL · 2017 → NOW · Wilmington, DE · United States
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.heading} className="dpl-footer__col">
              <span className="dpl-footer__heading">{c.heading}</span>
              {c.links.map((l) => (
                <Link key={l.href} href={l.href} className="dpl-footer__link">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="dpl-footer__bottom">
          <span className="dpl-footer__copy">
            © {new Date().getFullYear()} Digital Point LLC. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/privacy-policy" className="dpl-footer__link">Privacy</Link>
            <Link href="/terms-of-service" className="dpl-footer__link">Terms</Link>
            <Link href="/cookies" className="dpl-footer__link">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
