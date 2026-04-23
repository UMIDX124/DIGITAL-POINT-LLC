import Link from 'next/link';
import { copy } from '@/lib/copy';

/**
 * Phase 2: massive editorial service list. Each item displays huge serif type
 * that shifts to amber on hover. No grid, no cards — just vertical rhythm.
 */
export function ServicesListSection() {
  const { eyebrow, headline, items } = copy.servicesList;

  return (
    <section
      id="services"
      className="relative section-main"
      style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="container-wide">
        <header className="max-w-2xl mb-[var(--space-8)]">
          <p className="eyebrow mb-5" data-reveal>{eyebrow}</p>
          <h2 className="t-h2 font-display text-[color:var(--ivory)]" data-reveal>
            {headline}
          </h2>
        </header>

        <ul className="divide-hairline" data-services-list>
          {items.map((item, i) => (
            <li key={item.label} data-service-item>
              <Link
                href={item.href}
                className="service-row group flex items-baseline justify-between gap-6 py-[var(--space-6)] md:py-[var(--space-7)] transition-colors duration-[400ms] focus-ring"
                style={{ transitionTimingFunction: 'var(--ease-brand)' }}
              >
                <span className="flex items-baseline gap-4 md:gap-6">
                  <span
                    className="font-mono text-[color:var(--muted)] text-[13px] tabular-nums w-8 shrink-0"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="t-h1 font-display text-[color:var(--ivory)] group-hover:text-[color:var(--amber)] transition-colors duration-[400ms]"
                    style={{ transitionTimingFunction: 'var(--ease-brand)' }}
                  >
                    / {item.label}
                  </span>
                </span>
                <span
                  className="hidden md:inline-block text-[color:var(--muted)] group-hover:text-[color:var(--amber)] transition-[color,transform] duration-[400ms] group-hover:translate-x-1"
                  style={{ transitionTimingFunction: 'var(--ease-brand)' }}
                  aria-hidden="true"
                >
                  <ArrowGlyph />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ArrowGlyph() {
  return (
    <svg width="28" height="12" viewBox="0 0 28 12" fill="none" aria-hidden="true">
      <line x1="0" y1="6" x2="24" y2="6" stroke="currentColor" strokeWidth="1.25" />
      <polyline points="18,1 24,6 18,11" stroke="currentColor" strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
