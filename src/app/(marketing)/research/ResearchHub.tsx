import Link from 'next/link';

const reports = [
  {
    slug: 'facebook-ads-benchmarks-2026',
    title: 'Facebook Ads Benchmarks 2026',
    description: 'CPC, CPM, CTR, and ROAS benchmarks across 12 industries. Updated with Q1 2026 data from $48M+ in tracked ad spend.',
    date: 'March 2026',
    readTime: '12 min read',
    stat: '12 Industries',
  },
  {
    slug: 'google-ads-roas-benchmarks',
    title: 'Google Ads ROAS Benchmarks by Industry',
    description: 'Search, Display, YouTube, and Performance Max ROAS benchmarks based on analysis of $62M in Google Ads spend.',
    date: 'February 2026',
    readTime: '14 min read',
    stat: '4 Campaign Types',
  },
  {
    slug: 'average-cac-by-industry',
    title: 'Average Customer Acquisition Cost by Industry',
    description: 'CAC benchmarks across 18 industries with breakdowns by company size, channel, and business model.',
    date: 'January 2026',
    readTime: '15 min read',
    stat: '18 Industries',
  },
  {
    slug: 'marketing-attribution-statistics',
    title: 'Marketing Attribution Statistics 2026',
    description: 'Attribution model adoption, tracking accuracy post-iOS 17, and the real impact of privacy changes on measurement.',
    date: 'March 2026',
    readTime: '11 min read',
    stat: '47 Data Points',
  },
  {
    slug: 'remote-workforce-cost-analysis',
    title: 'Remote Workforce Cost Analysis',
    description: 'US in-house team vs managed remote team cost comparison across marketing, engineering, and operations roles.',
    date: 'February 2026',
    readTime: '13 min read',
    stat: '8 Role Categories',
  },
];

export function ResearchHub() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Research · Original benchmarks · 2026</span>
          </div>

          <h1 className="hero-title text-balance">
            Marketing <span className="hero-title__amber">benchmarks</span>.<br />
            Built from real campaign data.
          </h1>

          <p className="hero-sub text-pretty">
            Five original research reports. Industry benchmarks, attribution truth,
            cost analysis. Built from real campaign data across hundreds of accounts
            and tens of millions in tracked ad spend.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
            <Link href="#reports" className="btn btn-ghost">See the reports</Link>
          </div>
        </div>
      </section>

      <section className="section section-divider" id="reports">
        <div className="container-wide">
          <div className="pillar-grid">
            {reports.map((r) => (
              <Link
                key={r.slug}
                href={`/research/${r.slug}`}
                className="pillar-card"
                style={{ textDecoration: 'none' }}
              >
                <span className="pillar-card__index">
                  {r.date} · {r.readTime}
                </span>
                <h3 className="pillar-card__title">{r.title}</h3>
                <p className="pillar-card__desc">{r.description}</p>
                <div className="pillar-card__link" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="tag-mono tag-mono--accent">{r.stat}</span>
                  <span className="btn-link">Read report</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Put these benchmarks to work</p>
            <h2 className="section-title text-balance">
              Free audit. We&apos;ll benchmark your metrics against the reports.
            </h2>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: 0 }}>
              <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResearchHub;
