export function MathSection() {
  return (
    <section className="section section-divider">
      <div className="container-wide">
        <div className="section-header">
          <p className="eyebrow">The math</p>
          <h2 className="section-title text-balance">
            $400K of in-house ops, replaced for $30K a year.
          </h2>
          <p className="section-desc text-pretty">
            A four-person ops stack costs $400K fully loaded. Our retainer covers the
            same coverage — agents handling the work, operators auditing the edges.
            Same outcome. 13× lower cost.
          </p>
        </div>

        <div className="math-row" style={{ marginBlockStart: '3rem' }}>
          <article className="math-tile">
            <span className="math-tile__label">In-house ops team · annual</span>
            <span className="math-tile__amount">$400,000</span>
            <p className="math-tile__detail">
              Ops Manager, Reporting Analyst, Lead Coordinator, QA Reviewer.
              $80–$100K base each, plus benefits, plus tooling, plus management overhead.
            </p>
          </article>

          <span className="math-arrow" aria-hidden="true">→</span>

          <article className="math-tile math-tile--accent">
            <span className="math-tile__label">DPL retainer · annual</span>
            <span className="math-tile__amount">$30,000</span>
            <p className="math-tile__detail">
              $2,500/month. AI agents do the work, operators audit, co-founders sign
              off. Real-time Slack visibility on every agent decision.
            </p>
          </article>
        </div>

        <p
          className="hero-microcopy"
          style={{ marginBlockStart: 'var(--space-8)', textAlign: 'center' }}
        >
          Math anchor only — sources: BLS, Glassdoor, Levels.fyi (US 2026 medians for the role mix)
        </p>
      </div>
    </section>
  );
}

export default MathSection;
