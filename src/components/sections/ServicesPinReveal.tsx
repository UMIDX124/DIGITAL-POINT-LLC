import Link from 'next/link';
import { copy } from '@/lib/copy';
import LetterHoverText from '@/components/effects/LetterHoverText';

/**
 * Phase 13 scroll-pin service reveal.
 * Desktop (≥1024px): each service is a sticky frame, ~80vh per stop.
 * Massive italic numeral left of content; pure typographic anchor (no
 * decorative glyph). Frames stack via position: sticky; the next frame's
 * solid background covers the previous (no JS, no GSAP).
 * Mobile (<1024px): Phase 11 letter-hover list.
 * prefers-reduced-motion: pin and inner reveals skip via media query.
 */

export function ServicesPinReveal() {
  const { eyebrow, headline, items } = copy.servicesList;

  return (
    <section id="services" className="services-pin-section section-deferred">
      <div className="container-wide services-pin-header-wrap">
        <header className="services-pin-header mb-12 lg:mb-16">
          {/* Phase 17b Pillar 4 P1.1 — eyebrow color migrated from
              --text-tertiary (muted gray) to --accent-bright (phosphor
              amber). Production capture showed the tertiary muted gray
              reading as near-invisible on canvas despite a 7.4:1
              mathematical contrast ratio — perceptual hierarchy demands
              the canonical eyebrow amber accent here. Style now lives in
              .services-pin-section-eyebrow. */}
          <p className="services-pin-section-eyebrow font-mono uppercase mb-5" data-reveal>
            {eyebrow}
          </p>
          <h2 className="services-pin-section-headline font-hero text-balance" data-reveal>
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
          >
            <div className="services-pin-frame-inner container-wide">
              <span className="services-pin-num font-italic-display" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="services-pin-content">
                <h3 className="services-pin-title font-display">
                  {item.label}
                </h3>
                <p className="services-pin-desc font-body">{item.description}</p>
                {/* Phase 17b 3-reversal R4 — outcome metric removed.
                    Service cadence reverted to: number + title + capability
                    framing + explore link. Metric was conversion-density
                    drift; Bloomberg Operator restraint restored. */}
                <Link href={item.href} className="services-pin-link text-link">
                  See {item.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile fallback: Phase 11 letter-hover list. */}
      <div className="container-wide services-pin-mobile">
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
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="service-name font-hero">
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
