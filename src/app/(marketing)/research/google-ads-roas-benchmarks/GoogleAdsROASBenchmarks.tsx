'use client';

import { Section, Container, FadeUp, GlassCard, SectionHeader } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';

interface Props {
  faqs: { question: string; answer: string }[];
}

const searchBenchmarks = [
  { industry: 'E-commerce / Retail', roas: '4.8x', cpc: '$1.24', convRate: '3.8%' },
  { industry: 'SaaS / Technology', roas: '3.6x', cpc: '$4.67', convRate: '2.1%' },
  { industry: 'Finance & Insurance', roas: '4.9x', cpc: '$6.82', convRate: '4.2%' },
  { industry: 'Healthcare', roas: '3.2x', cpc: '$3.14', convRate: '3.4%' },
  { industry: 'Education', roas: '3.9x', cpc: '$2.48', convRate: '4.6%' },
  { industry: 'Real Estate', roas: '4.1x', cpc: '$2.91', convRate: '2.8%' },
  { industry: 'Legal Services', roas: '7.1x', cpc: '$8.94', convRate: '3.1%' },
  { industry: 'Home Services', roas: '5.8x', cpc: '$3.42', convRate: '5.2%' },
  { industry: 'Travel & Hospitality', roas: '5.1x', cpc: '$1.53', convRate: '4.1%' },
  { industry: 'Automotive', roas: '5.2x', cpc: '$2.78', convRate: '3.6%' },
  { industry: 'B2B Services', roas: '3.4x', cpc: '$5.21', convRate: '2.4%' },
  { industry: 'Fitness & Wellness', roas: '3.7x', cpc: '$2.12', convRate: '4.8%' },
];

const campaignTypeBenchmarks = [
  { type: 'Search', avgRoas: '4.2x', avgCpc: '$3.61', avgConvRate: '3.7%', bestFor: 'High-intent buyers' },
  { type: 'Display', avgRoas: '1.4x', avgCpc: '$0.67', avgConvRate: '0.8%', bestFor: 'Awareness & retargeting' },
  { type: 'YouTube', avgRoas: '1.9x', avgCpc: '$0.18', avgConvRate: '1.2%', bestFor: 'Brand consideration' },
  { type: 'Performance Max', avgRoas: '3.1x', avgCpc: '$1.42', avgConvRate: '2.9%', bestFor: 'Full-funnel automation' },
  { type: 'Shopping', avgRoas: '5.6x', avgCpc: '$0.89', avgConvRate: '4.4%', bestFor: 'E-commerce products' },
  { type: 'Demand Gen', avgRoas: '2.3x', avgCpc: '$0.94', avgConvRate: '1.8%', bestFor: 'Discovery & social' },
];

const keyStats = [
  { value: '4.2x', label: 'Avg Search ROAS', color: '#a3e635' },
  { value: '3.1x', label: 'Avg PMax ROAS', color: '#c77dff' },
  { value: '5.6x', label: 'Avg Shopping ROAS', color: '#fbbf24' },
  { value: '$62M', label: 'Ad Spend Analyzed', color: '#7dd3fc' },
];

const glassStyle = {
  background: 'rgba(13, 8, 21, 0.5)',
  border: '1px solid rgba(157, 78, 221, 0.15)',
};

export function GoogleAdsROASBenchmarks({ faqs }: Props) {
  return (
    <>
      {/* Header */}
      <Section className="pt-32 pb-12">
        <Container size="narrow">
          <Breadcrumbs items={[
            { label: 'Research', href: '/research' },
            { label: 'Google Ads ROAS Benchmarks', href: '/research/google-ads-roas-benchmarks' },
          ]} />
          <div className="mt-8">
            <span className="text-[#9080a0] text-sm">February 2026 &middot; 14 min read</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
              Google Ads ROAS Benchmarks by Industry
            </h1>
            <p className="text-[#b794c7] text-lg mt-4 leading-relaxed max-w-2xl">
              ROAS benchmarks for Search, Display, YouTube, Shopping, Performance Max, and Demand Gen campaigns across 12 industries. Sourced from $62M in analyzed Google Ads spend.
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

      {/* Campaign Type Benchmarks */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">ROAS by Campaign Type</h2>
            <div className="rounded-xl overflow-hidden" style={glassStyle}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(157,78,221,0.15)]">
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Campaign Type</th>
                      <th className="text-right py-3 px-4 text-[#a3e635] font-medium">Avg ROAS</th>
                      <th className="text-right py-3 px-4 text-[#7dd3fc] font-medium">Avg CPC</th>
                      <th className="text-right py-3 px-4 text-[#c77dff] font-medium">Conv Rate</th>
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignTypeBenchmarks.map((row, i) => (
                      <tr key={row.type} className={i < campaignTypeBenchmarks.length - 1 ? 'border-b border-[rgba(157,78,221,0.08)]' : ''}>
                        <td className="py-3 px-4 text-white font-medium">{row.type}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.avgRoas}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.avgCpc}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.avgConvRate}</td>
                        <td className="py-3 px-4 text-[#9080a0] text-xs">{row.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* Search ROAS by Industry */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Search ROAS by Industry</h2>
            <div className="rounded-xl overflow-hidden" style={glassStyle}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(157,78,221,0.15)]">
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Industry</th>
                      <th className="text-right py-3 px-4 text-[#a3e635] font-medium">Search ROAS</th>
                      <th className="text-right py-3 px-4 text-[#7dd3fc] font-medium">Avg CPC</th>
                      <th className="text-right py-3 px-4 text-[#c77dff] font-medium">Conv Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchBenchmarks.map((row, i) => (
                      <tr key={row.industry} className={i < searchBenchmarks.length - 1 ? 'border-b border-[rgba(157,78,221,0.08)]' : ''}>
                        <td className="py-3 px-4 text-white font-medium">{row.industry}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.roas}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.cpc}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.convRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-[#9080a0] text-xs mt-3">Data based on analysis of $62M in Google Ads spend across 420+ accounts, 2025-2026.</p>
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
                { title: 'Search still delivers highest intent', text: 'Search campaigns maintain the highest ROAS for bottom-funnel conversions at 4.2x average. Legal services lead at 7.1x due to high case values, while home services benefit from strong local intent at 5.8x.' },
                { title: 'Performance Max is closing the gap', text: 'PMax ROAS improved 18% year-over-year to 3.1x, narrowing the gap with Search. Advertisers using PMax alongside Search see 12% higher total conversion volume with only a 7% decrease in blended ROAS.' },
                { title: 'Shopping dominates e-commerce efficiency', text: 'Shopping campaigns deliver 5.6x average ROAS — the highest of any campaign type for product-based businesses. Feed optimization and merchant center quality directly correlate with ROAS (r=0.72).' },
                { title: 'YouTube as a measurement challenge', text: 'YouTube direct-click ROAS averages 1.9x, but brands running YouTube alongside Search see a 22% lift in branded search volume, suggesting significant unmeasured impact.' },
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
              title="Is your Google Ads ROAS above or below benchmark?"
              description="Get a free audit with custom ROAS analysis for your industry and campaign types."
            />
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-12">
              <InternalLinks content="google ads roas search ads performance max paid media conversion tracking attribution" />
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
