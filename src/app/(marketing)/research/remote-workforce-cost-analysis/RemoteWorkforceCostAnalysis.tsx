'use client';

import { Section, Container, FadeUp, GlassCard, SectionHeader } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';

interface Props {
  faqs: { question: string; answer: string }[];
}

const roleCostComparison = [
  { role: 'Senior Marketing Manager', usFullyLoaded: '$142,000', remote: '$58,000', savings: '59%' },
  { role: 'PPC / Paid Media Specialist', usFullyLoaded: '$98,000', remote: '$38,000', savings: '61%' },
  { role: 'Full-Stack Developer', usFullyLoaded: '$168,000', remote: '$62,000', savings: '63%' },
  { role: 'Data Analyst', usFullyLoaded: '$112,000', remote: '$42,000', savings: '63%' },
  { role: 'Graphic Designer', usFullyLoaded: '$86,000', remote: '$32,000', savings: '63%' },
  { role: 'Content Writer / Strategist', usFullyLoaded: '$92,000', remote: '$34,000', savings: '63%' },
  { role: 'Customer Success Manager', usFullyLoaded: '$104,000', remote: '$38,000', savings: '63%' },
  { role: 'RevOps / CRM Specialist', usFullyLoaded: '$118,000', remote: '$46,000', savings: '61%' },
  { role: 'Project Manager', usFullyLoaded: '$108,000', remote: '$42,000', savings: '61%' },
  { role: 'SEO Specialist', usFullyLoaded: '$94,000', remote: '$36,000', savings: '62%' },
  { role: 'UI/UX Designer', usFullyLoaded: '$128,000', remote: '$48,000', savings: '63%' },
  { role: 'Video Editor', usFullyLoaded: '$82,000', remote: '$28,000', savings: '66%' },
];

const usOverheadBreakdown = [
  { item: 'Base Salary (Median)', cost: '$95,000', pctOfTotal: '68%' },
  { item: 'Health Insurance', cost: '$14,600', pctOfTotal: '10%' },
  { item: 'Payroll Taxes (FICA + State)', cost: '$9,200', pctOfTotal: '7%' },
  { item: '401(k) Match (4%)', cost: '$3,800', pctOfTotal: '3%' },
  { item: 'PTO / Holidays (20 days)', cost: '$7,300', pctOfTotal: '5%' },
  { item: 'Equipment & Software', cost: '$3,200', pctOfTotal: '2%' },
  { item: 'Office Space (per employee)', cost: '$6,400', pctOfTotal: '5%' },
  { item: 'Total Fully Loaded Cost', cost: '$139,500', pctOfTotal: '100%' },
];

const teamScaleComparison = [
  { teamSize: '3-person pod', usAnnual: '$384,000', remoteAnnual: '$148,000', annualSavings: '$236,000' },
  { teamSize: '5-person team', usAnnual: '$620,000', remoteAnnual: '$238,000', annualSavings: '$382,000' },
  { teamSize: '10-person department', usAnnual: '$1,240,000', remoteAnnual: '$472,000', annualSavings: '$768,000' },
  { teamSize: '20-person org', usAnnual: '$2,480,000', remoteAnnual: '$928,000', annualSavings: '$1,552,000' },
];

const qualityMetrics = [
  { metric: 'Client Satisfaction Score', managed: '4.3 / 5.0', freelancer: '3.6 / 5.0', inHouse: '4.4 / 5.0' },
  { metric: 'On-Time Delivery Rate', managed: '91%', freelancer: '72%', inHouse: '88%' },
  { metric: 'Average Ramp-Up Time', managed: '2-3 weeks', freelancer: 'Per project', inHouse: '4-8 weeks' },
  { metric: 'Retention Rate (Annual)', managed: '89%', freelancer: 'N/A', inHouse: '78%' },
  { metric: 'Avg Work Hour Overlap', managed: '5-6 hours', freelancer: '1-3 hours', inHouse: '8 hours' },
  { metric: 'Communication Rating', managed: '4.1 / 5.0', freelancer: '3.2 / 5.0', inHouse: '4.5 / 5.0' },
];

const keyStats = [
  { value: '59%', label: 'Avg Cost Savings', color: '#a3e635' },
  { value: '$768K', label: 'Savings (10-person)', color: '#c77dff' },
  { value: '4.3/5', label: 'Client Satisfaction', color: '#fbbf24' },
  { value: '91%', label: 'On-Time Delivery', color: '#7dd3fc' },
];

const glassStyle = {
  background: 'rgba(13, 8, 21, 0.5)',
  border: '1px solid rgba(157, 78, 221, 0.15)',
};

