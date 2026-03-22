'use client';

import { Section, Container, FadeUp, GlassCard, SectionHeader } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';

interface Props {
  faqs: { question: string; answer: string }[];
}

const industryBenchmarks = [
  { industry: 'E-commerce / Retail', cpc: '$0.97', cpm: '$11.20', ctr: '1.59%', roas: '3.42x' },
  { industry: 'SaaS / Technology', cpc: '$2.14', cpm: '$18.70', ctr: '0.94%', roas: '2.18x' },
  { industry: 'Finance & Insurance', cpc: '$3.89', cpm: '$28.40', ctr: '0.73%', roas: '4.12x' },
  { industry: 'Healthcare', cpc: '$1.84', cpm: '$14.30', ctr: '0.91%', roas: '2.76x' },
  { industry: 'Education', cpc: '$1.12', cpm: '$6.80', ctr: '1.42%', roas: '2.94x' },
  { industry: 'Real Estate', cpc: '$1.67', cpm: '$13.50', ctr: '1.08%', roas: '3.67x' },
  { industry: 'Legal Services', cpc: '$3.42', cpm: '$24.10', ctr: '0.82%', roas: '5.21x' },
  { industry: 'Home Services', cpc: '$1.53', cpm: '$10.90', ctr: '1.31%', roas: '4.38x' },
  { industry: 'Fitness & Wellness', cpc: '$1.28', cpm: '$9.40', ctr: '1.52%', roas: '2.89x' },
  { industry: 'Travel & Hospitality', cpc: '$0.83', cpm: '$8.20', ctr: '1.78%', roas: '3.91x' },
  { industry: 'Automotive', cpc: '$2.31', cpm: '$16.40', ctr: '0.96%', roas: '3.14x' },
  { industry: 'Apparel & Fashion', cpc: '$0.63', cpm: '$7.90', ctr: '1.87%', roas: '3.68x' },
];

const yearOverYear = [
  { metric: 'Average CPC', value2024: '$1.41', value2025: '$1.58', value2026: '$1.72', change: '+9%' },
  { metric: 'Average CPM', value2024: '$10.10', value2025: '$11.30', value2026: '$12.47', change: '+10%' },
  { metric: 'Average CTR', value2024: '1.62%', value2025: '1.54%', value2026: '1.49%', change: '-3%' },
  { metric: 'Average ROAS', value2024: '3.14x', value2025: '2.98x', value2026: '2.87x', change: '-4%' },
];

const keyStats = [
  { value: '$1.72', label: 'Avg CPC', color: '#7dd3fc' },
  { value: '$12.47', label: 'Avg CPM', color: '#c77dff' },
  { value: '1.49%', label: 'Avg CTR', color: '#a3e635' },
  { value: '2.87x', label: 'Avg ROAS', color: '#ff6b9d' },
];

const glassStyle = {
  background: 'rgba(13, 8, 21, 0.5)',
  border: '1px solid rgba(157, 78, 221, 0.15)',
};

