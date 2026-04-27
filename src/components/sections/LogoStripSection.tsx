import { copy } from '@/lib/copy';

/**
 * Phase 9 — dual-row infinite marquee.
 * Phase 17b Pillar 4 P0.3 — env-gated kill. Wordmarks are fabricated
 * placeholder client names (Atlas Health / Northwind Capital / Lumen
 * Logistics / Vertex AI / etc.). Per the same brand-integrity rule that
 * killed the Sarah Chen / Marcus Thompson testimonials in Phase 13,
 * fabricated client surface area must not ship. Component returns null
 * unless NEXT_PUBLIC_MARQUEE_ENABLED === 'true'. Default unset → null.
 * Re-enable only when 13 real client logos are sourced + legal-cleared
 * for display.
 *
 * Mechanics (preserved for re-enable):
 *   Two horizontal rows of wordmarks, scrolling in opposite directions
 *   (Row 1: right→left, Row 2: left→right). ~45s per full loop. CSS-only
 *   via @keyframes marquee-left / marquee-right (defined in globals.css).
 *   Each row renders its wordmark array TWICE so the translateX(-50%)
 *   end-state seamlessly continues from the duplicate without a visible
 *   jump. Pause-on-hover + prefers-reduced-motion gate preserved.
 */
export function LogoStripSection() {
  if (process.env.NEXT_PUBLIC_MARQUEE_ENABLED !== 'true') {
    return null;
  }
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
