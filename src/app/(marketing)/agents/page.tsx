import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { StackGrid } from '@/components/brand/StackGrid';
import { ServiceSchema } from '@/components/seo/ServiceSchema';

export const metadata: Metadata = {
  title: 'AI Agents',
  description:
    'Production AI agents we deploy and operate for you. Custom-trained agents that run repeatable knowledge work. CRM updates, lead routing, qualification, follow-up cadences. n8n + Groq + custom TypeScript stack.',
  alternates: { canonical: 'https://www.digitalpointllc.com/agents' },
};

const useCases = [
  {
    title: 'Lead routing + qualification',
    desc: 'Every inbound lead enriched, scored, and routed to the right operator or sales rep in under 60 seconds. Tunable thresholds per channel. Average response time drops from hours to minutes, with operator override on high-value leads before they hit a rep.',
  },
  {
    title: 'CRM enrichment',
    desc: 'Auto-fill missing fields, deduplicate records, normalize firmographics. Runs continuously, not as a one-time scrub. Operator audits the edge cases the agent flags as low-confidence before writing back.',
  },
  {
    title: 'Customer support triage',
    desc: 'First-pass classification, response drafting, escalation routing. Operator approves outbound when stakes are high. Typical mix is 60-70% auto-resolved, 20-30% operator-edited, the rest hand-routed.',
  },
];

const alsoShip = 'Sales follow-up cadences · document parsing and extraction · portfolio monitoring and weekly narrative reports.';

export default function AgentsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://www.digitalpointllc.com' },
        { name: 'AI Agents', item: 'https://www.digitalpointllc.com/agents' },
        ]}
      />
      <ServiceSchema
        name="AI Agents"
        description="Custom-trained AI agents deployed on n8n + Groq + custom TypeScript. We operate them continuously while human operators audit the edges where automation breaks."
        url="https://www.digitalpointllc.com/agents"
        serviceTypes={[
        'Lead Qualification',
        'CRM Enrichment',
        'Document Parsing',
        'Customer Support Triage',
        'Sales Follow-up Automation',
        ]}
      />
      <section className="hero hero--pillar-brief" id="hero">
        <div className="dpl-section__rail" aria-hidden="true">
          <span className="dpl-section__rail-label">Section 01 · Agents</span>
        </div>
        <div className="dpl-section__page" aria-hidden="true">p.01 / p.09</div>
        <div className="hero-inner">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow__rule" aria-hidden="true" />
            Pillar 01 · AI Agents
          </p>

          <div className="hero-grid">
            <div className="hero-grid__main">
              <h1 className="hero-title hero-title--ob">
                Production agents that <span className="hero-title__amber">run</span> the work.
              </h1>

              <p className="hero-sub text-pretty">
                Not a chatbot. Not a Lindy template. Custom-trained agents we deploy on n8n
                + Groq + custom TypeScript, then operate continuously. Operators audit the
                edges where automation breaks.
              </p>

              <div className="hero-cta-row">
                <Link href="/audit" className="dpl-btn dpl-btn--ink">
                  Book a free audit
                </Link>
                <Link href="/stack" className="dpl-btn dpl-btn--ghost">
                  See the stack
                </Link>
              </div>
            </div>

            <aside className="hero-grid__panels" aria-label="Agent fleet snapshot">
              <div className="dpl-panel" data-design-only="true">
                <header className="dpl-panel__head">
                  <span className="dpl-panel__pulse" aria-hidden="true" />
                  <span>Agent fleet snapshot</span>
                </header>
                <dl className="dpl-panel__rows">
                  <div className="dpl-panel__row">
                    <dt>Agents in production</dt>
                    <dd data-design-only="true">17</dd>
                  </div>
                  <div className="dpl-panel__row">
                    <dt>Active types</dt>
                    <dd data-design-only="true">Sales · Support · Ops · Recovery</dd>
                  </div>
                  <div className="dpl-panel__row">
                    <dt>Avg invocations / day</dt>
                    <dd data-design-only="true">1,420</dd>
                  </div>
                  <div className="dpl-panel__row">
                    <dt>Operator overrides · 30d</dt>
                    <dd data-design-only="true">47</dd>
                  </div>
                  <div className="dpl-panel__row">
                    <dt>Capacity for new pilots</dt>
                    <dd className="dpl-panel__row--accent" data-design-only="true">2 open</dd>
                  </div>
                </dl>
                <span className="dpl-panel__designmark">Internal snapshot · refreshed weekly</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow">Use cases that ship</p>
            <h2 className="section-title text-balance">
              What we actually deploy in production.
            </h2>
            <p className="section-desc text-pretty">
              Every workflow ships with observability, retries, rollback, and an
              operator on call. No &quot;experimental&quot; agents, no AI hype.
            </p>
          </div>

          <div className="pillar-grid pillar-grid--three" style={{ marginBlockStart: '3rem' }}>
            {useCases.map((u) => (
              <article key={u.title} className="pillar-card">
                <span className="pillar-card__index">Workflow</span>
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
            Also ship · {alsoShip}
          </p>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow">The stack · self-hosted where it matters</p>
            <h2 className="section-title text-balance">
              Production-grade, not a chatbot template.
            </h2>
            <p className="section-desc text-pretty">
              Four primitives layered behind every agent we ship. Custom TypeScript
              services own the edges where vendor SDKs break.
            </p>
          </div>
          <div style={{ marginBlockStart: '3rem' }}>
            <StackGrid
              items={[
                { label: 'n8n', role: 'orchestration' },
                { label: 'Groq', role: 'inference' },
                { label: 'Postgres', role: 'state' },
                { label: 'TypeScript', role: 'custom services', accent: true },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Let&apos;s scope your first agent</p>
            <h2 className="section-title text-balance">
              45-minute audit. Written deployment plan in 5 days.
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
