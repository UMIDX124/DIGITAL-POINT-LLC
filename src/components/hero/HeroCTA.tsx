import Link from 'next/link';
import { copy } from '@/lib/copy';

/**
 * Hero CTA stack — Phase 19 nuke-lag rewrite.
 * MagneticCTA wrapper removed (was attaching a global mousemove listener
 * with rAF tick per instance). Pure Link + CSS hover.
 */
export function HeroCTA() {
  const { ctaPrimary, ctaSecondary } = copy.hero;

  return (
    <>
      <div className="flex flex-wrap items-center gap-6" data-hero-cta>
        <Link href={ctaPrimary.href} className="cta-primary" data-cta-primary>
          {ctaPrimary.label}
          <span aria-hidden="true">→</span>
        </Link>
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
        Free · 30 min · No sales pitch · Co-founder reviews your setup
      </p>
    </>
  );
}
