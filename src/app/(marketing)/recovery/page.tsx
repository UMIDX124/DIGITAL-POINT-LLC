import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ServiceSchema } from '@/components/seo/ServiceSchema';

export const metadata: Metadata = {
  title: 'AI Agent Recovery',
  description:
    'Your AI agent is broken. We fix it. Diagnose in 2 weeks ($5,000), fix in 4 ($10,000), operate from there ($2,500 / month). The only systematic recovery service for production AI agents.',
  alternates: { canonical: 'https://www.digitalpointllc.com/recovery' },
  openGraph: {
    title: 'AI Agent Recovery',
    description:
      'Diagnose in 2 weeks, fix in 4, operate from there. The only systematic recovery service for production AI agents.',
    url: 'https://www.digitalpointllc.com/recovery',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Digital Point. AI Agent Recovery.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agent Recovery',
    description: 'Your AI agent is broken. We fix it. $5,000 diagnosis, $10,000 fix, $2,500/m operate.',
    images: ['/og-image.png'],
  },
};

const criteria = [
  'Observability: what is the agent doing right now',
  'Retry logic: failure modes, backoff, dead-letter handling',
  'Drift detection: is the model output still in spec',
  'Prompt injection resistance: input sanitization, output guarding',
  'Cost variance: token spend per task, runaway loop detection',
  'Escalation paths: what happens when the agent gets it wrong',
  'Data security: who sees what, encryption posture, access scopes',
  'State management: what does the agent remember between runs',
  'Tooling integration: webhook health, downstream API stability',
  'Operator handoff: can a human take over mid-task',
];

const symptoms = [
  {
    title: 'Drifting outputs',
    desc: 'The agent worked fine at launch. Two months later, the responses feel slightly off and nobody knows why.',
  },
  {
    title: 'Silent retries',
    desc: 'Workflows complete, but a quiet 12% of them are running twice and inflating cost without visibility.',
  },
  {
    title: 'Hallucinated tool calls',
    desc: 'The agent invokes APIs that don\'t exist, returns plausible-looking failures, and nobody catches it for a week.',
  },
  {
    title: 'Prompt-injection vulnerabilities',
    desc: 'A user pasted a malicious string and got the agent to leak data it shouldn\'t have. Now the team is panicking.',
  },
  {
    title: 'No observability',
    desc: 'The agent shipped on a Lindy / Relevance / Zapier deployment with zero visibility into the decision graph.',
  },
  {
    title: 'Cost explosion',
    desc: 'The token bill jumped 4x last month and nobody can explain which workflow is responsible.',
  },
];

