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
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Pillar 03 · Remote Operators</span>
          </div>

          <h1 className="hero-title text-balance">
            Operators back every <span className="hero-title__amber">agent</span> we ship.
          </h1>

          <p className="hero-sub text-pretty">
            Agents handle the volume. Operators handle the edges. Not generic VAs, not
            offshore data-entry farms. Production-grade humans with workflow context,
            on call when the AI gets it wrong.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="btn btn-primary">
              Book a free audit
            </Link>
            <Link href="/process" className="btn btn-ghost">
              How operations run
            </Link>
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
