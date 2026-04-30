/**
 * Phase 19 nuke-lag — StatStripSection static rewrite.
 *
 * Count-up GSAP animation removed (was a ScrollTrigger that fired
 * a tween on enter). Numbers render in their final shape, server-
 * rendered, zero JS.
 *
 * Three metrics, mono-tabular, transparent over body atmosphere.
 * Bloomberg Operator restraint: deliberate emptiness around the strip
 * is the compositional signal, not the strip itself.
 */

const STATS: ReadonlyArray<{ value: string; label: string }> = [
  { value: '14.4K+', label: 'operator-hours replaced' },
  { value: '+89%', label: 'qualified pipeline' },
  { value: '60%', label: 'manual oversight automated' },
];

export function StatStripSection() {
  return (
    <section
      id="stat-strip"
      aria-label="Operator results"
      className="relative"
      style={{
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
    >
      <div className="container-wide" style={{ paddingInline: 'var(--container-gutter)' }}>
        <ul
          className="flex flex-col sm:flex-row flex-wrap items-start sm:items-baseline justify-center gap-x-10 gap-y-4 sm:gap-x-16"
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
                  fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)',
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
