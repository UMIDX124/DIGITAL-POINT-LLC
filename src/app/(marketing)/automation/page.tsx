import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ServiceSchema } from '@/components/seo/ServiceSchema';

export const metadata: Metadata = {
  title: 'Workflow Automation',
  description:
    'Workflow automation that replaces manual handoffs across your stack. n8n + custom TypeScript + Postgres for production-grade pipelines. Lead-to-CRM in under 60 seconds, document parsing, vendor invoice extraction, commission reconciliation.',
  alternates: { canonical: 'https://www.digitalpointllc.com/automation' },
};

const useCases = [
  {
    title: 'Lead-to-CRM pipeline',
    desc: 'Every inbound from every source captured, enriched, deduplicated, scored, routed in under 60 seconds. No more "did we follow up on that one?"',
  },
  {
    title: 'Vendor invoice extraction',
    desc: 'PDF / scan in, structured records out. Edge cases route to operator review before write-back to accounting.',
  },
  {
    title: 'Commission reconciliation',
    desc: 'For brokerages and agencies with payout rules. Match CRM deals to commission tables, flag exceptions, queue payouts.',
  },
  {
    title: 'Daily-standup replacement',
    desc: 'Threshold monitoring across the portfolio. Anomalies surface, narrative reports auto-generated, you read the digest.',
  },
  {
    title: 'Document QA loop',
    desc: 'Generated copy or contract drafts flow through a structured review pipeline. Operator approves before send.',
  },
  {
    title: 'Cross-tool sync',
    desc: 'Bi-directional sync between CRM, helpdesk, billing, marketing tools. With reconciliation logic, not just webhooks.',
  },
];

export default function AutomationPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://www.digitalpointllc.com' },
        { name: 'Workflow Automation', item: 'https://www.digitalpointllc.com/automation' },
        ]}
      />
      <ServiceSchema
        name="Workflow Automation"
        description="Wire tools, data, and humans together so handoffs happen without manual work. Cross-stack automation that survives audits, retries, and rollbacks."
        url="https://www.digitalpointllc.com/automation"
        serviceTypes={[
        'CRM Integration',
        'Data Pipelines',
        'Ticket Routing',
        'Cross-tool Sync',
        'Workflow Operations',
        ]}
      />
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Pillar 02 · Workflow Automation</span>
          </div>

          <h1 className="hero-title text-balance">
            Replace manual handoffs <span className="hero-title__amber">across</span> your stack.
          </h1>

          <p className="hero-sub text-pretty">
            n8n + custom TypeScript + Postgres for production pipelines. Not a Zapier
            shop. Not a Make rebadger. Real orchestration with observability, retries,
            and operator audit on every exception.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
            <Link href="/stack" className="btn btn-ghost">See the stack</Link>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow">Workflows we deploy</p>
            <h2 className="section-title text-balance">
              The handoff problems we&apos;ve solved twice or more.
            </h2>
          </div>

          <div className="pillar-grid pillar-grid--three" style={{ marginBlockStart: '3rem' }}>
            {useCases.map((u) => (
              <article key={u.title} className="pillar-card">
                <span className="pillar-card__index">Pipeline</span>
                <h3 className="pillar-card__title">{u.title}</h3>
                <p className="pillar-card__desc">{u.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Map your workflow</p>
            <h2 className="section-title text-balance">
              45-minute audit. Written plan in 5 days. Free.
            </h2>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: 0 }}>
              <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
              <Link href="/pricing" className="btn btn-ghost">See pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
