'use client';

import { Section, Container, FadeUp, GlassCard, SectionHeader } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';

interface Props {
  faqs: { question: string; answer: string }[];
}

const modelAdoption = [
  { model: 'Last-Click', adoption: '41%', trend: '-6%', accuracy: '35-45%' },
  { model: 'Data-Driven (Google)', adoption: '28%', trend: '+12%', accuracy: '55-65%' },
  { model: 'Multi-Touch (Linear)', adoption: '11%', trend: '-3%', accuracy: '50-60%' },
  { model: 'Multi-Touch (Time Decay)', adoption: '8%', trend: '+2%', accuracy: '55-65%' },
  { model: 'Multi-Touch (Position-Based)', adoption: '7%', trend: '-1%', accuracy: '55-65%' },
  { model: 'Marketing Mix Modeling', adoption: '18%', trend: '+9%', accuracy: '60-75%' },
  { model: 'Incrementality Testing', adoption: '14%', trend: '+11%', accuracy: '70-85%' },
  { model: 'Hybrid (MTA + MMM)', adoption: '52%', trend: '+15%', accuracy: '65-80%' },
];

const privacyImpact = [
  { change: 'iOS 14.5+ ATT Opt-in Rate', stat: '34%', impact: '66% of iOS users untraceable via IDFA' },
  { change: 'iOS 17 Link Tracking Protection', stat: '38%', impact: 'of iOS conversions lost to click-ID stripping' },
  { change: 'Browser Cookie Restrictions', stat: '42%', impact: 'of third-party cookies blocked by default' },
  { change: 'Overall Trackable Conversions', stat: '61%', impact: 'of total conversions directly attributable' },
  { change: 'Server-Side Tracking Adoption', stat: '31%', impact: 'of advertisers using CAPI/server-side' },
  { change: 'Platform Over-Reporting', stat: '20-40%', impact: 'conversions overstated by ad platforms' },
  { change: 'Cross-Device Tracking Gap', stat: '28%', impact: 'of customer journeys span 3+ devices' },
  { change: 'Ad Blocker Usage', stat: '37%', impact: 'of desktop users have ad blockers active' },
];

const trackingAccuracy = [
  { platform: 'Meta Ads Manager', reported: '100%', actual: '68-78%', gap: '22-32%' },
  { platform: 'Google Ads', reported: '100%', actual: '74-84%', gap: '16-26%' },
  { platform: 'TikTok Ads', reported: '100%', actual: '58-68%', gap: '32-42%' },
  { platform: 'LinkedIn Ads', reported: '100%', actual: '72-80%', gap: '20-28%' },
  { platform: 'Google Analytics 4', reported: '-', actual: '62-72%', gap: '28-38% untracked' },
  { platform: 'Server-Side (CAPI)', reported: '-', actual: '82-92%', gap: '8-18% untracked' },
];

const keyStats = [
  { value: '61%', label: 'Trackable Conversions', color: '#ff6b9d' },
  { value: '41%', label: 'Still Use Last-Click', color: '#fbbf24' },
  { value: '52%', label: 'Hybrid Model Adoption', color: '#a3e635' },
  { value: '20-40%', label: 'Platform Over-Reporting', color: '#c77dff' },
];

const glassStyle = {
  background: 'rgba(13, 8, 21, 0.5)',
  border: '1px solid rgba(157, 78, 221, 0.15)',
};

