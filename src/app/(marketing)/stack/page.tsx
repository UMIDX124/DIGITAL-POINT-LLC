import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { StackGrid } from '@/components/brand/StackGrid';

export const metadata: Metadata = {
  title: 'Stack',
  description:
    'The production stack DPL deploys on: n8n (self-hosted), Groq for inference, Anthropic Claude as planner, Postgres for state, TypeScript for custom services, Vercel for surfaces, Slack Connect for client observability. Not a Zapier shop.',
  alternates: { canonical: 'https://digitalpointllc.com/stack' },
};

const layers = [
  {
    category: 'Orchestration',
    items: [
      { label: 'n8n', detail: 'Self-hosted on a dedicated VM. Visual workflow builder with full data sovereignty. Default for agencies in 2026 per the buyer\'s guides. And because the cost curve stays flat as volume scales.' },
    ],
  },
  {
    category: 'Inference + planning',
    items: [
      { label: 'Groq', detail: 'Llama-3 family for high-throughput inference where latency matters. Sub-second response times on production workloads.' },
      { label: 'Anthropic Claude', detail: 'Planner + reviewer where reasoning depth matters. Tool use, structured output, longer contexts.' },
    ],
  },
  {
    category: 'State + persistence',
    items: [
      { label: 'PostgreSQL', detail: 'Single source of truth for agent state, audit logs, and retry queues. Hosted on Neon (Vercel Marketplace) or self-managed depending on data residency requirements.' },
      { label: 'Upstash Redis', detail: 'Rate limiting, ephemeral state, cache layer.' },
    ],
  },
  {
    category: 'Custom services',
    items: [
      { label: 'TypeScript', detail: 'Custom services where n8n is not enough. Strict mode, Zod validation at boundaries, Prisma for database access.' },
      { label: 'Vercel Functions', detail: 'Hosted endpoints, cron triggers, queue consumers. Fluid Compute for warm starts.' },
    ],
  },
  {
    category: 'Surfaces + observability',
    items: [
      { label: 'Next.js + React', detail: 'Marketing surface, client dashboard, operator console. Server Components by default.' },
      { label: 'Slack Connect', detail: 'Client-facing live decision feed. Every agent decision, retry, exception, and operator intervention posted in real time.' },
      { label: 'Vercel Speed Insights + Analytics', detail: 'CWV monitoring on every surface we ship.' },
    ],
  },
  {
    category: 'Defense + integrity',
    items: [
      { label: 'BotID', detail: 'Bot detection on API endpoints. Form submissions, recovery audits, founder routes.' },
      { label: 'Resend + Nodemailer', detail: 'Transactional email with SMTP fallback for outbound that must not miss.' },
    ],
  },
];

export default function StackPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://digitalpointllc.com' },
        { name: 'Stack', item: 'https://digitalpointllc.com/stack' },
        ]}
      />
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Stack · Production · Self-hosted where it counts</span>
          </div>

          <h1 className="hero-title text-balance">
            n8n. Groq. Postgres. <span className="hero-title__amber">TypeScript</span>.<br />
            Open source where the cost curve flattens.
          </h1>

          <p className="hero-sub text-pretty">
            Buyer&apos;s guides tell you to demand the tech stack upfront. So here it is.
            Not a Zapier shop. Not a single-platform reseller. Self-hosted orchestration
            and custom code where the edges break.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
            <Link href="/recovery" className="btn btn-ghost">Recovery service</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow">Eight primitives</p>
            <h2 className="section-title text-balance">
              The shape of the stack at a glance.
            </h2>
          </div>
          <div style={{ marginBlockStart: '3rem' }}>
            <StackGrid
              items={[
                { label: 'n8n', role: 'orchestration' },
                { label: 'Groq', role: 'inference' },
                { label: 'Postgres', role: 'agent state' },
                { label: 'TypeScript', role: 'custom services', accent: true },
                { label: 'Upstash', role: 'rate limit + cache' },
                { label: 'Vercel', role: 'edge + functions' },
                { label: 'BotID', role: 'bot defense' },
                { label: 'Resend', role: 'transactional email' },
              ]}
            />
          </div>
        </div>
      </section>

      {layers.map((layer) => (
        <section key={layer.category} className="section section-divider">
          <div className="container-wide">
            <div className="section-header">
              <p className="eyebrow eyebrow--accent">{layer.category}</p>
            </div>

            <div style={{ marginBlockStart: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {layer.items.map((item) => (
                <article
                  key={item.label}
                  style={{
                    padding: 'var(--space-6)',
                    background: 'var(--color-canvas-raised)',
                    border: '1px solid var(--color-line-faint)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(8rem, 12rem) 1fr',
                    gap: '1.5rem',
                    alignItems: 'baseline',
                  }}
                >
                  <h3
                    className="font-mono"
                    style={{
                      fontSize: 'var(--text-lg)',
                      color: 'var(--color-text-primary)',
                      letterSpacing: '0.02em',
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </h3>
                  <p
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: 'var(--text-md)',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow">Want it for your workflows</p>
            <h2 className="section-title text-balance">
              Free audit. We&apos;ll map your stack against ours.
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
