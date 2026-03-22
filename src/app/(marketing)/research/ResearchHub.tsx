'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, TrendingUp, DollarSign, Eye, Users } from 'lucide-react';
import { Section, Container, FadeUp, GlassCard, SectionHeader } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';

const reports = [
  {
    slug: 'facebook-ads-benchmarks-2026',
    title: 'Facebook Ads Benchmarks 2026',
    description: 'CPC, CPM, CTR, and ROAS benchmarks across 12 industries. Updated with Q1 2026 data from $48M+ in tracked ad spend.',
    icon: BarChart3,
    color: '#7dd3fc',
    date: 'March 2026',
    readTime: '12 min read',
    stat: '12 Industries',
  },
  {
    slug: 'google-ads-roas-benchmarks',
    title: 'Google Ads ROAS Benchmarks by Industry',
    description: 'Search, Display, YouTube, and Performance Max ROAS benchmarks. Based on analysis of $62M in Google Ads spend across verticals.',
    icon: TrendingUp,
    color: '#a3e635',
    date: 'February 2026',
    readTime: '14 min read',
    stat: '4 Campaign Types',
  },
  {
    slug: 'average-cac-by-industry',
    title: 'Average Customer Acquisition Cost by Industry',
    description: 'CAC benchmarks across 18 industries with breakdowns by company size, channel, and business model (B2B vs B2C).',
    icon: DollarSign,
    color: '#fbbf24',
    date: 'January 2026',
    readTime: '15 min read',
    stat: '18 Industries',
  },
  {
    slug: 'marketing-attribution-statistics',
    title: 'Marketing Attribution Statistics 2026',
    description: 'Attribution model adoption rates, tracking accuracy post-iOS 17, and the real impact of privacy changes on marketing measurement.',
    icon: Eye,
    color: '#c77dff',
    date: 'March 2026',
    readTime: '11 min read',
    stat: '47 Data Points',
  },
  {
    slug: 'remote-workforce-cost-analysis',
    title: 'Remote Workforce Cost Analysis',
    description: 'Comprehensive cost comparison of US in-house teams vs. managed remote teams across marketing, engineering, and operations roles.',
    icon: Users,
    color: '#ff6b9d',
    date: 'February 2026',
    readTime: '13 min read',
    stat: '8 Role Categories',
  },
];

export function ResearchHub() {
  return (
    <>
      <Section className="pt-32 pb-12">
        <Container size="narrow">
          <Breadcrumbs items={[{ label: 'Research', href: '/research' }]} />
        </Container>
      </Section>

      <Section className="pb-8">
        <Container size="narrow">
          <SectionHeader
            eyebrow="Research & Benchmarks"
            title="Data-Driven Marketing Research"
            description="Original research reports with industry benchmarks, cost analysis, and performance data. Built from real campaign data across hundreds of accounts."
            align="center"
          />
        </Container>
      </Section>

      <Section className="pb-20">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {reports.map((report, index) => {
              const Icon = report.icon;
              return (
                <FadeUp key={report.slug} delay={index * 0.08}>
                  <Link href={`/research/${report.slug}`} className="block group h-full">
                    <GlassCard className="p-6 h-full">
                      <div className="flex items-start gap-4">
                        <div
                          className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ background: `${report.color}15`, border: `1px solid ${report.color}30` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: report.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[#9080a0] text-xs">{report.date}</span>
                            <span className="text-[#9080a0] text-xs">-</span>
                            <span className="text-[#9080a0] text-xs">{report.readTime}</span>
                          </div>
                          <h3 className="font-display text-lg font-semibold text-white group-hover:text-[#e0aaff] transition-colors mb-2">
                            {report.title}
                          </h3>
                          <p className="text-[#b794c7] text-sm leading-relaxed mb-3">
                            {report.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span
                              className="text-xs font-medium px-2.5 py-1 rounded-full"
                              style={{ background: `${report.color}15`, color: report.color }}
                            >
                              {report.stat}
                            </span>
                            <span className="flex items-center gap-1 text-[#c77dff] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              Read Report <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="pb-24">
        <Container size="narrow">
          <GrowthAuditCTA
            title="Put these benchmarks to work"
            description="Get a free growth audit and see how your metrics stack up against industry benchmarks."
          />
        </Container>
      </Section>
    </>
  );
}
