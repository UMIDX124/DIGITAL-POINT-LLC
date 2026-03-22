'use client';

import { useState } from 'react';
import { BarChart3, Share2, Mail, Info } from 'lucide-react';
import { Section, Container, FadeUp, GlassCard } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';
import { InternalLinks } from '@/components/seo/InternalLinks';

interface Props {
  faqs: { question: string; answer: string }[];
}

const defaultTouchpoints = [
  { name: 'Google Search Ad', channel: 'Paid Search' },
  { name: 'Blog Post (SEO)', channel: 'Organic' },
  { name: 'Facebook Retargeting', channel: 'Paid Social' },
  { name: 'Email Campaign', channel: 'Email' },
  { name: 'Direct Visit', channel: 'Direct' },
];

const models = ['First Click', 'Last Click', 'Linear', 'Time Decay', 'Position Based'] as const;
type Model = (typeof models)[number];

function calculateAttribution(touchpointCount: number, model: Model): number[] {
  const credits = new Array(touchpointCount).fill(0);
  if (touchpointCount === 0) return credits;

  switch (model) {
    case 'First Click':
      credits[0] = 100;
      break;
    case 'Last Click':
      credits[touchpointCount - 1] = 100;
      break;
    case 'Linear':
      const equal = 100 / touchpointCount;
      credits.fill(equal);
      break;
    case 'Time Decay': {
      const decayFactor = 0.5;
      let total = 0;
      for (let i = 0; i < touchpointCount; i++) {
        credits[i] = Math.pow(1 + decayFactor, i);
        total += credits[i];
      }
      for (let i = 0; i < touchpointCount; i++) {
        credits[i] = (credits[i] / total) * 100;
      }
      break;
    }
    case 'Position Based':
      if (touchpointCount === 1) {
        credits[0] = 100;
      } else if (touchpointCount === 2) {
        credits[0] = 50;
        credits[1] = 50;
      } else {
        credits[0] = 40;
        credits[touchpointCount - 1] = 40;
        const middleShare = 20 / (touchpointCount - 2);
        for (let i = 1; i < touchpointCount - 1; i++) {
          credits[i] = middleShare;
        }
      }
      break;
  }
  return credits;
}

