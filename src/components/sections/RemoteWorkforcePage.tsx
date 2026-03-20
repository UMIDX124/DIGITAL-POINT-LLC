'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Users, UserCheck, Shield, BarChart3, Clock, RefreshCw,
  ArrowRight, CheckCircle, Filter
} from 'lucide-react';
import { 
  Section, Container, SectionHeader, FadeUp, GlassCard, 
  StaggerContainer, StaggerItem, SignalPoint 
} from '@/components/ui-dp/AnimatedElements';
import Link from 'next/link';

const roles = [
  { category: 'Marketing', roles: ['Media Buyers', 'Designers', 'Video Editors', 'Content Writers', 'SEO Specialists'] },
  { category: 'Operations', roles: ['Operations Coordinators', 'VAs', 'Project Managers', 'Reporting Assistants'] },
  { category: 'Sales & Support', roles: ['Appointment Setters', 'Customer Support', 'Sales Development Reps'] },
];

const guarantees = [
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Every deliverable goes through QA. Not blind trust — structured verification.',
  },
  {
    icon: Clock,
    title: 'Communication Cadence',
    description: 'Daily standups, weekly reviews, clear escalation paths. No ghosting, no surprises.',
  },
  {
    icon: BarChart3,
    title: 'Reporting & Visibility',
    description: 'You see what we see. Full transparency on hours, outputs, and performance.',
  },
  {
    icon: RefreshCw,
    title: 'Replacement Guarantee',
    description: 'If someone isn\'t working out, we handle replacement at no extra cost.',
  },
];

const painPoints = [
  'Remote hiring feels risky — how do you know they\'ll deliver?',
  'Previous remote teams had communication issues',
  'Quality control was non-existent with past providers',
  'No visibility into what remote staff actually do',
  'Time zone differences caused delays',
  'Onboarding was slow and disorganized',
];

export function RemoteWorkforcePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredRoles = activeCategory 
    ? roles.filter(r => r.category === activeCategory)
    : roles;

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
              Remote Workforce
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight max-w-4xl">
              Remote teams you can actually{' '}
              <span className="text-gradient-plum">trust, manage, and scale</span>.
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-text-secondary text-lg mt-6 max-w-2xl leading-relaxed">
              Not cheap outsourcing. Structured, managed, and accountable remote execution with onboarding, oversight, QA, and clear ownership of outcomes.
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

      {/* Role Matrix */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Role Categories"
            title="Specialized talent for every function."
            description="Pre-vetted professionals organized by your needs, not random placements."
            align="center"
          />

          {/* Filter */}
          <FadeUp className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeCategory === null
                  ? 'bg-plum text-white'
                  : 'bg-surface-glass text-text-secondary hover:text-text-primary'
              }`}
            >
              All Roles
            </button>
            {roles.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  activeCategory === cat.category
                    ? 'bg-plum text-white'
                    : 'bg-surface-glass text-text-secondary hover:text-text-primary'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </FadeUp>

          {/* Role Cards */}
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {filteredRoles.map((category) => (
              <StaggerItem key={category.category}>
                <GlassCard className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-plum/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-plum-light" />
                    </div>
                    <h3 className="font-display font-semibold text-text-primary">
                      {category.category}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {category.roles.map((role) => (
                      <li key={role} className="flex items-center gap-2 text-text-secondary text-sm">
                        <SignalPoint size="sm" pulse={false} />
                        {role}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Pod Model */}
      <Section background="gradient">
        <Container>
          <SectionHeader
            eyebrow="The Pod Model"
            title="Not individuals. Integrated teams."
            description="We build pods — small, focused teams with clear roles, shared context, and collective accountability."
            align="center"
          />

          <FadeUp>
            <GlassCard className="p-8">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                {/* Center Hub */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-plum/20 flex items-center justify-center">
                    <UserCheck className="w-10 h-10 text-plum-light" />
                  </div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-text-primary font-medium whitespace-nowrap">
                    Pod Lead
                  </span>
                </div>

                {/* Connected Roles */}
                <div className="flex flex-wrap justify-center gap-4">
                  {['Media Buyer', 'Designer', 'VA', 'Reporter'].map((role, i) => (
                    <motion.div
                      key={role}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-surface-glass-strong flex items-center justify-center mb-2">
                        <Users className="w-6 h-6 text-text-secondary" />
                      </div>
                      <span className="text-text-muted text-xs">{role}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border-glass">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-display font-bold text-text-primary">24-48h</div>
                    <div className="text-text-muted text-sm">Response time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-display font-bold text-text-primary">Weekly</div>
                    <div className="text-text-muted text-sm">Performance reviews</div>
                  </div>
                  <div>
                    <div className="text-2xl font-display font-bold text-text-primary">100%</div>
                    <div className="text-text-muted text-sm">Visibility on output</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </FadeUp>
        </Container>
      </Section>

      {/* Guarantees */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Our Commitment"
            title="Structure you can rely on."
            description="Remote workforce without chaos means clear systems and real accountability."
            align="center"
          />

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((item) => (
              <StaggerItem key={item.title}>
                <GlassCard className="p-6 h-full text-center">
                  <div className="w-12 h-12 rounded-xl bg-plum/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-plum-light" />
                  </div>
                  <h3 className="font-display font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {item.description}
                  </p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Pain Points */}
      <Section background="gradient">
        <Container>
          <SectionHeader
            eyebrow="Common Concerns"
            title="We've heard every remote hiring nightmare."
            description="Here's why they happen — and how we prevent them."
            align="center"
          />

          <FadeUp>
            <GlassCard className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {painPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-signal flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{point}</span>
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
                Need execution capacity?
              </h2>
              <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                Let's discuss your team structure needs and see if a pod model fits.
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
