'use client';

import { useState } from 'react';
import { DollarSign, Percent, TrendingUp } from 'lucide-react';
import { Section, Container, FadeUp, GlassCard } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';
import { InternalLinks } from '@/components/seo/InternalLinks';

interface Props {
  faqs: { question: string; answer: string }[];
}

export function AdSpendCalculator({ faqs }: Props) {
  const [monthlySpend, setMonthlySpend] = useState('');
  const [roas, setRoas] = useState('');
  const [cogsPercent, setCogsPercent] = useState('');
  const [overheadPercent, setOverheadPercent] = useState('');

  const spend = parseFloat(monthlySpend) || 0;
  const roasVal = parseFloat(roas) || 0;
  const cogsRate = (parseFloat(cogsPercent) || 0) / 100;
  const overheadRate = (parseFloat(overheadPercent) || 0) / 100;

  const revenue = spend * roasVal;
  const cogs = revenue * cogsRate;
  const overhead = revenue * overheadRate;
  const profit = revenue - cogs - overhead - spend;
  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const annualProfit = profit * 12;

  // Scenario modeling
  const scenarios = [0.5, 1, 1.5, 2, 3].map((multiplier) => {
    const s = spend * multiplier;
    // Diminishing returns: ROAS drops slightly at higher spend
    const adjustedRoas = roasVal * (1 - (multiplier - 1) * 0.05);
    const r = s * Math.max(adjustedRoas, 1);
    const c = r * cogsRate;
    const o = r * overheadRate;
    const p = r - c - o - s;
    return { spend: s, revenue: r, profit: p, roas: adjustedRoas, label: `${multiplier}x` };
  });

  return (
    <>
      <section className="relative min-h-[35vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 radial-glow" />
        <Container className="relative z-10 pt-28 pb-8">
          <FadeUp>
            <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Ad Spend Profit Calculator', href: '/tools/ad-spend-profit-calculator' }]} />
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-6">
              Ad Spend{' '}
              <span className="bg-gradient-to-r from-[#a3e635] via-[#c77dff] to-[#e0aaff] bg-clip-text text-transparent">Profit</span>
              {' '}Calculator
            </h1>
            <p className="text-[#b794c7] text-lg mt-3 max-w-2xl">
              Model your advertising profitability and find the optimal spend level for maximum profit.
            </p>
          </FadeUp>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FadeUp>
              <GlassCard className="p-6 md:p-8">
                <h2 className="font-display text-xl font-semibold text-white mb-6">Your Numbers</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-[#b794c7] mb-1.5">Monthly Ad Spend ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7c5a8a]" />
                      <input type="number" value={monthlySpend} onChange={(e) => setMonthlySpend(e.target.value)} placeholder="25,000"
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                        style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#b794c7] mb-1.5">Current ROAS</label>
                    <div className="relative">
                      <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7c5a8a]" />
                      <input type="number" step="0.1" value={roas} onChange={(e) => setRoas(e.target.value)} placeholder="4.0"
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                        style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#b794c7] mb-1.5">COGS (% of revenue)</label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7c5a8a]" />
                      <input type="number" value={cogsPercent} onChange={(e) => setCogsPercent(e.target.value)} placeholder="30"
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                        style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#b794c7] mb-1.5">Overhead (% of revenue) <span className="text-[#7c5a8a]">optional</span></label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7c5a8a]" />
                      <input type="number" value={overheadPercent} onChange={(e) => setOverheadPercent(e.target.value)} placeholder="10"
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                        style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }} />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </FadeUp>

            <FadeUp delay={0.1}>
              <GlassCard className="p-6 md:p-8">
                <h2 className="font-display text-xl font-semibold text-white mb-6">Profitability</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl p-4" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                      <span className="text-[#9080a0] text-xs">Monthly Revenue</span>
                      <p className="font-display text-xl font-bold text-white mt-1">{revenue > 0 ? `$${revenue.toLocaleString()}` : '—'}</p>
                    </div>
                    <div className="rounded-xl p-4" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                      <span className="text-[#9080a0] text-xs">Monthly Profit</span>
                      <p className={`font-display text-xl font-bold mt-1 ${profit >= 0 ? 'text-[#a3e635]' : 'text-[#ff6b9d]'}`}>
                        {spend > 0 ? `$${profit.toLocaleString()}` : '—'}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl p-4" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                      <span className="text-[#9080a0] text-xs">Profit Margin</span>
                      <p className={`font-display text-xl font-bold mt-1 ${profitMargin >= 0 ? 'text-[#c77dff]' : 'text-[#ff6b9d]'}`}>
                        {revenue > 0 ? `${profitMargin.toFixed(1)}%` : '—'}
                      </p>
                    </div>
                    <div className="rounded-xl p-4" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                      <span className="text-[#9080a0] text-xs">Annual Profit</span>
                      <p className={`font-display text-xl font-bold mt-1 ${annualProfit >= 0 ? 'text-[#a3e635]' : 'text-[#ff6b9d]'}`}>
                        {spend > 0 ? `$${annualProfit.toLocaleString()}` : '—'}
                      </p>
                    </div>
                  </div>

                  {/* Scaling scenarios */}
                  {spend > 0 && roasVal > 0 && (
                    <div className="rounded-xl p-4" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                      <span className="text-[#9080a0] text-xs mb-3 block">Scaling Scenarios (with diminishing returns)</span>
                      <div className="space-y-2">
                        {scenarios.map((s) => (
                          <div key={s.label} className="flex items-center justify-between text-xs">
                            <span className="text-[#7c5a8a]">{s.label} spend (${s.spend.toLocaleString()})</span>
                            <span className={`font-mono ${s.profit >= 0 ? 'text-[#a3e635]' : 'text-[#ff6b9d]'}`}>
                              ${s.profit.toLocaleString()} profit
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            </FadeUp>
          </div>

          <div className="max-w-3xl mx-auto mt-16">
            <FadeUp>
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-4">FAQ</h2>
                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
                      <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                        <h3 className="text-white font-medium text-sm mb-2">{faq.question}</h3>
                        <p className="text-[#9080a0] text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <InternalLinks content="ad spend profit calculator budget optimization performance marketing roas" title="Related Services" />
                <GrowthAuditCTA variant="banner" />
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>
    </>
  );
}
