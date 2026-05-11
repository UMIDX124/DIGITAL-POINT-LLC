import Link from 'next/link';

const pillars = [
  {
    index: '01',
    title: 'AI Agents',
    desc: 'Custom-trained agents that run repeatable knowledge work — CRM updates, lead routing, qualification, follow-up cadences.',
    href: '/agents',
  },
  {
    index: '02',
    title: 'Workflow Automation',
    desc: 'Replace manual handoffs across your stack. n8n + custom TypeScript + Postgres for production, not a Zapier shop.',
    href: '/automation',
  },
  {
    index: '03',
    title: 'Remote Operators',
    desc: 'Trained humans audit the edges where automation breaks. Not generic VAs — operators with workflow context.',
    href: '/operators',
  },
];

export function PillarsSection() {
  return (
    <section className="section section-divider" id="services">
      <div className="container-wide">
        <div className="section-header">
          <p className="eyebrow">Build · Three pillars</p>
          <h2 className="section-title text-balance">
            Or ship new agents from scratch.
          </h2>
          <p className="section-desc text-pretty">
            We deploy production AI agents and operate them for you. Three layers,
            same retainer, no platform license to manage.
          </p>
        </div>

        <div className="pillar-grid pillar-grid--three" style={{ marginBlockStart: '3rem' }}>
          {pillars.map((p) => (
            <article key={p.index} className="pillar-card">
              <span className="pillar-card__index">{p.index} · {p.title}</span>
              <h3 className="pillar-card__title">{p.title}</h3>
              <p className="pillar-card__desc">{p.desc}</p>
              <div className="pillar-card__link">
                <Link href={p.href} className="btn-link">Read the pillar</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PillarsSection;
