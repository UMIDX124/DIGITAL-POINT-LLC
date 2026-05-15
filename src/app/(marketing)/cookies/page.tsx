import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ReopenCookieBannerButton } from './ReopenCookieBannerButton';

const sections = [
  {
    title: 'What we use',
    body: [
      'A single localStorage flag named dpl_cookie_consent that stores one of three values: "accepted" (analytics on), "necessary" (analytics off), or null (banner not yet answered).',
      'No third-party cookies. No Google Analytics, no Facebook Pixel, no LinkedIn Insight Tag, no advertising trackers of any kind.',
    ],
  },
  {
    title: 'When you accept',
    body: [
      'Vercel Analytics and Vercel Speed Insights initialize. Both collect anonymized interaction events and Core Web Vitals at the 75th percentile. Neither identifies you personally.',
    ],
  },
  {
    title: 'When you decline',
    body: [
      'Nothing initializes. The dpl_cookie_consent flag is set to "necessary" and analytics scripts do not run on any subsequent page view in this browser.',
    ],
  },
  {
    title: 'How to reset',
    body: [
      'Use the button below to re-open the banner. Or clear the dpl_cookie_consent value in your browser\'s localStorage for digitalpointllc.com.',
    ],
  },
];

export default function CookiesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
        { name: 'Home', item: 'https://www.digitalpointllc.com' },
        { name: 'Cookies', item: 'https://www.digitalpointllc.com/cookies' },
        ]}
      />
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Cookies · Minimal analytics · No trackers</span>
          </div>

          <h1 className="hero-title text-balance">
            One <span className="hero-title__amber">flag</span>.<br />
            No third-party cookies.
          </h1>

          <p className="hero-sub text-pretty">
            We do not run advertising trackers on this site. The cookie banner sets
            one localStorage value. Decline and nothing initializes. Accept and Vercel
            Analytics plus Speed Insights collect anonymized usage data.
          </p>

          <div className="hero-cta-row">
            <ReopenCookieBannerButton />
          </div>
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
            <p className="eyebrow eyebrow--accent">More detail</p>
            <h2 className="section-title text-balance">See the full privacy policy.</h2>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: 0 }}>
              <Link href="/privacy-policy" className="btn btn-primary">Privacy policy</Link>
              <Link href="/terms-of-service" className="btn btn-ghost">Terms of service</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
