'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import {
  Section, Container, FadeUp, GlassCard, SectionHeader,
} from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';
import type { Guide } from '@/lib/guides';

const guideColors: Record<string, string> = {
  'marketing-attribution-complete-guide': '#c77dff',
  'paid-ads-optimization-guide': '#ff6b9d',
  'cac-roas-guide': '#fbbf24',
  'marketing-analytics-guide': '#7dd3fc',
  'remote-marketing-team-guide': '#a3e635',
  'growth-systems-guide': '#e0aaff',
};

export function GuidesHub({ guides }: { guides: Guide[] }) {
  return (
    <>
      <Section className="pt-32 pb-12">
        <Container size="narrow">
          <Breadcrumbs items={[{ label: 'Guides', href: '/guides' }]} />
        </Container>
      </Section>

      <Section className="pb-8">
        <Container size="narrow">
          <SectionHeader
            eyebrow="Comprehensive Guides"
            title="Marketing Playbooks for Growth Teams"
            description="In-depth, actionable guides covering every aspect of performance marketing, analytics, and growth operations. Built from real campaign data and operational experience."
            align="center"
          />
        </Container>
      </Section>

      <Section className="pb-20">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {guides.map((guide, index) => {
              const color = guideColors[guide.slug] || '#c77dff';
              return (
                <FadeUp key={guide.slug} delay={index * 0.08}>
                  <Link href={`/guides/${guide.slug}`} className="block group h-full">
                    <GlassCard className="p-6 h-full">
                      <div className="flex items-start gap-4">
                        <div
                          className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                        >
                          <BookOpen className="w-5 h-5" style={{ color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="flex items-center gap-1 text-[#9080a0] text-xs">
                              <Clock className="w-3 h-3" />
                              {guide.readTime}
                            </span>
                            <span className="text-[#9080a0] text-xs">-</span>
                            <span className="text-[#9080a0] text-xs">
                              {guide.sections.length} sections
                            </span>
                          </div>
                          <h3 className="font-display text-lg font-semibold text-white group-hover:text-[#e0aaff] transition-colors mb-2">
                            {guide.title}
                          </h3>
                          <p className="text-[#b794c7] text-sm leading-relaxed mb-3">
                            {guide.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span
                              className="text-xs font-medium px-2.5 py-1 rounded-full"
                              style={{ background: `${color}15`, color }}
                            >
                              Pillar Guide
                            </span>
                            <span className="flex items-center gap-1 text-[#c77dff] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              Read Guide <ArrowRight className="w-3.5 h-3.5" />
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
            title="Put these strategies into action"
            description="Get a free growth audit and let our team help you implement the frameworks from these guides."
          />
        </Container>
      </Section>
    </>
  );
}
