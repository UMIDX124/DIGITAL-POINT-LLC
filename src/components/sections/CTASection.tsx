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
    <section id="cta" className="cta-section-root relative section-deferred">
      <div className="container-narrow text-center relative">
        <p className="cta-section-eyebrow font-mono uppercase mb-6" data-reveal>
          {eyebrow}
        </p>
        <h2 className="cta-section-headline font-italic-display mx-auto" data-reveal>
          {headline}
        </h2>
        <p className="cta-section-body mt-8 font-body mx-auto" data-reveal>
          {body}
        </p>

        {/* Phase 17b 3-restructured D2 → Pillar 4 P1.3. Micro-copy now
            renders ABOVE the dual-CTA buttons as an eyebrow-style
            supporting line. Anchors the centered stack: micro-copy →
            buttons reads as a single visual cluster instead of three
            disconnected centered elements. */}
        <p className="cta-section-microcopy mt-12 font-mono uppercase">
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
