import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SystemFlowSchematic } from '@/components/visuals/SystemFlowSchematic';

export const metadata: Metadata = {
  title: 'Stack',
  description:
    'The production stack DPL deploys on: n8n (self-hosted), Groq for inference, Postgres for state, TypeScript for custom services, Vercel for surfaces, Slack Connect for client observability. Open source where the cost curve flattens. Self-hosted where it counts.',
  alternates: { canonical: 'https://www.digitalpointllc.com/stack' },
  openGraph: {
    title: 'Stack · n8n, Groq, Postgres, TypeScript',
    description:
      'The production stack DPL deploys on. Open source where the cost curve flattens. Self-hosted where it counts.',
    url: 'https://www.digitalpointllc.com/stack',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stack · n8n, Groq, Postgres, TypeScript',
    description: 'The production stack DPL deploys on. Self-hosted where it counts.',
  },
};

const rationale = [
  {
    fig: 'FIG. 01',
    pick: 'n8n, not Zapier',
    category: 'Orchestration',
    body: 'Zapier-per-task pricing inverts past $400/mo. n8n on a dedicated VM stays flat as volume scales. Visual workflow builder so your team can audit the logic. Full data sovereignty.',
  },
  {
    fig: 'FIG. 02',
    pick: 'Groq, not OpenAI',
    category: 'Inference',
    body: 'OpenAI is the default. Groq’s hosted Llama-3 hits sub-second response times on production workloads where users wait. We reserve Anthropic for reasoning depth, Groq for everything else.',
  },
  {
    fig: 'FIG. 03',
    pick: 'Postgres, not vector-db hype',
    category: 'State',
    body: 'Agent state, audit logs, retry queues. One Postgres on Neon for everything we control. Vector store added only when retrieval cost crosses the per-call SQL break-even.',
  },
  {
    fig: 'FIG. 04',
    pick: 'Self-hosted, not platform-locked',
    category: 'Ownership',
    body: 'If we vanish, your stack still runs. Every workflow exports. Every agent prompt lives in your repo. The retainer is operations, not lock-in.',
  },
];

export default function StackPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://www.digitalpointllc.com' },
        { name: 'Stack', item: 'https://www.digitalpointllc.com/stack' },
        ]}
      />
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Stack · Production · Self-hosted where it counts</span>
          </div>

          <h1 className="hero-title text-balance">
            n8n. Groq. Postgres. <span className="hero-title__amber">TypeScript.</span><br />
            Open source where the cost curve flattens.
          </h1>

          <p className="hero-sub text-pretty">
            Buyer&rsquo;s guides tell you to demand the tech stack upfront. So here it is.
            Not a Zapier shop. Not a single-platform reseller. Self-hosted orchestration
            and custom code where the edges break.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="dpl-btn dpl-btn--ink">Book a free audit</Link>
            <Link href="/recovery" className="dpl-btn dpl-btn--ghost">Recovery service</Link>
          </div>
        </div>
      </section>

      <section className="dpl-section dpl-section--stack">
        <div className="dpl-section__rail" aria-hidden="true">
          <span className="dpl-section__rail-label">Section 06 · Stack</span>
        </div>
        <div className="dpl-section__page" aria-hidden="true">p.06 / p.09</div>
        <div className="dpl-section__inner">
          <div className="dpl-rationale__grid">
            <div className="dpl-rationale__head">
              <p className="dpl-eyebrow">
                <span className="dpl-eyebrow__rule" aria-hidden="true" />
                Stack rationale
              </p>
              <h2 className="dpl-rationale__title">Why this stack, not the obvious one.</h2>
              <p className="dpl-rationale__note">Open-source where the cost curve flattens. Custom code where the edges break. Self-hosted where data sovereignty matters.</p>
            </div>
            <div className="dpl-rationale__list">
              {rationale.map((r) => (
                <article key={r.fig} className="dpl-rationale__item">
                  <span className="dpl-rationale__fig">{r.fig}</span>
                  <div className="dpl-rationale__body">
                    <h3 className="dpl-rationale__heading">
                      {r.pick}
                      <span className="dpl-rationale__pick">{r.category}</span>
                    </h3>
                    <p className="dpl-rationale__copy">{r.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="dpl-section dpl-section--architecture">
        <div className="dpl-section__inner">
          <p className="dpl-eyebrow">
            <span className="dpl-eyebrow__rule" aria-hidden="true" />
            Architecture
          </p>
          <h2 className="dpl-architecture__title">The flow, end to end.</h2>
          <p className="dpl-architecture__body">
            Inbound signal hits orchestration. The agent decides. The operator audits the edges. Postgres records every state change. Downstream systems read from one source of truth.
          </p>
          <div className="dpl-architecture__diagram">
            <SystemFlowSchematic />
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow">Want it for your workflows</p>
            <h2 className="section-title text-balance">
              Free audit. We&rsquo;ll map your stack against ours.
            </h2>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: 0 }}>
              <Link href="/audit" className="dpl-btn dpl-btn--ink">Book a free audit</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
