import { copy } from '@/lib/copy';

/**
 * Phase 9 — dual-row infinite marquee.
 *
 * Two horizontal rows of wordmarks, scrolling in opposite directions
 * (Row 1: right→left, Row 2: left→right). ~45s per full loop. CSS-only
 * via @keyframes marquee-left / marquee-right (defined in globals.css).
 *
 * Each row renders its wordmark array TWICE so the translateX(-50%)
 * end-state seamlessly continues from the duplicate without a visible
 * jump. The duplicate is `aria-hidden` so screen readers don't repeat
 * the list.
 *
 * Pause-on-hover via `:hover { animation-play-state: paused }` and
 * disabled entirely under `prefers-reduced-motion: reduce`.
 *
 * Edges fade via mask-image linear-gradient (defined in globals.css)
 * so wordmarks fade in/out at viewport edges.
 */
export function LogoStripSection() {
  const { label, marksRow1, marksRow2 } = copy.logoStrip;

  const renderRow = (
    items: readonly string[],
    direction: 'left' | 'right',
    rowKey: string,
  ) => (
    <div className="logo-marquee-track" data-direction={direction}>
      <ul className="logo-marquee-list" aria-hidden={false}>
        {items.map((mark) => (
          <li key={`${rowKey}-${mark}`} className="logo-mark">
            {mark}
          </li>
        ))}
      </ul>
      <ul className="logo-marquee-list" aria-hidden="true">
        {items.map((mark) => (
          <li key={`${rowKey}-dup-${mark}`} className="logo-mark">
            {mark}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section
      className="relative section-deferred"
      style={{
        background: 'var(--bg-tertiary)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'var(--section-space-tight)',
        paddingBottom: 'var(--section-space-tight)',
      }}
      aria-label="Operators behind growth engagements"
    >
      <div className="container-wide">
        <p
          className="text-center font-mono uppercase mb-10"
          data-reveal
          style={{
            fontSize: '10px',
            letterSpacing: '0.18em',
            color: 'var(--text-muted)',
          }}
        >
          {label}
        </p>
      </div>

      <div className="logo-marquee" aria-hidden={false}>
        {renderRow(marksRow1, 'left', 'r1')}
        <div className="h-6" aria-hidden="true" />
        {renderRow(marksRow2, 'right', 'r2')}
      </div>
    </section>
  );
}
