import { copy } from '@/lib/copy';

/**
 * Phase 2: Workflow SVG. Four-step lead lifecycle (Lead -> Scored -> Routed
 * -> Reported) rendered as a minimal hand-coded diagram. Paths and nodes
 * carry `data-workflow-*` attributes so ScrollMotion can draw them in on
 * scroll via stroke-dashoffset interpolation.
 */
export function WorkflowSection() {
  const { eyebrow, headline, body, steps } = copy.workflow;

  return (
    <section
      className="relative section-main"
      style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
      id="workflow"
    >
      <div className="container-wide">
        <header className="max-w-2xl mb-[var(--space-8)]">
          <p className="eyebrow mb-5" data-reveal>{eyebrow}</p>
          <h2 className="t-h2 font-display text-[color:var(--ivory)]" data-reveal>
            {headline}
          </h2>
          <p className="mt-5 t-main text-[color:var(--ivory-dim)] max-w-xl" data-reveal>
            {body}
          </p>
        </header>

        {/* SVG pipeline — horizontal on desktop, stacks below md */}
        <div className="relative" data-workflow>
          {/* Desktop SVG — 4 nodes on a horizontal axis */}
          <div className="hidden md:block">
            <svg
              viewBox="0 0 1200 220"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-auto"
              aria-hidden="true"
            >
              {/* Connector paths — drawn in by ScrollMotion */}
              {[
                { id: 'a', d: 'M 180 110 L 420 110' },
                { id: 'b', d: 'M 480 110 L 720 110' },
                { id: 'c', d: 'M 780 110 L 1020 110' },
              ].map((p) => (
                <path
                  key={p.id}
                  d={p.d}
                  stroke="var(--amber)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  data-workflow-path
                />
              ))}
              {/* Nodes */}
              {[150, 450, 750, 1050].map((cx, i) => (
                <g key={cx} data-workflow-node>
                  <circle cx={cx} cy="110" r="28" fill="var(--bg)" stroke="var(--amber)" strokeWidth="1.5" />
                  <circle cx={cx} cy="110" r="5" fill="var(--amber-bright)" />
                  <text
                    x={cx}
                    y="62"
                    fontSize="11"
                    fontFamily="var(--font-jetbrains-mono)"
                    fill="var(--muted)"
                    textAnchor="middle"
                    letterSpacing="1.5"
                  >
                    {steps[i].n}
                  </text>
                </g>
              ))}
            </svg>

            {/* Labels under each node */}
            <div className="mt-[var(--space-4)] grid grid-cols-4 gap-4">
              {steps.map((step) => (
                <div key={step.n} className="text-center" data-workflow-label>
                  <h3 className="font-display t-h5 text-[color:var(--ivory)]">
                    {step.label}
                  </h3>
                  <p className="mt-2 t-caption text-[color:var(--ivory-dim)] max-w-[20ch] mx-auto">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical stack */}
          <ol className="md:hidden divide-hairline">
            {steps.map((step) => (
              <li key={step.n} className="py-[var(--space-5)] flex gap-[var(--space-4)]" data-workflow-label>
                <span className="font-mono text-[12px] text-[color:var(--amber)] tracking-widest shrink-0 pt-1">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-display t-h5 text-[color:var(--ivory)]">
                    {step.label}
                  </h3>
                  <p className="mt-1.5 t-caption text-[color:var(--ivory-dim)]">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
