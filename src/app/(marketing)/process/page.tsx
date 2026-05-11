import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Process',
  description:
    'How a DPL engagement runs. Free audit, $2,500 pilot, $2,500 monthly retainer. Slack Connect channel from day one. Operators audit every exception in real time.',
  alternates: { canonical: 'https://www.digitalpointllc.com/process' },
};

const phases = [
  {
    num: '01',
    label: 'Audit',
    price: 'Free · 45 min',
    title: 'Co-founder reviews your setup',
    detail:
      'A 45-minute call to map your repeatable work. We come prepared. We leave with a clear list of which workflows are agent-ready, which automation can stitch, where operators stay in the loop, and what we would deploy first if we ran a pilot together.',
    deliverables: [
      'Written deployment plan within 5 business days',
      'Workflow-by-workflow agent / automation / operator split',
      'Tooling integration map',
      'Honest assessment if we can\'t help',
    ],
  },
  {
    num: '02',
    label: 'Pilot',
    price: '$2,500 · 30 days · one workflow',
    title: 'One workflow, fully shipped',
    detail:
      'We scope, build, and operate one workflow for 30 days. We pick the workflow with the cleanest ROI signal, get it into production within the first week, and operate it through 30 days of real use. At the end you own the runbooks and decide whether to continue.',
    deliverables: [
      'Workflow built and shipped to production by day 7',
      'Slack Connect channel with live decision feed',
      'Daily exception log',
      'End-of-pilot retrospective with measured outcomes',
    ],
  },
  {
    num: '03',
    label: 'Retainer',
    price: '$2,500 / month · cancel any month',
    title: 'We run the portfolio',
    detail:
      'Ongoing operation of the workflow portfolio we ship together. Replacements when models change, updates when your stack changes, monitoring 24/7. Monthly written narrative covering what ran, what broke, what we fixed, and what we recommend next.',
    deliverables: [
      'Continuous workflow operation',
      'Replacements and updates without scope changes',
      'Operator audit on every exception',
      'Monthly narrative report',
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Process · Audit · Pilot · Retainer</span>
          </div>

          <h1 className="hero-title text-balance">
            How an engagement <span className="hero-title__amber">runs</span>.
          </h1>

          <p className="hero-sub text-pretty">
            Audit, pilot, retainer. In that order. Fixed pricing. No surprise scope.
            Cancel any month.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
            <Link href="/pricing" className="btn btn-ghost">See pricing</Link>
          </div>
        </div>
      </section>

      {phases.map((p, i) => (
        <section key={p.num} className={`section ${i > 0 ? 'section-divider' : 'section-divider'}`}>
          <div className="container-wide">
            <div className="section-header">
              <p className="eyebrow eyebrow--accent">
                {p.num} · {p.label} · {p.price}
              </p>
              <h2 className="section-title text-balance">{p.title}</h2>
              <p className="section-desc text-pretty">{p.detail}</p>
            </div>

            <div style={{ marginBlockStart: '2.5rem', maxWidth: '52rem' }}>
              <p
                className="font-mono"
                style={{
                  color: 'var(--color-text-tertiary)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  marginBlockEnd: '1rem',
                }}
              >
                Deliverables
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {p.deliverables.map((d) => (
                  <li
                    key={d}
                    style={{
                      display: 'flex',
                      gap: '0.625rem',
                      alignItems: 'flex-start',
                      color: 'var(--color-text-secondary)',
                      fontSize: 'var(--text-md)',
                      lineHeight: 1.55,
                    }}
                  >
                    <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>→</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow">Ready to start</p>
            <h2 className="section-title text-balance">
              Start with the audit. The rest follows or it doesn&apos;t.
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
