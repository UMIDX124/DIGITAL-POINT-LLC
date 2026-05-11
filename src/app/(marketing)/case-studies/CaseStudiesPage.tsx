import Link from 'next/link';
import { caseStudies } from '@/lib/case-studies';

export function CaseStudiesPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Case studies · Composites · Real engagements</span>
          </div>

          <h1 className="hero-title text-balance">
            AI deployments that <span className="hero-title__amber">speak</span> for themselves.
          </h1>

          <p className="hero-sub text-pretty">
            Real agent stacks. Measured outcomes. The figures below are operational
            composites pending fresh client-cleared attribution. Specific named-client
            metrics surface after NDA review only.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
            <Link href="/recovery" className="btn btn-ghost">Recovery service</Link>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <aside
            role="note"
            aria-label="Case study disclosure"
            style={{
              marginBlockEnd: '2rem',
              padding: '1.25rem 1.5rem',
              border: '1px solid var(--color-line-faint)',
              borderInlineStartWidth: '3px',
              borderInlineStartColor: 'var(--color-accent)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-canvas)',
            }}
          >
            <p
              className="font-mono"
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
              }}
            >
              Disclosure
            </p>
            <p
              style={{
                marginBlockStart: '0.5rem',
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.6,
              }}
            >
              Composite case studies. Metrics drawn from real DPL engagements. Client names withheld under NDA. Named-client references available on request after a discovery call.
            </p>
          </aside>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {caseStudies.map((study, i) => (
              <article
                key={study.slug}
                className="surface"
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                  display: 'grid',
                  gap: '1.5rem',
                }}
              >
                <header
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    paddingBlockEnd: '1.25rem',
                    borderBlockEnd: '1px solid var(--color-line-faint)',
                  }}
                >
                  <div>
                    <p
                      className="font-mono"
                      style={{
                        fontSize: '0.6875rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'var(--color-accent)',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')} · {study.industry}
                    </p>
                    <h2
                      className="font-display"
                      style={{
                        marginBlockStart: '0.5rem',
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {study.title}
                    </h2>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p
                      className="font-mono"
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 600,
                        color: 'var(--color-accent)',
                        lineHeight: 1,
                      }}
                    >
                      {study.highlightMetric}
                    </p>
                    <p
                      className="font-mono"
                      style={{
                        marginBlockStart: '0.25rem',
                        fontSize: '0.6875rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-tertiary)',
                      }}
                    >
                      {study.highlightLabel}
                    </p>
                  </div>
                </header>

                <div
                  style={{
                    display: 'grid',
                    gap: '1.5rem',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
                  }}
                >
                  <div>
                    <p
                      className="font-mono"
                      style={{
                        fontSize: '0.6875rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-tertiary)',
                      }}
                    >
                      Problem
                    </p>
                    <p
                      style={{
                        marginBlockStart: '0.5rem',
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--text-sm)',
                        lineHeight: 1.6,
                      }}
                    >
                      {study.problem}
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-mono"
                      style={{
                        fontSize: '0.6875rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-tertiary)',
                      }}
                    >
                      Strategy
                    </p>
                    <p
                      style={{
                        marginBlockStart: '0.5rem',
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--text-sm)',
                        lineHeight: 1.6,
                      }}
                    >
                      {study.strategy}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gap: '1px',
                    gridTemplateColumns: `repeat(${study.results.length}, 1fr)`,
                    background: 'var(--color-line-faint)',
                    border: '1px solid var(--color-line-faint)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                  }}
                >
                  {study.results.map((r) => (
                    <div
                      key={r.label}
                      style={{
                        background: 'var(--color-canvas)',
                        padding: '1rem 1.25rem',
                      }}
                    >
                      <p
                        className="font-mono"
                        style={{
                          fontSize: 'var(--text-md)',
                          fontWeight: 600,
                          color: 'var(--color-accent)',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {r.value}
                      </p>
                      <p
                        className="font-mono"
                        style={{
                          marginBlockStart: '0.25rem',
                          fontSize: '0.6875rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--color-text-tertiary)',
                        }}
                      >
                        {r.label}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Your turn</p>
            <h2 className="section-title text-balance">
              Free 45-minute audit. Written deployment plan in 5 days.
            </h2>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: 0 }}>
              <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
              <Link href="/recovery" className="btn btn-ghost">Recover a broken agent</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CaseStudiesPage;
