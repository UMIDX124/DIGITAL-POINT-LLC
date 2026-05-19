import Link from 'next/link';

export function RecoverySection() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="section-header">
          <p className="eyebrow eyebrow--accent">Category creator · Recovery</p>
          <h2 className="section-title text-balance">
            Recover the agent you already shipped.
          </h2>
          <p className="section-desc text-pretty">
            Most teams shipped an agent in 2024 or 2025. By 2026 it has drifted or
            retries on its own without flagging the failure. DPL recovers it as a
            managed service.
          </p>
          <div className="hero-cta-row" style={{ marginBlockStart: 'var(--space-4)' }}>
            <Link href="/diagnostic" className="btn-link">
              Score your agent in 2 minutes
            </Link>
          </div>
        </div>

        <div className="pillar-grid pillar-grid--three" style={{ marginBlockStart: '3rem' }}>
          <article className="pillar-card">
            <span className="pillar-card__index">01 · Diagnosis</span>
            <h3 className="pillar-card__title">Audit your agent stack</h3>
            <p className="pillar-card__desc">
              30-criteria audit covering observability and retry logic.
            </p>
            <p className="font-mono" style={{ color: 'var(--color-accent-text)', fontSize: 'var(--text-sm)' }}>
              $5,000 · 2 weeks
            </p>
            <div className="pillar-card__link">
              <Link href="/recovery" className="btn-link">See the diagnostic checklist</Link>
            </div>
          </article>

          <article className="pillar-card">
            <span className="pillar-card__index">02 · Fix</span>
            <h3 className="pillar-card__title">Ship the patch</h3>
            <p className="pillar-card__desc">
              Production fixes with proper observability, retries, and rollback. We ship
              the new runbooks and walk your team through every change before handover.
            </p>
            <p className="font-mono" style={{ color: 'var(--color-accent-text)', fontSize: 'var(--text-sm)' }}>
              $10,000 · 4 weeks
            </p>
            <div className="pillar-card__link">
              <Link href="/recovery#fix" className="btn-link">Fix scope</Link>
            </div>
          </article>

          <article className="pillar-card">
            <span className="pillar-card__index">03 · Operate</span>
            <h3 className="pillar-card__title">We run it from there</h3>
            <p className="pillar-card__desc">
              Standard DPL retainer takes over. Real-time Slack channel with every agent
              decision logged. You watch us work for you.
            </p>
            <p className="font-mono" style={{ color: 'var(--color-accent-text)', fontSize: 'var(--text-sm)' }}>
              $2,500 / month
            </p>
            <div className="pillar-card__link">
              <Link href="/process" className="btn-link">How operations run</Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default RecoverySection;
