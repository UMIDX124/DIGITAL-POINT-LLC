import { copy } from '@/lib/copy';

/**
 * Phase 2: centered italic pull quote acting as the editorial breath between
 * Recent Work and the Workflow diagram. Amber accent mark on the left.
 */
export function PullQuoteSection() {
  const { text, attribution } = copy.pullQuote;

  return (
    <section
      className="relative section-lg"
      style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
      aria-label="Operating principle"
    >
      <div className="container-narrow">
        <div className="relative mx-auto max-w-[28ch]">
          {/* Amber accent glyph */}
          <div className="mb-[var(--space-6)] flex justify-start" aria-hidden="true">
            <QuoteGlyph />
          </div>

          <blockquote
            className="font-display italic leading-[1.15] tracking-tight text-[color:var(--ivory)]"
            style={{ fontSize: 'var(--text-h2)' }}
            data-reveal
          >
            &ldquo;{text}&rdquo;
          </blockquote>

          <p className="mt-[var(--space-6)] eyebrow" data-reveal>
            — {attribution}
          </p>
        </div>
      </div>
    </section>
  );
}

function QuoteGlyph() {
  return (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none" aria-hidden="true">
      <path
        d="M 4 6 L 4 22 L 14 22 L 14 14 L 9 14 L 9 6 Z M 22 6 L 22 22 L 32 22 L 32 14 L 27 14 L 27 6 Z"
        fill="var(--amber)"
      />
    </svg>
  );
}
