import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

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
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://www.digitalpointllc.com' },
        { name: 'FAQ', item: 'https://www.digitalpointllc.com/faq' },
        ]}
      />
      <FAQSchema faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))} />

      <section className="hero hero--pillar-brief" id="hero">
        <div className="dpl-section__rail" aria-hidden="true">
          <span className="dpl-section__rail-label">Section 08 · FAQ</span>
        </div>
        <div className="dpl-section__page" aria-hidden="true">p.08 / p.09</div>
        <div className="hero-inner">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow__rule" aria-hidden="true" />
            FAQ · Plain answers · No fluff
          </p>

          <h1 className="hero-title hero-title--ob">
            <span className="hero-title__amber">Ten</span> questions we get most often.
          </h1>

          <p className="hero-sub text-pretty">
            If your question is not here, run the audit. <mark className="dpl-mark">A co-founder answers it inside the 45-minute call.</mark> Free.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="dpl-btn dpl-btn--ink">Book a free audit</Link>
          </div>
        </div>
      </section>

      <section className="dpl-section">
        <div className="dpl-section__inner">
          <div className="dpl-faq">
            {faqs.map((f, i) => (
              <details key={f.q} className="dpl-faq__item">
                <summary className="dpl-faq__summary">
                  <span className="dpl-faq__num">Q. {String(i + 1).padStart(2, '0')}</span>
                  <span className="dpl-faq__q">{f.q}</span>
                  <span className="dpl-faq__toggle" aria-hidden="true" />
                </summary>
                <div className="dpl-faq__a">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="dpl-section">
        <div className="dpl-section__inner" style={{ textAlign: 'center' }}>
          <p className="dpl-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="dpl-eyebrow__rule" aria-hidden="true" />
            Different question
          </p>
          <h2 className="hero-title hero-title--ob" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
            Ask a co-founder in the audit. 45 minutes. Free.
          </h2>
          <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: '2rem' }}>
            <Link href="/audit" className="dpl-btn dpl-btn--ink">Book a free audit</Link>
          </div>
        </div>
      </section>
    </>
  );
}
