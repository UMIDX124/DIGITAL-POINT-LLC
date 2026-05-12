import type { Metadata } from 'next';
import Link from 'next/link';
import { PersonSchema } from '@/components/seo/PersonSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Digital Point LLC operates production AI agent stacks for B2B SaaS, e-commerce ops, and professional services teams. Founded 2017. Co-founders sign off on every engagement.',
  alternates: { canonical: 'https://www.digitalpointllc.com/about' },
  openGraph: {
    title: 'About Digital Point LLC',
    description: 'Production AI agent operations agency. US-LLC. Founded 2017.',
    url: 'https://www.digitalpointllc.com/about',
    type: 'website',
  },
};

const founders = [
  {
    name: 'M. Faizan Rafiq',
    role: 'Co-Founder',
    initials: 'MF',
    bio: 'Built the operations side of Digital Point. Eight-plus years running paid acquisition, attribution, and lead pipelines for growth-stage companies. Shipped the first agent stack out of necessity after watching too many ops hires churn through the same playbook.',
    href: 'https://linkedin.com/in/faizanrafiq',
  },
  {
    name: 'Anwaar Tayyab',
    role: 'Co-Founder',
    initials: 'AT',
    bio: 'Built the analytics and reporting infrastructure side. Turns messy data into clear weekly narratives. Treats every broken funnel like a puzzle. Writes the production runbooks every DPL agent ships with.',
    href: 'https://linkedin.com/in/anwaartayyab',
  },
];

const values = [
  {
    title: 'Production-grade or it doesn\'t ship',
    desc: 'Every agent gets observability, retries, kill-switches, and an operator on call. No demo-stage deployments dressed as production.',
  },
  {
    title: 'Co-founders sign off',
    desc: 'No junior account manager fronting your engagement. The people who built DPL review every audit, pilot, and runbook before delivery.',
  },
  {
    title: 'Transparent pricing',
    desc: 'No agency in our market publishes pricing. We do. $2,500 pilots, $2,500 retainers, $5K diagnostics, $10K fixes. Fixed-fee.',
  },
  {
    title: 'Radical observability',
    desc: 'Every client gets a Slack channel where every agent decision is posted in real time. Platforms hide what their agents do. We show everything.',
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://www.digitalpointllc.com' },
        { name: 'About', item: 'https://www.digitalpointllc.com/about' },
        ]}
      />
      <PersonSchema
        name="M. Faizan Rafiq"
        jobTitle="Co-Founder"
        url="https://www.digitalpointllc.com/about"
        description="Co-founded Digital Point LLC in 2017. Operates the lead operations and paid acquisition side. Built the first DPL agent stack."
      />
      <PersonSchema
        name="Anwaar Tayyab"
        jobTitle="Co-Founder"
        url="https://www.digitalpointllc.com/about"
        description="Co-founded Digital Point LLC in 2017. Operates the analytics, attribution, and reporting infrastructure side of the firm."
      />

      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>About · DPL · 2017 → NOW</span>
          </div>

          <h1 className="hero-title text-balance">
            We started running operations.<br />
            We <span className="hero-title__amber">evolved</span> into running them with AI.
          </h1>

          <p className="hero-sub text-pretty">
            Digital Point LLC was founded in 2017. We spent five years operating
            campaigns, lead pipelines, and reporting stacks for growth-stage businesses
            by hand. The bigger unlock was never the human heroics. It was building
            agents and automation that ran the work, with operators auditing the edges.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
            <Link href="/process" className="btn btn-ghost">How an engagement runs</Link>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow eyebrow--accent">Co-founders</p>
            <h2 className="section-title text-balance">
              Two operators who shipped agents before agents were a category.
            </h2>
          </div>

          <div className="pillar-grid" style={{ marginBlockStart: '3rem' }}>
            {founders.map((f) => (
              <article key={f.name} className="pillar-card" style={{ gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 12,
                      background: 'var(--color-canvas-bright)',
                      border: '1px solid var(--color-line-soft)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-accent)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-md)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {f.initials}
                  </div>
                  <div>
                    <h3
                      className="font-display"
                      style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}
                    >
                      {f.name}
                    </h3>
                    <p
                      className="font-mono"
                      style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', letterSpacing: '0.12em' }}
                    >
                      {f.role.toUpperCase()}
                    </p>
                  </div>
                </div>
                <p className="pillar-card__desc">{f.bio}</p>
                <div className="pillar-card__link">
                  <a href={f.href} target="_blank" rel="noopener noreferrer" className="btn-link">
                    LinkedIn
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow">How we work</p>
            <h2 className="section-title text-balance">Four principles that drive every engagement.</h2>
          </div>

          <div className="pillar-grid pillar-grid--three" style={{ marginBlockStart: '3rem' }}>
            {values.map((v) => (
              <article key={v.title} className="pillar-card">
                <h3 className="pillar-card__title">{v.title}</h3>
                <p className="pillar-card__desc">{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Let&apos;s talk</p>
            <h2 className="section-title text-balance">
              Free 45-minute audit with a co-founder.
            </h2>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: 0 }}>
              <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
              <Link href="/recovery" className="btn btn-ghost">Recover a broken agent</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
