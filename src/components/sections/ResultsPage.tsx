import Link from 'next/link';

const composites = [
  {
    industry: 'B2B SaaS · Ops Automation',
    metric: '14.4K',
    metricLabel: 'Operator-hours replaced',
    body: 'Agent stack covering lead routing, sales follow-up, CRM enrichment, and weekly reporting. Replaced the work of six full-time ops roles with AI workflows and two reviewers.',
  },
  {
    industry: 'B2B SaaS · Lead Operations',
    metric: '+89%',
    metricLabel: 'Qualified pipeline',
    body: 'Consolidated lead sources, built AI routing + enrichment + adaptive follow-up. Sales stopped chasing bad leads. Team shrank from four reviewers to one auditing AI output.',
  },
  {
    industry: 'Portfolio Ops · 24/7 Monitoring',
    metric: '60%',
    metricLabel: 'Manual oversight automated',
    body: 'Replaced a daily-standup ritual with an agent stack monitoring 40+ accounts. Threshold alerts, anomaly detection, weekly narrative reports run unattended.',
  },
];

export function ResultsPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Results · Operational composites · Real engagements</span>
          </div>

          <h1 className="hero-title text-balance">
            What our <span className="hero-title__amber">agents</span> ship.
          </h1>

          <p className="hero-sub text-pretty">
            Three composite engagements representative of the agent stacks we run today.
            Client identifiers redacted at engagement request. Real production
            workflows, real measured outcomes, real operator coverage behind the
            numbers.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
            <Link href="/case-studies" className="btn btn-ghost">See case studies</Link>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="pillar-grid pillar-grid--three">
            {composites.map((c) => (
              <article key={c.metric} className="pillar-card">
                <span className="pillar-card__index">{c.industry}</span>
                <h3
                  className="font-mono"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    fontWeight: 600,
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                    letterSpacing: '-0.025em',
                  }}
                >
                  {c.metric}
                </h3>
                <p
                  className="font-mono"
                  style={{
                    color: 'var(--color-text-tertiary)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {c.metricLabel}
                </p>
                <p className="pillar-card__desc">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Let&rsquo;s start with the audit</p>
            <h2 className="section-title text-balance">
              Free 45 minutes. Written deployment plan in 5 days.
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

export default ResultsPage;
