import Link from 'next/link';

const tools = [
  {
    slug: 'roas-calculator',
    title: 'ROAS Calculator',
    description: 'Calculate Return on Ad Spend instantly. Compare platform-reported vs blended ROAS so you stop budgeting against inflated numbers.',
    tags: ['Paid Ads', 'ROI'],
  },
  {
    slug: 'cac-calculator',
    title: 'CAC Calculator',
    description: 'Customer acquisition cost across channels. Find which acquisition source is funding which segment.',
    tags: ['Unit Economics', 'Growth'],
  },
  {
    slug: 'ad-spend-profit-calculator',
    title: 'Ad Spend Profit Calculator',
    description: 'Model profitability at different ad spend levels. Find the optimal budget before you scale.',
    tags: ['Budget', 'Profitability'],
  },
  {
    slug: 'attribution-model-visualizer',
    title: 'Attribution Model Visualizer',
    description: 'First-click, last-click, linear, time-decay, position-based. Compared side by side on your data.',
    tags: ['Attribution', 'Analytics'],
  },
  {
    slug: 'dashboard-cost-calculator',
    title: 'Dashboard Cost Calculator',
    description: 'Build vs buy comparison for marketing analytics dashboards. Burdened cost in three scenarios.',
    tags: ['Reporting', 'Systems'],
  },
];

export function ToolsHub() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Free tools · No sign-up · No email gate</span>
          </div>

          <h1 className="hero-title text-balance">
            Marketing <span className="hero-title__amber">calculators</span>.<br />
            Built for operators.
          </h1>

          <p className="hero-sub text-pretty">
            Five interactive tools to stress-test your marketing math. Calculate ROAS,
            CAC, profitability, attribution, and dashboard cost. Answers in your
            browser, no account required.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="dpl-btn dpl-btn--ink">
              Book a free audit
            </Link>
            <Link href="#tools" className="dpl-btn dpl-btn--ghost">
              See the tools
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-divider" id="tools">
        <div className="container-wide">
          <div className="pillar-grid pillar-grid--three">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="pillar-card"
                style={{ textDecoration: 'none' }}
              >
                <span className="pillar-card__index">Tool · {t.tags[0]}</span>
                <h3 className="pillar-card__title">{t.title}</h3>
                <p className="pillar-card__desc">{t.description}</p>
                <div className="pillar-card__link">
                  <span className="btn-link">Open tool</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Need a custom system</p>
            <h2 className="section-title text-balance">
              Free 45-minute audit. Custom dashboards and attribution systems.
            </h2>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: 0 }}>
              <Link href="/audit" className="dpl-btn dpl-btn--ink">Book a free audit</Link>
              <Link href="/stack" className="dpl-btn dpl-btn--ghost">See the stack</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ToolsHub;
