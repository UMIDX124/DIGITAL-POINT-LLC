import Link from 'next/link';
import { copy } from '@/lib/copy';

/**
 * Phase 4d services list.
 *
 * Massive serif rows with per-letter hover scale. Pure CSS driving the
 * letter effect via hover-group + transition-delay per letter index, so
 * zero JS weight for what would otherwise be a per-letter React map.
 *
 * Preserves data-service-item hooks so the ScrollMotion stagger handler
 * picks up the reveal.
 */

function splitIntoLetters(label: string): string[] {
  return Array.from(label);
}

export function ServicesListSection() {
  const { eyebrow, headline, items } = copy.servicesList;

  return (
    <section
      id="services"
      className="relative"
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
    >
      <div className="container-wide">
        <header className="max-w-[22ch] mb-[var(--section-space-tight)]">
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
            className="font-hero"
            data-reveal
            style={{
              fontSize: 'var(--text-h1)',
              color: 'var(--text-primary)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            {headline}
          </h2>
        </header>

        <ul className="services-rows" data-services-list>
          {items.map((item, i) => {
            const letters = splitIntoLetters(`/ ${item.label}`);
            return (
              <li key={item.label} data-service-item>
                <Link href={item.href} className="service-row group focus-ring">
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
                      fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
                      color: 'var(--text-primary)',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {letters.map((ch, li) => (
                      <span
                        key={li}
                        className="service-letter inline-block"
                        style={{
                          transitionDelay: `${li * 30}ms`,
                          // Preserve whitespace so spacing doesn't collapse.
                          whiteSpace: ch === ' ' ? 'pre' : undefined,
                        }}
                      >
                        {ch}
                      </span>
                    ))}
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
            );
          })}
        </ul>
      </div>
    </section>
  );
}
