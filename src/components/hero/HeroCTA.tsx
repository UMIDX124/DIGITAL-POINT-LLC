import Link from 'next/link';
import MagneticCTA from '@/components/effects/MagneticCTA';
import { copy } from '@/lib/copy';

/**
 * Hero CTA stack: primary audit booking, secondary in-page services anchor,
 * trust microcopy. Labels and hrefs sourced from copy.ts (single source of truth).
 * GSAP cascade targets `[data-hero-cta] > *`.
 */
export function HeroCTA() {
  const { ctaPrimary, ctaSecondary } = copy.hero;

  return (
    <>
      <div className="flex flex-wrap items-center gap-6" data-hero-cta>
        <MagneticCTA strength={0.3} radius={90}>
          <Link href={ctaPrimary.href} className="cta-primary" data-cta-primary>
            {ctaPrimary.label}
            <span aria-hidden="true">→</span>
          </Link>
        </MagneticCTA>
        <Link href={ctaSecondary.href} className="text-link inline-flex items-center gap-1.5">
          {ctaSecondary.label}
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

      <p className="hero-trust-microcopy mt-4">
        Free · 30 min · No sales pitch · Co-founder reviews personally
      </p>
    </>
  );
}
