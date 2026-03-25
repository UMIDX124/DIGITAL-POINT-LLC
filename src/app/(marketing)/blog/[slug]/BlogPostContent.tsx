'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { Section, Container, FadeUp } from '@/components/ui-dp/AnimatedElements';

import { InternalLinks } from '@/components/seo/InternalLinks';
import { NewsletterOptIn } from '@/components/seo/NewsletterOptIn';
import { InContentCTA } from '@/components/blog/InContentCTA';
import { LeadMagnetBanner } from '@/components/blog/LeadMagnetBanner';
import { AuthorBox } from '@/components/blog/AuthorBox';
import type { BlogPost } from '@/lib/blog';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

function splitHtmlAtMiddle(html: string): [string, string] {
  // Find all closing </p> tag positions
  const closingTags: number[] = [];
  const regex = /<\/p>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    closingTags.push(match.index + match[0].length);
  }
  if (closingTags.length < 2) return [html, ''];
  // Pick the </p> closest to the midpoint
  const mid = html.length / 2;
  let bestIdx = closingTags[0];
  let bestDist = Math.abs(bestIdx - mid);
  for (const pos of closingTags) {
    const dist = Math.abs(pos - mid);
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = pos;
    }
  }
  return [html.slice(0, bestIdx), html.slice(bestIdx)];
}

interface BlogPostContentProps {
  post: BlogPost;
  toc: { id: string; text: string; level: number }[];
  htmlContent: string;
  catMeta: { color: string; slug: string; description: string };
  relatedPosts: BlogPost[];
}

export function BlogPostContent({ post, toc, htmlContent, catMeta, relatedPosts }: BlogPostContentProps) {
  const [firstHalf, secondHalf] = splitHtmlAtMiddle(htmlContent);

  const proseClasses = `prose prose-invert prose-purple max-w-none
                  [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4
                  [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3
                  [&_p]:text-[#b794c7] [&_p]:leading-relaxed [&_p]:mb-4
                  [&_strong]:text-white
                  [&_ul]:my-4 [&_li]:text-[#b794c7] [&_li]:mb-1
                  [&_code]:text-[#e0aaff]
                  [&_a]:text-[#c77dff] [&_a]:hover:text-[#e0aaff]
                  [&_hr]:border-[rgba(157,78,221,0.15)] [&_hr]:my-8`;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 radial-glow" />
        <Container className="relative z-10 pt-28 pb-8">
          <FadeUp>
            <Breadcrumbs
              items={[
                { label: 'Blog', href: '/blog' },
                { label: post.category, href: `/blog/category/${catMeta.slug}` },
                { label: post.title, href: `/blog/${post.slug}` },
              ]}
            />

            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: `${catMeta.color}15`,
                  border: `1px solid ${catMeta.color}30`,
                  color: catMeta.color,
                }}
              >
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-[#7c5a8a] text-xs">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1 text-[#7c5a8a] text-xs">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
              {post.lastModified && post.lastModified !== post.date && (
                <span className="flex items-center gap-1 text-[#7c5a8a] text-xs">
                  <Calendar className="w-3 h-3" />
                  Updated: {new Date(post.lastModified).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4 max-w-4xl">
              {post.title}
            </h1>
            <p className="text-[#b794c7] text-lg mt-4 max-w-2xl">{post.excerpt}</p>
            <p className="text-[#9080a0] text-sm mt-3">
              By <span className="text-[#c77dff]">{post.author}</span>
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Content */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 max-w-5xl mx-auto">
            {/* Main content */}
            <FadeUp>
              <article>
                <div
                  className={proseClasses}
                  dangerouslySetInnerHTML={{ __html: firstHalf }}
                />

                {secondHalf && <InContentCTA category={post.category} />}

                {secondHalf && (
                  <div
                    className={proseClasses}
                    dangerouslySetInnerHTML={{ __html: secondHalf }}
                  />
                )}
              </article>

              {/* FAQ Section if present */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(157, 78, 221, 0.15)' }}>
                  <h2 className="font-display text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {post.faqs.map((faq, i) => (
                      <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                        <h3 className="text-white font-medium text-sm mb-2">{faq.question}</h3>
                        <p className="text-[#9080a0] text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Internal links */}
              <div className="mt-12">
                <InternalLinks content={post.content} excludeSlug={post.slug} />
              </div>

              {/* Lead magnet banner */}
              <LeadMagnetBanner />

              {/* Author E-E-A-T box */}
              <AuthorBox authorName={post.author} />

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-display text-lg font-semibold text-white mb-4">Related Articles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedPosts.map((rp) => (
                      <Link
                        key={rp.slug}
                        href={`/blog/${rp.slug}`}
                        className="group rounded-xl p-4 transition-all hover:scale-[1.01]"
                        style={{ background: 'rgba(13, 8, 21, 0.5)', border: '1px solid rgba(157, 78, 221, 0.15)' }}
                      >
                        <h4 className="text-white text-sm font-medium group-hover:text-[#e0aaff] transition-colors leading-snug">
                          {rp.title}
                        </h4>
                        <p className="text-[#7c5a8a] text-xs mt-2">{rp.readTime}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </FadeUp>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Table of Contents */}
              {toc.length > 0 && (
                <div
                  className="rounded-xl p-5"
                  style={{ background: 'rgba(13, 8, 21, 0.6)', border: '1px solid rgba(157, 78, 221, 0.15)' }}
                >
                  <h4 className="text-white font-medium text-sm mb-3">Contents</h4>
                  <nav className="space-y-2">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-xs text-[#9080a0] hover:text-[#c77dff] transition-colors ${
                          item.level === 3 ? 'pl-4' : ''
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Newsletter */}
              <NewsletterOptIn variant="sidebar" />

              {/* Back to blog */}
              <Link
                href="/blog"
                className="flex items-center gap-2 text-[#7c5a8a] hover:text-[#c77dff] transition-colors text-xs"
              >
                <ArrowLeft className="w-3 h-3" />
                All articles
              </Link>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
