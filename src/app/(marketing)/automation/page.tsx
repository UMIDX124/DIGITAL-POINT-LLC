import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { copy } from '@/lib/copy';

export const metadata: Metadata = {
  title: 'Automation — AI workflows that run the boring parts',
  description:
    'Lead capture, document parsing, follow-up, reporting, portfolio monitoring. Operator-built AI workflows, operated as a service.',
  alternates: { canonical: 'https://digitalpointllc.com/automation' },
};

export default function AutomationPage() {
  const { hero, whatWeAutomate, howBuilt, whatYouSee, pricing } = copy.automation;

  return (
    <>
      {/* Hero */}
      <section
        className="relative w-full overflow-hidden"
        style={{ background: '#0A0A0B', paddingTop: '7rem', paddingBottom: '5rem', borderBottom: '1px solid #27272A' }}
      >
        <div className="container-wide">
          <div className="max-w-4xl">
            <p className="eyebrow mb-5">{hero.eyebrow}</p>
            <h1 className="font-display text-[44px] sm:text-[56px] md:text-[72px] lg:text-[88px] leading-[0.98] tracking-tight text-[color:var(--ivory)]">
              {hero.headline}
            </h1>
            <p className="mt-8 max-w-2xl text-[17px] md:text-[18px] leading-[1.55] text-[color:var(--ivory-dim)]">
              {hero.body}
            </p>
            <div className="mt-10">
              <Link
                href={hero.ctaPrimary.href}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-[14px] font-medium rounded-md text-[#0A0A0B] focus-ring"
                style={{ background: 'var(--amber-bright)' }}
              >
                {hero.ctaPrimary.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What we automate */}
      <section className="relative section-padding" style={{ background: '#0A0A0B', borderBottom: '1px solid #27272A' }}>
        <div className="container-wide">
          <header className="max-w-3xl mb-14">
            <p className="eyebrow mb-5">{whatWeAutomate.eyebrow}</p>
            <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] tracking-tight text-[color:var(--ivory)]">
              {whatWeAutomate.headline}
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whatWeAutomate.cards.map((card) => (
              <div key={card.title} className="card-flat p-7 flex flex-col">
                <h3 className="font-display text-[22px] leading-tight text-[color:var(--ivory)]">
                  {card.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-[color:var(--ivory-dim)]">
                  {card.body}
                </p>
                <p className="mt-auto pt-6 font-mono text-[12px] text-[color:var(--amber)] tracking-wide">
                  {card.stat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it's built */}
      <section className="relative section-padding" style={{ background: '#0A0A0B', borderBottom: '1px solid #27272A' }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-5">{howBuilt.eyebrow}</p>
              <h2 className="font-display text-[32px] md:text-[44px] leading-[1.1] tracking-tight text-[color:var(--ivory)]">
                {howBuilt.headline}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-[16px] leading-[1.65] text-[color:var(--ivory-dim)]">
                {howBuilt.body}
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-4 font-mono text-[12px] text-[color:var(--muted)]">
                {[
                  'n8n — orchestration',
                  'Groq — inference',
                  'TypeScript — custom services',
                  'Postgres — state',
                  'Observability — always-on',
                  'On-call operators',
                ].map((s) => (
                  <li key={s} className="py-3 px-4 border-hairline rounded-md">{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What you see */}
      <section className="relative section-padding" style={{ background: '#0A0A0B', borderBottom: '1px solid #27272A' }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-5">{whatYouSee.eyebrow}</p>
              <h2 className="font-display text-[32px] md:text-[44px] leading-[1.1] tracking-tight text-[color:var(--ivory)]">
                {whatYouSee.headline}
              </h2>
              <p className="mt-6 text-[15.5px] leading-[1.65] text-[color:var(--ivory-dim)]">
                {whatYouSee.body}
              </p>
            </div>
            <div className="lg:col-span-7">
              {/* Read-only dashboard mock — flat, mono numbers, no fake glass */}
              <div className="card-flat p-6 md:p-8" style={{ background: '#141416' }}>
                <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '1px solid #27272A' }}>
                  <span className="eyebrow">Portfolio — last 24h</span>
                  <span className="font-mono text-[11px] text-[color:var(--muted)]">auto-refresh 60s</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Workflows run', value: '1,284' },
                    { label: 'Success rate', value: '99.2%' },
                    { label: 'Avg latency', value: '1.8s' },
                  ].map((kpi) => (
                    <div key={kpi.label}>
                      <div className="font-mono text-[22px] md:text-[28px] text-[color:var(--ivory)] tabular-nums">
                        {kpi.value}
                      </div>
                      <div className="text-[11px] text-[color:var(--muted)] mt-1 tracking-wide">
                        {kpi.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="divide-hairline" style={{ borderTop: '1px solid #27272A' }}>
                  {[
                    { name: 'Lead intake — Meta', runs: 412, status: 'OK' },
                    { name: 'Lead intake — Google', runs: 198, status: 'OK' },
                    { name: 'Doc parsing — contracts', runs: 47, status: 'OK' },
                    { name: 'Follow-up — day-3 retarget', runs: 321, status: 'OK' },
                    { name: 'Reporting rollup — weekly', runs: 1, status: 'OK' },
                  ].map((row) => (
                    <div key={row.name} className="flex items-center justify-between py-3">
                      <span className="text-[14px] text-[color:var(--ivory-dim)]">{row.name}</span>
                      <span className="font-mono text-[12px] text-[color:var(--muted)]">
                        {row.runs} runs · <span className="text-[color:var(--amber)]">{row.status}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-[11px] text-[color:var(--muted)] tracking-wide">Representative data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative section-padding" style={{ background: '#0A0A0B', borderBottom: '1px solid #27272A' }}>
        <div className="container-wide">
          <header className="max-w-3xl mb-14">
            <p className="eyebrow mb-5">{pricing.eyebrow}</p>
            <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] tracking-tight text-[color:var(--ivory)]">
              {pricing.headline}
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pricing.tiers.map((tier) => {
              const featured = 'featured' in tier && tier.featured;
              return (
                <div
                  key={tier.name}
                  className="card-flat p-8 flex flex-col"
                  style={featured ? { borderColor: 'var(--amber)' } : undefined}
                >
                  <p className="eyebrow mb-5">{tier.name}</p>
                  <div className="font-display text-[36px] text-[color:var(--ivory)] leading-none">
                    {tier.price}
                  </div>
                  <p className="mt-5 text-[14.5px] leading-[1.55] text-[color:var(--ivory-dim)]">
                    {tier.body}
                  </p>
                  <Link
                    href={tier.href}
                    className="mt-auto pt-8 inline-flex items-center gap-2 text-[13px] font-medium text-[color:var(--amber)] focus-ring"
                  >
                    {tier.cta}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative section-padding" style={{ background: '#0A0A0B' }}>
        <div className="container-narrow text-center">
          <h2 className="font-display text-[36px] md:text-[48px] leading-[1.1] tracking-tight text-[color:var(--ivory)]">
            Start with one workflow.
          </h2>
          <p className="mt-5 text-[color:var(--ivory-dim)] max-w-xl mx-auto">
            Pilot fee buys you a scoped build + 30 days of operation. You own the output.
          </p>
          <Link
            href="/free-growth-audit"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 text-[14px] font-medium rounded-md text-[#0A0A0B]"
            style={{ background: 'var(--amber-bright)' }}
          >
            Book a free audit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
