import Link from 'next/link';
import { copy } from '@/lib/copy';
import LetterHoverText from '@/components/effects/LetterHoverText';
import { ServiceVignette } from '@/components/sections/ServiceVignette';

const VIGNETTE_KINDS = ['agents', 'workflow', 'operators', 'marketing', 'reporting'] as const;

/**
 * Phase 13 scroll-pin service reveal (Phase 19 GSAP scrub revert).
 * Desktop (≥1024px): each service is a sticky frame, ~80vh per stop.
 * Massive italic numeral left of content; pure typographic anchor.
 * Frames stack via position: sticky; the next frame's solid background
 * covers the previous (no JS, no GSAP).
 * Mobile (<1024px): Phase 11 letter-hover list.
 * prefers-reduced-motion: pin and inner reveals skip via media query.
 *
 * Phase 19 GSAP pin+scrub experiment reverted: cross-fade timeline
 * positional offsets did not map cleanly to scrub progress, leaving
 * middle frames stuck at opacity 0 between the first and last visible
 * stops. CSS-sticky version is the known-good implementation.
 */
export function ServicesPinReveal() {
  const { eyebrow, headline, items } = copy.servicesList;

  return (
    <section id="services" className="services-pin-section section-deferred">
      <div className="container-wide services-pin-header-wrap">
        <header className="services-pin-header mb-12 lg:mb-16">
          <p className="services-pin-section-eyebrow font-mono uppercase mb-5" data-reveal>
            {eyebrow}
          </p>
          <h2 className="services-pin-section-headline font-hero text-balance" data-reveal>
            {headline}
          </h2>
        </header>
      </div>

      {/* Desktop: pin-stack experience. Each frame's solid bg covers the
          previous as user scrolls. Sticky handles the pin natively, no JS. */}
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
              <div className="services-pin-grid">
                <div className="services-pin-content">
                  <h3 className="services-pin-title font-display">
                    {item.label}
                  </h3>
                  <p className="services-pin-desc font-body">{item.description}</p>
                  <Link href={item.href} className="services-pin-link text-link">
                    See {item.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <div className="services-pin-vignette" aria-hidden="true">
                  <ServiceVignette kind={VIGNETTE_KINDS[i] ?? 'agents'} />
                </div>
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
