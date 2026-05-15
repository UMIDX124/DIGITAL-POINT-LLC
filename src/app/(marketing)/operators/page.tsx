import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ServiceSchema } from '@/components/seo/ServiceSchema';

export const metadata: Metadata = {
  title: 'Remote Operators',
  description:
    'Trained operators audit the edges where automation breaks. Not generic VAs. Not offshore data-entry teams. Production-grade humans with workflow context, on call when the agent can\'t resolve an exception.',
  alternates: { canonical: 'https://www.digitalpointllc.com/operators' },
};

const what = [
  {
    title: 'Exception audit',
    desc: 'When the agent kicks an edge case to human, an operator picks it up, decides, and feeds the resolution back to the agent for next-time pattern matching.',
  },
  {
    title: 'Live observability',
    desc: 'Operators run a Slack channel with you. Every agent decision visible. Operator interventions logged. No black box.',
  },
  {
    title: 'Weekly narrative reports',
    desc: 'Beyond dashboards: a short written analysis of what the agents did, what broke, what improved, what to fix next.',
  },
  {
    title: 'Custom escalation paths',
    desc: 'You define what reaches a human. Cost thresholds, sensitivity tags, confidence scores, sentiment triggers. Tunable per workflow.',
  },
  {
    title: 'QA review pass',
    desc: 'Operator manually verifies high-stakes agent output before it ships. Catches the 1-in-50 hallucinations that drift through automated checks.',
  },
  {
    title: 'Edge-case codification',
    desc: 'When operators handle a one-off exception, they write the rule that absorbs it next time. Your agent gets smarter from human edge work.',
  },
];

export default function OperatorsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://www.digitalpointllc.com' },
        { name: 'Remote Operators', item: 'https://www.digitalpointllc.com/operators' },
        ]}
      />
      <ServiceSchema
        name="Remote Operators"
        description="Vetted human operators layered over the AI for cases automation cannot handle. Not generic VAs. Trained on your workflows, on call for exceptions, audit every edge."
        url="https://www.digitalpointllc.com/operators"
        serviceTypes={[
        'Operations Coverage',
        'Exception Handling',
        'Quality Audit',
        'Workflow Operations',
        'Managed Service',
        ]}
      />
      <section className="hero hero--pillar-brief" id="hero">
        <div className="dpl-section__rail" aria-hidden="true">
          <span className="dpl-section__rail-label">Section 03 · Operators</span>
        </div>
        <div className="dpl-section__page" aria-hidden="true">p.03 / p.09</div>
        <div className="hero-inner">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow__rule" aria-hidden="true" />
            Pillar 03 · Remote Operators
          </p>

          <div className="hero-grid">
            <div className="hero-grid__main">
              <h1 className="hero-title hero-title--ob">
                Operators back every <span className="hero-title__amber">agent</span> we ship.
              </h1>

              <p className="hero-sub text-pretty">
                Agents handle the volume. Operators handle the edges. Not generic VAs, not
                offshore data-entry farms. Production-grade humans with workflow context,
                on call when the AI gets it wrong.
              </p>

              <div className="hero-cta-row">
                <Link href="/audit" className="dpl-btn dpl-btn--ink">
                  Book a free audit
                </Link>
                <Link href="/process" className="dpl-btn dpl-btn--ghost">
                  How operations run
                </Link>
              </div>
            </div>

            <aside className="hero-grid__panels" aria-label="Operator coverage">
              <div className="dpl-panel">
                <header className="dpl-panel__head">
                  <span className="dpl-panel__pulse" aria-hidden="true" />
                  <span>On-call now</span>
                </header>
                <dl className="dpl-panel__rows">
                  <div className="dpl-panel__row">
                    <dt>Lead operator</dt>
                    <dd data-design-only="true">Faizan</dd>
                  </div>
                  <div className="dpl-panel__row">
                    <dt>Backup</dt>
                    <dd data-design-only="true">Anwaar</dd>
                  </div>
                  <div className="dpl-panel__row">
                    <dt>Active escalations</dt>
                    <dd data-design-only="true">0</dd>
                  </div>
                  <div className="dpl-panel__row">
                    <dt>Avg response · 30d</dt>
                    <dd data-design-only="true">3h 12m</dd>
                  </div>
                  <div className="dpl-panel__row">
                    <dt>Reply before next morning</dt>
                    <dd className="dpl-panel__row--accent" data-design-only="true">100%</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow">What operators do</p>
            <h2 className="section-title text-balance">
              The work humans still do better than agents.
            </h2>
          </div>

          <div className="pillar-grid pillar-grid--three" style={{ marginBlockStart: '3rem' }}>
            {what.map((w) => (
              <article key={w.title} className="pillar-card">
                <span className="pillar-card__index">Role</span>
                <h3 className="pillar-card__title">{w.title}</h3>
                <p className="pillar-card__desc">{w.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Talk to a co-founder</p>
            <h2 className="section-title text-balance">
              Free 45-minute audit. Written deployment plan within 5 days.
            </h2>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: 0 }}>
              <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
              <Link href="/recovery" className="btn btn-ghost">Recover a broken agent</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
