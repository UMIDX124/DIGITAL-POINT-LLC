'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, BarChart3, Users, Clock, ArrowRight, 
  X, CheckCircle, Calendar, Briefcase 
} from 'lucide-react';
import { 
  Section, Container, SectionHeader, FadeUp, GlassCard, 
  StaggerContainer, StaggerItem, SignalPoint 
} from '@/components/ui-dp/AnimatedElements';
import Link from 'next/link';

const caseStudies = [
  {
    id: 1,
    category: 'B2B Service Business',
    headline: '42% CAC Reduction in 4 Months',
    challenge: 'Inconsistent lead quality, no clear attribution, ad spend increasing without proportional results.',
    scope: ['Performance Marketing', 'Creative Testing', 'Attribution Setup'],
    outcomes: [
      { metric: '-42%', label: 'Customer Acquisition Cost' },
      { metric: '+127%', label: 'Qualified Lead Volume' },
      { metric: '3.2x', label: 'ROAS Improvement' },
    ],
    timeline: '4 months',
    quote: {
      text: "For the first time, we could see exactly which campaigns were driving revenue. The clarity was immediate—and so was the impact on our bottom line.",
      author: 'Founder',
      company: 'B2B Service Company',
    },
    services: ['Performance Marketing', 'Systems & Reporting'],
  },
  {
    id: 2,
    category: 'Multi-location Service Business',
    headline: '156% Pipeline Growth with Attribution Clarity',
    challenge: 'Multiple locations, fragmented reporting, no visibility into which marketing efforts drove results.',
    scope: ['Attribution System', 'Dashboard Build', 'CRM Optimization'],
    outcomes: [
      { metric: '+156%', label: 'Pipeline Value' },
      { metric: '48hrs', label: 'Reporting Time Reduced to Real-time' },
      { metric: '94%', label: 'Attribution Coverage' },
    ],
    timeline: '3 months',
    quote: {
      text: "We went from spending three days compiling reports to having everything in real-time. The decision-making speed alone was worth it.",
      author: 'CEO',
      company: 'Multi-location Service Business',
    },
    services: ['Systems & Reporting', 'Performance Marketing'],
  },
  {
    id: 3,
    category: 'Growth-stage Agency',
    headline: '12-Person Remote Team, 60% Founder Time Saved',
    challenge: 'Founder overwhelmed with execution, hiring bottlenecks, no capacity to scale without burnout.',
    scope: ['Remote Team Build', 'Process Documentation', 'Oversight System'],
    outcomes: [
      { metric: '12', label: 'Remote Team Members Deployed' },
      { metric: '-60%', label: 'Founder Operational Involvement' },
      { metric: '24/48h', label: 'Turnaround Time Improvement' },
    ],
    timeline: '6 months',
    quote: {
      text: "Building a remote team through Digital Point saved me 60% of my operational time. I finally have bandwidth to focus on strategy instead of execution.",
      author: 'Agency Owner',
      company: 'Growth-stage Agency',
    },
    services: ['Remote Workforce', 'Systems & Reporting'],
  },
  {
    id: 4,
    category: 'E-commerce Brand',
    headline: '28% ROAS Improvement Through Creative Testing',
    challenge: 'Static creative, no testing framework, declining performance as audiences saturated.',
    scope: ['Creative Framework', 'Testing Protocol', 'Performance Optimization'],
    outcomes: [
      { metric: '+28%', label: 'ROAS Improvement' },
      { metric: '47', label: 'Creative Variants Tested' },
      { metric: '2.3x', label: 'Winning Creative Performance' },
    ],
    timeline: '3 months',
    quote: {
      text: "The creative testing framework completely changed how we approach ads. We now know what works before scaling spend.",
      author: 'Marketing Director',
      company: 'E-commerce Brand',
    },
    services: ['Performance Marketing'],
  },
  {
    id: 5,
    category: 'Professional Services',
    headline: 'Real-time Dashboard Replaced 3-Day Manual Reporting',
    challenge: 'Reports compiled manually, data from 6+ sources, decisions delayed by reporting lag.',
    scope: ['Data Integration', 'Dashboard Build', 'Automation'],
    outcomes: [
      { metric: 'Real-time', label: 'Report Availability' },
      { metric: '-100%', label: 'Manual Reporting Hours Eliminated' },
      { metric: '6', label: 'Data Sources Unified' },
    ],
    timeline: '6 weeks',
    quote: {
      text: "What used to take three days of manual reporting now happens automatically. Our team can finally focus on analysis instead of data gathering.",
      author: 'Partner',
      company: 'Professional Services Firm',
    },
    services: ['Systems & Reporting'],
  },
  {
    id: 6,
    category: 'SaaS Company',
    headline: 'Integrated Model: Acquisition + Systems + Execution',
    challenge: 'Multiple vendors, no coordination, founder managing everything, no clear performance picture.',
    scope: ['Performance Marketing', 'Attribution', 'Remote Execution Pod'],
    outcomes: [
      { metric: '+89%', label: 'MQL Volume' },
      { metric: '-35%', label: 'CAC Reduction' },
      { metric: '8', label: 'Remote Team Members' },
    ],
    timeline: '6 months',
    quote: {
      text: "Having acquisition, systems, and execution under one roof eliminated the vendor coordination nightmare. Everything just works together now.",
      author: 'CEO',
      company: 'SaaS Company',
    },
    services: ['Performance Marketing', 'Systems & Reporting', 'Remote Workforce'],
  },
];

