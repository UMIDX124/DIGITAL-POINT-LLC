'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import {
  Section, Container, FadeUp, GlassCard,
  StaggerContainer, StaggerItem, SignalPoint
} from '@/components/ui-dp/AnimatedElements';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';
import { NewsletterOptIn } from '@/components/seo/NewsletterOptIn';
import type { BlogPost, BlogCategory } from '@/lib/blog';

interface Props {
  posts: BlogPost[];
  categories: { name: BlogCategory; count: number }[];
  categoryMeta: Record<string, { color: string; slug: string; description: string }>;
}

// Fallback articles when no MDX content exists yet
const fallbackArticles = [
  {
    slug: 'why-your-roas-is-lying',
    title: 'Why Your ROAS Is Lying to You (And What to Track Instead)',
    excerpt: 'Most businesses rely on platform-reported ROAS, but it rarely tells the full story. Here\'s what sophisticated advertisers track to understand real performance.',
    category: 'CAC ROAS Optimization' as BlogCategory,
    readTime: '6 min read',
    date: '2025-03-15',
    tags: [],
    content: '',
    author: 'Digital Point LLC',
  },
  {
    slug: 'remote-team-playbook',
    title: 'The Remote Team Playbook: How We Build High-Output Teams Across Time Zones',
    excerpt: 'Building a remote workforce isn\'t about finding cheap labor — it\'s about creating systems that let distributed teams operate at enterprise speed.',
    category: 'Remote Workforce' as BlogCategory,
    readTime: '8 min read',
    date: '2025-02-20',
    tags: [],
    content: '',
    author: 'Digital Point LLC',
  },
  {
    slug: 'reporting-that-drives-decisions',
    title: 'Reporting That Actually Drives Decisions (Not Just Occupies Meetings)',
    excerpt: 'Stop sending PDF reports that nobody reads. Here\'s how we build reporting systems that surface the signal from the noise.',
    category: 'Marketing Analytics' as BlogCategory,
    readTime: '5 min read',
    date: '2025-01-10',
    tags: [],
    content: '',
    author: 'Digital Point LLC',
  },
  {
    slug: 'scaling-ad-spend-without-cac-creep',
    title: 'How to Scale Ad Spend Without CAC Creep',
    excerpt: 'Scaling from $50K to $500K/month in ad spend without letting customer acquisition costs spiral is a real skill. Here\'s the framework.',
    category: 'CAC ROAS Optimization' as BlogCategory,
    readTime: '7 min read',
    date: '2024-12-15',
    tags: [],
    content: '',
    author: 'Digital Point LLC',
  },
  {
    slug: 'ai-powered-lead-qualification',
    title: 'AI-Powered Lead Qualification: What Works and What Doesn\'t',
    excerpt: 'We integrated AI agents into our client\'s lead pipeline. The results were surprising — both good and bad.',
    category: 'Growth Systems' as BlogCategory,
    readTime: '6 min read',
    date: '2024-11-20',
    tags: [],
    content: '',
    author: 'Digital Point LLC',
  },
  {
    slug: 'attribution-in-2025',
    title: 'Attribution in 2025: A Practical Guide for Marketing Teams',
    excerpt: 'With third-party cookies dying and privacy regulations tightening, here\'s how smart teams are still measuring what works.',
    category: 'Marketing Attribution' as BlogCategory,
    readTime: '9 min read',
    date: '2024-10-05',
    tags: [],
    content: '',
    author: 'Digital Point LLC',
  },
];

const categoryColors: Record<string, string> = {
  'Marketing Attribution': '#c77dff',
  'Paid Ads Benchmarks': '#ff6b9d',
  'CAC ROAS Optimization': '#a3e635',
  'Marketing Analytics': '#7dd3fc',
  'Remote Workforce': '#fbbf24',
  'Growth Systems': '#f472b6',
  'Performance Marketing': '#c77dff',
  'AI & Automation': '#a3e635',
  'Systems & Reporting': '#7dd3fc',
};

export function BlogListPage({ posts, categories, categoryMeta }: Props) {
  const displayPosts = posts.length > 0 ? posts : fallbackArticles;

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

      {/* Categories */}
      {Object.keys(categoryMeta).length > 0 && (
        <Section className="!pt-0 !pb-0">
          <Container>
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryMeta).map(([name, meta]) => {
                const count = categories.find((c) => c.name === name)?.count || 0;
                return (
                  <Link
                    key={name}
                    href={`/blog/category/${meta.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
                    style={{
                      background: `${meta.color}10`,
                      border: `1px solid ${meta.color}25`,
                      color: meta.color,
                    }}
                  >
                    {name}
                    {count > 0 && <span className="opacity-60">({count})</span>}
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* Articles Grid */}
      <Section>
        <Container>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.map((article) => (
              <StaggerItem key={article.slug}>
                <GlassCard className="p-6 h-full flex flex-col group cursor-pointer">
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
                  <h3 className="font-display text-lg font-semibold text-white group-hover:text-[#e0aaff] transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-[#9080a0] text-sm leading-relaxed flex-1 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(157, 78, 221, 0.1)' }}>
                    <div className="flex items-center gap-3 text-[#7c5a8a] text-xs">
                      <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
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
            <div className="max-w-2xl mx-auto">
              <NewsletterOptIn
                title="Want growth insights in your inbox?"
                description="No spam. Just real frameworks, benchmarks, and case studies we use with our clients. Unsubscribe anytime."
              />
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
