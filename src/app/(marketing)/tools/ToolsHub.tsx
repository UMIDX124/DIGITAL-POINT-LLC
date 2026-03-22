'use client';

import Link from 'next/link';
import { Calculator, TrendingUp, DollarSign, BarChart3, PieChart } from 'lucide-react';
import {
  Section, Container, FadeUp, GlassCard,
  StaggerContainer, StaggerItem, SignalPoint
} from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';

const tools = [
  {
    slug: 'roas-calculator',
    title: 'ROAS Calculator',
    description: 'Calculate your Return on Ad Spend instantly. Compare platform-reported vs. blended ROAS.',
    icon: TrendingUp,
    color: '#c77dff',
    tags: ['Paid Ads', 'ROI'],
  },
  {
    slug: 'cac-calculator',
    title: 'CAC Calculator',
    description: 'Calculate Customer Acquisition Cost across channels. Find your most efficient acquisition source.',
    icon: DollarSign,
    color: '#ff6b9d',
    tags: ['Unit Economics', 'Growth'],
  },
  {
    slug: 'ad-spend-profit-calculator',
    title: 'Ad Spend Profit Calculator',
    description: 'Model profitability at different ad spend levels. Find your optimal budget allocation.',
    icon: Calculator,
    color: '#a3e635',
    tags: ['Budget', 'Profitability'],
  },
  {
    slug: 'attribution-model-visualizer',
    title: 'Attribution Model Visualizer',
    description: 'Compare first-click, last-click, linear, time-decay, and position-based attribution models side by side.',
    icon: PieChart,
    color: '#7dd3fc',
    tags: ['Attribution', 'Analytics'],
  },
  {
    slug: 'dashboard-cost-calculator',
    title: 'Dashboard Cost Calculator',
    description: 'Estimate the cost of building vs. buying a marketing analytics dashboard for your team.',
    icon: BarChart3,
    color: '#fbbf24',
    tags: ['Reporting', 'Systems'],
  },
];

export function ToolsHub() {
  return (
    <>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 radial-glow" />
        <Container className="relative z-10 pt-32 pb-12">
          <FadeUp>
            <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }]} />
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-border-glass text-text-secondary text-sm mb-6 mt-4">
              <SignalPoint size="sm" />
              Free Marketing Tools
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Marketing{' '}
              <span className="bg-gradient-to-r from-[#e0aaff] via-[#c77dff] to-[#ff6b9d] bg-clip-text text-transparent">
                calculators
              </span>
              {' '}& tools
            </h1>
            <p className="text-[#b794c7] text-lg md:text-xl max-w-2xl leading-relaxed">
              Free interactive tools to analyze your marketing performance, calculate ROI, and find optimization opportunities.
            </p>
          </FadeUp>
        </Container>
      </section>

      <Section>
        <Container>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <StaggerItem key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`}>
                    <GlassCard className="p-6 h-full flex flex-col group cursor-pointer relative">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: `${tool.color}15`, border: `1px solid ${tool.color}25` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: tool.color }} />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-white group-hover:text-[#e0aaff] transition-colors mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-[#9080a0] text-sm leading-relaxed flex-1 mb-4">{tool.description}</p>
                      <div className="flex gap-2">
                        {tool.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] text-[#7c5a8a] bg-[rgba(157,78,221,0.1)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <div className="mt-16">
            <GrowthAuditCTA variant="banner" title="Need custom analytics?" description="Our team builds custom dashboards and attribution systems. Start with a free growth audit." />
          </div>
        </Container>
      </Section>
    </>
  );
}
