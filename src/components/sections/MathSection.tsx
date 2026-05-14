import { CountUp } from '@/components/motion/CountUp';
import { DataBar } from '@/components/brand/DataBar';

export function MathSection() {
  return (
    <section className="section section-divider dpl-section">
      <div className="dpl-section__rail" aria-hidden="true">
        <span className="dpl-section__rail-label">Section 07 · The math</span>
      </div>
      <div className="dpl-section__page" aria-hidden="true">p.07 / p.09</div>
      <div className="container-wide">
        <div className="section-header">
          <p className="eyebrow">The math</p>
          <h2 className="section-title section-title--minor text-balance">
            $400K of in-house ops, replaced for $30K a year.
          </h2>
          <p className="section-desc text-pretty">
            A four-person ops stack costs $400K fully loaded. Our retainer covers the
            same coverage. Agents handle the work, operators audit the edges. Same
            outcome. 13× lower cost.
          </p>
        </div>

        <div className="math-row" style={{ marginBlockStart: '3rem' }}>
          <article className="math-tile">
            <span className="math-tile__label">In-house ops team · annual</span>
            <span className="math-tile__amount">
              <CountUp to={400000} prefix="$" index={0} />
            </span>
            <p className="math-tile__detail">
              Ops Manager, Reporting Analyst, Lead Coordinator, QA Reviewer.
              $80–$100K base each, plus benefits, plus tooling, plus management overhead.
            </p>
          </article>

          <div className="math-bar" aria-hidden="true">
            <DataBar
              values={[
                { label: 'In-house ops · annual', amount: 400000, accent: false },
                { label: 'DPL retainer · annual', amount: 30000, accent: true },
              ]}
              format="usd"
            />
          </div>

          <article className="math-tile math-tile--accent">
            <span className="math-tile__label">DPL retainer · annual</span>
            <span className="math-tile__amount">
              <CountUp to={30000} prefix="$" index={1} />
            </span>
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
          Math anchor only. Sources: BLS, Glassdoor, Levels.fyi (US 2026 medians for the role mix).
        </p>
      </div>
    </section>
  );
}

export default MathSection;
