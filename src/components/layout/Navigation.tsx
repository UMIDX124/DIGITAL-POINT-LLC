import Link from 'next/link';
import { Logomark } from '@/components/brand/Logomark';

// F·13 reorder. Pricing pulled from slot 5 of 6 up to slot 2 so price
// shoppers find it without hunting. Recovery stays first because it is
// the differentiating service category.
const navLinks = [
  { label: 'Recovery', href: '/recovery' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Agents', href: '/agents' },
  { label: 'Automation', href: '/automation' },
  { label: 'Operators', href: '/operators' },
  { label: 'Stack', href: '/stack' },
];

export function Navigation() {
  return (
    <header className="dpl-nav" role="banner">
      <nav className="dpl-nav__inner" aria-label="Primary">
        <Link href="/" className="dpl-nav__brand" aria-label="Digital Point LLC, home">
          <span className="sr-only">Digital Point LLC</span>
          <Logomark
            mode="lockup"
            variant="light"
            markSize={28}
            textSize={112}
            gap={14}
            className="dpl-logo-nav"
            priority
            ariaHidden
          />
        </Link>

        <div className="dpl-nav__menu">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="dpl-nav__link">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="dpl-nav__cta">
          {/* F·13. Secondary CTA "Talk to a co-founder" sits next to the
              primary "Book audit" so prospects who want a conversation
              before filling a form have a clean entry. Both land on /audit
              for now; once a real contact endpoint ships the secondary
              moves to /contact. */}
          <Link href="/contact" className="dpl-nav__cta-btn dpl-nav__cta-btn--ghost">
            Talk to a co-founder
          </Link>
          <Link href="/audit" className="dpl-nav__cta-btn">
            Book audit
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
