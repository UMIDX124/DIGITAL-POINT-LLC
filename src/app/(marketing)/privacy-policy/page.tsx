import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Digital Point LLC collects, processes, and protects personal information across the marketing site, the audit form, the diagnostic tool, and the Cosmo chat surface.',
  alternates: { canonical: 'https://www.digitalpointllc.com/privacy-policy' },
};

const lastUpdated = 'May 12, 2026';

const sections = [
  {
    id: 'who-we-are',
    title: '1. Who we are',
    body: [
      'Digital Point LLC is a US-LLC registered in Wilmington, Delaware. We operate production AI agent stacks for B2B SaaS, e-commerce, and professional-services clients. This policy covers personal information we collect through digitalpointllc.com, the audit form, the diagnostic tool, and the Cosmo on-site chat.',
      'Contact for privacy questions: reach a co-founder via the audit form at /audit. We do not operate a generic support inbox.',
    ],
  },
  {
    id: 'what-we-collect',
    title: '2. Information we collect',
    body: [
      'Audit form submissions (/audit): name, email, company name, current ad spend range, and a free-text challenge description you choose to share. We collect a UTM source/medium/campaign trio when present in the URL.',
      'Cosmo chat (/api/chat): the conversation transcript and a session-scoped identifier. Transcripts are retained for service-quality review for 30 days, then deleted.',
      'Newsletter submissions (/api/newsletter): email only.',
      'Diagnostic tool (/diagnostic): runs entirely in your browser. We do not collect or store your answers or score unless you submit them through a follow-up form.',
      'Technical: IP address (for rate-limiting on POST routes only), user-agent string, viewport size for responsive rendering. We do not maintain persistent IP logs beyond the rate-limit window (60 minutes).',
      'Analytics: Vercel Analytics + Vercel Speed Insights, gated behind the cookie consent banner. If you decline, neither runs. We do not load Google Analytics, Facebook Pixel, or any other third-party tracking.',
    ],
  },
  {
    id: 'how-we-use',
    title: '3. How we use information',
    body: [
      'Service delivery. To reply to your audit request, route it to the right co-founder, send written deployment plans, and operate any engagement you commit to.',
      'Improving the service. Aggregated, identifier-removed analytics on which pages get used and where users drop off. Never resold.',
      'Legal and security. To comply with subpoenas, court orders, and tax obligations. To defend against fraud and abuse on our forms.',
      'We do not sell, rent, or share personal information with advertisers or data brokers.',
    ],
  },
  {
    id: 'vendors',
    title: '4. Subprocessors',
    body: [
      'We use a small set of vendors to deliver the service. Each is bound by a Data Processing Agreement.',
    ],
    table: [
      ['Vendor', 'Purpose', 'Data category'],
      ['Vercel Inc.', 'Hosting, edge functions, analytics, speed insights', 'IP (transient), interaction events, form payloads in transit'],
      ['Anthropic PBC', 'Claude inference for Cosmo chat + planner reasoning', 'Transcript content during inference; zero data retention'],
      ['Groq Inc.', 'Llama-3 inference for high-throughput agent steps', 'Prompt content during inference; zero data retention'],
      ['OpenAI', 'Optional model alternative on selected workflows', 'Prompt content during inference'],
      ['Neon Inc.', 'PostgreSQL database for audit form submissions', 'Form payloads + audit log'],
      ['Resend / SMTP provider', 'Transactional email delivery', 'Sender, recipient, subject, body'],
      ['Vercel BotID', 'Bot detection on form endpoints', 'Anonymized challenge-response data'],
    ],
  },
  {
    id: 'data-protection',
    title: '5. Data protection',
    body: [
      'All traffic served over HTTPS with HSTS preload (max-age 2 years, includeSubDomains).',
      'Content Security Policy headers restrict inline scripts to a documented allowlist (Vercel Analytics, Vercel Speed Insights, BotID).',
      'API endpoints (audit, founder, leads) protected by BotID + per-IP rate limiting.',
      'Database access is service-account-scoped. Co-founder review on every audit submission before any operational handoff.',
      'For engagement deployments: a DPA is signed with you at pilot stage. Agents run with read-only or least-privilege credentials. PII is redacted from live observability streams (Slack Connect) before posting.',
    ],
  },
  {
    id: 'your-rights',
    title: '6. Your rights',
    body: [
      'GDPR-equivalent rights apply to all users regardless of geography. You may request access to, correction of, or deletion of personal information we hold about you.',
      'To exercise any right, submit the request through the audit form at /audit with subject line "Privacy request." We respond within 30 days, usually within 5 business days.',
      'You may opt out of analytics at any time by clicking the cookie banner reset link in /cookies or by clearing the dpl_cookie_consent localStorage value.',
    ],
  },
  {
    id: 'children',
    title: '7. Children',
    body: [
      'The service is B2B and not directed to anyone under 16. We do not knowingly collect information from children.',
    ],
  },
  {
    id: 'changes',
    title: '8. Changes to this policy',
    body: [
      'We revise this policy as the service evolves. Material changes are dated at the top of this page and announced via the next monthly engagement report to active clients. The most recent revision date is in the header.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://www.digitalpointllc.com' },
        { name: 'Privacy', item: 'https://www.digitalpointllc.com/privacy-policy' },
        ]}
      />
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Privacy Policy · Last updated {lastUpdated}</span>
          </div>

          <h1 className="hero-title text-balance">
            What we <span className="hero-title__amber">collect</span>.<br />
            What we don&rsquo;t.
          </h1>

          <p className="hero-sub text-pretty">
            Digital Point LLC operates AI agent infrastructure on behalf of B2B clients.
            This page explains what data we process on digitalpointllc.com and on
            the engagements that follow. Written plain, no dark patterns.
          </p>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div style={{ maxWidth: '52rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {sections.map((s) => (
              <article key={s.id} id={s.id}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                    color: 'var(--color-text-primary)',
                    marginBlockEnd: '1rem',
                  }}
                >
                  {s.title}
                </h2>
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: 'var(--text-md)',
                      lineHeight: 1.7,
                      marginBlockEnd: '1rem',
                    }}
                  >
                    {p}
                  </p>
                ))}
                {s.table ? (
                  <div
                    style={{
                      marginBlockStart: '1.5rem',
                      border: '1px solid var(--color-line-faint)',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      background: 'var(--color-canvas-raised)',
                    }}
                  >
                    {s.table.map((row, ri) => (
                      <div
                        key={ri}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1.5fr 1.5fr',
                          background: ri === 0 ? 'var(--color-canvas-elevated)' : 'transparent',
                          borderBlockEnd: ri < s.table!.length - 1 ? '1px solid var(--color-line-faint)' : 'none',
                          fontSize: 'var(--text-sm)',
                        }}
                      >
                        {row.map((cell, ci) => (
                          <div
                            key={ci}
                            style={{
                              padding: '0.875rem 1rem',
                              color: ri === 0 ? 'var(--color-text-tertiary)' : 'var(--color-text-secondary)',
                              fontFamily: ri === 0 ? 'var(--font-mono)' : undefined,
                              letterSpacing: ri === 0 ? '0.08em' : undefined,
                              textTransform: ri === 0 ? 'uppercase' : undefined,
                              fontSize: ri === 0 ? '0.6875rem' : 'var(--text-sm)',
                            }}
                          >
                            {cell}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Questions about this policy</p>
            <h2 className="section-title text-balance">Reach a co-founder directly.</h2>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: 0 }}>
              <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
              <Link href="/cookies" className="btn btn-ghost">Cookie settings</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
