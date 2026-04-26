'use client';

/**
 * Phase 17b 3-restructured H2 — Digital Point vs Traditional Agency vs
 * In-house Team comparison table.
 *
 * Bloomberg Operator compliance: bg --bg-canvas, hairline borders, NO
 * gradients (per zero-gradient canon); Digital Point column gets a subtle
 * amber accent on the header + left/right borders only.
 *
 * Animation: IntersectionObserver triggers a stagger reveal of cells when
 * the section enters viewport (≥30%). NO GSAP ScrollTrigger (avoids the
 * scroll-feel regression class that Pillar 5 is mid-resolution on).
 *
 * Cost row excluded per X5 (pricing not disclosed).
 */

import { useEffect, useRef, useState } from 'react';
import { Check, X as XIcon } from 'lucide-react';

type Cell = { kind: 'check' } | { kind: 'cross' } | { kind: 'partial' } | { kind: 'text'; value: string };

const ROWS: ReadonlyArray<{ label: string; dpl: Cell; agency: Cell; inhouse: Cell }> = [
  {
    label: 'Setup time',
    dpl: { kind: 'text', value: '5 days' },
    agency: { kind: 'text', value: '4–6 weeks' },
    inhouse: { kind: 'text', value: '3–6 months' },
  },
  {
    label: '24/7 operation',
    dpl: { kind: 'check' },
    agency: { kind: 'cross' },
    inhouse: { kind: 'cross' },
  },
  {
    label: 'AI + human hybrid',
    dpl: { kind: 'check' },
    agency: { kind: 'cross' },
    inhouse: { kind: 'partial' },
  },
  {
    label: 'Co-founder access',
    dpl: { kind: 'check' },
    agency: { kind: 'cross' },
    inhouse: { kind: 'text', value: 'N/A' },
  },
  {
    label: 'Scalability',
    dpl: { kind: 'text', value: 'Instant' },
    agency: { kind: 'text', value: 'Slow' },
    inhouse: { kind: 'text', value: 'Hire cycle' },
  },
] as const;

function CellRender({ cell }: { cell: Cell }) {
  if (cell.kind === 'check') {
    return (
      <span aria-label="Yes" className="inline-flex">
        <Check size={18} style={{ color: 'var(--accent-primary)' }} aria-hidden="true" />
      </span>
    );
  }
  if (cell.kind === 'cross') {
    return (
      <span aria-label="No" className="inline-flex">
        <XIcon size={18} style={{ color: 'var(--text-tertiary)' }} aria-hidden="true" />
      </span>
    );
  }
  if (cell.kind === 'partial') {
    return (
      <span style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>Partial</span>
    );
  }
  return <span style={{ color: 'var(--text-primary)', fontSize: '14px' }}>{cell.value}</span>;
}

export function ComparisonTable() {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setRevealed(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="compare"
      className="relative section-deferred"
      style={{
        background: 'var(--bg-canvas)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
      aria-label="How Digital Point compares to a traditional agency or in-house team"
    >
      <div className="container-narrow">
        <header className="max-w-3xl mb-14">
          <p
            className="font-mono uppercase mb-5"
            style={{
              fontSize: 'var(--text-micro)',
              letterSpacing: '0.18em',
              color: 'var(--text-tertiary)',
            }}
          >
            HOW WE STACK UP
          </p>
          <h2
            className="font-display text-balance"
            style={{
              fontSize: 'var(--text-h1)',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: 'var(--maxw-heading-section)',
            }}
          >
            Digital Point vs Traditional Agency vs In-house Team.
          </h2>
        </header>

        <div className="overflow-x-auto">
          <table
            className="w-full min-w-[560px]"
            style={{ borderCollapse: 'collapse' }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <th
                  className="text-left py-4 font-mono uppercase"
                  style={{
                    fontSize: 'var(--text-micro)',
                    letterSpacing: '0.18em',
                    color: 'var(--text-tertiary)',
                    fontWeight: 500,
                  }}
                >
                  &nbsp;
                </th>
                <th
                  className="text-left py-4 font-display"
                  style={{
                    fontSize: '15px',
                    color: 'var(--accent-primary)',
                    fontWeight: 600,
                    borderLeft: '1px solid color-mix(in srgb, var(--accent-primary) 30%, transparent)',
                    borderRight: '1px solid color-mix(in srgb, var(--accent-primary) 30%, transparent)',
                    paddingLeft: '1.25rem',
                    paddingRight: '1.25rem',
                  }}
                >
                  Digital Point
                </th>
                <th
                  className="text-left py-4 font-display"
                  style={{
                    fontSize: '15px',
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    paddingLeft: '1.25rem',
                  }}
                >
                  Traditional Agency
                </th>
                <th
                  className="text-left py-4 font-display"
                  style={{
                    fontSize: '15px',
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    paddingLeft: '1.25rem',
                  }}
                >
                  In-house Team
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.label}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? 'translateY(0)' : 'translateY(8px)',
                    transition: `opacity 320ms ease-out ${i * 70}ms, transform 320ms ease-out ${i * 70}ms`,
                  }}
                >
                  <td
                    className="py-4"
                    style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {row.label}
                  </td>
                  <td
                    className="py-4"
                    style={{
                      borderLeft: '1px solid color-mix(in srgb, var(--accent-primary) 30%, transparent)',
                      borderRight: '1px solid color-mix(in srgb, var(--accent-primary) 30%, transparent)',
                      paddingLeft: '1.25rem',
                      paddingRight: '1.25rem',
                    }}
                  >
                    <CellRender cell={row.dpl} />
                  </td>
                  <td className="py-4" style={{ paddingLeft: '1.25rem' }}>
                    <CellRender cell={row.agency} />
                  </td>
                  <td className="py-4" style={{ paddingLeft: '1.25rem' }}>
                    <CellRender cell={row.inhouse} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
