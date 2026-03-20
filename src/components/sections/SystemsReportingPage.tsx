'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Settings, BarChart3, Database, Workflow, PieChart, FileText,
  ArrowRight, CheckCircle
} from 'lucide-react';
import { 
  Section, Container, SectionHeader, FadeUp, GlassCard, 
  StaggerContainer, StaggerItem, SignalPoint 
} from '@/components/ui-dp/AnimatedElements';
import Link from 'next/link';

const systemTypes = [
  {
    icon: BarChart3,
    title: 'Reporting Dashboards',
    description: 'Clear, actionable dashboards that show what matters — not data dumps that require translation.',
  },
  {
    icon: Database,
    title: 'Attribution Systems',
    description: 'Multi-touch attribution that actually reflects your customer journey and informs decisions.',
  },
  {
    icon: Settings,
    title: 'CRM Structure',
    description: 'Pipeline stages, lead scoring, and automation rules that match how your business actually works.',
  },
  {
    icon: Workflow,
    title: 'Marketing Automation',
    description: 'Lead routing, nurture sequences, and trigger-based workflows that run without manual intervention.',
  },
  {
    icon: PieChart,
    title: 'Revenue Operations',
    description: 'Alignment between marketing, sales, and success with shared metrics and clear handoffs.',
  },
  {
    icon: FileText,
    title: 'SOP Documentation',
    description: "Process documentation that keeps execution consistent regardless of who's running it.",
  },
];

const workflowTabs = [
  {
    id: 'attribution',
    label: 'Attribution',
    content: {
      title: 'Attribution Clarity',
      description: 'Stop guessing which channels work. Multi-touch attribution that accounts for the full customer journey.',
      steps: ['Data source integration', 'Touchpoint mapping', 'Model configuration', 'Dashboard deployment'],
    },
  },
  {
    id: 'automation',
    label: 'Automation',
    content: {
      title: 'Marketing Automation',
      description: 'Lead routing, nurturing, and trigger-based workflows that scale without adding headcount.',
      steps: ['Journey mapping', 'Platform setup', 'Trigger configuration', 'Testing & deployment'],
    },
  },
  {
    id: 'reporting',
    label: 'Reporting',
    content: {
      title: 'Reporting Systems',
      description: 'Dashboards that tell you what to do next, not just what happened last week.',
      steps: ['KPI definition', 'Data pipeline', 'Visualization design', 'Distribution setup'],
    },
  },
];

const breakPoints = [
  'Reports exist but no one uses them to make decisions',
  'Attribution is broken — every channel claims credit',
  'Data lives in 5+ tools and never comes together',
  'Reporting takes days to compile manually',
  'No one trusts the numbers enough to act on them',
  'Founders are the only ones who understand the system',
];

export function SystemsReportingPage() {
  const [activeTab, setActiveTab] = useState(workflowTabs[0]);

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
              Systems & Reporting
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight max-w-4xl">
              Fix the{' '}
              <span className="text-gradient-plum">systems behind the numbers</span>.
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-text-secondary text-lg mt-6 max-w-2xl leading-relaxed">
              Attribution, CRM structure, automation, and dashboards. The invisible infrastructure that determines whether you can scale or just spend.
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

      {/* System Types */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="What We Build"
            title="Systems that make decisions obvious."
            description="Not just dashboards. The infrastructure that connects your data to your decisions."
            align="center"
          />

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemTypes.map((system) => (
              <StaggerItem key={system.title}>
                <GlassCard className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-violet/10 flex items-center justify-center mb-4">
                    <system.icon className="w-6 h-6 text-violet" />
                  </div>
                  <h3 className="font-display font-semibold text-text-primary mb-2">
                    {system.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {system.description}
                  </p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Workflow Explorer */}
      <Section background="gradient">
        <Container>
          <SectionHeader
            eyebrow="Interactive"
            title="Explore the systems."
            description="Click through to see how each system is built and deployed."
            align="center"
          />

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Tabs */}
            <FadeUp>
              <div className="space-y-2">
                {workflowTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      activeTab.id === tab.id
                        ? 'bg-surface-glass border border-violet'
                        : 'bg-surface-glass border border-transparent hover:border-border-glass'
                    }`}
                  >
                    <span className="font-medium text-text-primary">{tab.label}</span>
                  </button>
                ))}
              </div>
            </FadeUp>

            {/* Content */}
            <FadeUp delay={0.2} className="lg:col-span-2">
              <GlassCard className="p-8 h-full">
                <h3 className="font-display text-xl font-bold text-text-primary mb-4">
                  {activeTab.content.title}
                </h3>
                <p className="text-text-secondary mb-6">
                  {activeTab.content.description}
                </p>
                
                <div className="space-y-3">
                  {activeTab.content.steps.map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-violet/10 flex items-center justify-center text-violet text-sm font-mono">
                        {i + 1}
                      </div>
                      <span className="text-text-primary">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* Break Points */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Warning Signs"
            title="What breaks when systems are missing."
            description="These are the symptoms of infrastructure debt. They compound over time."
            align="center"
          />

          <FadeUp>
            <GlassCard className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {breakPoints.map((point) => (
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
                Need systems clarity?
              </h2>
              <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                Let's audit your current setup and identify the gaps costing you visibility and decisions.
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
