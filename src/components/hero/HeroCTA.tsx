import Link from 'next/link';
import MagneticCTA from '@/components/effects/MagneticCTA';

/**
 * Hero CTA stack — primary audit booking + secondary case-studies link +
 * trust microcopy. Extracted from HeroSection (Phase 18 reduced-scope C4).
 * GSAP cascade targets `[data-hero-cta] > *` — wrapper preserved.
 */
export function HeroCTA() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-6" data-hero-cta>
        <MagneticCTA strength={0.3} radius={90}>
          <Link href="/free-growth-audit" className="cta-primary" data-cta-primary>
            Book a free 30-min audit
            <span aria-hidden="true">→</span>
          </Link>
        </MagneticCTA>
        <Link href="/case-studies" className="text-link inline-flex items-center gap-1.5">
          See how it runs
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </Link>
      </div>

      {/* Phase 17b 3-restructured D2 — trust micro-copy under primary CTA. */}
      <p className="hero-trust-microcopy mt-4">
        Free · 30 min · No sales pitch · Co-founder reviews personally
      </p>
    </>
  );
}