export default function RecoveryPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://www.digitalpointllc.com' },
        { name: 'Recovery', item: 'https://www.digitalpointllc.com/recovery' },
        ]}
      />
      <ServiceSchema
        name="AI Agent Recovery"
        description="Production audit, fix, and operation for broken AI agent stacks. Fixed-fee: $5,000 diagnosis over 2 weeks, $10,000 fix over 4 weeks, $2,500 per month to operate."
        url="https://www.digitalpointllc.com/recovery"
        serviceTypes={[
        'AI Agent Audit',
        'Production Recovery',
        'Observability Implementation',
        'Cost Variance Diagnosis',
        'Operator Handoff',
        ]}
      />
      <section className="hero hero--pillar-brief" id="hero">
        <div className="dpl-section__rail" aria-hidden="true">
          <span className="dpl-section__rail-label">Section 04 · Recovery</span>
        </div>
        <div className="dpl-section__page" aria-hidden="true">p.04 / p.09</div>
        <div className="hero-inner">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow__rule" aria-hidden="true" />
            Pillar 04 · Recovery · 2-week diagnosis
          </p>

          <h1 className="hero-title hero-title--ob">
            Your <span className="hero-title__amber">AI agent</span> is broken.<br />
            We fix it.
          </h1>

          <p className="hero-sub text-pretty">
            <mark className="dpl-mark">The only systematic recovery service for production AI agents.</mark>{' '}
            Diagnose in 2 weeks. Fix in 4. Operate from there.
          </p>

          <ol className="dpl-pillar-timeline" aria-label="Recovery phases">
            <li className="dpl-pillar-timeline__step dpl-pillar-timeline__step--active">
              <span className="dpl-pillar-timeline__num">PHASE 01</span>
              <span className="dpl-pillar-timeline__label">DIAGNOSE</span>
              <span className="dpl-pillar-timeline__meta">2 weeks · $5,000</span>
            </li>
            <li className="dpl-pillar-timeline__step">
              <span className="dpl-pillar-timeline__num">PHASE 02</span>
              <span className="dpl-pillar-timeline__label">FIX</span>
              <span className="dpl-pillar-timeline__meta">4 weeks · $10,000</span>
            </li>
            <li className="dpl-pillar-timeline__step">
              <span className="dpl-pillar-timeline__num">PHASE 03</span>
              <span className="dpl-pillar-timeline__label">OPERATE</span>
              <span className="dpl-pillar-timeline__meta">$2,500 / month · ongoing</span>
            </li>
          </ol>

          <div className="hero-cta-row">
            <Link href="/audit" className="dpl-btn dpl-btn--ink">
              Book a recovery audit
            </Link>
            <Link href="#what-we-find" className="dpl-btn dpl-btn--ghost">
              See the diagnostic checklist
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-divider" id="symptoms">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow">Recognize any of these?</p>
            <h2 className="section-title text-balance">
              The 2024 build wave shipped a lot of agents. By 2026, many of them have stopped working right.
            </h2>
            <p className="section-desc text-pretty">
              No agency markets recovery systematically. Platforms can&rsquo;t. They sell
              tools. Big consultancies sell &quot;build new.&quot; We&rsquo;re the operator team
              that diagnoses what broke and ships the fix.
            </p>
          </div>

          <div className="pillar-grid pillar-grid--three" style={{ marginBlockStart: '3rem' }}>
            {symptoms.map((s) => (
              <article key={s.title} className="pillar-card">
                <span className="pillar-card__index">Symptom</span>
                <h3 className="pillar-card__title">{s.title}</h3>
                <p className="pillar-card__desc">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider" id="what-we-find">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow eyebrow--accent">Diagnosis · 2 weeks · $5,000</p>
            <h2 className="section-title text-balance">
              We audit your agent stack against 30 production criteria.
            </h2>
            <p className="section-desc text-pretty">
              No vague &quot;health check.&quot; A written report your CTO can hand to legal.
              Sample of what we check below.
            </p>
          </div>

          <ol
            style={{
              marginBlockStart: '3rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
              gap: '1px',
              background: 'var(--color-line-faint)',
              border: '1px solid var(--color-line-faint)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              listStyle: 'none',
              padding: 0,
            }}
          >
            {criteria.map((c, i) => (
              <li
                key={c}
                style={{
                  background: 'var(--color-canvas)',
                  padding: '1.5rem',
                  display: 'flex',
                  gap: '0.875rem',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    color: 'var(--color-accent-text)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    minWidth: '2rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.55,
                  }}
                >
                  {c}
                </span>
              </li>
            ))}
          </ol>

          <p
            className="font-mono"
            style={{
              marginBlockStart: '2rem',
              fontSize: '11px',
              letterSpacing: 'var(--tracking-mono-label)',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              borderBlockStart: '1px solid var(--color-hairline)',
              paddingBlockStart: '1rem',
              textAlign: 'center',
            }}
          >
            {criteria.length} of 30 sample · full checklist delivered with the audit report
          </p>
        </div>
      </section>

      <section className="section section-divider" id="fix">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow eyebrow--accent">Fix · 4 weeks · $10,000</p>
            <h2 className="section-title text-balance">
              We ship the patch and walk your team through every change before handover.
            </h2>
            <p className="section-desc text-pretty">
              Production fixes with proper observability, retries, rollback paths, and
              runbooks. You own the code. Your team can run it from there, or you can
              hand operation to us.
            </p>
          </div>

          <div className="pillar-grid pillar-grid--three" style={{ marginBlockStart: '3rem' }}>
            <article className="pillar-card">
              <span className="pillar-card__index">Week 1</span>
              <h3 className="pillar-card__title">Stabilize</h3>
              <p className="pillar-card__desc">
                Stop the bleeding. Wire observability if missing. Add cost guardrails,
                rate limits, kill-switches.
              </p>
            </article>
            <article className="pillar-card">
              <span className="pillar-card__index">Weeks 2–3</span>
              <h3 className="pillar-card__title">Ship the patch</h3>
              <p className="pillar-card__desc">
                Rewrite the failure paths. Replace brittle prompts. Add retries with
                exponential backoff. Document every change.
              </p>
            </article>
            <article className="pillar-card">
              <span className="pillar-card__index">Week 4</span>
              <h3 className="pillar-card__title">Handover</h3>
              <p className="pillar-card__desc">
                Live walkthrough with your team. Runbooks delivered. You decide whether
                to operate it yourself or hand it to us on retainer.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-divider" id="operate">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow eyebrow--accent">Operate · $2,500 / month</p>
            <h2 className="section-title text-balance">
              We run it from there. You watch us work in Slack.
            </h2>
            <p className="section-desc text-pretty">
              Every DPL retainer ships a Slack Connect channel where every agent
              decision is posted in real time, with PII redaction. Operator interventions,
              retry attempts, cost-per-task, failure modes. All visible. Platforms hide
              what their agents do. We show everything.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Book the recovery audit</p>
            <h2 className="section-title text-balance">
              Tell us what broke. We&rsquo;ll start the diagnosis.
            </h2>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: 0 }}>
              <Link href="/audit" className="btn btn-primary">
                Book a recovery audit
              </Link>
              <Link href="/process" className="btn btn-ghost">
                How an engagement runs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