export function MarketingAttributionStatistics({ faqs }: Props) {
  return (
    <>
      {/* Header */}
      <Section className="pt-32 pb-12">
        <Container size="narrow">
          <Breadcrumbs items={[
            { label: 'Research', href: '/research' },
            { label: 'Marketing Attribution Statistics', href: '/research/marketing-attribution-statistics' },
          ]} />
          <div className="mt-8">
            <span className="text-[#9080a0] text-sm">March 2026 &middot; 11 min read</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
              Marketing Attribution Statistics 2026
            </h1>
            <p className="text-[#b794c7] text-lg mt-4 leading-relaxed max-w-2xl">
              47 data points on attribution model adoption, tracking accuracy, privacy impact, and the state of marketing measurement in 2026. How much of your funnel can you actually see?
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

      {/* Model Adoption Table */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Attribution Model Adoption Rates</h2>
            <div className="rounded-xl overflow-hidden" style={glassStyle}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(157,78,221,0.15)]">
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Model</th>
                      <th className="text-right py-3 px-4 text-[#c77dff] font-medium">Adoption</th>
                      <th className="text-right py-3 px-4 text-[#a3e635] font-medium">YoY Change</th>
                      <th className="text-right py-3 px-4 text-[#fbbf24] font-medium">Est. Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelAdoption.map((row, i) => (
                      <tr key={row.model} className={i < modelAdoption.length - 1 ? 'border-b border-[rgba(157,78,221,0.08)]' : ''}>
                        <td className="py-3 px-4 text-white font-medium">{row.model}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.adoption}</td>
                        <td className="py-3 px-4 text-right" style={{ color: row.trend.startsWith('+') ? '#a3e635' : '#ff6b9d' }}>
                          {row.trend}
                        </td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.accuracy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-[#9080a0] text-xs mt-3">Adoption rates exceed 100% because many organizations use multiple models simultaneously. Hybrid approaches are counted separately.</p>
          </FadeUp>
        </Container>
      </Section>

      {/* Privacy Impact Table */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Privacy Impact on Tracking</h2>
            <div className="rounded-xl overflow-hidden" style={glassStyle}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(157,78,221,0.15)]">
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Privacy Change</th>
                      <th className="text-right py-3 px-4 text-[#ff6b9d] font-medium">Key Stat</th>
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {privacyImpact.map((row, i) => (
                      <tr key={row.change} className={i < privacyImpact.length - 1 ? 'border-b border-[rgba(157,78,221,0.08)]' : ''}>
                        <td className="py-3 px-4 text-white font-medium">{row.change}</td>
                        <td className="py-3 px-4 text-right font-semibold" style={{ color: '#ff6b9d' }}>{row.stat}</td>
                        <td className="py-3 px-4 text-[#b794c7] text-xs">{row.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* Platform Accuracy Table */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Platform Reporting Accuracy</h2>
            <div className="rounded-xl overflow-hidden" style={glassStyle}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(157,78,221,0.15)]">
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Platform</th>
                      <th className="text-right py-3 px-4 text-[#c77dff] font-medium">Reported</th>
                      <th className="text-right py-3 px-4 text-[#a3e635] font-medium">Est. Actual</th>
                      <th className="text-right py-3 px-4 text-[#ff6b9d] font-medium">Gap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trackingAccuracy.map((row, i) => (
                      <tr key={row.platform} className={i < trackingAccuracy.length - 1 ? 'border-b border-[rgba(157,78,221,0.08)]' : ''}>
                        <td className="py-3 px-4 text-white font-medium">{row.platform}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.reported}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.actual}</td>
                        <td className="py-3 px-4 text-right text-[#ff6b9d]">{row.gap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-[#9080a0] text-xs mt-3">Accuracy estimates based on comparison of platform-reported data against server-side conversion data and incrementality tests.</p>
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
                { title: 'The hybrid model era is here', text: '52% of marketers now use a hybrid attribution approach combining multi-touch attribution with marketing mix modeling or incrementality testing. This is up from 31% in 2024, as organizations recognize that no single model captures the full picture.' },
                { title: 'Last-click is declining but persists', text: 'Despite widespread acknowledgment of its limitations, last-click attribution still serves as the primary model for 41% of organizations. Legacy systems, simplicity, and Google Analytics defaults are the main reasons for continued reliance.' },
                { title: 'Server-side tracking is the new table stakes', text: '31% of advertisers now use Conversion APIs (Meta CAPI, Google Enhanced Conversions). Those who do see 15-25% more attributed conversions and 18% lower CPAs through better signal optimization.' },
                { title: '39% of the funnel is invisible', text: 'On average, marketers can only directly track 61% of their conversions. The gap is largest on mobile (45% untracked) and for cross-device journeys (52% untracked). This makes incrementality testing and MMM increasingly critical.' },
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
              title="Fix your attribution blind spots"
              description="Get a free audit of your tracking setup and find out how much of your funnel you are actually measuring."
            />
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-12">
              <InternalLinks content="attribution tracking analytics reporting dashboard crm data revops kpi" />
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