const filters = ['All', 'Performance Marketing', 'Systems & Reporting', 'Remote Workforce'];

export function ResultsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCase, setSelectedCase] = useState<typeof caseStudies[0] | null>(null);

  const filteredCases = activeFilter === 'All'
    ? caseStudies
    : caseStudies.filter(c => c.services.includes(activeFilter));

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 radial-glow" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        
        <Container className="relative z-10 pt-32 pb-20">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-border-glass text-text-secondary text-sm mb-6">
              <SignalPoint size="sm" />
              Results
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight max-w-4xl">
              What changes when{' '}
              <span className="text-gradient-plum">acquisition, reporting, and execution</span>{' '}
              finally line up.
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-text-secondary text-lg mt-6 max-w-2xl leading-relaxed">
              Real outcomes. Anonymized case studies. Proof that the integrated model delivers.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Filter */}
      <Section className="pt-0">
        <Container>
          <FadeUp className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  activeFilter === filter
                    ? 'bg-plum text-white'
                    : 'bg-surface-glass text-text-secondary hover:text-text-primary'
                }`}
              >
                {filter}
              </button>
            ))}
          </FadeUp>

          {/* Case Study Grid */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((study) => (
              <StaggerItem key={study.id}>
                <GlassCard
                  className="p-6 h-full cursor-pointer group"
                  onClick={() => setSelectedCase(study)}
                >
                  {/* Category Badge */}
                  <div className="text-text-muted text-xs uppercase tracking-wider mb-3">
                    {study.category}
                  </div>

                  {/* Headline */}
                  <h3 className="font-display text-xl font-bold text-text-primary mb-3 group-hover:text-plum-light transition-colors">
                    {study.headline}
                  </h3>

                  {/* Preview Metrics */}
                  <div className="flex gap-4 mb-4">
                    {study.outcomes.slice(0, 2).map((outcome) => (
                      <div key={outcome.label}>
                        <div className="text-plum-light font-display font-bold text-lg tabular-nums">
                          {outcome.metric}
                        </div>
                        <div className="text-text-muted text-xs">{outcome.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-2">
                    {study.services.map((service) => (
                      <span
                        key={service}
                        className="text-xs px-2 py-1 rounded bg-surface-glass-strong text-text-muted"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <GlassCard className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-text-muted text-xs uppercase tracking-wider mb-2">
                      {selectedCase.category}
                    </div>
                    <h2 className="font-display text-2xl font-bold text-text-primary">
                      {selectedCase.headline}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="p-2 rounded-lg hover:bg-surface-glass-strong transition-colors"
                  >
                    <X className="w-5 h-5 text-text-muted" />
                  </button>
                </div>

                {/* Challenge */}
                <div className="mb-6">
                  <h4 className="text-text-primary font-medium mb-2">Challenge</h4>
                  <p className="text-text-secondary text-sm">{selectedCase.challenge}</p>
                </div>

                {/* Outcomes */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {selectedCase.outcomes.map((outcome) => (
                    <div
                      key={outcome.label}
                      className="bg-surface-glass-strong rounded-xl p-4 text-center"
                    >
                      <div className="text-plum-light font-display font-bold text-2xl tabular-nums">
                        {outcome.metric}
                      </div>
                      <div className="text-text-muted text-xs mt-1">{outcome.label}</div>
                    </div>
                  ))}
                </div>

                {/* Scope */}
                <div className="mb-6">
                  <h4 className="text-text-primary font-medium mb-2">Scope</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.scope.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1 rounded-full bg-surface-glass text-text-secondary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-2 text-text-muted text-sm mb-6">
                  <Clock className="w-4 h-4" />
                  Timeline: {selectedCase.timeline}
                </div>

                {/* Quote */}
                <div className="bg-surface-glass rounded-xl p-4 mb-6">
                  <p className="text-text-secondary italic text-sm mb-2">
                    "{selectedCase.quote.text}"
                  </p>
                  <p className="text-text-muted text-xs">
                    — {selectedCase.quote.author}, {selectedCase.quote.company}
                  </p>
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-2">
                  {selectedCase.services.map((service) => (
                    <span
                      key={service}
                      className="text-xs px-3 py-1 rounded-full bg-plum/10 text-plum-light"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <Section background="gradient">
        <Container size="narrow">
          <FadeUp>
            <GlassCard className="p-8 md:p-12 text-center">
              <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
                Want results like these?
              </h2>
              <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                Every business is different. Let's discuss your specific situation.
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
