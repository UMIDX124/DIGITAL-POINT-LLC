const steps = [
  {
    num: '01 · Audit',
    title: 'Free, written plan in 5 days',
    desc: 'Co-founder review of your stack, attribution, team, funnel. Deployment-ready blueprint, no retainer attached. If we can\'t help, we\'ll tell you.',
    price: 'Free',
  },
  {
    num: '02 · Pilot',
    title: '30 days, one workflow scoped',
    desc: 'We scope, build, and operate one workflow for 30 days. You own the runbooks. Real-time Slack channel on day one.',
    price: '$2,500 fixed',
  },
  {
    num: '03 · Retainer',
    title: 'Production operations',
    desc: 'Continuous operation of the workflow portfolio. Replacements, updates, monitoring, monthly written report. Cancel any month.',
    price: '$2,500 / month',
  },
];

export function ProcessSection() {
  return (
    <section className="section section-divider" id="process">
      <div className="container-wide">
        <div className="section-header">
          <p className="eyebrow">How an engagement runs</p>
          <h2 className="section-title text-balance">
            Audit, pilot, retainer. In that order. No surprise scope.
          </h2>
        </div>

        <div className="process-list process-list--three" style={{ marginBlockStart: '3rem' }}>
          {steps.map((s) => (
            <div key={s.num} className="process-step">
              <span className="process-step__num">{s.num}</span>
              <h4 className="process-step__title">{s.title}</h4>
              <p className="process-step__desc">{s.desc}</p>
              <p className="process-step__price">{s.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
