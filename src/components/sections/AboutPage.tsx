'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe, Users, Target, TrendingUp, Shield, Clock } from 'lucide-react';
import {
  Section, Container, SectionHeader, FadeUp, GlassCard,
  StaggerContainer, StaggerItem, SignalPoint, MetricDisplay
} from '@/components/ui-dp/AnimatedElements';
import Link from 'next/link';

const milestones = [
  { year: '2017', title: 'Two Friends, One Laptop', description: 'Faizan and Anwaar started Digital Point from a tiny home office. First client came from a cold LinkedIn message that almost went to spam.' },
  { year: '2019', title: 'Going Global', description: 'Realized the best talent doesn\'t always live in your zip code. Built our first remote team and never looked back.' },
  { year: '2021', title: '$25M+ Under Management', description: 'Crossed $25M in managed ad spend. Celebrated with pizza, not champagne. We\'re still those guys.' },
  { year: '2023', title: 'Systems Division', description: 'Clients kept asking "can you fix our reporting too?" So we did. Turns out, clarity is addictive.' },
  { year: '2025', title: 'AI-Powered Platform', description: 'Started building AI into our workflows because we\'re obsessed with doing more with less. Our clients\' budgets deserve it.' },
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
              We&apos;ve been in your shoes — staring at dashboards that don&apos;t add up, wondering which campaigns actually drive revenue. We built Digital Point to fix that, for ourselves first, then for everyone else.
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
            title="Two guys who got tired of watching businesses waste money"
            description=""
          />

          {/* Personal founder story */}
          <div className="max-w-3xl mx-auto mb-16">
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: 'rgba(26, 15, 46, 0.5)',
                border: '1px solid rgba(157, 78, 221, 0.15)',
              }}
            >
              <p className="text-[#b794c7] text-base leading-relaxed mb-4">
                Here&apos;s the honest version: back in 2017, Faizan was managing ad accounts and kept seeing the same thing — businesses pouring money into campaigns with no idea what was actually driving revenue. Anwaar, on the other hand, was deep in the data side, building dashboards that nobody used because they answered the wrong questions.
              </p>
              <p className="text-[#b794c7] text-base leading-relaxed mb-4">
                We met, argued about attribution models over too much coffee, and realized we were solving two halves of the same problem. Faizan knew how to make ads perform. Anwaar knew how to prove it. Together, we figured — why not just do both?
              </p>
              <p className="text-[#b794c7] text-base leading-relaxed mb-4">
                Digital Point started in a spare room with one client who took a chance on us. Eight years later, we&apos;ve managed over $50M in ad spend, built remote teams across continents, and helped businesses go from &ldquo;we think our ads work&rdquo; to &ldquo;we know exactly what&apos;s driving revenue.&rdquo;
              </p>
              <p className="text-white text-base leading-relaxed font-medium">
                We&apos;re still those two guys who argue about attribution over coffee. We just have a bigger team now — and better coffee.
              </p>
              <div className="flex flex-wrap gap-6 mt-6 pt-6" style={{ borderTop: '1px solid rgba(157, 78, 221, 0.15)' }}>
                <div>
                  <p className="text-white font-display font-semibold">M. Faizan Rafiq</p>
                  <p className="text-[#c77dff] text-sm">Co-Founder &middot; The Ads Guy</p>
                  <p className="text-[#9080a0] text-xs mt-1">Secretly competitive about ROAS the way some people are about fantasy football.</p>
                </div>
                <div>
                  <p className="text-white font-display font-semibold">Anwaar Tayyab</p>
                  <p className="text-[#c77dff] text-sm">Co-Founder &middot; The Data Guy</p>
                  <p className="text-[#9080a0] text-xs mt-1">Will redesign your entire dashboard if one chart is slightly misleading. You&apos;ve been warned.</p>
                </div>
              </div>
            </div>
          </div>

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
