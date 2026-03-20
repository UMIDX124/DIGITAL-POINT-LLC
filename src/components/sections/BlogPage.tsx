'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import {
  Section, Container, FadeUp, GlassCard,
  StaggerContainer, StaggerItem, SignalPoint
} from '@/components/ui-dp/AnimatedElements';
import Link from 'next/link';

const articles = [
  {
    slug: 'why-your-roas-is-lying',
    title: 'Why Your ROAS Is Lying to You (And What to Track Instead)',
    excerpt: 'Most businesses rely on platform-reported ROAS, but it rarely tells the full story. Here\'s what sophisticated advertisers track to understand real performance.',
    category: 'Performance Marketing',
    readTime: '6 min read',
    date: 'Mar 2025',
  },
  {
    slug: 'remote-team-playbook',
    title: 'The Remote Team Playbook: How We Build High-Output Teams Across Time Zones',
    excerpt: 'Building a remote workforce isn\'t about finding cheap labor — it\'s about creating systems that let distributed teams operate at enterprise speed.',
    category: 'Remote Workforce',
    readTime: '8 min read',
    date: 'Feb 2025',
  },
  {
    slug: 'reporting-that-drives-decisions',
    title: 'Reporting That Actually Drives Decisions (Not Just Occupies Meetings)',
    excerpt: 'Stop sending PDF reports that nobody reads. Here\'s how we build reporting systems that surface the signal from the noise.',
    category: 'Systems & Reporting',
    readTime: '5 min read',
    date: 'Jan 2025',
  },
  {
    slug: 'scaling-ad-spend-without-cac-creep',
    title: 'How to Scale Ad Spend Without CAC Creep',
    excerpt: 'Scaling from $50K to $500K/month in ad spend without letting customer acquisition costs spiral is a real skill. Here\'s the framework.',
    category: 'Performance Marketing',
    readTime: '7 min read',
    date: 'Dec 2024',
  },
  {
    slug: 'ai-powered-lead-qualification',
    title: 'AI-Powered Lead Qualification: What Works and What Doesn\'t',
    excerpt: 'We integrated AI agents into our client\'s lead pipeline. The results were surprising — both good and bad.',
    category: 'AI & Automation',
    readTime: '6 min read',
    date: 'Nov 2024',
  },
  {
    slug: 'attribution-in-2025',
    title: 'Attribution in 2025: A Practical Guide for Marketing Teams',
    excerpt: 'With third-party cookies dying and privacy regulations tightening, here\'s how smart teams are still measuring what works.',
    category: 'Performance Marketing',
    readTime: '9 min read',
    date: 'Oct 2024',
  },
];

const categoryColors: Record<string, string> = {
  'Performance Marketing': '#c77dff',
  'Remote Workforce': '#ff6b9d',
  'Systems & Reporting': '#7dd3fc',
  'AI & Automation': '#a3e635',
};

export function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 radial-glow" />
        <Container className="relative z-10 pt-32 pb-12">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-glass border border-border-glass text-text-secondary text-sm mb-6">
              <SignalPoint size="sm" />
              Resources & Insights
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Insights from the{' '}
              <span className="bg-gradient-to-r from-[#e0aaff] via-[#c77dff] to-[#ff6b9d] bg-clip-text text-transparent">
                growth trenches
              </span>
            </h1>
            <p className="text-[#b794c7] text-lg md:text-xl max-w-2xl leading-relaxed">
              Frameworks, case studies, and hard-won lessons from managing $50M+ in ad spend and building remote teams across the globe.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Articles Grid */}
      <Section>
        <Container>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <StaggerItem key={article.slug}>
                <GlassCard className="p-6 h-full flex flex-col group cursor-pointer">
                  {/* Category tag */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: `${categoryColors[article.category] || '#c77dff'}15`,
                        border: `1px solid ${categoryColors[article.category] || '#c77dff'}30`,
                        color: categoryColors[article.category] || '#c77dff',
                      }}
                    >
                      <Tag className="w-3 h-3" />
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-semibold text-white group-hover:text-[#e0aaff] transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[#9080a0] text-sm leading-relaxed flex-1 mb-4">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(157, 78, 221, 0.1)' }}>
                    <div className="flex items-center gap-3 text-[#7c5a8a] text-xs">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#c77dff] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Newsletter CTA */}
      <Section>
        <Container>
          <FadeUp>
            <div
              className="max-w-2xl mx-auto text-center rounded-2xl p-8 md:p-12"
              style={{
                background: 'linear-gradient(135deg, rgba(123, 44, 191, 0.15), rgba(157, 78, 221, 0.08))',
                border: '1px solid rgba(199, 125, 255, 0.2)',
              }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                Want growth insights in your inbox?
              </h2>
              <p className="text-[#b794c7] text-sm mb-6">
                No spam. Just real frameworks and case studies we use with our clients. Unsubscribe anytime.
              </p>
              <Link href="/free-growth-audit">
                <motion.span
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)',
                    boxShadow: '0 4px 16px rgba(123, 44, 191, 0.3)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start with a Free Audit Instead
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
