import Link from 'next/link';
import { Logomark } from '@/components/brand/Logomark';

const navLinks = [
  { label: 'Recovery', href: '/recovery' },
  { label: 'Agents', href: '/agents' },
  { label: 'Automation', href: '/automation' },
  { label: 'Operators', href: '/operators' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Stack', href: '/stack' },
];

export function Navigation() {
  return (
    <header className="dpl-nav" role="banner">
      <nav className="dpl-nav__inner" aria-label="Primary">
        <Link href="/" className="dpl-nav__brand" aria-label="Digital Point home">
          <Logomark mode="lockup" variant="light" priority markSize={32} textSize={92} gap={10} className="dpl-logo-nav" />
        </Link>

        <div className="dpl-nav__menu">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="dpl-nav__link">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="dpl-nav__cta">
          <Link
            href="/audit"
            className="btn btn-primary"
            style={{ minHeight: '2.75rem', paddingInline: '1rem' }}
          >
            Book audit
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
