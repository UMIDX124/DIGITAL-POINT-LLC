import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ServiceSchema } from '@/components/seo/ServiceSchema';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent pricing. Audit free. Pilot $2,500 fixed for 30 days. Retainer $2,500 / month. Recovery service: diagnosis $5,000 / fix $10,000. The agency market does not publish pricing. We do.',
  alternates: { canonical: 'https://www.digitalpointllc.com/pricing' },
  openGraph: {
    title: 'Pricing',
    description:
      'Audit free. Pilot $2,500 fixed for 30 days. Retainer $2,500 / month. Recovery diagnosis $5,000. We publish what the market hides.',
    url: 'https://www.digitalpointllc.com/pricing',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Digital Point. Transparent pricing.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing',
    description: 'Audit free. Pilot $2,500. Retainer $2,500/m. We publish what the market hides.',
    images: ['/og-image.png'],
  },
};

const tiers = [
  {
    name: 'Audit',
    price: 'Free',
    cadence: '45 min · 5-day plan',
    desc: 'Co-founder review of your stack, attribution, team, funnel. Deployment-ready blueprint. No retainer attached. If we can\'t help, we say so.',
    bullets: ['Written deployment plan', 'No sales pitch', 'Co-founder reviews your setup'],
    cta: { label: 'Book a free audit', href: '/audit', primary: true },
  },
  {
    name: 'Pilot',
    price: '$2,500',
    cadence: 'Fixed · 30 days · one workflow',
    desc: 'We scope, build, and operate one workflow for 30 days. You own the runbooks. Real-time Slack channel on day one. Decide whether to continue at the end.',
    bullets: [
      'One workflow scoped + deployed',
      'Operator audits on every exception',
      'Slack Connect channel with full visibility',
      'Cancel after 30 days if you want',
    ],
    cta: { label: 'Start a pilot', href: '/audit', primary: false },
  },
  {
    name: 'Retainer',
    price: '$2,500',
    cadence: 'Per month · cancel any month',
    desc: 'Ongoing operation of the workflow portfolio. Replacements, updates, monitoring, monthly written report. Replace $400K of in-house ops for $30K a year.',
    bullets: [
      'Continuous workflow operation',
      'Replacements and updates as we go',
      'Monthly narrative report',
      'No annual lock-in',
    ],
    cta: { label: 'Talk to a co-founder', href: '/audit', primary: false },
  },
];

const recovery = [
  {
    name: 'Diagnosis',
    price: '$5,000',
    cadence: '2 weeks',
    desc: 'Audit your existing agent stack against 30 production criteria. Written report plus 1-hour walkthrough.',
  },
  {
    name: 'Fix',
    price: '$10,000',
    cadence: '4 weeks',
    desc: 'Production patch with proper observability, retries, rollback. Runbooks delivered to your team.',
  },
];

export default function PricingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://www.digitalpointllc.com' },
        { name: 'Pricing', item: 'https://www.digitalpointllc.com/pricing' },
        ]}
      />
      <ServiceSchema
        name="DPL Pricing — Audit, Pilot, Retainer"
        description="Published-price managed service: free audit, $2,500 fixed pilot for 30 days, $2,500 per month retainer. Recovery ladder: $5,000 diagnosis, $10,000 fix, $2,500/mo operate."
        url="https://www.digitalpointllc.com/pricing"
        serviceTypes={[
        'Free Audit',
        'Pilot Engagement',
        'Monthly Retainer',
        'Recovery Diagnosis',
        'Recovery Fix',
        ]}
      />
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Pricing · Transparent · USD</span>
          </div>

          <h1 className="hero-title text-balance">
            No agency in our market <span className="hero-title__amber">publishes</span> pricing.<br />
            We do.
          </h1>

          <p className="hero-sub text-pretty">
            Audit free. Pilot $2,500 fixed for 30 days. Retainer $2,500 per month. We
            charge less because the AI runs it, operators audit, co-founders sign off.
            No 6-person account team you&apos;re funding.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
            <Link href="#recovery-pricing" className="btn btn-ghost">Recovery pricing</Link>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow">Build engagement</p>
            <h2 className="section-title text-balance">Three steps, fixed pricing.</h2>
          </div>

          <div className="pillar-grid pillar-grid--three" style={{ marginBlockStart: '3rem' }}>
            {tiers.map((t) => (
              <article key={t.name} className={`pillar-card ${t.name === 'Pilot' ? '' : ''}`}>
                <span className="pillar-card__index">{t.name}</span>
                <h3
                  className="font-mono"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 600,
                    color: t.name === 'Pilot' ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    lineHeight: 1,
                    letterSpacing: '-0.025em',
                  }}
                >
                  {t.price}
                </h3>
                <p
                  style={{
                    color: 'var(--color-text-tertiary)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {t.cadence}
                </p>
                <p className="pillar-card__desc">{t.desc}</p>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  {t.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'flex-start',
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--text-sm)',
                        lineHeight: 1.55,
                      }}
                    >
                      <span style={{ color: 'var(--color-accent)' }}>·</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="pillar-card__link">
                  <Link
                    href={t.cta.href}
                    className={t.cta.primary ? 'btn btn-primary' : 'btn btn-ghost'}
                    style={{ width: '100%' }}
                  >
                    {t.cta.label}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider" id="recovery-pricing">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow eyebrow--accent">Recovery engagement</p>
            <h2 className="section-title text-balance">
              For agents you already shipped that have stopped working right.
            </h2>
            <p className="section-desc text-pretty">
              Pay for diagnosis up front. Decide whether to pay for the fix after you see
              the report. No retainer commitment.
            </p>
          </div>

          <div className="pillar-grid" style={{ marginBlockStart: '3rem' }}>
            {recovery.map((r) => (
              <article key={r.name} className="pillar-card">
                <span className="pillar-card__index">{r.name}</span>
                <h3
                  className="font-mono"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 600,
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                  }}
                >
                  {r.price}
                </h3>
                <p
                  style={{
                    color: 'var(--color-text-tertiary)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {r.cadence}
                </p>
                <p className="pillar-card__desc">{r.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow">No surprises</p>
            <h2 className="section-title text-balance">
              Everything is fixed-fee. No project overage. No usage surcharge.
            </h2>
            <p className="section-desc text-pretty">
              The retainer covers the workflow portfolio we agree to scope. If you want
              a new workflow, we quote it before we touch a keyboard.
            </p>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: '1rem' }}>
              <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