export function AttributionVisualizer({ faqs }: Props) {
  const [touchpoints, setTouchpoints] = useState(defaultTouchpoints);
  const [conversionValue, setConversionValue] = useState('1000');
  const [selectedModel, setSelectedModel] = useState<Model>('Linear');
  const [newTouchpoint, setNewTouchpoint] = useState('');
  const [email, setEmail] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const value = parseFloat(conversionValue) || 0;
  const allCredits: Record<Model, number[]> = {} as Record<Model, number[]>;
  models.forEach(m => {
    allCredits[m] = calculateAttribution(touchpoints.length, m);
  });

  const currentCredits = allCredits[selectedModel];

  const handleAddTouchpoint = () => {
    if (!newTouchpoint.trim()) return;
    setTouchpoints([...touchpoints, { name: newTouchpoint.trim(), channel: 'Custom' }]);
    setNewTouchpoint('');
  };

  const handleRemoveTouchpoint = (index: number) => {
    setTouchpoints(touchpoints.filter((_, i) => i !== index));
  };

  const handleShare = () => {
    const url = `${window.location.origin}/tools/attribution-model-visualizer?model=${selectedModel.replace(' ', '-')}&tp=${touchpoints.length}`;
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
          sessionId: `attribution-tool-${Date.now()}`,
          email,
          interest: 'Attribution Model Visualizer',
          qualityScore: 65,
          conversationSummary: `Used attribution visualizer: ${touchpoints.length} touchpoints, preferred model: ${selectedModel}`,
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
            { label: 'Attribution Model Visualizer', href: '/tools/attribution-model-visualizer' },
          ]} />

          <FadeUp>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6" style={{ background: 'rgba(157,78,221,0.15)', border: '1px solid rgba(157,78,221,0.3)' }}>
                <BarChart3 className="w-4 h-4 text-[#c77dff]" />
                <span className="text-[#c77dff]">Free Attribution Tool</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Marketing Attribution Model <span className="text-[#c77dff]">Visualizer</span>
              </h1>
              <p className="text-lg text-[#b794c7] max-w-2xl mx-auto">
                See how different attribution models distribute conversion credit across your marketing touchpoints. Compare first-click, last-click, linear, time-decay, and position-based models.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <GlassCard className="p-6 md:p-8 mb-8">
              {/* Touchpoints Setup */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Customer Journey Touchpoints</h2>
                <div className="space-y-3 mb-4">
                  {touchpoints.map((tp, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #7b2cbf, #9d4edd)' }}>
                        {i + 1}
                      </div>
                      <div className="flex-1 px-4 py-2.5 rounded-xl text-white text-sm" style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}>
                        {tp.name} <span className="text-[#7c5a8a]">({tp.channel})</span>
                      </div>
                      {touchpoints.length > 2 && (
                        <button onClick={() => handleRemoveTouchpoint(i)} className="text-[#7c5a8a] hover:text-[#ff6b9d] transition-colors text-lg">×</button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTouchpoint}
                    onChange={(e) => setNewTouchpoint(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTouchpoint()}
                    placeholder="Add touchpoint (e.g., YouTube Ad)"
                    className="flex-1 px-4 py-2.5 rounded-xl text-white text-sm placeholder:text-[#7c5a8a] focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                    style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}
                  />
                  <button onClick={handleAddTouchpoint} className="px-4 py-2.5 rounded-xl text-white text-sm font-medium" style={{ background: 'linear-gradient(135deg, #7b2cbf, #9d4edd)' }}>
                    Add
                  </button>
                </div>
              </div>

              {/* Conversion Value */}
              <div className="mb-8">
                <label className="block text-sm text-[#b794c7] mb-1.5">Conversion Value ($)</label>
                <input
                  type="number"
                  value={conversionValue}
                  onChange={(e) => setConversionValue(e.target.value)}
                  className="w-full max-w-xs px-4 py-2.5 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c77dff]/50"
                  style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}
                />
              </div>

              {/* Model Selector */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Attribution Model</h2>
                <div className="flex flex-wrap gap-2">
                  {models.map(m => (
                    <button
                      key={m}
                      onClick={() => setSelectedModel(m)}
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: selectedModel === m ? 'linear-gradient(135deg, #7b2cbf, #9d4edd)' : 'rgba(13, 8, 21, 0.6)',
                        border: `1px solid ${selectedModel === m ? 'rgba(157,78,221,0.6)' : 'rgba(157,78,221,0.2)'}`,
                        color: selectedModel === m ? 'white' : '#b794c7',
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visualization */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Credit Distribution — {selectedModel}</h2>
                <div className="space-y-4">
                  {touchpoints.map((tp, i) => {
                    const credit = currentCredits[i] || 0;
                    const creditValue = (credit / 100) * value;
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-[#b794c7]">{tp.name}</span>
                          <span className="text-white font-medium">{credit.toFixed(1)}% — ${creditValue.toFixed(0)}</span>
                        </div>
                        <div className="h-8 rounded-lg overflow-hidden" style={{ background: 'rgba(13, 8, 21, 0.6)' }}>
                          <div
                            className="h-full rounded-lg transition-all duration-500 flex items-center px-3"
                            style={{
                              width: `${Math.max(credit, 2)}%`,
                              background: `linear-gradient(135deg, #7b2cbf ${100 - credit}%, #c77dff 100%)`,
                            }}
                          >
                            {credit >= 10 && <span className="text-xs text-white font-medium">{credit.toFixed(1)}%</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Model Comparison Table */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">All Models Comparison</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#2a1a3a]">
                        <th className="text-left py-3 px-2 text-[#b794c7]">Touchpoint</th>
                        {models.map(m => (
                          <th key={m} className={`text-right py-3 px-2 ${selectedModel === m ? 'text-[#c77dff]' : 'text-[#7c5a8a]'}`}>{m}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {touchpoints.map((tp, i) => (
                        <tr key={i} className="border-b border-[#1a0f2a]">
                          <td className="py-3 px-2 text-white">{tp.name}</td>
                          {models.map(m => (
                            <td key={m} className={`text-right py-3 px-2 ${selectedModel === m ? 'text-white font-medium' : 'text-[#7c5a8a]'}`}>
                              {allCredits[m][i]?.toFixed(1)}%
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Model Descriptions */}
              <div className="p-4 rounded-xl mb-6" style={{ background: 'rgba(157, 78, 221, 0.08)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#c77dff] mt-0.5 shrink-0" />
                  <div className="text-sm text-[#b794c7]">
                    {selectedModel === 'First Click' && 'First Click gives 100% credit to the first touchpoint. Best for understanding which channels drive awareness and initial interest.'}
                    {selectedModel === 'Last Click' && 'Last Click gives 100% credit to the final touchpoint before conversion. This is the default in most analytics platforms but often undervalues upper-funnel channels.'}
                    {selectedModel === 'Linear' && 'Linear attribution distributes credit equally across all touchpoints. Good for understanding the full journey but may over-credit low-impact touches.'}
                    {selectedModel === 'Time Decay' && 'Time Decay gives more credit to touchpoints closer to conversion. Balances full-journey visibility with emphasis on conversion-driving channels.'}
                    {selectedModel === 'Position Based' && 'Position Based (U-shaped) gives 40% to first touch, 40% to last touch, and splits the remaining 20% among middle touchpoints. Great for valuing both discovery and conversion.'}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[#b794c7] hover:text-white transition-colors" style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}>
                  <Share2 className="w-4 h-4" />
                  {copied ? 'Link Copied!' : 'Share Results'}
                </button>
                <button onClick={() => setShowEmail(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[#b794c7] hover:text-white transition-colors" style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.2)' }}>
                  <Mail className="w-4 h-4" />
                  Get Report via Email
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
              <h2 className="text-2xl font-bold text-white mb-4">Understanding Marketing Attribution Models</h2>
              <div className="space-y-4 text-[#b794c7]">
                <p>Marketing attribution is the science of determining which touchpoints contribute to a conversion. With the average B2B buyer interacting with 20+ touchpoints before purchasing, choosing the right attribution model is critical for accurate budget allocation.</p>
                <h3 className="text-lg font-semibold text-white">Why Attribution Models Matter</h3>
                <p>The model you choose directly impacts which channels appear most valuable. First-click attribution will make your awareness campaigns look like heroes, while last-click makes your retargeting look unstoppable. The truth lies somewhere in between.</p>
                <h3 className="text-lg font-semibold text-white">Industry Benchmarks</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>67% of marketers still rely on last-click attribution</li>
                  <li>Companies using multi-touch attribution see 15-30% better ROAS</li>
                  <li>Position-based is the most popular multi-touch model (used by 23% of enterprises)</li>
                  <li>Average customer journey includes 6-8 touchpoints before conversion</li>
                </ul>
                <h3 className="text-lg font-semibold text-white">Choosing the Right Model</h3>
                <p>For most companies, we recommend starting with position-based attribution. It gives proper credit to both the channel that introduced the customer and the one that closed the deal, while still acknowledging the middle touchpoints.</p>
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
