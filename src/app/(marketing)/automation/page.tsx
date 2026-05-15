import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ServiceSchema } from '@/components/seo/ServiceSchema';
import { PipelineDiagramSchematic } from '@/components/visuals/PipelineDiagramSchematic';

export const metadata: Metadata = {
  title: 'Workflow Automation',
  description:
    'Workflow automation that replaces manual handoffs across your stack. n8n + custom TypeScript + Postgres for production-grade pipelines. Lead-to-CRM in under 60 seconds, document parsing, vendor invoice extraction, commission reconciliation.',
  alternates: { canonical: 'https://www.digitalpointllc.com/automation' },
};

const useCases = [
  {
    title: 'Lead-to-CRM pipeline',
    desc: 'Every inbound from every source captured, enriched, deduplicated, scored, routed in under 60 seconds. No more "did we follow up on that one?" Parallel workers across HubSpot, Stripe, Slack, email, and form submissions land in a single Postgres state table before any rep sees them.',
  },
  {
    title: 'Vendor invoice extraction',
    desc: 'PDF / scan in, structured records out. Edge cases route to operator review before write-back to accounting. Audit trail preserved per invoice so finance can reconcile against the original document.',
  },
  {
    title: 'Cross-tool sync',
    desc: 'Bi-directional sync between CRM, helpdesk, billing, marketing tools. Reconciliation logic, not just webhooks. Conflicts surface to operator review before the system writes back.',
  },
];

const alsoAutomate = 'Commission reconciliation · daily-standup replacement · document QA review loops.';

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
      <section className="hero hero--pillar-brief" id="hero">
        <div className="dpl-section__rail" aria-hidden="true">
          <span className="dpl-section__rail-label">Section 02 · Automation</span>
        </div>
        <div className="dpl-section__page" aria-hidden="true">p.02 / p.09</div>
        <div className="hero-inner">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow__rule" aria-hidden="true" />
            Pillar 02 · Workflow Automation
          </p>

          <div className="hero-grid">
            <div className="hero-grid__main">
              <h1 className="hero-title hero-title--ob">
                Replace manual handoffs <span className="hero-title__amber">across</span> your stack.
              </h1>

              <p className="hero-sub text-pretty">
                n8n + custom TypeScript + Postgres for production pipelines. Not a Zapier
                shop. Not a Make rebadger. Real orchestration with observability, retries,
                and operator audit on every exception.
              </p>

              <div className="hero-cta-row">
                <Link href="/audit" className="dpl-btn dpl-btn--ink">Book a free audit</Link>
                <Link href="/stack" className="dpl-btn dpl-btn--ghost">See the stack</Link>
              </div>
            </div>

            <aside className="hero-grid__panels" aria-label="Pipeline schematic">
              <div className="hero-grid__diagram">
                <PipelineDiagramSchematic compact />
                <p className="hero-grid__diagram-caption">FIG. SYS · Pipeline overview</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow">Workflows we deploy</p>
            <h2 className="section-title text-balance">
              The handoff problems we&rsquo;ve solved twice or more.
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

          <p
            className="font-mono"
            style={{
              marginBlockStart: '2.5rem',
              fontSize: '12px',
              letterSpacing: 'var(--tracking-mono-label)',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              borderBlockStart: '1px solid var(--color-hairline)',
              paddingBlockStart: '1rem',
            }}
          >
            Also automate · {alsoAutomate}
          </p>
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
