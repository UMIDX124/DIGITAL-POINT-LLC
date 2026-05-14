import Link from 'next/link';

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
          <span className="dpl-nav__brand-mark" aria-hidden="true">DP</span>
          <span className="dpl-nav__brand-word">digital point</span>
        </Link>

        <div className="dpl-nav__menu">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="dpl-nav__link">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="dpl-nav__cta">
          <Link href="/audit" className="dpl-nav__cta-btn">
            Book audit
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
