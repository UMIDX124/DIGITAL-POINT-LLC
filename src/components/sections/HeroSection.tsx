import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { copy } from '@/lib/copy';

/**
 * Phase 2 hero.
 * Centered editorial serif headline with a hand-coded abstract amber SVG
 * ornament sitting above the eyebrow. No R3F, no three.js, no raster.
 */
export function HeroSection() {
  const { eyebrow, headline, subhead, ctaPrimary, ctaSecondary } = copy.hero;

  return (
    <section
      className="relative w-full overflow-hidden section-top"
      style={{
        background: 'var(--bg)',
        paddingBottom: 'var(--section-main)',
        borderBottom: '1px solid var(--border)',
      }}
      id="hero"
    >
      <div className="container-narrow relative text-center">
        {/* Abstract amber ornament — two concentric arcs over a thin baseline.
            Reads as an aperture / signal mark. Hand-coded, single-color amber. */}
        <div className="mx-auto mb-10 flex justify-center" aria-hidden="true">
          <HeroOrnament />
        </div>

        <p className="eyebrow" data-hero-eyebrow>
          {eyebrow}
        </p>

        <h1
          className="display font-display mt-8 mx-auto max-w-[18ch] text-[color:var(--ivory)]"
          data-hero-headline
        >
          {headline}
        </h1>

        <p
          className="t-lead mx-auto mt-8 max-w-2xl text-[color:var(--ivory-dim)]"
          data-hero-subhead
        >
          {subhead}
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          data-hero-cta
        >
          <Link
            href={ctaPrimary.href}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[14px] font-medium rounded-md text-[#0A0A0B] focus-ring transition-[background-color] duration-[400ms] hover:bg-[var(--amber)]"
            style={{ background: 'var(--amber-bright)', transitionTimingFunction: 'var(--ease-brand)' }}
          >
            {ctaPrimary.label}
            <ArrowRight className="w-4 h-4 transition-transform duration-[400ms] group-hover:translate-x-0.5" style={{ transitionTimingFunction: 'var(--ease-brand)' }} />
          </Link>
          <Link
            href={ctaSecondary.href}
            className="inline-flex items-center justify-center px-6 py-3.5 text-[14px] font-medium rounded-md text-[color:var(--ivory)] border-hairline focus-ring hover:border-[color:var(--amber)] transition-colors duration-[400ms]"
            style={{ transitionTimingFunction: 'var(--ease-brand)' }}
          >
            {ctaSecondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Hand-coded abstract amber ornament. No external imports.
 * Concentric arc pair + thin crosshair baseline rendered in a single SVG.
 * Scales fluidly from 112px -> 168px across viewport sizes.
 */
function HeroOrnament() {
  return (
    <svg
      width="168"
      height="168"
      viewBox="0 0 168 168"
      fill="none"
      className="w-[7rem] h-[7rem] md:w-[9rem] md:h-[9rem] lg:w-[10.5rem] lg:h-[10.5rem]"
      aria-hidden="true"
    >
      {/* Outer incomplete arc — aperture mark */}
      <path
        d="M 84 12 A 72 72 0 1 1 12 84"
        stroke="var(--amber-bright)"
        strokeWidth="1.25"
        strokeLinecap="round"
        fill="none"
      />
      {/* Inner arc, offset angle — reinforces the ring gesture */}
      <path
        d="M 148 84 A 64 64 0 0 1 84 148"
        stroke="var(--amber)"
        strokeWidth="1.25"
        strokeLinecap="round"
        fill="none"
      />
      {/* Thin diagonal hairline crossing center — editorial axis */}
      <line
        x1="36"
        y1="132"
        x2="132"
        y2="36"
        stroke="var(--ivory-dim)"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* Center dot — focal anchor */}
      <circle cx="84" cy="84" r="2.5" fill="var(--amber-bright)" />
    </svg>
  );
}
