import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ServiceSchema } from '@/components/seo/ServiceSchema';
import { PRICING_CONFIG } from '@/lib/pricing-config';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent pricing. Audit free. Pilot $2,500 fixed for 30 days. Retainer $2,500 / month. Recovery service: diagnosis $5,000 / fix $10,000. Growth Suite: $1,150 / month.',
  alternates: { canonical: 'https://www.digitalpointllc.com/pricing' },
  openGraph: {
    title: 'Pricing',
    description:
      'Audit free. Pilot $2,500 fixed for 30 days. Retainer $2,500 / month. Recovery diagnosis $5,000. Growth Suite $1,150 / month.',
    url: 'https://www.digitalpointllc.com/pricing',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Digital Point. Transparent pricing.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing',
    description: 'Audit free. Pilot $2,500. Retainer $2,500/m. Growth Suite $1,150/m. We publish what the market hides.',
    images: ['/og-image.png'],
  },
};

const tiers = [
  {
    name: 'Audit',
    price: PRICING_CONFIG.core.audit.formatted,
    cadence: '45 min · 5-day plan',
    desc: 'Co-founder review of your stack, attribution, team, funnel. Deployment-ready blueprint. No retainer attached. If we can\'t help, we say so.',
    bullets: ['Written deployment plan', 'Co-founder reviews your stack', 'Five business days to delivery'],
    cta: { label: 'Book a free audit', href: '/audit', primary: true },
  },
  {
    name: 'Pilot',
    price: PRICING_CONFIG.core.pilot.formatted,
    cadence: 'Fixed · 30 days · one workflow',
    desc: 'We scope, build, and operate one workflow for 30 days. You own the runbooks. Real-time Slack channel on day one. Decide whether to continue at the end.',
    bullets: [
      'One workflow scoped + deployed',
      'Operator audits on every exception',
      'Slack Connect channel with full visibility',
      'Cancel any month, no annual lock-in',
    ],
    cta: { label: 'Start a pilot', href: '/audit', primary: false },
  },
  {
    name: 'Retainer',
    price: PRICING_CONFIG.core.retainer.formatted,
    cadence: 'Per month · cancel any month, no annual lock-in',
    desc: 'Ongoing operation of the workflow portfolio. Replacements, updates, monitoring, monthly written report. Replace $400K of in-house ops for $30K a year.',
    bullets: [
      'Continuous workflow operation',
      'Replacements and updates as we go',
      'Monthly narrative report',
      'Cancel any month, no annual lock-in',
    ],
    cta: { label: 'Talk to a co-founder', href: '/audit', primary: false },
  },
  {
    name: 'Growth',
    price: PRICING_CONFIG.tier1.formatted,
    cadence: 'Per month · cancel any month, no annual lock-in',
    desc: 'Unify Organic SEO, local Google Map optimization, citation sync, and consistent social media post scheduling under a single co-founder managed subscription.',
    bullets: [
      'SEO Strategy & Technical Optimization',
      'Google Business Profile (GMB) Management',
      'Citation Pages Audit & Sync',
      'Social Media Management',
    ],
    cta: { label: 'Secure the Growth Suite', href: '#growth-suite', primary: false },
  },
];

const recovery = [
  {
    name: 'Diagnosis',
    price: PRICING_CONFIG.recovery.diagnosis.formatted,
    cadence: '2 weeks',
    desc: 'Audit your existing agent stack against 30 production criteria. Written report plus 1-hour walkthrough.',
  },
  {
    name: 'Fix',
    price: PRICING_CONFIG.recovery.fix.formatted,
    cadence: '4 weeks',
    desc: 'Production patch with proper observability, retries, rollback. Runbooks delivered to your team.',
  },
];

