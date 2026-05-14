export function HomeEvidence() {
  return (
    <section className="dpl-section dpl-section--evidence" aria-label="One number that closes most audits">
      <div className="dpl-section__rail" aria-hidden="true">
        <span className="dpl-section__rail-label">Section 02 · The case</span>
      </div>
      <div className="dpl-section__page" aria-hidden="true">p.02 / p.09</div>
      <div className="dpl-section__inner">
        <div className="dpl-evidence__grid">
          <div className="dpl-evidence__left">
            <p className="dpl-eyebrow">
              <span className="dpl-eyebrow__rule" aria-hidden="true" />
              The case
            </p>
            <h2 className="dpl-evidence__title">One number that closes most audits.</h2>
            <p className="dpl-evidence__body">
              In-house operations is a four-person team line item. We replace the headcount with a small stack of agents, audited by an operator. Same output. Different invoice.
            </p>
            <p className="dpl-evidence__source" data-design-only="true">
              Source · 6 active retainers · Trailing 12m average · 2026.05.14
            </p>
          </div>
          <div className="dpl-evidence__right">
            <div className="dpl-evidence__number" aria-label="Four hundred thousand dollars per year drops to thirty thousand dollars per year">
              <span className="dpl-evidence__before">$400K</span>
              <span className="dpl-evidence__arrow" aria-hidden="true">→</span>
              <span className="dpl-evidence__after">$30K</span>
            </div>
            <p className="dpl-evidence__caption">In-house ops cost → DPL retainer, annual</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeEvidence;
