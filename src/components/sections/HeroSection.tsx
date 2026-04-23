'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import { copy } from '@/lib/copy';

// R3F ornament — client-only, loaded in Phase 4. SSR-safe graceful fallback.
const HeroOrnament = dynamic(() => import('@/components/ui-dp/HeroOrnament').then(m => m.HeroOrnament), {
  ssr: false,
  loading: () => <HeroOrnamentFallback />,
});

function HeroOrnamentFallback() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className="w-56 h-56 md:w-80 md:h-80 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 35% 30%, rgba(245,158,11,0.35) 0%, rgba(217,119,6,0.18) 40%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
}

export function HeroSection() {
  const { eyebrow, headline, subhead, ctaPrimary, ctaSecondary } = copy.hero;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: '#0A0A0B', paddingTop: '7rem', paddingBottom: '6rem' }}
      id="hero"
    >
      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Copy — left 7 cols */}
          <div className="lg:col-span-7 relative z-10">
            <p className="eyebrow mb-6" data-hero-eyebrow>
              {eyebrow}
            </p>

            <h1
              className="font-display text-[44px] sm:text-[56px] md:text-[72px] lg:text-[88px] leading-[0.98] tracking-tight text-[color:var(--ivory)]"
              data-hero-headline
            >
              {headline}
            </h1>

            <p
              className="mt-8 max-w-xl text-[17px] md:text-[18px] leading-[1.55] text-[color:var(--ivory-dim)]"
              data-hero-subhead
            >
              {subhead}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4" data-hero-cta>
              <Link
                href={ctaPrimary.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[14px] font-medium rounded-md text-[#0A0A0B] focus-ring"
                style={{ background: 'var(--amber-bright)' }}
              >
                {ctaPrimary.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={ctaSecondary.href}
                className="inline-flex items-center justify-center px-6 py-3.5 text-[14px] font-medium rounded-md text-[color:var(--ivory)] border-hairline focus-ring hover:border-[color:var(--amber)] transition-colors"
              >
                {ctaSecondary.label}
              </Link>
            </div>
          </div>

          {/* Ornament — right 5 cols on desktop, full-width below copy on mobile */}
          <div className="lg:col-span-5 relative h-[320px] md:h-[480px] lg:h-[520px]">
            <HeroOrnament />
          </div>
        </div>
      </div>

      {/* Hairline to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: '#27272A' }} />
    </section>
  );
}
