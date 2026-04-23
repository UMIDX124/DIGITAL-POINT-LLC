import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { copy } from '@/lib/copy';

export function CTASection() {
  const { eyebrow, headline, body, ctaPrimary, ctaSecondary } = copy.finalCta;

  return (
    <section
      className="relative section-padding"
      style={{ background: '#0A0A0B' }}
      id="cta"
    >
      <div className="container-narrow text-center">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h2 className="font-display text-[40px] md:text-[60px] leading-[1.05] tracking-tight text-[color:var(--ivory)] max-w-3xl mx-auto">
          {headline}
        </h2>
        <p className="mt-6 text-[16px] md:text-[17px] leading-[1.6] text-[color:var(--ivory-dim)] max-w-xl mx-auto">
          {body}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
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
    </section>
  );
}
