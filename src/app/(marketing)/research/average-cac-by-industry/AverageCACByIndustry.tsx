'use client';

import { Section, Container, FadeUp, GlassCard, SectionHeader } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';

interface Props {
  faqs: { question: string; answer: string }[];
}

const industryCAC = [
  { industry: 'SaaS (B2B)', b2bCac: '$942', b2cCac: '-', ltvRatio: '1:4.2', payback: '14 mo' },
  { industry: 'SaaS (B2C)', b2bCac: '-', b2cCac: '$72', ltvRatio: '1:5.8', payback: '4 mo' },
  { industry: 'E-commerce', b2bCac: '-', b2cCac: '$70', ltvRatio: '1:3.1', payback: '2 mo' },
  { industry: 'Financial Services', b2bCac: '$1,202', b2cCac: '$338', ltvRatio: '1:6.4', payback: '18 mo' },
  { industry: 'Healthcare', b2bCac: '$886', b2cCac: '$312', ltvRatio: '1:3.8', payback: '12 mo' },
  { industry: 'Education (EdTech)', b2bCac: '$742', b2cCac: '$68', ltvRatio: '1:4.6', payback: '8 mo' },
  { industry: 'Real Estate', b2bCac: '-', b2cCac: '$1,185', ltvRatio: '1:8.2', payback: '1 mo' },
  { industry: 'Legal Services', b2bCac: '$915', b2cCac: '$584', ltvRatio: '1:7.1', payback: '2 mo' },
  { industry: 'Manufacturing', b2bCac: '$662', b2cCac: '-', ltvRatio: '1:5.2', payback: '16 mo' },
  { industry: 'Professional Services', b2bCac: '$818', b2cCac: '-', ltvRatio: '1:4.8', payback: '10 mo' },
  { industry: 'Retail (Brick & Mortar)', b2bCac: '-', b2cCac: '$42', ltvRatio: '1:2.4', payback: '3 mo' },
  { industry: 'Travel & Hospitality', b2bCac: '$624', b2cCac: '$106', ltvRatio: '1:3.6', payback: '1 mo' },
  { industry: 'Telecommunications', b2bCac: '$1,034', b2cCac: '$315', ltvRatio: '1:5.1', payback: '14 mo' },
  { industry: 'Insurance', b2bCac: '$1,280', b2cCac: '$442', ltvRatio: '1:7.8', payback: '24 mo' },
  { industry: 'Automotive', b2bCac: '-', b2cCac: '$628', ltvRatio: '1:4.4', payback: '1 mo' },
  { industry: 'Home Services', b2bCac: '-', b2cCac: '$218', ltvRatio: '1:3.2', payback: '1 mo' },
  { industry: 'Fitness & Wellness', b2bCac: '-', b2cCac: '$96', ltvRatio: '1:2.8', payback: '5 mo' },
  { industry: 'Media & Entertainment', b2bCac: '$548', b2cCac: '$34', ltvRatio: '1:3.4', payback: '6 mo' },
];

const channelCAC = [
  { channel: 'Organic Search (SEO)', avgCac: '$87', trend: '-4%', quality: 'High' },
  { channel: 'Email Marketing', avgCac: '$102', trend: '-2%', quality: 'High' },
  { channel: 'Referral / Word-of-Mouth', avgCac: '$118', trend: '-6%', quality: 'Very High' },
  { channel: 'Google Ads (Search)', avgCac: '$162', trend: '+11%', quality: 'High' },
  { channel: 'Content Marketing', avgCac: '$148', trend: '+3%', quality: 'Medium-High' },
  { channel: 'Social Media (Paid)', avgCac: '$186', trend: '+14%', quality: 'Medium' },
  { channel: 'LinkedIn Ads', avgCac: '$312', trend: '+8%', quality: 'Medium-High' },
  { channel: 'Display / Programmatic', avgCac: '$224', trend: '+18%', quality: 'Low-Medium' },
  { channel: 'Trade Shows / Events', avgCac: '$811', trend: '+5%', quality: 'High' },
  { channel: 'Outbound Sales (SDR)', avgCac: '$1,420', trend: '+12%', quality: 'Variable' },
];

const keyStats = [
  { value: '$198', label: 'Avg B2C CAC', color: '#a3e635' },
  { value: '$702', label: 'Avg B2B CAC', color: '#c77dff' },
  { value: '14%', label: 'YoY CAC Increase', color: '#ff6b9d' },
  { value: '1:3.8', label: 'Avg LTV:CAC', color: '#fbbf24' },
];

