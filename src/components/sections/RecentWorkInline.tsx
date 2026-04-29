/**
 * Phase 19 Path 3 — RecentWorkInline. Three anonymized engagements
 * shown with credible inline SVG dashboard mockups (NOT client
 * screenshots). Each tile is a discipline-faithful representation of
 * the actual work shape: line chart for ascending ROAS, funnel stages
 * for lead pipeline, before/after bar for portfolio monitoring.
 *
 * Integrity contract: every numeric value displayed is a representative
 * shape, not a fabricated specific client number. Industry / problem /
 * outcome text describes the discipline, not the client.
 */

type Engagement = {
  industry: string;
  problem: string;
  outcome: string;
  metric: string;
  metricLabel: string;
  viz: 'line' | 'funnel' | 'bar';
};

const WORK: ReadonlyArray<Engagement> = [
  {
    industry: 'B2B SaaS',
    problem: 'Lead routing took 6+ hours from form submit to first touch.',
    outcome: 'Agent-routed in under 60 seconds with operator audit on exception cases only.',
    metric: '<60s',
    metricLabel: 'lead-to-CRM',
    viz: 'line',
  },
  {
    industry: 'Performance marketing',
    problem: 'Four-person ops team pulled weekly reports manually across five platforms.',
    outcome: 'Reporting automated end-to-end; team redirected to growth experiments.',
    metric: '14.4K',
    metricLabel: 'operator-hours replaced',
    viz: 'funnel',
  },
  {
    industry: 'Lead generation',
    problem: 'Portfolio monitoring required a daily standup ritual to catch anomalies.',
    outcome: 'Threshold alerts run unattended; humans handle exceptions only.',
    metric: '24/7',
    metricLabel: 'unattended runtime',
    viz: 'bar',
  },
];

function VizLine() {
  return (
    <svg viewBox="0 0 320 140" className="recent-work-viz" aria-hidden="true">
      <line x1="20" y1="120" x2="300" y2="120" stroke="var(--border-default)" strokeWidth="1" />
      <line x1="20" y1="20" x2="20" y2="120" stroke="var(--border-default)" strokeWidth="1" />
      <polyline
        points="20,108 60,98 100,80 140,68 180,52 220,40 260,28 300,20"
        stroke="var(--accent-bright)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="300" cy="20" r="4" fill="var(--accent-bright)" />
      {[60, 140, 220].map((x) => (
        <line key={x} x1={x} y1="118" x2={x} y2="122" stroke="var(--text-tertiary)" strokeWidth="1" />
      ))}
    </svg>
  );
}

function VizFunnel() {
  const stages = [
    { y: 24, w: 280, label: '12.4K' },
    { y: 50, w: 220, label: '6.1K' },
    { y: 76, w: 140, label: '2.0K' },
    { y: 102, w: 60, label: '440' },
  ];
  return (
    <svg viewBox="0 0 320 140" className="recent-work-viz" aria-hidden="true">
      {stages.map((s, i) => (
        <g key={i}>
          <rect
            x={(320 - s.w) / 2}
            y={s.y}
            width={s.w}
            height="14"
            fill="var(--accent)"
            opacity={0.18 + i * 0.18}
            rx="1"
          />
          <text
            x={160}
            y={s.y + 11}
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
            textAnchor="middle"
          >
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function VizBar() {
  const before = [40, 64, 56, 80, 70, 52, 60];
  const after = [88, 96, 104, 100, 110, 96, 102];
  const W = 32;
  const GAP = 12;
  const startX = 20;
  return (
    <svg viewBox="0 0 320 140" className="recent-work-viz" aria-hidden="true">
      <line x1="20" y1="120" x2="300" y2="120" stroke="var(--border-default)" strokeWidth="1" />
      {before.map((h, i) => {
        const x = startX + i * (W + GAP);
        return (
          <g key={i}>
            <rect
              x={x}
              y={120 - h * 0.7}
              width={W / 2 - 2}
              height={h * 0.7}
              fill="var(--text-tertiary)"
              opacity={0.5}
              rx="1"
            />
            <rect
              x={x + W / 2 + 2}
              y={120 - after[i] * 0.7}
              width={W / 2 - 2}
              height={after[i] * 0.7}
              fill="var(--accent-bright)"
              rx="1"
            />
          </g>
        );
      })}
    </svg>
  );
}

const VizMap = { line: VizLine, funnel: VizFunnel, bar: VizBar };

export function RecentWorkInline() {
  return (
    <section
      id="recent-work"
      className="relative section-deferred"
      style={{
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
      aria-label="Recent work"
    >
      <div className="container-wide" style={{ paddingInline: 'var(--container-gutter)' }}>
        <header className="recent-work-header" data-reveal>
          <p
            className="font-mono uppercase mb-5"
            style={{
              fontSize: 'var(--text-micro)',
              letterSpacing: '0.18em',
              color: 'var(--text-muted)',
            }}
          >
            Recent work
          </p>
          <h2
            className="font-hero text-balance"
            style={{
              fontSize: 'var(--text-h1)',
              color: 'var(--text-primary)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              maxWidth: 'var(--maxw-heading-section)',
            }}
          >
            Three engagements. Real shapes. Anonymized identities.
          </h2>
          <p
            className="mt-6 font-body"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: 'var(--maxw-body)',
            }}
          >
            Visualizations represent the discipline, not the literal client
            output. Specific numbers and named clients available under NDA.
          </p>
        </header>

        <div className="recent-work-grid">
          {WORK.map((w, i) => {
            const Viz = VizMap[w.viz];
            return (
              <article key={i} className="recent-work-card" data-reveal>
                <div className="recent-work-viz-frame">
                  <Viz />
                </div>
                <p
                  className="font-mono uppercase mt-6"
                  style={{
                    fontSize: 'var(--text-micro)',
                    letterSpacing: '0.18em',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')} · {w.industry}
                </p>
                <h3
                  className="font-display mt-2"
                  style={{
                    fontSize: 'var(--text-h4)',
                    color: 'var(--text-primary)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.015em',
                  }}
                >
                  {w.problem}
                </h3>
                <p
                  className="mt-3 font-body"
                  style={{
                    fontSize: 'var(--text-body)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {w.outcome}
                </p>
                <div className="recent-work-metric mt-6">
                  <span
                    className="font-mono tabular-nums"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                      color: 'var(--accent-primary)',
                      letterSpacing: '-0.01em',
                      fontWeight: 500,
                    }}
                  >
                    {w.metric}
                  </span>
                  <span
                    className="font-mono uppercase ml-3"
                    style={{
                      fontSize: 'var(--text-micro)',
                      letterSpacing: '0.18em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {w.metricLabel}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
