import { copy } from '@/lib/copy';

/**
 * Phase 4e → 17b 2A-REFIX pull quote. Originally centered italic serif on
 * bg-tertiary with a soft amber radial glow. 2A-REFIX drops the glow
 * (Bloomberg Operator zero-gradient canon) + section overflow-hidden +
 * raises line-height to 1.32 to clear italic descenders.
 */
export function PullQuoteSection() {
  const { text, attribution } = copy.pullQuote;

  return (
    <section
      className="relative section-deferred"
      // Phase 18.6 P2 — opaque var(--bg-canvas) removed so site-wide
      // body atmosphere shows through. Border + padding tokens retained.
      style={{
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
      aria-label="Operating principle"
    >
      <div className="relative mx-auto max-w-[88rem]" style={{ paddingInline: 'var(--container-gutter)' }}>
        <blockquote
          className="pull-quote-text font-italic-display text-center mx-auto"
          style={{
            /* Phase 16 D.4 — clamp ceiling lowered from 4.5rem to 3.5rem so
               the line wraps wider before hitting the size cap. Combined
               with the 80ch max-width below, the Faizan quote now lands
               in 3 horizontal lines on desktop instead of the prior
               vertical 6-line column. */
            fontSize: 'clamp(1.75rem, 3.4vw, 3.5rem)',
            color: 'var(--text-primary)',
            fontStyle: 'italic',
            lineHeight: 1.32,
            letterSpacing: '-0.015em',
            /* 80ch reading measure replaces --maxw-pullquote (was 36rem
               post-Phase-15-tighten). Editorial wide-line look. */
            maxWidth: '80ch',
          }}
          data-reveal
        >
          &ldquo;{text}&rdquo;
        </blockquote>

        <p
          className="mt-10 font-mono uppercase text-center"
          data-reveal
          style={{
            fontSize: 'var(--text-micro)',
            letterSpacing: '0.18em',
            color: 'var(--text-tertiary)',
          }}
        >
          — {attribution}
        </p>
      </div>
    </section>
  );
}
