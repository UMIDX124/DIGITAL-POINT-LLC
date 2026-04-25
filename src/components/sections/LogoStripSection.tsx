import { copy } from '@/lib/copy';

/**
 * Phase 4d illustrative logo strip — muted wordmarks on the slightly darker
 * tertiary bg. Label clarifies they are representative client types.
 */

export function LogoStripSection() {
  const { label, marks } = copy.logoStrip;

  return (
    <section
      className="relative section-deferred"
      style={{
        background: 'var(--bg-tertiary)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'var(--section-space-tight)',
        paddingBottom: 'var(--section-space-tight)',
      }}
      aria-label="Representative client types"
      data-stagger-group
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
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {marks.map((mark) => (
            <li
              key={mark}
              className="font-mono uppercase transition-colors select-none"
              data-stagger-item
              style={{
                fontSize: '0.875rem',
                letterSpacing: '0.15em',
                color: 'var(--text-tertiary)',
                transitionDuration: 'var(--dur-short)',
                transitionTimingFunction: 'var(--ease-out-soft)',
              }}
            >
              <span className="logo-mark">{mark}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
