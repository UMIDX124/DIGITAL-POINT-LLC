import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { FlowDiagram } from '@/components/brand/FlowDiagram';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach a co-founder. No generic support inbox. We answer through Cosmo (on-site chat) or our audit form. Inquiries route to the operator best matched to your stage.',
  alternates: { canonical: 'https://digitalpointllc.com/contact' },
  openGraph: {
    title: 'Contact Digital Point LLC',
    description: 'No generic support inbox. Reach a co-founder via the audit form or Cosmo chat.',
    url: 'https://digitalpointllc.com/contact',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact Digital Point LLC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Digital Point LLC',
    description: 'No generic support inbox. Reach a co-founder via the audit form or Cosmo chat.',
  },
};

const channels = [
  {
    label: 'Run the audit',
    desc: 'Free 45-minute call with a co-founder. Written deployment plan within 5 business days.',
    href: '/audit',
    cta: 'Book a free audit',
  },
  {
    label: 'Talk to Cosmo',
    desc: 'On-site chat. First-pass triage on operating hours. Routes to a co-founder if it makes sense.',
    href: '#cosmo',
    cta: 'Open the chat',
  },
  {
    label: 'Recovery diagnosis',
    desc: 'Your agent is broken? 30-criteria production audit. $5,000, 2 weeks, written report.',
    href: '/recovery',
    cta: 'Start the diagnosis',
  },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://digitalpointllc.com' },
        { name: 'Contact', item: 'https://digitalpointllc.com/contact' },
        ]}
      />
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Contact · Routed directly · 1 business day</span>
          </div>

          <h1 className="hero-title text-balance">
            We <span className="hero-title__amber">read</span> every message.
          </h1>

          <p className="hero-sub text-pretty">
            No generic support inbox. Most agencies hide behind a hello@ queue where
            your message lines up with everyone else&apos;s. Reach a co-founder through
            the audit form or Cosmo. Inquiry routes to the operator best matched to
            your stage.
          </p>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center" style={{ marginBlockEnd: '3rem' }}>
            <p className="eyebrow">What happens after you submit</p>
            <h2 className="section-title text-balance">
              Three steps. One business day.
            </h2>
          </div>
          <FlowDiagram
            steps={[
              { label: 'Submit', sublabel: 'form or Cosmo chat', status: 'done' },
              { label: 'Co-founder reads', sublabel: 'no shared inbox', status: 'active' },
              { label: 'Reply', sublabel: 'within 1 business day', status: 'pending' },
            ]}
          />
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="pillar-grid pillar-grid--three">
            {channels.map((c) => (
              <article key={c.label} className="pillar-card">
                <span className="pillar-card__index">Channel</span>
                <h3 className="pillar-card__title">{c.label}</h3>
                <p className="pillar-card__desc">{c.desc}</p>
                <div className="pillar-card__link">
                  <Link href={c.href} className="btn-link">{c.cta}</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow">Operating address</p>
            <h2 className="section-title text-balance">
              Digital Point LLC · Wilmington, Delaware
            </h2>
            <p className="section-desc text-pretty">
              United States · Distributed operators · Response within 1 business day
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
