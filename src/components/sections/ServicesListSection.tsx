import Link from 'next/link';
import { copy } from '@/lib/copy';
import LetterHoverText from '@/components/effects/LetterHoverText';

/**
 * Phase 7 services list — restored letter-hover (CSS-only).
 *
 * ScrambleText (Phase 6) was rolled back: it occasionally froze in a
 * scrambled state on production hover, leaving service rows reading as
 * gibberish — trust killer for a B2B services agency. Letter-hover is
 * Divyansh-style brand-appropriate, mechanically simpler, and 100%
 * crash-proof (pure CSS transitions per-character with stagger via
 * transition-delay derived from the letter's index).
 */
export function ServicesListSection() {
  const { eyebrow, headline, items } = copy.servicesList;

  return (
    <section
      id="services"
      className="relative section-deferred"
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
    >
      <div className="container-wide">
        <header className="max-w-3xl mb-[var(--section-space-tight)]">
          <p
            className="font-mono uppercase mb-6"
            data-reveal
            style={{
              fontSize: 'var(--text-micro)',
              letterSpacing: '0.12em',
              color: 'var(--text-tertiary)',
            }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-hero text-balance"
            data-reveal
            style={{
              fontSize: 'var(--text-h1)',
              color: 'var(--text-primary)',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
            }}
          >
            {headline}
          </h2>
        </header>

        <ul className="services-rows" data-services-list>
          {items.map((item, i) => (
            <li key={item.label} data-service-item>
              <Link
                href={item.href}
                className="service-row group focus-ring"
                data-service-row
              >
                <span
                  className="service-index font-mono uppercase"
                  aria-hidden="true"
                  style={{
                    fontSize: 'var(--text-micro)',
                    letterSpacing: '0.12em',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="service-name font-hero"
                  style={{
                    fontSize: 'var(--text-display)',
                    color: 'var(--text-primary)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  <LetterHoverText text={`/ ${item.label}`} />
                </span>
                <span
                  className="service-arrow hidden md:inline-block"
                  aria-hidden="true"
                >
                  <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                    <line x1="0" y1="6" x2="28" y2="6" stroke="currentColor" strokeWidth="1.25" />
                    <polyline
                      points="22,1 28,6 22,11"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
