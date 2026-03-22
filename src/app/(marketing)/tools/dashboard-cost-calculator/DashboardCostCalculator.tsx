'use client';

import { useState } from 'react';
import { LayoutDashboard, Share2, Mail, CheckCircle } from 'lucide-react';
import { Section, Container, FadeUp, GlassCard } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';
import { InternalLinks } from '@/components/seo/InternalLinks';

interface Props {
  faqs: { question: string; answer: string }[];
}

const dataSources = [
  'Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads', 'Google Analytics',
  'Shopify', 'Salesforce', 'HubSpot', 'Stripe', 'Custom API',
];

const toolOptions = [
  { name: 'Google Looker Studio', monthly: 0, setup: 0, tier: 'Free' },
  { name: 'Metabase (Self-hosted)', monthly: 0, setup: 2000, tier: 'Budget' },
  { name: 'Power BI Pro', monthly: 10, setup: 500, tier: 'Mid' },
  { name: 'Tableau', monthly: 75, setup: 2000, tier: 'Mid' },
  { name: 'Looker (Google Cloud)', monthly: 3000, setup: 15000, tier: 'Enterprise' },
  { name: 'Custom Built', monthly: 0, setup: 0, tier: 'Custom' },
];

export function DashboardCostCalculator({ faqs }: Props) {
  const [selectedSources, setSelectedSources] = useState<string[]>(['Google Ads', 'Meta Ads', 'Google Analytics']);
  const [users, setUsers] = useState('5');
  const [needsWarehouse, setNeedsWarehouse] = useState(true);
  const [needsETL, setNeedsETL] = useState(true);
  const [needsAnalyst, setNeedsAnalyst] = useState(false);
  const [complexity, setComplexity] = useState<'basic' | 'standard' | 'advanced'>('standard');
  const [email, setEmail] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const userCount = parseInt(users) || 1;
  const sourceCount = selectedSources.length;

  const warehouseCost = needsWarehouse ? (sourceCount <= 3 ? 300 : sourceCount <= 6 ? 800 : 2000) : 0;
  const etlCost = needsETL ? sourceCount * 100 : 0;
  const analystCost = needsAnalyst ? 6000 : 0;
  const complexityMultiplier = complexity === 'basic' ? 0.6 : complexity === 'advanced' ? 1.8 : 1;

  const toggleSource = (source: string) => {
    setSelectedSources(prev =>
      prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
    );
  };

  const handleShare = () => {
    const url = `${window.location.origin}/tools/dashboard-cost-calculator`;
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
          sessionId: `dashboard-tool-${Date.now()}`,
          email,
          interest: 'Dashboard Cost Calculator',
          qualityScore: 70,
          conversationSummary: `Used dashboard cost calculator: ${sourceCount} sources, ${userCount} users, ${complexity} complexity`,
        }),
      });
      setShowEmail(false);
      setEmail('');
    } catch { /* silent */ }
  };

  return (
    <>
      <Section className="pt-32 pb-16">
        <Container>
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Dashboard Cost Calculator', href: '/tools/dashboard-cost-calculator' },
          ]} />

          <FadeUp>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6" style={{ background: 'rgba(157,78,221,0.15)', border: '1px solid rgba(157,78,221,0.3)' }}>
                <LayoutDashboard className="w-4 h-4 text-[#c77dff]" />
                <span className="text-[#c77dff]">Free Dashboard Tool</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Marketing Dashboard <span className="text-[#c77dff]">Cost Calculator</span>
              </h1>
              <p className="text-lg text-[#b794c7] max-w-2xl mx-auto">
                Estimate the true cost of building or buying a marketing dashboard. Compare tools, infrastructure, and team costs for your specific needs.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <GlassCard className="p-6 md:p-8 mb-8">
              {/* Data Sources */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Data Sources ({sourceCount} selected)</h2>
                <div className="flex flex-wrap gap-2">
                  {dataSources.map(source => (
                    <button
                      key={source}
                      onClick={() => toggleSource(source)}
                      className="px-3 py-2 rounded-xl text-sm transition-all"
                      style={{
                        background: selectedSources.includes(source) ? 'linear-gradient(135deg, #7b2cbf, #9d4edd)' : 'rgba(13, 8, 21, 0.6)',
                        border: `1px solid ${selectedSources.includes(source) ? 'rgba(157,78,221,0.6)' : 'rgba(157,78,221,0.2)'}`,
                        color: selectedSources.includes(source) ? 'white' : '#b794c7',
                      }}
                    >
                      {selectedSources.includes(source) && <CheckCircle className="w-3 h-3 inline mr-1" />}
                      {source}
                    </button>
                  ))}
                </div>
              </div>

              {/* Configuration */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm text-[#b794c7] mb-1.5">Number of Users</label>
                  <input
                    type="number"
                    value={users}
                    onChange={(e) => setUsers(e.target.value)}
                    min="1"
                    className="w-full px-4 py-2.5 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                    style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#b794c7] mb-1.5">Dashboard Complexity</label>
                  <div className="flex gap-2">
                    {(['basic', 'standard', 'advanced'] as const).map(c => (
                      <button
                        key={c}
                        onClick={() => setComplexity(c)}
                        className="flex-1 px-3 py-2.5 rounded-xl text-sm capitalize transition-all"
                        style={{
                          background: complexity === c ? 'linear-gradient(135deg, #7b2cbf, #9d4edd)' : 'rgba(13, 8, 21, 0.6)',
                          border: `1px solid ${complexity === c ? 'rgba(157,78,221,0.6)' : 'rgba(157,78,221,0.2)'}`,
                          color: complexity === c ? 'white' : '#b794c7',
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Infrastructure toggles */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Data Warehouse', desc: 'BigQuery / Snowflake', value: needsWarehouse, set: setNeedsWarehouse },
                  { label: 'ETL Pipeline', desc: 'Fivetran / Airbyte', value: needsETL, set: setNeedsETL },
                  { label: 'Dedicated Analyst', desc: 'Part-time data analyst', value: needsAnalyst, set: setNeedsAnalyst },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => item.set(!item.value)}
                    className="p-4 rounded-xl text-left transition-all"
                    style={{
                      background: item.value ? 'rgba(157, 78, 221, 0.15)' : 'rgba(13, 8, 21, 0.4)',
                      border: `1px solid ${item.value ? 'rgba(157,78,221,0.4)' : 'rgba(157,78,221,0.1)'}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-4 h-4 rounded border ${item.value ? 'bg-[#9d4edd] border-[#9d4edd]' : 'border-[#7c5a8a]'} flex items-center justify-center`}>
                        {item.value && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-white text-sm font-medium">{item.label}</span>
                    </div>
                    <p className="text-xs text-[#7c5a8a] ml-6">{item.desc}</p>
                  </button>
                ))}
              </div>

              {/* Cost Comparison Table */}
              <h2 className="text-xl font-semibold text-white mb-4">Cost Comparison</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#2a1a3a]">
                      <th className="text-left py-3 px-3 text-[#b794c7]">Solution</th>
                      <th className="text-right py-3 px-3 text-[#b794c7]">Setup Cost</th>
                      <th className="text-right py-3 px-3 text-[#b794c7]">Monthly Cost</th>
                      <th className="text-right py-3 px-3 text-[#b794c7]">Year 1 Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {toolOptions.map(tool => {
                      const toolMonthly = tool.name === 'Custom Built'
                        ? 3000 * complexityMultiplier
                        : tool.monthly * userCount;
                      const infra = warehouseCost + etlCost + analystCost;
                      const totalMonthly = toolMonthly + infra;
                      const setupCost = tool.name === 'Custom Built'
                        ? (25000 * complexityMultiplier) + (sourceCount * 2000)
                        : tool.setup;
                      const yearTotal = setupCost + (totalMonthly * 12);

                      return (
                        <tr key={tool.name} className="border-b border-[#1a0f2a]">
                          <td className="py-3 px-3">
                            <span className="text-white">{tool.name}</span>
                            <span className="text-xs text-[#7c5a8a] ml-2">{tool.tier}</span>
                          </td>
                          <td className="text-right py-3 px-3 text-[#b794c7]">${setupCost.toLocaleString()}</td>
                          <td className="text-right py-3 px-3 text-[#b794c7]">${totalMonthly.toLocaleString()}/mo</td>
                          <td className="text-right py-3 px-3 text-white font-medium">${yearTotal.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-[#7c5a8a] mb-6">
                * Monthly costs include selected infrastructure (warehouse: ${warehouseCost}/mo, ETL: ${etlCost}/mo{needsAnalyst ? `, analyst: $${analystCost}/mo` : ''})
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[#b794c7] hover:text-white transition-colors" style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}>
                  <Share2 className="w-4 h-4" />
                  {copied ? 'Link Copied!' : 'Share Results'}
                </button>
                <button onClick={() => setShowEmail(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[#b794c7] hover:text-white transition-colors" style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}>
                  <Mail className="w-4 h-4" />
                  Get Detailed Report
                </button>
              </div>

              {showEmail && (
                <div className="mt-4 flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2.5 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                    style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}
                  />
                  <button onClick={handleEmailCapture} className="px-4 py-2.5 rounded-xl text-white text-sm font-medium" style={{ background: 'linear-gradient(135deg, #7b2cbf, #9d4edd)' }}>
                    Send
                  </button>
                </div>
              )}
            </GlassCard>
          </FadeUp>

          {/* SEO Content */}
          <FadeUp delay={0.2}>
            <GlassCard className="p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">The True Cost of Marketing Dashboards</h2>
              <div className="space-y-4 text-[#b794c7]">
                <p>Marketing dashboards are essential for companies spending $10k+ per month on ads. But the sticker price of dashboard tools rarely tells the full story. Hidden costs in data infrastructure, ETL pipelines, and analyst time often double or triple the total investment.</p>
                <h3 className="text-lg font-semibold text-white">Build vs Buy: Key Considerations</h3>
                <p><strong className="text-white">Buy</strong> when you have fewer than 5 data sources, need standard KPIs, and your team can manage template dashboards. <strong className="text-white">Build custom</strong> when you need cross-platform attribution, custom metrics, real-time alerting, or automated reporting workflows.</p>
                <h3 className="text-lg font-semibold text-white">Cost Breakdown by Component</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong className="text-white">Data Warehouse:</strong> $300-$2,000/month depending on data volume</li>
                  <li><strong className="text-white">ETL/Data Pipeline:</strong> $100-$200 per data source per month</li>
                  <li><strong className="text-white">Visualization Tool:</strong> $0-$3,000/month depending on platform</li>
                  <li><strong className="text-white">Analyst Time:</strong> $4,000-$8,000/month for part-time dedicated support</li>
                  <li><strong className="text-white">Custom Development:</strong> $15,000-$80,000 one-time setup</li>
                </ul>
              </div>
            </GlassCard>
          </FadeUp>

          {/* FAQs */}
          <FadeUp delay={0.3}>
            <GlassCard className="p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl overflow-hidden" style={{ background: 'rgba(13, 8, 21, 0.4)', border: '1px solid rgba(157, 78, 221, 0.1)' }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-5 py-4 flex justify-between items-center">
                      <span className="text-white font-medium text-sm">{faq.question}</span>
                      <span className="text-[#c77dff] text-lg">{openFaq === i ? '−' : '+'}</span>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 text-sm text-[#b794c7]">{faq.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeUp>

          <GrowthAuditCTA />
          <InternalLinks />
        </Container>
      </Section>
    </>
  );
}
