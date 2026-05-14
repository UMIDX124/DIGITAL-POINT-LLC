import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { HeroAtmosphere } from '@/components/brand/HeroAtmosphere';
import { StackGrid } from '@/components/brand/StackGrid';
import { ServiceSchema } from '@/components/seo/ServiceSchema';

export const metadata: Metadata = {
  title: 'AI Agents',
  description:
    'Production AI agents we deploy and operate for you. Custom-trained agents that run repeatable knowledge work. CRM updates, lead routing, qualification, follow-up cadences. n8n + Groq + custom TypeScript stack.',
  alternates: { canonical: 'https://digitalpointllc.com/agents' },
};

const useCases = [
  {
    title: 'Lead routing + qualification',
    desc: 'Every inbound lead enriched, scored, and routed to the right operator or sales rep in under 60 seconds. Tunable thresholds per channel.',
  },
  {
    title: 'Sales follow-up cadence',
    desc: 'Adaptive follow-up sequences that respond to prospect signal. Opened, replied, ghosted, asked a hard question. No template trees.',
  },
  {
    title: 'CRM enrichment',
    desc: 'Auto-fill missing fields, deduplicate records, normalize firmographics. Runs continuously, not as a one-time scrub.',
  },
  {
    title: 'Document parsing + extraction',
    desc: 'Invoice, contract, statement parsing into structured records. Edge cases route to operator audit before write-back.',
  },
  {
    title: 'Portfolio monitoring',
    desc: 'Daily-standup replacement for 20+ account watch. Agents monitor thresholds, detect anomalies, write weekly narrative reports.',
  },
  {
    title: 'Customer support triage',
    desc: 'First-pass classification, response drafting, escalation routing. Operator approves outbound when stakes are high.',
  },
];

export default function AgentsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://digitalpointllc.com' },
        { name: 'AI Agents', item: 'https://digitalpointllc.com/agents' },
        ]}
      />
      <ServiceSchema
        name="AI Agents"
        description="Custom-trained AI agents deployed on n8n + Groq + custom TypeScript. We operate them continuously while human operators audit the edges where automation breaks."
        url="https://digitalpointllc.com/agents"
        serviceTypes={[
        'Lead Qualification',
        'CRM Enrichment',
        'Document Parsing',
        'Customer Support Triage',
        'Sales Follow-up Automation',
        ]}
      />
      <section className="hero">
        <HeroAtmosphere variant="pillar" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Pillar 01 · AI Agents</span>
          </div>

          <h1 className="hero-title text-balance">
            Production agents that <span className="hero-title__amber">run</span> the work.
          </h1>

          <p className="hero-sub text-pretty">
            Not a chatbot. Not a Lindy template. Custom-trained agents we deploy on n8n
            + Groq + custom TypeScript, then operate continuously. Operators audit the
            edges where automation breaks.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="btn btn-primary">
              Book a free audit
            </Link>
            <Link href="/stack" className="btn btn-ghost">
              See the stack
            </Link>
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
