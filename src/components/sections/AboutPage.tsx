'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe, Users, Target, TrendingUp, Shield, Clock } from 'lucide-react';
import {
  Section, Container, SectionHeader, FadeUp, GlassCard,
  StaggerContainer, StaggerItem, SignalPoint, MetricDisplay
} from '@/components/ui-dp/AnimatedElements';
import Link from 'next/link';

const milestones = [
  { year: '2017', title: 'Founded', description: 'Digital Point LLC established with a focus on performance marketing for growth-stage businesses.' },
  { year: '2019', title: 'Remote Ops Launched', description: 'Expanded into remote workforce solutions, building dedicated global teams for US clients.' },
  { year: '2021', title: '$25M+ Under Management', description: 'Crossed $25M in managed ad spend with a growing roster of high-LTV clients.' },
  { year: '2023', title: 'Systems Division', description: 'Added reporting and systems consulting to help clients build operational clarity.' },
  { year: '2025', title: 'AI-Powered Platform', description: 'Integrated AI assistants and multi-agent systems into client workflows.' },
];

const values = [
  {
    icon: Target,
    title: 'Clarity Over Complexity',
    description: 'We cut through noise. Every report, every recommendation, every meeting has a clear purpose.',
  },
  {
    icon: TrendingUp,
    title: 'Outcomes, Not Activity',
    description: 'We measure what matters — revenue, ROAS, qualified leads. Not impressions and vanity metrics.',
  },
  {
    icon: Shield,
    title: 'Ownership Mentality',
    description: 'We treat your budget like ours. Every dollar gets scrutiny, every campaign gets attention.',
  },
  {
    icon: Users,
    title: 'Partnership Model',
    description: 'We don\'t do arms-length vendor relationships. We embed into your team and move with you.',
  },
  {
    icon: Globe,
    title: 'Global Delivery',
    description: 'US-grade strategy with globally distributed execution. Time zone coverage, cost efficiency.',
  },
  {
    icon: Clock,
    title: 'Speed to Impact',
    description: 'First audit insights within 48 hours. Campaign launches within a week. No 90-day onboarding.',
  },
];

export function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 radial-glow" />
        <Container className="relative z-10 pt-32 pb-16">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-border-glass text-text-secondary text-sm mb-6">
              <SignalPoint size="sm" />
              About Digital Point
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Built for businesses that need{' '}
              <span className="bg-gradient-to-r from-[#e0aaff] via-[#c77dff] to-[#ff6b9d] bg-clip-text text-transparent">
                real growth
              </span>
              , not reports about growth.
            </h1>
            <p className="text-[#b794c7] text-lg md:text-xl max-w-2xl leading-relaxed">
              We help companies connect ad spend to revenue, build remote teams that actually ship, and create systems that give founders back their weekends.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Metrics */}
      <Section>
        <Container>
          <FadeUp>
            <div
              className="rounded-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8"
              style={{
                background: 'rgba(26, 15, 46, 0.5)',
                border: '1px solid rgba(157, 78, 221, 0.15)',
              }}
            >
              <MetricDisplay value="8" suffix="+" label="Years in Market" />
              <MetricDisplay prefix="$" value="50M" suffix="+" label="Ad Spend Managed" />
              <MetricDisplay value="200" suffix="+" label="Growth Audits" />
              <MetricDisplay value="4.2" suffix="x" label="Average ROAS" />
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* Story */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Our Story"
            title="From one marketer to a full-service growth engine"
            description="Digital Point started when our co-founders, M. Faizan Rafiq and Anwaar Tayyab, saw the same pattern everywhere — businesses spending on ads but unable to see what was working. We set out to fix that."
          />

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#c77dff] via-[#9d4edd] to-transparent" />

            <StaggerContainer className="space-y-12">
              {milestones.map((item, i) => (
                <StaggerItem key={item.year}>
                  <div className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#c77dff] z-10"
                      style={{ boxShadow: '0 0 12px rgba(199, 125, 255, 0.6)' }}
                    />

                    <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                      <span className="text-[#c77dff] font-mono text-sm">{item.year}</span>
                      <h3 className="font-display text-xl font-semibold text-white mt-1">{item.title}</h3>
                      <p className="text-[#b794c7] text-sm mt-2 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="What We Stand For"
            title="Principles that shape how we work"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <GlassCard className="p-6 h-full">
                  <value.icon className="w-8 h-8 text-[#c77dff] mb-4" />
                  <h3 className="font-display text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-[#b794c7] text-sm leading-relaxed">{value.description}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to see what we can do for you?
              </h2>
              <p className="text-[#b794c7] text-lg mb-8">
                Start with a free growth audit. No pitch, no pressure — just clarity on what&apos;s working and what isn&apos;t.
              </p>
              <Link href="/free-growth-audit">
                <motion.span
                  className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 50%, #c77dff 100%)',
                    boxShadow: '0 4px 20px rgba(123, 44, 191, 0.4)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Your Free Audit
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
