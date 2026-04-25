import { copy } from '@/lib/copy';

/**
 * Phase 4e Workflow diagram. Four-step lead lifecycle (Lead → Scored →
 * Routed → Reported). Horizontal on desktop, vertical stack on mobile.
 *
 * Connector paths draw left-to-right via stroke-dashoffset animation in
 * ScrollMotion. Node dots scale-in; labels fade-up. Data attributes
 * preserved for the existing GSAP timeline.
 */
export function WorkflowSection() {
  const { eyebrow, headline, body, steps } = copy.workflow;

  return (
    <section
      className="relative section-deferred"
      style={{
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
      id="workflow"
    >
      <div className="container-wide">
        <header className="max-w-2xl mb-[var(--section-space-tight)]">
          <p
            className="font-mono uppercase mb-5"
            data-reveal
            style={{
              fontSize: 'var(--text-micro)',
              letterSpacing: '0.12em',
              color: 'var(--text-tertiary)',
            }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-hero"
            data-reveal
            style={{
              fontSize: 'var(--text-h2)',
              color: 'var(--text-primary)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            {headline}
          </h2>
          <p
            className="mt-6 font-body max-w-xl"
            data-reveal
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
            }}
          >
            {body}
          </p>
        </header>

        <div className="relative" data-workflow>
          {/* Desktop horizontal diagram */}
          <div className="hidden md:block">
            <svg viewBox="0 0 1200 220" preserveAspectRatio="xMidYMid meet" className="w-full h-auto" aria-hidden="true">
              {[
                { id: 'a', d: 'M 180 110 L 420 110' },
                { id: 'b', d: 'M 480 110 L 720 110' },
                { id: 'c', d: 'M 780 110 L 1020 110' },
              ].map((p) => (
                <path
                  key={p.id}
                  d={p.d}
                  stroke="var(--accent)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  data-workflow-path
                />
              ))}
              {[150, 450, 750, 1050].map((cx, i) => (
                <g key={cx} data-workflow-node>
                  <circle cx={cx} cy="110" r="28" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="1.5" />
                  <circle cx={cx} cy="110" r="10" fill="var(--accent-bright)" opacity="0.25" />
                  <circle cx={cx} cy="110" r="6" fill="var(--accent-bright)" />
                  <text
                    x={cx}
                    y="62"
                    fontSize="11"
                    fontFamily="var(--font-mono)"
                    fill="var(--text-tertiary)"
                    textAnchor="middle"
                    letterSpacing="1.5"
                  >
                    {steps[i].n}
                  </text>
                </g>
              ))}
            </svg>

            <div className="mt-6 grid grid-cols-4 gap-4">
              {steps.map((step) => (
                <div key={step.n} className="text-center" data-workflow-label>
                  <h3
                    className="font-hero"
                    style={{
                      fontSize: 'var(--text-h5)',
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {step.label}
                  </h3>
                  <p
                    className="mt-2 font-body mx-auto"
                    style={{
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      maxWidth: '22ch',
                      lineHeight: 1.5,
                    }}
                  >
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile vertical list */}
          <ol className="md:hidden">
            {steps.map((step, i) => (
              <li
                key={step.n}
                className="py-6 flex gap-5"
                data-workflow-label
                style={{ borderBottom: i < steps.length - 1 ? '1px solid var(--border-subtle)' : undefined }}
              >
                <span
                  className="font-mono shrink-0 pt-1"
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent-bright)',
                    letterSpacing: '0.14em',
                  }}
                >
                  {step.n}
                </span>
                <div>
                  <h3
                    className="font-hero"
                    style={{
                      fontSize: 'var(--text-h5)',
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {step.label}
                  </h3>
                  <p
                    className="mt-2 font-body"
                    style={{
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
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
