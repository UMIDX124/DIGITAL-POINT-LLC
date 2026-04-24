import Link from 'next/link';
import { copy } from '@/lib/copy';

/**
 * Phase 4f final CTA — dramatic purple-glow moment. Massive italic serif
 * headline on bg-tertiary with a strong ambient glow behind the text.
 */
export function CTASection() {
  const { eyebrow, headline, body, ctaPrimary, ctaSecondary } = copy.finalCta;

  return (
    <section
      id="cta"
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-tertiary)',
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
    >
      {/* Strong purple ambient glow, centered behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 55%, var(--accent-glow), transparent 70%)',
        }}
      />

      <div className="container-narrow text-center relative">
        <p
          className="font-mono uppercase mb-6"
          data-reveal
          style={{
            fontSize: 'var(--text-micro)',
            letterSpacing: '0.18em',
            color: 'var(--text-tertiary)',
          }}
        >
          {eyebrow}
        </p>
        <h2
          className="font-italic-display mx-auto"
          data-reveal
          style={{
            fontSize: 'var(--text-h1)',
            fontStyle: 'italic',
            color: 'var(--text-primary)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: '18ch',
          }}
        >
          {headline}
        </h2>
        <p
          className="mt-8 font-body mx-auto"
          data-reveal
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            maxWidth: '52ch',
          }}
        >
          {body}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center" data-reveal>
          <Link href={ctaPrimary.href} className="cta-primary">
            {ctaPrimary.label}
            <span aria-hidden="true">→</span>
          </Link>
          <Link href={ctaSecondary.href} className="cta-ghost">
            {ctaSecondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
