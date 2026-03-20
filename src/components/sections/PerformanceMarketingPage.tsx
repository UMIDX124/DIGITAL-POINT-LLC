'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, Target, BarChart3, Layers, Zap, Clock, 
  ArrowRight, CheckCircle, ChevronDown 
} from 'lucide-react';
import { 
  Section, Container, SectionHeader, FadeUp, GlassCard, 
  StaggerContainer, StaggerItem, SignalPoint 
} from '@/components/ui-dp/AnimatedElements';
import Link from 'next/link';

const channels = [
  { name: 'Meta Ads', description: 'Facebook & Instagram acquisition with creative testing and audience optimization' },
  { name: 'Google Ads', description: 'Search, Display, and YouTube with conversion-focused campaign structure' },
  { name: 'YouTube Ads', description: 'Video-first campaigns with hook optimization and audience sequencing' },
  { name: 'LinkedIn Ads', description: 'B2B targeting with lead gen forms and ABM strategies' },
];

const capabilities = [
  {
    icon: Target,
    title: 'Media Buying & Optimization',
    description: 'Strategic budget allocation, bid management, and continuous optimization across platforms.',
  },
  {
    icon: Layers,
    title: 'Creative Testing Frameworks',
    description: 'Systematic creative iteration with clear winners, losers, and scaling decisions.',
  },
  {
    icon: BarChart3,
    title: 'CAC & ROAS Clarity',
    description: 'Real visibility into customer acquisition costs and return on ad spend at every level.',
  },
  {
    icon: Zap,
    title: 'Landing Page Optimization',
    description: 'Conversion-focused landing pages built for your traffic sources and audiences.',
  },
  {
    icon: TrendingUp,
    title: 'Funnel Architecture',
    description: 'End-to-end funnel design from ad click to conversion with attribution tracking.',
  },
  {
    icon: Clock,
    title: 'Reporting Cadence',
    description: 'Weekly performance reviews with clear insights, not just data dumps.',
  },
];

const problems = [
  'Ad spend is increasing but leads aren\'t improving',
  'Creative is stale but you don\'t have capacity to test',
  'Attribution is broken — you can\'t tell what works',
  'Agencies send reports but no one explains them',
  'CAC is climbing and you don\'t know why',
  'Budget is scattered across platforms without strategy',
];

export function PerformanceMarketingPage() {
  const [activeChannel, setActiveChannel] = useState(0);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 radial-glow" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        
        <Container className="relative z-10 pt-32 pb-20">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-border-glass text-text-secondary text-sm mb-6">
              <SignalPoint size="sm" />
              Performance Marketing
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight max-w-4xl">
              Paid acquisition built for{' '}
              <span className="text-gradient-plum">controllable growth</span>.
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-text-secondary text-lg mt-6 max-w-2xl leading-relaxed">
              Not just media buying. Not just creative. A systematic approach to paid acquisition with CAC clarity, ROAS visibility, and creative testing that actually scales.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/free-growth-audit">
                <Button
                  className="bg-plum hover:bg-plum-light text-white font-semibold px-6 group"
                >
                  Get Audit
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/results">
                <Button
                  variant="outline"
                  className="border-border-glass hover:border-plum-light hover:text-text-primary bg-transparent"
                >
                  See Results
                </Button>
              </Link>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Channel Capability Map */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Platform Expertise"
            title="Full-funnel acquisition across the platforms that matter."
            align="center"
          />

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Channel List */}
            <FadeUp>
              <div className="space-y-3">
                {channels.map((channel, index) => (
                  <button
                    key={channel.name}
                    onClick={() => setActiveChannel(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      activeChannel === index
                        ? 'bg-surface-glass border border-plum-light'
                        : 'bg-surface-glass border border-transparent hover:border-border-glass'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-display font-semibold text-text-primary">{channel.name}</h3>
                        <p className="text-text-secondary text-sm mt-1">{channel.description}</p>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-text-muted transition-transform ${
                        activeChannel === index ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </button>
                ))}
              </div>
            </FadeUp>

            {/* Visual */}
            <FadeUp delay={0.2}>
              <GlassCard className="p-8 h-full flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-plum/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="w-10 h-10 text-plum-light" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                    {channels[activeChannel].name}
                  </h3>
                  <p className="text-text-secondary">
                    Platform-specific optimization with cross-platform attribution.
                  </p>
                </div>
              </GlassCard>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* Capabilities */}
      <Section background="gradient">
        <Container>
          <SectionHeader
            eyebrow="What We Do"
            title="Complete acquisition capability, not just ad management."
            align="center"
          />

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <StaggerItem key={cap.title}>
                <GlassCard className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-plum/10 flex items-center justify-center mb-4">
                    <cap.icon className="w-6 h-6 text-plum-light" />
                  </div>
                  <h3 className="font-display font-semibold text-text-primary mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {cap.description}
                  </p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Common Problems */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Sound Familiar?"
            title="These problems kill acquisition performance."
            description="If any of these sound like your current reality, your paid acquisition isn't working as hard as it could."
            align="center"
          />

          <FadeUp>
            <GlassCard className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {problems.map((problem) => (
                  <div key={problem} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-signal flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{problem}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeUp>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="gradient">
        <Container size="narrow">
          <FadeUp>
            <GlassCard className="p-8 md:p-12 text-center">
              <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
                Ready for acquisition clarity?
              </h2>
              <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                Let's diagnose your current performance and identify the gaps holding you back.
              </p>
              <Link href="/free-growth-audit">
                <Button
                  className="bg-plum hover:bg-plum-light text-white font-semibold px-8 py-6 group"
                >
                  Request Free Growth Audit
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </GlassCard>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
