import Link from 'next/link';

const pillars = [
  {
    num: '01 · Agents',
    title: 'Production AI agents',
    desc: 'Custom-trained agents that run repeatable knowledge work. CRM updates, lead routing, qualification, follow-up cadences. Operator-audited edges.',
    receipts: '~Replaces $200K of headcount',
    href: '/agents',
  },
  {
    num: '02 · Automation',
    title: 'Workflow handoffs',
    desc: 'Replace manual handoffs across your stack. n8n + custom TypeScript + Postgres for production pipelines. Not a Zapier shop, not a Make rebadger.',
    receipts: '~60s lead-to-CRM end-to-end',
    href: '/automation',
  },
  {
    num: '03 · Operators',
    title: 'Remote operators',
    desc: 'Vetted humans audit the edges where automation breaks. Live in your Slack on day one. Not generic VAs, not offshore data-entry farms.',
    receipts: '~<6h escalation response',
    href: '/operators',
  },
];

export function PillarsSection() {
  return (
    <section className="dpl-section dpl-section--pillars" id="services">
      <div className="dpl-section__rail" aria-hidden="true">
        <span className="dpl-section__rail-label">Section 04 · Pillars</span>
      </div>
      <div className="dpl-section__page" aria-hidden="true">p.04 / p.09</div>
      <div className="dpl-section__inner">
        <header className="dpl-pillars__head">
          <div>
            <p className="dpl-eyebrow">
              <span className="dpl-eyebrow__rule" aria-hidden="true" />
              Four pillars
            </p>
            <h2 className="dpl-pillars__title">Three services we ship. One recovery practice.</h2>
          </div>
          <p className="dpl-pillars__index" aria-hidden="true">P.04 · Pillars 01 to 04</p>
        </header>

        <div className="dpl-pillars__grid">
          {pillars.map((p) => (
            <Link key={p.num} href={p.href} className="dpl-pillar">
              <span className="dpl-pillar__num">{p.num}</span>
              <h3 className="dpl-pillar__title">{p.title}</h3>
              <p className="dpl-pillar__desc">{p.desc}</p>
              <p className="dpl-pillar__receipts" data-design-only="true">{p.receipts}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PillarsSection;
