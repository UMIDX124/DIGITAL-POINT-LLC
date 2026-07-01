import Link from 'next/link';

const pillars = [
  {
    num: '01 · Growth',
    title: 'Growth & Visibility',
    desc: 'Automate your technical SEO, GMB rankings, citation directory syncs, and tailored social media publishing workflows.',
    receipts: 'All-in-One Suite · $1,150/mo',
    href: '/pricing#growth-suite',
  },
  {
    num: '02 · Agents',
    title: 'Production AI agents',
    desc: 'Custom-trained agents that run repeatable knowledge work. CRM updates, lead routing, qualification, follow-up cadences. Operator-audited edges.',
    receipts: '~Replaces $200K of headcount',
    href: '/agents',
  },
  {
    num: '03 · Automation',
    title: 'Workflow handoffs',
    desc: 'Replace manual handoffs across your stack. n8n + custom TypeScript + Postgres for production pipelines. Not a Zapier shop, not a Make rebadger.',
    receipts: '~60s lead-to-CRM end-to-end',
    href: '/automation',
  },
  {
    num: '04 · Operators',
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
            <h2 className="dpl-pillars__title">Four services we ship. One recovery practice.</h2>
          </div>
          <p className="dpl-pillars__index" aria-hidden="true">P.04 · Pillars 01 to 04</p>
        </header>

        <div className="dpl-pillars__grid">
          {pillars.map((p) => {
            const isFeatured = p.num.includes('01');
            return (
              <Link
                key={p.num}
                href={p.href}
                className={`dpl-pillar${isFeatured ? ' dpl-pillar--featured' : ''}`}
              >
                {isFeatured && (
                  <span className="dpl-pillar__featured-tag">Featured</span>
                )}
                <span className="dpl-pillar__num">{p.num}</span>
                <h3 className="dpl-pillar__title">{p.title}</h3>
                <p className="dpl-pillar__desc">{p.desc}</p>
                <p className="dpl-pillar__receipts" data-design-only="true">{p.receipts}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        /* Highlight the featured Growth pillar */
        .dpl-pillar--featured {
          background: rgba(255, 136, 0, 0.03) !important;
          box-shadow: inset 0 0 0 1px rgba(255, 136, 0, 0.22) !important;
          z-index: 1 !important;
        }

        .dpl-pillar--featured::before {
          opacity: 1 !important;
          width: 3px !important;
        }

        .dpl-pillar--featured:hover {
          background: rgba(255, 136, 0, 0.06) !important;
        }

        .dpl-pillar__featured-tag {
          position: absolute !important;
          top: 1.875rem !important;
          right: 1.75rem !important;
          font-family: var(--font-mono), monospace !important;
          font-size: 9px !important;
          font-weight: 700 !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          color: var(--color-accent-text) !important;
          background: rgba(255, 136, 0, 0.08) !important;
          border: 1px solid rgba(255, 136, 0, 0.18) !important;
          padding: 0.15rem 0.4rem !important;
          border-radius: 2px !important;
        }
      `}</style>
    </section>
  );
}

export default PillarsSection;
