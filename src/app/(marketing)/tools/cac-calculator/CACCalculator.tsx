'use client';

import { useState } from 'react';
import { DollarSign, Users, TrendingUp, Share2 } from 'lucide-react';
import { Section, Container, FadeUp, GlassCard } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';
import { InternalLinks } from '@/components/seo/InternalLinks';

interface Props {
  faqs: { question: string; answer: string }[];
}

export function CACCalculator({ faqs }: Props) {
  const [marketingSpend, setMarketingSpend] = useState('');
  const [salesSpend, setSalesSpend] = useState('');
  const [newCustomers, setNewCustomers] = useState('');
  const [ltv, setLtv] = useState('');
  const [copied, setCopied] = useState(false);

  const totalSpend = (parseFloat(marketingSpend) || 0) + (parseFloat(salesSpend) || 0);
  const customers = parseFloat(newCustomers) || 0;
  const customerLtv = parseFloat(ltv) || 0;

  const cac = customers > 0 ? totalSpend / customers : 0;
  const ltvCacRatio = cac > 0 && customerLtv > 0 ? customerLtv / cac : 0;
  const paybackMonths = cac > 0 && customerLtv > 0 ? (cac / (customerLtv / 12)) : 0;

  const ratioRating = ltvCacRatio >= 5 ? 'Excellent' : ltvCacRatio >= 3 ? 'Healthy' : ltvCacRatio >= 1 ? 'Needs Work' : ltvCacRatio > 0 ? 'Danger' : '';
  const ratioColor = ltvCacRatio >= 5 ? '#a3e635' : ltvCacRatio >= 3 ? '#c77dff' : ltvCacRatio >= 1 ? '#fbbf24' : '#ff6b9d';

  const handleShare = () => {
    const url = `${window.location.origin}/tools/cac-calculator?ms=${marketingSpend}&ss=${salesSpend}&nc=${newCustomers}&ltv=${ltv}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section className="relative min-h-[35vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 radial-glow" />
        <Container className="relative z-10 pt-28 pb-8">
          <FadeUp>
            <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'CAC Calculator', href: '/tools/cac-calculator' }]} />
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-6">
              CAC{' '}
              <span className="bg-gradient-to-r from-[#ff6b9d] via-[#c77dff] to-[#e0aaff] bg-clip-text text-transparent">Calculator</span>
            </h1>
            <p className="text-[#b794c7] text-lg mt-3 max-w-2xl">
              Calculate your Customer Acquisition Cost and LTV:CAC ratio to measure growth efficiency.
            </p>
          </FadeUp>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FadeUp>
              <GlassCard className="p-6 md:p-8">
                <h2 className="font-display text-xl font-semibold text-white mb-6">Enter Your Numbers</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-[#b794c7] mb-1.5">Monthly Marketing Spend ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7c5a8a]" />
                      <input type="number" value={marketingSpend} onChange={(e) => setMarketingSpend(e.target.value)} placeholder="25,000"
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                        style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#b794c7] mb-1.5">Monthly Sales Spend ($) <span className="text-[#7c5a8a]">optional</span></label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7c5a8a]" />
                      <input type="number" value={salesSpend} onChange={(e) => setSalesSpend(e.target.value)} placeholder="10,000"
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                        style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#b794c7] mb-1.5">New Customers Acquired</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7c5a8a]" />
                      <input type="number" value={newCustomers} onChange={(e) => setNewCustomers(e.target.value)} placeholder="50"
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                        style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#b794c7] mb-1.5">Customer Lifetime Value ($) <span className="text-[#7c5a8a]">optional</span></label>
                    <div className="relative">
                      <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7c5a8a]" />
                      <input type="number" value={ltv} onChange={(e) => setLtv(e.target.value)} placeholder="2,000"
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                        style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }} />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </FadeUp>

            <FadeUp delay={0.1}>
              <GlassCard className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold text-white">Results</h2>
                  <button onClick={handleShare} className="p-2 rounded-lg text-[#7c5a8a] hover:text-[#c77dff] transition-colors" style={{ background: 'rgba(157, 78, 221, 0.1)' }}>
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                {copied && <p className="text-[#a3e635] text-xs mb-3">Link copied!</p>}

                <div className="space-y-4">
                  <div className="rounded-xl p-4" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                    <span className="text-[#9080a0] text-sm">Customer Acquisition Cost</span>
                    <p className="font-display text-3xl font-bold text-[#c77dff] mt-1">
                      {cac > 0 ? `$${cac.toFixed(0)}` : '—'}
                    </p>
                  </div>

                  {ltvCacRatio > 0 && (
                    <div className="rounded-xl p-4" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                      <div className="flex items-center justify-between">
                        <span className="text-[#9080a0] text-sm">LTV:CAC Ratio</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: ratioColor, background: `${ratioColor}15` }}>{ratioRating}</span>
                      </div>
                      <p className="font-display text-3xl font-bold mt-1" style={{ color: ratioColor }}>
                        {ltvCacRatio.toFixed(1)}:1
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl p-4" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                      <span className="text-[#9080a0] text-xs">Total Spend</span>
                      <p className="font-display text-lg font-bold text-white mt-1">{totalSpend > 0 ? `$${totalSpend.toLocaleString()}` : '—'}</p>
                    </div>
                    <div className="rounded-xl p-4" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                      <span className="text-[#9080a0] text-xs">Payback Period</span>
                      <p className="font-display text-lg font-bold text-white mt-1">{paybackMonths > 0 ? `${paybackMonths.toFixed(1)} mo` : '—'}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </FadeUp>
          </div>

          {/* SEO Content */}
          <div className="max-w-3xl mx-auto mt-16">
            <FadeUp>
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-4">How to Calculate CAC</h2>
                  <p className="text-[#b794c7] text-sm leading-relaxed mb-3">
                    Customer Acquisition Cost is calculated by dividing total sales and marketing expenses by the number of new customers acquired in a given period.
                  </p>
                  <div className="rounded-xl p-4 text-center font-mono text-[#c77dff]" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                    CAC = (Marketing Spend + Sales Spend) / New Customers
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-4">CAC Benchmarks by Industry</h2>
                  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: 'rgba(157, 78, 221, 0.1)' }}>
                          <th className="text-left px-4 py-3 text-[#c77dff] font-medium">Industry</th>
                          <th className="text-right px-4 py-3 text-[#c77dff] font-medium">Avg CAC</th>
                          <th className="text-right px-4 py-3 text-[#c77dff] font-medium">Avg LTV:CAC</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#b794c7]">
                        {[
                          ['SaaS', '$200-$500', '3-5:1'],
                          ['E-commerce', '$30-$80', '2-4:1'],
                          ['B2B Services', '$500-$2,000', '4-8:1'],
                          ['FinTech', '$300-$1,000', '3-6:1'],
                          ['Healthcare', '$600-$2,500', '5-10:1'],
                        ].map(([industry, cac, ratio]) => (
                          <tr key={industry} style={{ borderTop: '1px solid rgba(157, 78, 221, 0.1)' }}>
                            <td className="px-4 py-3">{industry}</td>
                            <td className="px-4 py-3 text-right font-mono">{cac}</td>
                            <td className="px-4 py-3 text-right font-mono text-[#a3e635]">{ratio}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

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

                <InternalLinks content="cac customer acquisition cost paid ads performance marketing growth" title="Explore Related Services" />
                <GrowthAuditCTA variant="banner" title="Your CAC too high?" description="Our growth audit identifies exactly where your acquisition funnel leaks money." />
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>
    </>
  );
}