export default function PricingPage() {
  const gPrice = PRICING_CONFIG.tier1.formatted;
  const seoPrice = PRICING_CONFIG.standalone.seo.formatted;
  const gmbPrice = PRICING_CONFIG.standalone.gmb.formatted;
  const citationsPrice = PRICING_CONFIG.standalone.citations.formatted;
  const socialPrice = PRICING_CONFIG.standalone.social.formatted;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: 'https://www.digitalpointllc.com' },
          { name: 'Pricing', item: 'https://www.digitalpointllc.com/pricing' },
        ]}
      />
      <ServiceSchema
        name="DPL Pricing · Audit, Pilot, Retainer, Growth"
        description={`Published-price managed service: free audit, $2,500 fixed pilot for 30 days, $2,500 per month retainer. Recovery ladder: $5,000 diagnosis, $10,000 fix, and ${gPrice}/mo growth suite (SEO, GMB, citations, social).`}
        url="https://www.digitalpointllc.com/pricing"
        serviceTypes={[
          'Free Audit',
          'Pilot Engagement',
          'Monthly Retainer',
          'Recovery Diagnosis',
          'Recovery Fix',
          'SEO Strategy & Optimization',
          'Google My Business Management',
          'Citation Pages Audit & Sync',
          'Social Media Management',
          'All-in-One Growth Package'
        ]}
      />
      
      <section className="hero hero--pillar-brief" id="hero">
        <div className="dpl-section__rail" aria-hidden="true">
          <span className="dpl-section__rail-label">Section 07 · Pricing</span>
        </div>
        <div className="dpl-section__page" aria-hidden="true">p.07 / p.09</div>
        <div className="hero-inner">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow__rule" aria-hidden="true" />
            Pricing · Transparent · USD
          </p>

          <h1 className="hero-title hero-title--ob">
            No agency in our market <span className="hero-title__amber">publishes</span> pricing.<br />
            We do.
          </h1>

          <p className="hero-sub text-pretty">
            <mark className="dpl-mark">We charge less because the AI runs it</mark>, operators audit, co-founders sign off.
            No 6-person account team you&rsquo;re funding.
          </p>

          <table className="dpl-pillar-tiers" aria-label="Pricing tiers">
            <tbody>
              <tr className="dpl-pillar-tiers__row">
                <th scope="row">AUDIT</th>
                <td className="dpl-pillar-tiers__price">FREE</td>
                <td>45 min · co-founder review · 5-day plan</td>
                <td>
                  <Link href="#audit-tier" className="dpl-pillar-tiers__link">Details</Link>
                </td>
              </tr>
              <tr className="dpl-pillar-tiers__row dpl-pillar-tiers__row--accent">
                <th scope="row">PILOT</th>
                <td className="dpl-pillar-tiers__price">$2,500</td>
                <td>Fixed · 30 days · one workflow</td>
                <td>
                  <Link href="#pilot-tier" className="dpl-pillar-tiers__link">Details</Link>
                </td>
              </tr>
              <tr className="dpl-pillar-tiers__row">
                <th scope="row">RETAINER</th>
                <td className="dpl-pillar-tiers__price">$2,500 / mo</td>
                <td>Cancel any month · no annual lock-in</td>
                <td>
                  <Link href="#retainer-tier" className="dpl-pillar-tiers__link">Details</Link>
                </td>
              </tr>
              <tr className="dpl-pillar-tiers__row">
                <th scope="row">Growth</th>
                <td className="dpl-pillar-tiers__price">{gPrice} / mo</td>
                <td>Cancel any month · no annual lock-in</td>
                <td>
                  <Link href="#growth-suite" className="dpl-pillar-tiers__link">Details</Link>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="hero-cta-row">
            <Link href="/audit" className="dpl-btn dpl-btn--ink">Book a free audit</Link>
            <Link href="#recovery-pricing" className="dpl-btn dpl-btn--ghost">Recovery pricing</Link>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow">Build engagement</p>
            <h2 className="section-title text-balance">Transparent, fixed pricing.</h2>
          </div>

          <div className="pillar-grid pillar-grid--four" style={{ marginBlockStart: '3rem' }}>
            {tiers.map((t) => (
              <article key={t.name} id={`${t.name.toLowerCase()}-tier`} className="pillar-card">
                <span className="pillar-card__index">{t.name}</span>
                <h3
                  className="font-mono"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 600,
                    color: t.name === 'Pilot' ? 'var(--color-accent-text)' : 'var(--color-text-primary)',
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
                    className={t.cta.primary ? 'dpl-btn dpl-btn--ink' : 'dpl-btn dpl-btn--ghost'}
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

      <section className="section section-divider" id="growth-suite">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow eyebrow--accent">All-in-One Package · Growth & Visibility</p>
            <h2 className="section-title text-balance">
              Growth & Visibility Suite
            </h2>
            <p className="section-desc text-pretty">
              High-touch, expert management at a small-business rate. Modular options or the complete bundle.
            </p>
          </div>

          <div className="pillar-grid pillar-grid--four" style={{ marginBlockStart: '3rem' }}>
            <article className="pillar-card">
              <span className="pillar-card__index">01 · SEO</span>
              <h3
                className="font-mono"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1,
                }}
              >
                {seoPrice}
              </h3>
              <p
                style={{
                  color: 'var(--color-text-tertiary)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Per month
              </p>
              <p className="pillar-card__desc">
                Custom strategy, on-page optimization, and continuous keyword tracking.
              </p>
            </article>

            <article className="pillar-card">
              <span className="pillar-card__index">02 · GMB</span>
              <h3
                className="font-mono"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1,
                }}
              >
                {gmbPrice}
              </h3>
              <p
                style={{
                  color: 'var(--color-text-tertiary)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Per month
              </p>
              <p className="pillar-card__desc">
                Weekly profile updates, review management strategy, and local map ranking.
              </p>
            </article>

            <article className="pillar-card">
              <span className="pillar-card__index">03 · Citations</span>
              <h3
                className="font-mono"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1,
                }}
              >
                {citationsPrice}
              </h3>
              <p
                style={{
                  color: 'var(--color-text-tertiary)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Per month
              </p>
              <p className="pillar-card__desc">
                Manual, clean submissions on top-tier business directories for consistent NAP listings.
              </p>
            </article>

            <article className="pillar-card">
              <span className="pillar-card__index">04 · Social</span>
              <h3
                className="font-mono"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1,
                }}
              >
                {socialPrice}
              </h3>
              <p
                style={{
                  color: 'var(--color-text-tertiary)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Per month
              </p>
              <p className="pillar-card__desc">
                Consistent, branded content tailored specifically to your target audience.
              </p>
            </article>
          </div>

          <div
            style={{
              marginBlockStart: '2rem',
              padding: '2rem',
              background: 'var(--color-canvas-raised)',
              border: '1px solid var(--color-accent-text)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: 'var(--color-accent-text)',
                textTransform: 'uppercase',
              }}
            >
              All-in-One Package
            </span>
            <h3
              className="font-mono"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 700,
                color: 'var(--color-accent-text)',
                margin: 0,
                lineHeight: 1,
              }}
            >
              {gPrice}
            </h3>
            <p
              style={{
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                margin: 0,
              }}
            >
              Total Monthly Investment
            </p>
            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-base)',
                maxWidth: '38rem',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              <strong>The Verdict:</strong> Best ROI. High-touch, expert management at a small-business rate. Integrates all four growth channels seamlessly under DPL operations.
            </p>
            <div style={{ marginBlockStart: '1rem' }}>
              <Link href="/audit" className="dpl-btn dpl-btn--ink">
                Secure the Growth Suite
              </Link>
            </div>
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
                    color: 'var(--color-accent-text)',
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
              <Link href="/audit" className="dpl-btn dpl-btn--ink">Book a free audit</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
