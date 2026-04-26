import type { Metadata } from 'next';
import { Section, Container, FadeUp } from '@/components/ui-dp/AnimatedElements';

export const metadata: Metadata = {
  title: 'Cookies | Digital Point LLC',
  description:
    'Cookie disclosure for Digital Point LLC. The exact cookies and storage we use, why, and how to opt out.',
  alternates: { canonical: 'https://digitalpointllc.com/cookies' },
  openGraph: {
    title: 'Cookies | Digital Point LLC',
    description: 'Cookie disclosure for Digital Point LLC.',
    url: 'https://digitalpointllc.com/cookies',
  },
};

const COOKIES = [
  {
    name: 'Vercel Analytics',
    type: 'First-party · Vercel-hosted',
    purpose:
      "Aggregate page-view metrics for the marketing site. No personal identifiers, no cross-site tracking, no third-party ad cookies. Vercel's privacy posture: https://vercel.com/legal/privacy-policy.",
    optOut:
      'Disable JavaScript or use a tracking-blocker. We do not require consent because Vercel Analytics is privacy-first by design (no IP collection, no individual user IDs).',
  },
  {
    name: 'Vercel Speed Insights',
    type: 'First-party · Vercel-hosted',
    purpose:
      'Real-user performance measurements (LCP, INP, CLS) so we can fix actual page-speed issues. Aggregate only, no personal identifiers.',
    optOut: 'Same as Vercel Analytics — disable JS or block the analytics endpoint.',
  },
  {
    name: 'sessionStorage: dpl_i',
    type: 'First-party · session-scoped browser storage',
    purpose:
      'Marks whether you have already seen the intro loader animation in this browser session, so it does not replay on every page navigation.',
    optOut:
      'Clear browser session storage from your devtools. The flag self-clears when you close the browser tab.',
  },
];

export default function CookiesPage() {
  return (
    <Section>
      <Container>
        <FadeUp>
          <h1
            className="font-display text-white"
            style={{
              fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
              fontWeight: 600,
              lineHeight: 'var(--lh-tight)',
              letterSpacing: 'var(--ls-tight)',
              marginBottom: '1.5rem',
              maxWidth: 'var(--maxw-heading-display)',
            }}
          >
            Cookies & browser storage
          </h1>
          <p
            className="font-body"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: 'var(--maxw-body)',
            }}
          >
            Honest disclosure of every cookie and browser-storage entry the
            Digital Point marketing site sets. We deliberately keep this list
            short — no third-party advertising cookies, no cross-site
            trackers, no fingerprinting. If anything below changes, this page
            updates with it.
          </p>

          <div className="space-y-8" style={{ maxWidth: 'var(--maxw-body)' }}>
            {COOKIES.map((c) => (
              <div
                key={c.name}
                className="rounded-xl p-6"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <h2
                  className="font-display"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {c.name}
                </h2>
                <p
                  className="font-mono uppercase"
                  style={{
                    fontSize: 'var(--text-micro)',
                    letterSpacing: '0.12em',
                    color: 'var(--text-tertiary)',
                    marginBottom: '1rem',
                  }}
                >
                  {c.type}
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem',
                  }}
                >
                  <strong className="text-white">Why:</strong> {c.purpose}
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  <strong className="text-white">Opt out:</strong> {c.optOut}
                </p>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl p-6 mt-12"
            style={{
              background: 'rgba(255, 136, 0, 0.08)',
              border: '1px solid rgba(255, 136, 0, 0.2)',
              maxWidth: 'var(--maxw-body)',
            }}
          >
            <p
              className="font-body"
              style={{
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                lineHeight: 1.6,
              }}
            >
              <strong>Questions or removal requests:</strong> reach out via
              Cosmo on the homepage or the{' '}
              <a href="/free-growth-audit" style={{ color: 'var(--accent)' }}>
                audit form
              </a>{' '}
              and an operator will handle it from a personal account, not a
              ticket queue.
            </p>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
