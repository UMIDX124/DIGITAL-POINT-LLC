/**
 * Phase 17b 3-reversal R3 — compressed instrument-panel stat strip.
 *
 * Replaces the full RecentWorkSection (chart + 3 stat cards + verbose
 * explanatory copy + multi-row layout) with a single horizontal row of 3
 * metrics. No section header, no chart, no border, no background — reads
 * as terminal telemetry, not case-study marketing.
 *
 * Numerals in --accent-primary, body in --text-muted, monospace tabular
 * (font-feature 'tnum' inherited via .tabular-nums utility / .font-mono).
 *
 * Bloomberg Operator restraint: deliberate emptiness around the strip
 * is the compositional signal, not the strip itself.
 */

const STATS: ReadonlyArray<{ value: string; label: string }> = [
  { value: '14.4K', label: 'operator-hours replaced' },
  { value: '+89%',  label: 'qualified pipeline' },
  { value: '60%',   label: 'manual oversight automated' },
];

export function StatStripSection() {
  return (
    <section
      id="stat-strip"
      aria-label="Operator results"
      className="relative section-deferred"
      style={{
        background: 'var(--bg-canvas)',
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
    >
      <div className="container-wide" style={{ paddingInline: 'var(--container-gutter)' }}>
        {/* Phase 17b Pillar 5 R6 — flex gap scales clamp(2rem, 4vw, 4rem)
            at ≥640px; mobile <640px stacks vertically with 1.5rem gap. */}
        <ul
          className="stat-strip-list flex flex-col sm:flex-row flex-wrap items-start sm:items-baseline justify-center"
          style={{ listStyle: 'none', margin: 0, padding: 0 }}
        >
          {STATS.map((s, i) => (
            <li
              key={s.label}
              className="flex items-baseline gap-3"
              aria-label={`${s.value} ${s.label}`}
            >
              <span
                className="font-mono tabular-nums"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  color: 'var(--accent-primary)',
                  letterSpacing: '-0.01em',
                  fontWeight: 500,
                }}
              >
                {s.value}
              </span>
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: 'var(--text-micro)',
                  letterSpacing: '0.18em',
                  color: 'var(--text-muted)',
                }}
              >
                {s.label}
              </span>
              {i < STATS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden sm:inline-block"
                  style={{ color: 'var(--text-tertiary)', opacity: 0.4 }}
                >
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
