import Link from 'next/link';
import { copy } from '@/lib/copy';
import MagneticCTA from '@/components/effects/MagneticCTA';

/**
 * Phase 4f → 17b 2A-REFIX final CTA. Originally a "dramatic purple-glow
 * moment" with radial-gradient pseudo-element behind the headline. Phase
 * 16 migrated palette but kept the gradient — production verification
 * surfaced amber bleed at section bottom inconsistent with Bloomberg
 * Operator zero-gradient canon. 2A-REFIX drops the gradient + section
 * overflow-hidden + raises line-height to clear italic descenders.
 */
export function CTASection() {
  const { eyebrow, headline, body, ctaPrimary, ctaSecondary } = copy.finalCta;

  return (
    <section
      id="cta"
      className="relative section-deferred"
      style={{
        background: 'var(--bg-canvas)',
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
    >
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
            lineHeight: 1.32,
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

        {/* Phase 17b 3-restructured D2 → Pillar 4 P1.3. Micro-copy now
            renders ABOVE the dual-CTA buttons as an eyebrow-style
            supporting line. Anchors the centered stack: micro-copy →
            buttons reads as a single visual cluster instead of three
            disconnected centered elements. */}
        <p
          className="mt-12 font-mono uppercase"
          style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            letterSpacing: '0.18em',
          }}
        >
          Free · Written plan in 5 days · Co-founder reviews personally
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center items-center" data-reveal>
          <MagneticCTA strength={0.3} radius={90}>
            <Link href={ctaPrimary.href} className="cta-primary" data-cta-primary>
              {ctaPrimary.label}
              <span aria-hidden="true">→</span>
            </Link>
          </MagneticCTA>
          <Link href={ctaSecondary.href} className="cta-ghost">
            {ctaSecondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
