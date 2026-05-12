import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms covering use of www.digitalpointllc.com, the audit form, the diagnostic tool, the Cosmo chat surface, and any engagement Digital Point LLC enters with you.',
  alternates: { canonical: 'https://www.digitalpointllc.com/terms-of-service' },
};

const lastUpdated = 'May 12, 2026';

const sections = [
  {
    title: '1. Acceptance',
    body: [
      'Using www.digitalpointllc.com or submitting any form on the site constitutes acceptance of these terms. If you do not agree, do not use the service. These terms govern the marketing site and the pre-engagement surfaces only. Active engagements are covered by a separate Master Services Agreement (MSA) signed at pilot or retainer stage.',
    ],
  },
  {
    title: '2. The service',
    body: [
      'Digital Point LLC offers three customer-facing surfaces on this site: the free audit form at /audit, the agent recovery service entry at /recovery, and the production-readiness diagnostic at /diagnostic. The diagnostic is informational only and produces a self-scored result that does not constitute a professional audit. The audit form is a request for a 45-minute consultation; submission does not create a contractual obligation on either side.',
      'Pricing displayed on /pricing is the standard rate card. Custom scope is priced at discovery. We reserve the right to update rates with 30 days notice; rates locked at pilot or retainer commencement remain in effect for the term of that engagement.',
    ],
  },
  {
    title: '3. Acceptable use',
    body: [
      'Do not submit forms with intent to harass, defraud, or extract free consulting time without good-faith engagement intent. Do not attempt to overwhelm rate limits or probe for security weaknesses. Do not submit content that is unlawful, defamatory, infringing, or that you do not have authority to share.',
      'BotID protection is active on form endpoints. Repeated submissions from a single IP or device may be rate-limited or blocked.',
    ],
  },
  {
    title: '4. Intellectual property',
    body: [
      'The site design, copy, brand mark, photography (when added), and source code are property of Digital Point LLC. The blog content under /blog and /guides is published under standard copyright; attributed sharing is welcome with a link back to the source. The runbooks open-sourced on Github carry their stated license (typically MIT or Apache 2.0).',
      'You retain all rights to information you submit through forms; we use it only to deliver the service per our Privacy Policy.',
    ],
  },
  {
    title: '5. Disclaimers',
    body: [
      'The site and the diagnostic tool are provided "as is." We do not warrant that the site will be uninterrupted or error-free, or that the diagnostic produces a complete picture of any specific agent stack. The full 30-criteria recovery audit, sold as a fixed-fee engagement, is the only product we represent as a complete audit.',
      'AI-agent operations carry inherent risk including model drift, vendor changes, downstream API instability, and emergent behavior. We mitigate against these with observability, retries, kill-switches, and operator escalation, but we do not warrant zero-defect operation.',
    ],
  },
  {
    title: '6. Limitation of liability',
    body: [
      'To the maximum extent permitted by law, Digital Point LLC is not liable for indirect, incidental, consequential, special, or punitive damages arising from use of the site. For engagements, liability caps are set at the fee paid in the prior 90 days and detailed in the MSA.',
    ],
  },
  {
    title: '7. Governing law',
    body: [
      'These terms are governed by the laws of the State of Delaware, United States. Disputes will be resolved in the state or federal courts located in Delaware unless arbitration is mutually agreed.',
    ],
  },
  {
    title: '8. Changes',
    body: [
      'We may revise these terms as the service evolves. The most recent revision date appears in the header above. Material changes are communicated to active clients via the next engagement report.',
    ],
  },
  {
    title: '9. Contact',
    body: [
      'For terms questions, reach a co-founder via the audit form at /audit with subject "Legal request." We respond within 30 days, usually within 5 business days.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://www.digitalpointllc.com' },
        { name: 'Terms', item: 'https://www.digitalpointllc.com/terms-of-service' },
        ]}
      />
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Terms of Service · Last updated {lastUpdated}</span>
          </div>

          <h1 className="hero-title text-balance">
            Plain <span className="hero-title__amber">terms</span>.<br />
            No surprises.
          </h1>

          <p className="hero-sub text-pretty">
            Terms covering the marketing site and the pre-engagement surfaces. Active
            engagements are governed by a separate Master Services Agreement signed
            at pilot or retainer stage.
          </p>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div style={{ maxWidth: '52rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {sections.map((s) => (
              <article key={s.title}>
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Ready to engage</p>
            <h2 className="section-title text-balance">Free audit. Written plan in 5 days.</h2>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: 0 }}>
              <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
              <Link href="/privacy-policy" className="btn btn-ghost">Privacy policy</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
