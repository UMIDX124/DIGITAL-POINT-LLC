import Link from 'next/link';
import { copy } from '@/lib/copy';
import ScrambleText from '@/components/effects/ScrambleText';

/**
 * Phase 6 v2 services list.
 *
 * Heavy per-letter hover spans (Phase 4d) replaced with ScrambleText —
 * single-element setState per row, ~80% lighter DOM, more AI-flavored
 * Matrix-flash effect. Letter-hover CSS still defines fallback color
 * shift via `.service-row:hover .service-name` for non-JS / no-scramble
 * environments.
 *
 * Section header widened to max-w-[36ch] (Phase 6 A.3) so the heading
 * "Five practices under one operating system." flows in 2 lines instead
 * of stacking word-per-line.
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
        <header className="max-w-[36ch] mb-[var(--section-space-tight)]">
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
                  <ScrambleText text={`/ ${item.label}`} trigger="hover" speed={28} />
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
