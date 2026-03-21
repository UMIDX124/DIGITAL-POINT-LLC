'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Tag, ArrowLeft } from 'lucide-react';
import { Section, Container, FadeUp, GlassCard, StaggerContainer, StaggerItem } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';
import type { BlogPost, BlogCategory } from '@/lib/blog';

interface Props {
  categoryName: BlogCategory;
  meta: { color: string; slug: string; description: string };
  posts: BlogPost[];
}

export function BlogCategoryContent({ categoryName, meta, posts }: Props) {
  return (
    <>
      <section className="relative min-h-[40vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 radial-glow" />
        <Container className="relative z-10 pt-28 pb-8">
          <FadeUp>
            <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: categoryName, href: `/blog/category/${meta.slug}` }]} />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mt-6">
              {categoryName}
            </h1>
            <p className="text-[#b794c7] text-lg mt-4 max-w-2xl">{meta.description}</p>
            <p className="text-[#7c5a8a] text-sm mt-2">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
          </FadeUp>
        </Container>
      </section>

      <Section>
        <Container>
          {posts.length === 0 ? (
            <FadeUp>
              <div className="text-center py-16">
                <p className="text-[#9080a0] text-lg">No articles in this category yet.</p>
                <Link href="/blog" className="inline-flex items-center gap-2 text-[#c77dff] hover:text-[#e0aaff] mt-4 text-sm">
                  <ArrowLeft className="w-4 h-4" /> Back to blog
                </Link>
              </div>
            </FadeUp>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>
                    <GlassCard className="p-6 h-full flex flex-col group cursor-pointer">
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                          style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}30`, color: meta.color }}
                        >
                          <Tag className="w-3 h-3" />
                          {categoryName}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-white group-hover:text-[#e0aaff] transition-colors mb-3 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-[#9080a0] text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(157, 78, 221, 0.1)' }}>
                        <div className="flex items-center gap-3 text-[#7c5a8a] text-xs">
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#c77dff] opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </GlassCard>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          <div className="mt-16">
            <GrowthAuditCTA variant="banner" />
          </div>
        </Container>
      </Section>
    </>
  );
}
