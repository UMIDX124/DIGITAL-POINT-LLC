'use client';

import { useState } from 'react';
import { TrendingUp, DollarSign, Share2, Mail } from 'lucide-react';
import { Section, Container, FadeUp, GlassCard } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';
import { InternalLinks } from '@/components/seo/InternalLinks';

interface Props {
  faqs: { question: string; answer: string }[];
}

export function ROASCalculator({ faqs }: Props) {
  const [adSpend, setAdSpend] = useState('');
  const [revenue, setRevenue] = useState('');
  const [cogs, setCogs] = useState('');
  const [email, setEmail] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);

  const spend = parseFloat(adSpend) || 0;
  const rev = parseFloat(revenue) || 0;
  const cost = parseFloat(cogs) || 0;

  const roas = spend > 0 ? rev / spend : 0;
  const profit = rev - cost - spend;
  const profitMargin = rev > 0 ? (profit / rev) * 100 : 0;
  const breakEvenSpend = rev - cost > 0 ? rev - cost : 0;

  const roasRating = roas >= 5 ? 'Excellent' : roas >= 3 ? 'Good' : roas >= 2 ? 'Average' : roas > 0 ? 'Below Average' : '';
  const roasColor = roas >= 5 ? '#a3e635' : roas >= 3 ? '#c77dff' : roas >= 2 ? '#fbbf24' : '#ff6b9d';

  const handleShare = () => {
    const url = `${window.location.origin}/tools/roas-calculator?spend=${spend}&revenue=${rev}&cogs=${cost}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailCapture = async () => {
    if (!email) return;
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: `roas-tool-${Date.now()}`,
          email,
          interest: 'ROAS Calculator',
          qualityScore: 60,
          conversationSummary: `Used ROAS calculator: Spend $${spend}, Revenue $${rev}, ROAS ${roas.toFixed(1)}x`,
        }),
      });
      setShowEmail(false);
      setEmail('');
    } catch { /* silent */ }
  };

  return (
    <>
      <section className="relative min-h-[35vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 radial-glow" />
        <Container className="relative z-10 pt-28 pb-8">
          <FadeUp>
            <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'ROAS Calculator', href: '/tools/roas-calculator' }]} />
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-6">
              ROAS{' '}
              <span className="bg-gradient-to-r from-[#e0aaff] via-[#c77dff] to-[#ff6b9d] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#b794c7] text-lg mt-3 max-w-2xl">
              Calculate your true Return on Ad Spend and understand your advertising profitability.
            </p>
          </FadeUp>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Input */}
            <FadeUp>
              <GlassCard className="p-6 md:p-8">
                <h2 className="font-display text-xl font-semibold text-white mb-6">Enter Your Numbers</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-[#b794c7] mb-1.5">Total Ad Spend ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7c5a8a]" />
                      <input
                        type="number"
                        value={adSpend}
                        onChange={(e) => setAdSpend(e.target.value)}
                        placeholder="10,000"
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                        style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#b794c7] mb-1.5">Revenue from Ads ($)</label>
                    <div className="relative">
                      <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7c5a8a]" />
                      <input
                        type="number"
                        value={revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                        placeholder="40,000"
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                        style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#b794c7] mb-1.5">Cost of Goods Sold ($) <span className="text-[#7c5a8a]">optional</span></label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7c5a8a]" />
                      <input
                        type="number"
                        value={cogs}
                        onChange={(e) => setCogs(e.target.value)}
                        placeholder="15,000"
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                        style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </FadeUp>

            {/* Results */}
            <FadeUp delay={0.1}>
              <GlassCard className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold text-white">Results</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-lg text-[#7c5a8a] hover:text-[#c77dff] transition-colors"
                      style={{ background: 'rgba(157, 78, 221, 0.1)' }}
                      title="Copy shareable link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowEmail(!showEmail)}
                      className="p-2 rounded-lg text-[#7c5a8a] hover:text-[#c77dff] transition-colors"
                      style={{ background: 'rgba(157, 78, 221, 0.1)' }}
                      title="Save results"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {copied && (
                  <p className="text-[#a3e635] text-xs mb-3">Link copied to clipboard!</p>
                )}

                {showEmail && (
                  <div className="flex gap-2 mb-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="flex-1 px-3 py-2 rounded-lg text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none"
                      style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}
                    />
                    <button
                      onClick={handleEmailCapture}
                      className="px-3 py-2 rounded-lg text-white text-xs font-medium"
                      style={{ background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)' }}
                    >
                      Save
                    </button>
                  </div>
                )}

                <div className="space-y-4">
                  {/* ROAS */}
                  <div className="rounded-xl p-4" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9080a0] text-sm">ROAS</span>
                      {roasRating && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: roasColor, background: `${roasColor}15` }}>
                          {roasRating}
                        </span>
                      )}
                    </div>
                    <p className="font-display text-3xl font-bold mt-1" style={{ color: roasColor }}>
                      {roas > 0 ? `${roas.toFixed(2)}x` : '—'}
                    </p>
                  </div>

                  {/* Profit */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl p-4" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                      <span className="text-[#9080a0] text-xs">Net Profit</span>
                      <p className={`font-display text-xl font-bold mt-1 ${profit >= 0 ? 'text-[#a3e635]' : 'text-[#ff6b9d]'}`}>
                        {spend > 0 ? `$${profit.toLocaleString()}` : '—'}
                      </p>
                    </div>
                    <div className="rounded-xl p-4" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                      <span className="text-[#9080a0] text-xs">Profit Margin</span>
                      <p className={`font-display text-xl font-bold mt-1 ${profitMargin >= 0 ? 'text-[#a3e635]' : 'text-[#ff6b9d]'}`}>
                        {rev > 0 ? `${profitMargin.toFixed(1)}%` : '—'}
                      </p>
                    </div>
                  </div>

                  {/* ROAS visual bar */}
                  {roas > 0 && (
                    <div className="rounded-xl p-4" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                      <span className="text-[#9080a0] text-xs">ROAS Scale</span>
                      <div className="mt-2 h-3 rounded-full bg-[rgba(157,78,221,0.1)] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(roas / 10 * 100, 100)}%`,
                            background: `linear-gradient(90deg, ${roasColor}, ${roasColor}88)`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-[#7c5a8a] mt-1">
                        <span>0x</span><span>2x</span><span>5x</span><span>10x+</span>
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            </FadeUp>
          </div>

          {/* SEO Content */}
          <div className="max-w-3xl mx-auto mt-16">
            <FadeUp>
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-4">How to Calculate ROAS</h2>
                  <p className="text-[#b794c7] text-sm leading-relaxed mb-3">
                    ROAS (Return on Ad Spend) is calculated by dividing the revenue generated from advertising by the total ad spend. The formula is simple:
                  </p>
                  <div className="rounded-xl p-4 text-center font-mono text-[#c77dff]" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                    ROAS = Revenue from Ads / Ad Spend
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-4">ROAS Benchmarks by Industry</h2>
                  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: 'rgba(157, 78, 221, 0.1)' }}>
                          <th className="text-left px-4 py-3 text-[#c77dff] font-medium">Industry</th>
                          <th className="text-right px-4 py-3 text-[#c77dff] font-medium">Avg ROAS</th>
                          <th className="text-right px-4 py-3 text-[#c77dff] font-medium">Top Performers</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#b794c7]">
                        {[
                          ['E-commerce', '4.0x', '8-12x'],
                          ['SaaS / B2B', '5.0x', '10-15x'],
                          ['Lead Generation', '3.5x', '7-10x'],
                          ['D2C Brands', '3.0x', '6-9x'],
                          ['Professional Services', '6.0x', '12-20x'],
                        ].map(([industry, avg, top]) => (
                          <tr key={industry} style={{ borderTop: '1px solid rgba(157, 78, 221, 0.1)' }}>
                            <td className="px-4 py-3">{industry}</td>
                            <td className="px-4 py-3 text-right font-mono">{avg}</td>
                            <td className="px-4 py-3 text-right font-mono text-[#a3e635]">{top}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* FAQ */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
                      <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                        <h3 className="text-white font-medium text-sm mb-2">{faq.question}</h3>
                        <p className="text-[#9080a0] text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <InternalLinks
                  content="roas return on ad spend paid ads performance marketing attribution tracking"
                  title="Explore Related Services"
                />

                <GrowthAuditCTA variant="banner" title="Not sure if your ROAS is real?" description="Our free growth audit reviews your attribution setup and reveals your true advertising ROI." />
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>
    </>
  );
}
