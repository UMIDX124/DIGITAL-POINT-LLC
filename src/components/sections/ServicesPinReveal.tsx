import Link from 'next/link';
import { copy } from '@/lib/copy';
import LetterHoverText from '@/components/effects/LetterHoverText';

/**
 * Phase 13 — Apple-feel scroll-pin service reveal.
 * Desktop (≥1024px): each service is a sticky frame, ~80vh per stop.
 * Massive italic Instrument Serif number sits left, copy on right, subtle
 * geometric SVG icon. As user scrolls, frames stack via position: sticky;
 * the next frame's solid background covers the previous (no JS for the
 * pin itself, no GSAP cost).
 * Mobile (<1024px): falls back to standard letter-hover list (Phase 11
 * pattern preserved).
 * prefers-reduced-motion: pin and inner reveals skip via media query.
 */

const SERVICE_GLYPHS = [
  // 01 — AI agents → orbital nodes
  (
    <svg key="ai" width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="6" fill="currentColor" />
      <circle cx="60" cy="60" r="36" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
      <circle cx="96" cy="60" r="3" fill="currentColor" />
      <circle cx="40" cy="92" r="3" fill="currentColor" />
      <circle cx="32" cy="36" r="2.5" fill="currentColor" opacity="0.7" />
    </svg>
  ),
  // 02 — workflow → connected pipeline
  (
    <svg key="wf" width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <rect x="14" y="40" width="20" height="20" stroke="currentColor" strokeWidth="1" />
      <rect x="50" y="40" width="20" height="20" stroke="currentColor" strokeWidth="1" />
      <rect x="86" y="40" width="20" height="20" stroke="currentColor" strokeWidth="1" />
      <line x1="34" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="1" />
      <line x1="70" y1="50" x2="86" y2="50" stroke="currentColor" strokeWidth="1" />
      <circle cx="24" cy="80" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="60" cy="80" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="96" cy="80" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  // 03 — operators → human grid
  (
    <svg key="op" width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <circle cx="36" cy="44" r="8" stroke="currentColor" strokeWidth="1" />
      <path d="M 22 76 Q 36 64 50 76" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="84" cy="44" r="8" stroke="currentColor" strokeWidth="1" />
      <path d="M 70 76 Q 84 64 98 76" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="60" y1="44" x2="60" y2="80" stroke="currentColor" strokeWidth="0.75" opacity="0.4" strokeDasharray="2 4" />
    </svg>
  ),
  // 04 — performance → upward graph
  (
    <svg key="pm" width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <line x1="20" y1="92" x2="100" y2="92" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="20" y1="92" x2="20" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <polyline points="20,80 44,68 60,52 78,40 100,24" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="100" cy="24" r="3" fill="currentColor" />
    </svg>
  ),
  // 05 — systems → grid + signal
  (
    <svg key="sys" width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <line x1="20" y1="40" x2="100" y2="40" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <line x1="20" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <line x1="20" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <line x1="40" y1="20" x2="40" y2="100" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <line x1="60" y1="20" x2="60" y2="100" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <line x1="80" y1="20" x2="80" y2="100" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <circle cx="40" cy="40" r="3" fill="currentColor" />
      <circle cx="60" cy="60" r="3" fill="currentColor" />
      <circle cx="80" cy="80" r="3" fill="currentColor" />
    </svg>
  ),
];

export function ServicesPinReveal() {
  const { eyebrow, headline, items } = copy.servicesList;

  return (
    <section
      id="services"
      className="services-pin-section section-deferred"
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container-wide" style={{ paddingTop: 'var(--section-space)' }}>
        <header className="mb-12 lg:mb-16" style={{ maxWidth: 'var(--maxw-heading-section)' }}>
          <p
            className="font-mono uppercase mb-5"
            data-reveal
            style={{
              fontSize: 'var(--text-mono-label)',
              letterSpacing: 'var(--ls-mono-wide)',
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
              lineHeight: 'var(--lh-tight)',
              letterSpacing: 'var(--ls-tight)',
              maxWidth: 'var(--maxw-heading-section)',
            }}
          >
            {headline}
          </h2>
        </header>
      </div>

      {/* Desktop: pin-stack experience. Each frame's solid bg covers the
          previous as user scrolls. Sticky handles the pin natively — no JS. */}
      <div className="services-pin-stack">
        {items.map((item, i) => (
          <article
            key={item.label}
            className="services-pin-frame"
            data-pin-index={i}
            style={{ background: 'var(--bg-secondary)' }}
          >
            <div className="services-pin-frame-inner container-wide">
              <span className="services-pin-num font-italic-display" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="services-pin-content">
                <span
                  className="font-mono uppercase services-pin-eyebrow"
                  style={{
                    fontSize: 'var(--text-micro)',
                    letterSpacing: '0.18em',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  Service {String(i + 1).padStart(2, '0')} of 05
                </span>
                <h3 className="services-pin-title font-display">
                  {item.label}
                </h3>
                <p className="services-pin-desc font-body">{item.description}</p>
                {/* Phase 17b 3-reversal R4 — outcome metric removed.
                    Service cadence reverted to: number + title + capability
                    framing + explore link. Metric was conversion-density
                    drift; Bloomberg Operator restraint restored. */}
                <Link href={item.href} className="services-pin-link text-link">
                  Explore {item.label.toLowerCase()}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="services-pin-glyph" style={{ color: 'var(--accent)' }}>
                {SERVICE_GLYPHS[i] ?? null}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile fallback: Phase 11 letter-hover list. */}
      <div className="container-wide services-pin-mobile" style={{ paddingBottom: 'var(--section-space)' }}>
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
                    fontSize: 'var(--text-service-row)',
                    color: 'var(--text-primary)',
                    lineHeight: 'var(--lh-snug)',
                    letterSpacing: 'var(--ls-tight)',
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
