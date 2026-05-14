import Link from 'next/link';
import { MiniConsolePreview } from '@/components/brand/MiniConsolePreview';

const operatorActivity = [
  { time: '14:32', label: 'Operator handoff', detail: 'Faizan resolved a lead-routing edge case for Operations Ridge.' },
  { time: '13:08', label: 'Agent deployed', detail: 'CRM enrichment agent pushed to staging for a 7-person SaaS team.' },
  { time: '11:47', label: 'Audit replied', detail: 'Anwaar sent the written plan to a $4.2M ARR ops lead.' },
  { time: '09:15', label: 'Recovery diagnosed', detail: 'Diagnosed a hallucinating support agent at a fintech client.' },
];

export function HeroSection() {
  return (
    <section className="hero hero--operator-brief" id="hero">
      <div className="hero-inner">
        <div className="hero-meta">
          <span><span className="hero-meta__label">Founded</span> 2017</span>
          <span className="hero-meta__sep" aria-hidden="true" />
          <span><span className="hero-meta__label">Base</span> Wilmington, DE</span>
          <span className="hero-meta__sep" aria-hidden="true" />
          <span><span className="hero-meta__label">Cross-state</span> 15+</span>
          <span className="hero-meta__sep" aria-hidden="true" />
          <span><span className="hero-meta__label">ARR focus</span> $500K–$10M</span>
          <span className="hero-meta__sep" aria-hidden="true" />
          <span><span className="hero-meta__label">Ticket</span> $10K–$30K</span>
        </div>

        <div className="hero-grid">
          <div className="hero-grid__main">
            <p className="hero-eyebrow">
              <span className="hero-eyebrow__rule" aria-hidden="true" />
              Our entire pitch in 6 words
            </p>

            <h1 className="hero-title hero-title--ob">
              Hire the <span className="hero-title__amber">AI</span>.<sup className="hero-title__fn">01</sup><br />
              Skip the headcount.<sup className="hero-title__fn">02</sup>
            </h1>

            <div className="hero-footnotes">
              <p>
                <span className="hero-footnotes__num">01</span>
                Production agents we deploy on n8n + Groq + Postgres. Operator-backed. Not a chatbot template.
              </p>
              <p>
                <span className="hero-footnotes__num">02</span>
                $2,500/month replaces $400K/yr of in-house ops, average across <span data-design-only="true">6 active retainers</span>.
              </p>
            </div>

            <p className="hero-sub text-pretty">
              Forty-five minute audit with a <mark className="dpl-mark">co-founder</mark>. Free. Written deployment plan within five business days. No agency retainer attached.
            </p>

            <div className="hero-cta-row">
              <Link href="/audit" className="dpl-btn dpl-btn--ink">
                Book a free audit
              </Link>
              <Link href="/recovery" className="dpl-btn dpl-btn--ghost">
                Or fix a broken agent
              </Link>
            </div>
          </div>

          <aside className="hero-grid__panels" aria-label="Operator status">
            {/* Operator Status panel */}
            <div className="dpl-panel" data-design-only="true">
              <header className="dpl-panel__head">
                <span className="dpl-panel__pulse" aria-hidden="true" />
                <span>Operator status</span>
              </header>
              <dl className="dpl-panel__rows">
                <div className="dpl-panel__row">
                  <dt>On-call</dt>
                  <dd data-design-only="true">Faizan</dd>
                </div>
                <div className="dpl-panel__row">
                  <dt>Backup</dt>
                  <dd data-design-only="true">Anwaar</dd>
                </div>
                <div className="dpl-panel__row">
                  <dt>Avg reply</dt>
                  <dd data-design-only="true">4h 12m</dd>
                </div>
                <div className="dpl-panel__row">
                  <dt>Before next morning</dt>
                  <dd data-design-only="true">100%</dd>
                </div>
              </dl>
              <span className="dpl-panel__designmark">[design only] data sample · real feed wires up post-pilot</span>
            </div>

            {/* Recent activity */}
            <div className="dpl-panel" data-design-only="true">
              <header className="dpl-panel__head">
                <span>Recent operator activity</span>
              </header>
              <ul className="dpl-panel__feed">
                {operatorActivity.map((e) => (
                  <li key={e.time} className="dpl-panel__feed-row" data-design-only="true">
                    <span className="dpl-panel__feed-time">{e.time}</span>
                    <span className="dpl-panel__feed-body">
                      <span className="dpl-panel__feed-label">{e.label}</span>
                      <span className="dpl-panel__feed-detail">{e.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <span className="dpl-panel__designmark">[design only] data sample · real feed wires up post-pilot</span>
            </div>

            {/* Allocation snapshot */}
            <div className="dpl-panel" data-design-only="true">
              <header className="dpl-panel__head">
                <span>Allocation snapshot</span>
              </header>
              <dl className="dpl-panel__rows">
                <div className="dpl-panel__row">
                  <dt>Retainers active</dt>
                  <dd data-design-only="true">6</dd>
                </div>
                <div className="dpl-panel__row">
                  <dt>Agents in production</dt>
                  <dd data-design-only="true">17</dd>
                </div>
                <div className="dpl-panel__row">
                  <dt>Audits open</dt>
                  <dd data-design-only="true">3</dd>
                </div>
                <div className="dpl-panel__row">
                  <dt>Capacity for new pilots</dt>
                  <dd className="dpl-panel__row--accent" data-design-only="true">2 open</dd>
                </div>
              </dl>
              <span className="dpl-panel__designmark">[design only] data sample · real feed wires up post-pilot</span>
            </div>

            <MiniConsolePreview />
          </aside>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