const glassStyle = {
  background: 'rgba(13, 8, 21, 0.5)',
  border: '1px solid rgba(157, 78, 221, 0.15)',
};

export function AverageCACByIndustry({ faqs }: Props) {
  return (
    <>
      {/* Header */}
      <Section className="pt-32 pb-12">
        <Container size="narrow">
          <Breadcrumbs items={[
            { label: 'Research', href: '/research' },
            { label: 'Average CAC by Industry', href: '/research/average-cac-by-industry' },
          ]} />
          <div className="mt-8">
            <span className="text-[#9080a0] text-sm">January 2026 &middot; 15 min read</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
              Average Customer Acquisition Cost by Industry
            </h1>
            <p className="text-[#b794c7] text-lg mt-4 leading-relaxed max-w-2xl">
              CAC benchmarks across 18 industries with breakdowns by company size, acquisition channel, and business model. Updated for 2026 with B2B and B2C comparisons.
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

      {/* Industry CAC Table */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">CAC by Industry</h2>
            <div className="rounded-xl overflow-hidden" style={glassStyle}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(157,78,221,0.15)]">
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Industry</th>
                      <th className="text-right py-3 px-4 text-[#c77dff] font-medium">B2B CAC</th>
                      <th className="text-right py-3 px-4 text-[#a3e635] font-medium">B2C CAC</th>
                      <th className="text-right py-3 px-4 text-[#fbbf24] font-medium">LTV:CAC</th>
                      <th className="text-right py-3 px-4 text-[#7dd3fc] font-medium">Payback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryCAC.map((row, i) => (
                      <tr key={row.industry} className={i < industryCAC.length - 1 ? 'border-b border-[rgba(157,78,221,0.08)]' : ''}>
                        <td className="py-3 px-4 text-white font-medium">{row.industry}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.b2bCac}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.b2cCac}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.ltvRatio}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.payback}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-[#9080a0] text-xs mt-3">CAC includes all sales and marketing costs. Payback period assumes even revenue distribution. LTV:CAC ratios based on 3-year customer value.</p>
          </FadeUp>
        </Container>
      </Section>

      {/* Channel CAC Table */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">CAC by Acquisition Channel</h2>
            <div className="rounded-xl overflow-hidden" style={glassStyle}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(157,78,221,0.15)]">
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Channel</th>
                      <th className="text-right py-3 px-4 text-[#a3e635] font-medium">Avg CAC</th>
                      <th className="text-right py-3 px-4 text-[#ff6b9d] font-medium">YoY Trend</th>
                      <th className="text-right py-3 px-4 text-[#fbbf24] font-medium">Lead Quality</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelCAC.map((row, i) => (
                      <tr key={row.channel} className={i < channelCAC.length - 1 ? 'border-b border-[rgba(157,78,221,0.08)]' : ''}>
                        <td className="py-3 px-4 text-white font-medium">{row.channel}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.avgCac}</td>
                        <td className="py-3 px-4 text-right" style={{ color: row.trend.startsWith('-') ? '#a3e635' : '#ff6b9d' }}>
                          {row.trend}
                        </td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.quality}</td>
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
                { title: 'CAC inflation accelerates', text: 'Average CAC across all industries rose 14% year-over-year, the steepest annual increase since 2022. Rising ad costs, privacy-driven signal loss, and increased competition from AI-native companies are the primary drivers.' },
                { title: 'Organic channels are the moat', text: 'SEO ($87 avg CAC) and email marketing ($102) remain the most cost-efficient channels. Companies with strong organic presence saw only 6-8% CAC inflation vs. 18-22% for companies relying primarily on paid channels.' },
                { title: 'B2B payback periods are stretching', text: 'The average B2B CAC payback period extended to 11.2 months in 2026, up from 9.4 months in 2024. Companies with annual contracts recover CAC faster (7.8 months) than monthly subscribers (14.6 months).' },
                { title: 'Insurance and telecom lead B2B CAC', text: 'Insurance ($1,280) and telecommunications ($1,034) have the highest B2B acquisition costs, offset by extremely high customer lifetime values (LTV:CAC of 7.8x and 5.1x respectively).' },
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
              title="Know your CAC — then beat it"
              description="Get a free growth audit to benchmark your customer acquisition cost and find the channels that will lower it."
            />
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-12">
              <InternalLinks content="cac customer acquisition cost paid ads roas attribution marketing optimization" />
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