export function RemoteWorkforceCostAnalysis({ faqs }: Props) {
  return (
    <>
      {/* Header */}
      <Section className="pt-32 pb-12">
        <Container size="narrow">
          <Breadcrumbs items={[
            { label: 'Research', href: '/research' },
            { label: 'Remote Workforce Cost Analysis', href: '/research/remote-workforce-cost-analysis' },
          ]} />
          <div className="mt-8">
            <span className="text-[#9080a0] text-sm">February 2026 &middot; 13 min read</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
              Remote Workforce Cost Analysis
            </h1>
            <p className="text-[#b794c7] text-lg mt-4 leading-relaxed max-w-2xl">
              Comprehensive cost comparison of US in-house teams vs. managed remote teams across 12 roles in marketing, engineering, and operations. Includes overhead breakdown and quality benchmarks.
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

      {/* Role Cost Comparison */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Cost by Role: US In-House vs Remote</h2>
            <div className="rounded-xl overflow-hidden" style={glassStyle}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(157,78,221,0.15)]">
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Role</th>
                      <th className="text-right py-3 px-4 text-[#ff6b9d] font-medium">US Fully Loaded</th>
                      <th className="text-right py-3 px-4 text-[#a3e635] font-medium">Managed Remote</th>
                      <th className="text-right py-3 px-4 text-[#fbbf24] font-medium">Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleCostComparison.map((row, i) => (
                      <tr key={row.role} className={i < roleCostComparison.length - 1 ? 'border-b border-[rgba(157,78,221,0.08)]' : ''}>
                        <td className="py-3 px-4 text-white font-medium">{row.role}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.usFullyLoaded}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.remote}</td>
                        <td className="py-3 px-4 text-right text-[#a3e635] font-medium">{row.savings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-[#9080a0] text-xs mt-3">US costs include salary, benefits, payroll taxes, equipment, and allocated office space. Remote costs include salary, management overhead, tools, and quality assurance.</p>
          </FadeUp>
        </Container>
      </Section>

      {/* US Overhead Breakdown */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">US Employee: True Cost Breakdown</h2>
            <div className="rounded-xl overflow-hidden" style={glassStyle}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(157,78,221,0.15)]">
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Cost Item</th>
                      <th className="text-right py-3 px-4 text-[#c77dff] font-medium">Annual Cost</th>
                      <th className="text-right py-3 px-4 text-[#7dd3fc] font-medium">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usOverheadBreakdown.map((row, i) => (
                      <tr key={row.item} className={i < usOverheadBreakdown.length - 1 ? 'border-b border-[rgba(157,78,221,0.08)]' : ''}>
                        <td className={`py-3 px-4 font-medium ${i === usOverheadBreakdown.length - 1 ? 'text-white' : 'text-[#b794c7]'}`}>
                          {row.item}
                        </td>
                        <td className={`py-3 px-4 text-right ${i === usOverheadBreakdown.length - 1 ? 'text-white font-bold' : 'text-[#b794c7]'}`}>
                          {row.cost}
                        </td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.pctOfTotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* Team Scale Savings */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Savings at Scale</h2>
            <div className="rounded-xl overflow-hidden" style={glassStyle}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(157,78,221,0.15)]">
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Team Size</th>
                      <th className="text-right py-3 px-4 text-[#ff6b9d] font-medium">US Annual</th>
                      <th className="text-right py-3 px-4 text-[#a3e635] font-medium">Remote Annual</th>
                      <th className="text-right py-3 px-4 text-[#fbbf24] font-medium">Annual Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamScaleComparison.map((row, i) => (
                      <tr key={row.teamSize} className={i < teamScaleComparison.length - 1 ? 'border-b border-[rgba(157,78,221,0.08)]' : ''}>
                        <td className="py-3 px-4 text-white font-medium">{row.teamSize}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.usAnnual}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.remoteAnnual}</td>
                        <td className="py-3 px-4 text-right text-[#a3e635] font-bold">{row.annualSavings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* Quality Comparison */}
      <Section className="pb-12">
        <Container size="narrow">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Quality Comparison</h2>
            <div className="rounded-xl overflow-hidden" style={glassStyle}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(157,78,221,0.15)]">
                      <th className="text-left py-3 px-4 text-[#9080a0] font-medium">Metric</th>
                      <th className="text-right py-3 px-4 text-[#a3e635] font-medium">Managed Remote</th>
                      <th className="text-right py-3 px-4 text-[#fbbf24] font-medium">Freelancers</th>
                      <th className="text-right py-3 px-4 text-[#7dd3fc] font-medium">US In-House</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qualityMetrics.map((row, i) => (
                      <tr key={row.metric} className={i < qualityMetrics.length - 1 ? 'border-b border-[rgba(157,78,221,0.08)]' : ''}>
                        <td className="py-3 px-4 text-white font-medium">{row.metric}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.managed}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.freelancer}</td>
                        <td className="py-3 px-4 text-right text-[#b794c7]">{row.inHouse}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-[#9080a0] text-xs mt-3">Quality metrics based on internal data from managed remote team engagements across 120+ client accounts, 2024-2026.</p>
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
                { title: 'Average savings of 59-66% per role', text: 'Managed remote teams cost 59-66% less than equivalent US in-house hires when factoring in total employment cost. The largest savings are in video editing (66%), development (63%), and data analysis (63%).' },
                { title: 'Quality gap is narrower than expected', text: 'Managed remote teams score 4.3/5 on client satisfaction vs. 4.4/5 for in-house teams — a 2% difference. However, the gap with freelancers is substantial (3.6/5), highlighting the importance of management infrastructure.' },
                { title: 'A 10-person remote team saves $768K/year', text: 'Scaling to 10 remote team members saves approximately $768,000 annually compared to US in-house equivalents. This capital can be redirected to ad spend, tools, or additional headcount.' },
                { title: 'Ramp-up is 2-3x faster with managed teams', text: 'Managed remote teams onboard in 2-3 weeks on average, compared to 4-8 weeks for US in-house hires. Pre-trained specialists and established processes enable faster time-to-productivity.' },
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
              title="See what a remote team could save you"
              description="Get a free workforce analysis with personalized cost projections for your team structure."
            />
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-12">
              <InternalLinks content="remote team workforce hiring outsource offshore team management talent pod structure" />
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
