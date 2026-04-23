import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { copy } from '@/lib/copy';

/**
 * Phase 2 final CTA — "Let's find what's draining your budget."
 * Centered editorial composition. Big serif headline + lead copy + primary
 * amber button + secondary ghost button. No card wrapper.
 */
export function CTASection() {
  const { eyebrow, headline, body, ctaPrimary, ctaSecondary } = copy.finalCta;

  return (
    <section
      className="relative section-lg"
      style={{ background: 'var(--bg)' }}
      id="cta"
    >
      <div className="container-narrow text-center">
        <p className="eyebrow mb-5" data-reveal>{eyebrow}</p>
        <h2
          className="t-h1 font-display text-[color:var(--ivory)] max-w-[20ch] mx-auto"
          data-reveal
        >
          {headline}
        </h2>
        <p
          className="mt-[var(--space-6)] t-lead text-[color:var(--ivory-dim)] max-w-xl mx-auto"
          data-reveal
        >
          {body}
        </p>

        <div className="mt-[var(--space-7)] flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={ctaPrimary.href}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[14px] font-medium rounded-md text-[#0A0A0B] focus-ring transition-[background-color] duration-[400ms] hover:bg-[var(--amber)]"
            style={{ background: 'var(--amber-bright)', transitionTimingFunction: 'var(--ease-brand)' }}
          >
            {ctaPrimary.label}
            <ArrowRight
              className="w-4 h-4 transition-transform duration-[400ms] group-hover:translate-x-0.5"
              style={{ transitionTimingFunction: 'var(--ease-brand)' }}
            />
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
