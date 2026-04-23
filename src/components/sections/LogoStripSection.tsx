import { copy } from '@/lib/copy';

/**
 * Phase 2: illustrative wordmark strip. Wordmarks are invented placeholders
 * rendered as styled type; not real client logos. Label spells this out
 * explicitly so the section cannot be misread as a trust strip of real brands.
 */
export function LogoStripSection() {
  const { label, marks } = copy.logoStrip;

  return (
    <section
      className="relative section-sm"
      style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
      aria-label="Representative client types"
    >
      <div className="container-wide">
        <p className="eyebrow mb-[var(--space-6)] text-center" data-reveal>
          {label}
        </p>
        <div
          className="flex flex-wrap items-center justify-center gap-x-[var(--space-8)] gap-y-[var(--space-5)]"
          data-logo-strip
        >
          {marks.map((mark) => (
            <span
              key={mark}
              className="font-display text-[color:var(--ivory-dim)] text-[18px] md:text-[22px] tracking-[0.14em] uppercase select-none"
              style={{ letterSpacing: '0.14em' }}
            >
              {mark}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