export function FacebookAdsBenchmarks({ faqs }: Props) {
  return (
    <>
      {/* Header */}
      <Section className="pt-32 pb-12">
        <Container size="narrow">
          <Breadcrumbs items={[
            { label: 'Research', href: '/research' },
            { label: 'Facebook Ads Benchmarks 2026', href: '/research/facebook-ads-benchmarks-2026' },
          ]} />
          <div className="mt-8">
            <span className="text-[#9080a0] text-sm">March 2026 &middot; 12 min read</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
              Facebook Ads Benchmarks 2026
            </h1>
            <p className="text-[#b794c7] text-lg mt-4 leading-relaxed max-w-2xl">
              CPC, CPM, CTR, and ROAS benchmarks across 12 industries. Based on analysis of $48M+ in tracked Meta ad spend from Q4 2025 through Q1 2026.
            </p>
          </div>
        </Container>
      </Section>

      {/* Key Stats */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {keyStats.map((stat) => (
                <div key={stat.label} className="rounded-xl p-5 text-center" style={glassStyle}>
                  <div className="font-display text-2xl md:text-3xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <p className="text-[#9080a0] text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* Industry Benchmarks Table */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Benchmarks by Industry</h2>
            <div className="rounded-xl overflow-hidden" style={glassStyle}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(157,78,221,0.15)]">
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Industry</th>
                      <th className="text-right py-3 px-4 text-[#7dd3fc] font-medium">CPC</th>
                      <th className="text-right py-3 px-4 text-[#c77dff] font-medium">CPM</th>
                      <th className="text-right py-3 px-4 text-[#a3e635] font-medium">CTR</th>
                      <th className="text-right py-3 px-4 text-[#ff6b9d] font-medium">ROAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryBenchmarks.map((row, i) => (
                      <tr key={row.industry} className={i < industryBenchmarks.length - 1 ? 'border-b border-[rgba(157,78,221,0.08)]' : ''}>
                        <td className="py-3 px-4 text-white font-medium">{row.industry}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.cpc}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.cpm}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.ctr}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.roas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-[#9080a0] text-xs mt-3">Data based on analysis of $48M+ in Meta Ads spend across 340+ accounts, Q4 2025 - Q1 2026.</p>
          </FadeUp>
        </Container>
      </Section>

      {/* Year over Year Trends */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Year-over-Year Trends</h2>
            <div className="rounded-xl overflow-hidden" style={glassStyle}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(157,78,221,0.15)]">
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Metric</th>
                      <th className="text-right py-3 px-4 text-[#9080a0] font-medium">2024</th>
                      <th className="text-right py-3 px-4 text-[#9080a0] font-medium">2025</th>
                      <th className="text-right py-3 px-4 text-[#c77dff] font-medium">2026</th>
                      <th className="text-right py-3 px-4 text-[#9080a0] font-medium">YoY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearOverYear.map((row, i) => (
                      <tr key={row.metric} className={i < yearOverYear.length - 1 ? 'border-b border-[rgba(157,78,221,0.08)]' : ''}>
                        <td className="py-3 px-4 text-white font-medium">{row.metric}</td>
                        <td className="py-3 px-4 text-right text-[#9080a0]">{row.value2024}</td>
                        <td className="py-3 px-4 text-right text-[#9080a0]">{row.value2025}</td>
                        <td className="py-3 px-4 text-right text-white font-medium">{row.value2026}</td>
                        <td className="py-3 px-4 text-right" style={{ color: row.change.startsWith('+') ? '#ff6b9d' : '#a3e635' }}>
                          {row.change}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* Key Findings */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Key Findings</h2>
            <div className="space-y-4">
              {[
                { title: 'CPMs continue rising', text: 'Average CPMs increased 10% year-over-year, driven by increased competition from AI-native brands and expanded Advantage+ adoption. Finance and insurance saw the largest increases at +16%.' },
                { title: 'CTR decline is slowing', text: 'After years of declining click-through rates, the pace of decline slowed to just 3% in 2026. AI-generated creative and dynamic creative optimization are helping advertisers combat ad fatigue.' },
                { title: 'Advantage+ Shopping reshapes e-commerce', text: 'E-commerce brands using Advantage+ Shopping campaigns saw 23% higher ROAS on average compared to manual campaign structures. Adoption of Advantage+ reached 67% among e-commerce advertisers.' },
                { title: 'Video outperforms static by 2.1x', text: 'Short-form video ads (under 15 seconds) delivered 2.1x the ROAS of static image ads across all industries. Reels placement specifically drove 34% lower CPMs than feed placements.' },
              ].map((finding) => (
                <div key={finding.title} className="rounded-xl p-5" style={glassStyle}>
                  <h3 className="font-display text-base font-semibold text-white mb-2">{finding.title}</h3>
                  <p className="text-[#b794c7] text-sm leading-relaxed">{finding.text}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl p-5" style={glassStyle}>
                  <h3 className="font-display text-base font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-[#b794c7] text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* CTA and Internal Links */}
      <Section className="pb-24">
        <Container size="narrow">
          <FadeUp>
            <GrowthAuditCTA
              title="How does your Meta Ads performance compare?"
              description="Get a free growth audit with personalized benchmarks for your industry and ad spend level."
            />
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-12">
              <InternalLinks content="facebook ads meta ads roas cpc cpm paid media campaign optimization" />
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
