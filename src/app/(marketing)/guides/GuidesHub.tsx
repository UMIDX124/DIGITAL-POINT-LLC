import Link from 'next/link';
import type { Guide } from '@/lib/guides';

export function GuidesHub({ guides }: { guides: Guide[] }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Guides · Field notes from production</span>
          </div>

          <h1 className="hero-title text-balance">
            Marketing <span className="hero-title__amber">playbooks</span>.<br />
            Built from real engagements.
          </h1>

          <p className="hero-sub text-pretty">
            In-depth guides covering attribution, paid acquisition, CAC and ROAS
            optimization, analytics, and the operating model behind running a
            production growth stack. Pulled directly from work we do for clients.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="dpl-btn dpl-btn--ink">Book a free audit</Link>
            <Link href="#guides" className="dpl-btn dpl-btn--ghost">See the guides</Link>
          </div>
        </div>
      </section>

      <section className="section section-divider" id="guides">
        <div className="container-wide">
          <div className="pillar-grid">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="pillar-card"
                style={{ textDecoration: 'none' }}
              >
                <span className="pillar-card__index">{g.readTime} · Guide</span>
                <h3 className="pillar-card__title">{g.title}</h3>
                <p className="pillar-card__desc">{g.description}</p>
                <div className="pillar-card__link">
                  <span className="btn-link">Read guide</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Want a custom playbook for your stack?</p>
            <h2 className="section-title text-balance">
              45-minute audit. Written deployment plan in 5 days. Free.
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

export default GuidesHub;
