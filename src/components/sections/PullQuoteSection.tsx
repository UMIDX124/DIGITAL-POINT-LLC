import { copy } from '@/lib/copy';

/**
 * Phase 4e pull quote — centered italic serif on bg-tertiary with a soft
 * purple radial glow behind the text. Max-width 16ch for editorial breath.
 */
export function PullQuoteSection() {
  const { text, attribution } = copy.pullQuote;

  return (
    <section
      className="relative overflow-hidden section-deferred"
      style={{
        background: 'var(--bg-tertiary)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
      aria-label="Operating principle"
    >
      {/* Soft purple radial glow behind the text */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, var(--accent-glow-soft), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-[68rem]" style={{ paddingInline: 'var(--container-gutter)' }}>
        <blockquote
          className="pull-quote-text font-italic-display text-center mx-auto"
          style={{
            fontSize: 'clamp(2.25rem, 4.5vw, 4.5rem)',
            color: 'var(--text-primary)',
            fontStyle: 'italic',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: 'var(--maxw-pullquote)',
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
