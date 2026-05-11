import Link from 'next/link';
import Image from 'next/image';

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
        <Link href="/" className="dpl-nav__brand">
          <Image
            src="/Dp-logo1.png"
            alt=""
            width={28}
            height={28}
            priority
            style={{ borderRadius: 6 }}
          />
          <span>Digital Point</span>
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
            style={{ height: '2.25rem', paddingInline: '0.875rem' }}
          >
            Book audit
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
