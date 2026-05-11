import type { Metadata } from 'next';
import Link from 'next/link';
import { DiagnosticTool } from '@/components/diagnostic/DiagnosticTool';

export const metadata: Metadata = {
  title: 'Agent Production-Readiness Diagnostic',
  description:
    'Free 10-question diagnostic. Score your AI agent stack against 30 points of production criteria. Observability, retry logic, drift, cost guardrails, escalation, rollback. No email required.',
  alternates: { canonical: 'https://www.digitalpointllc.com/diagnostic' },
  openGraph: {
    title: 'Is your AI agent production-ready?',
    description:
      'Free 10-question diagnostic. Score your AI agent stack against 30 points of production criteria. No email required.',
    url: 'https://www.digitalpointllc.com/diagnostic',
    type: 'website',
  },
};

export default function DiagnosticPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Diagnostic · 10 questions · No email required</span>
          </div>

          <h1 className="hero-title text-balance">
            Is your AI agent <span className="hero-title__amber">production-ready</span>?
          </h1>

          <p className="hero-sub text-pretty">
            Ten yes/no/partial questions against the 30-point production checklist we
            use on every recovery audit. Score yourself in under 2 minutes. Result
            stays in your browser. The full recovery diagnosis covers 30 criteria over
            2 weeks for $5,000.
          </p>

          <div className="hero-cta-row">
            <Link href="#diagnostic" className="btn btn-primary">
              Start the diagnostic
            </Link>
            <Link href="/recovery" className="btn btn-ghost">
              Recovery service
            </Link>
          </div>
        </div>
      </section>

      <section className="section-divider" id="diagnostic">
        <DiagnosticTool />
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Not production-ready?</p>
            <h2 className="section-title text-balance">
              Recovery diagnosis covers all 30 criteria, not just 10.
            </h2>
            <p className="section-desc text-pretty">
              The full audit measures observability, retry logic, drift detection,
              cost variance, prompt-injection resistance, escalation paths, data
              security, and 23 more. Written report, 1-hour walkthrough call. $5,000.
            </p>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: 0 }}>
              <Link href="/recovery" className="btn btn-primary">Start a recovery diagnosis</Link>
              <Link href="/audit" className="btn btn-ghost">Book a free audit</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
