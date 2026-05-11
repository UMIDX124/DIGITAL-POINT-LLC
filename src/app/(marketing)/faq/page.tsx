import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQSchema } from '@/components/seo/FAQSchema';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Common questions about Digital Point. What we do, how recovery works, what production AI agent operations means, pricing, the tech stack, and operator coverage.',
  alternates: { canonical: 'https://www.digitalpointllc.com/faq' },
};

const faqs = [
  {
    q: 'How is this different from a platform like Lindy, Relevance AI, or Stack AI?',
    a: 'Platforms sell you tools and licenses; you self-serve the deployment and operations. We are a service. We deploy the agents, operate them in production, and stand behind the outcomes. Trained human operators audit every exception the AI cannot resolve. You do not log into a platform. You watch the work happen in a Slack channel we run with you.',
  },
  {
    q: 'What does "production-grade" actually mean?',
    a: 'Observability on every decision. Retries with exponential backoff and dead-letter queues. Kill-switches and rollback paths. Drift detection. Cost guardrails so a runaway loop cannot burn your budget. Documented runbooks. An operator on call. None of these are optional in a DPL deployment.',
  },
  {
    q: 'Why is your pricing so low compared to other AI agency rates I have seen?',
    a: 'Most agencies are pricing a 4-to-6-person account team. We charge for the work an AI agent does plus operator-hours that audit it. We do not need a 5-person account ladder. Same coverage at a fraction of the cost. The audit-free, $2,500 pilot, $2,500 monthly retainer reflects that math directly.',
  },
  {
    q: 'What is the AI Agent Recovery service?',
    a: 'For companies that already shipped an agent. Internally built, on a platform, or with another vendor. And the agent has started drifting, hallucinating on edge cases, retrying silently, or burning tokens unexpectedly. We diagnose against 30 production criteria over 2 weeks ($5,000), ship the fix over 4 weeks ($10,000), and operate from there if you want ($2,500/month).',
  },
  {
    q: 'What is the tech stack?',
    a: 'n8n (self-hosted) for orchestration. Groq for high-throughput inference. Anthropic Claude as planner/reviewer. PostgreSQL for state. TypeScript for custom services. Vercel for surfaces. Slack Connect for client observability. BotID for API defense. The /stack page documents every layer in detail.',
  },
  {
    q: 'Where are you based?',
    a: 'Digital Point LLC is a US-LLC registered in Wilmington, Delaware. The team is distributed across US and South Asia, which gives us US-business-hours coverage plus EU overlap.',
  },
  {
    q: 'Will I see what your agents do in real time?',
    a: 'Yes. Every retainer ships a Slack Connect channel with you. Every agent decision is posted in real time with PII redaction. Operator interventions, retry attempts, cost-per-task. All visible. Most platforms hide their agents\' work. We show everything.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Retainer is month-to-month. No annual lock-in. If a workflow stops being useful or you want to take operations in-house, we hand over the runbooks and you keep running.',
  },
  {
    q: 'Who are the founders?',
    a: 'M. Faizan Rafiq and Anwaar Tayyab co-founded Digital Point LLC in 2017. They review every audit, pilot, and recovery report before delivery. No junior account managers fronting your engagement.',
  },
  {
    q: 'Do you sign NDAs and DPAs?',
    a: 'Yes. Mutual NDA at audit. DPA + access scoping at pilot. We work with read-scoped credentials wherever possible and document every data touchpoint in the engagement contract.',
  },
];

export default function FAQPage() {
  return (
    <>
      <FAQSchema faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))} />

      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>FAQ · Plain answers · No fluff</span>
          </div>

          <h1 className="hero-title text-balance">
            <span className="hero-title__amber">Ten</span> questions we get most often.
          </h1>

          <p className="hero-sub text-pretty">
            If your question is not here, run the audit. A co-founder answers it
            inside the 45-minute call. Free.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '60rem' }}>
            {faqs.map((f, i) => (
              <details
                key={f.q}
                style={{
                  border: '1px solid var(--color-line-faint)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-canvas-raised)',
                  padding: '0',
                  overflow: 'hidden',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    listStyle: 'none',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--text-md)',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      color: 'var(--color-accent)',
                      fontSize: 'var(--text-xs)',
                      letterSpacing: '0.16em',
                      minWidth: '2.5rem',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ flex: 1 }}>{f.q}</span>
                  <span style={{ color: 'var(--color-text-tertiary)' }}>+</span>
                </summary>
                <div
                  style={{
                    padding: '0 1.5rem 1.5rem 5rem',
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--text-md)',
                    lineHeight: 1.65,
                  }}
                >
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Different question</p>
            <h2 className="section-title text-balance">
              Ask a co-founder in the audit. 45 minutes. Free.
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
