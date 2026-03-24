import Link from 'next/link';
import { getAllPosts, categoryMeta } from '@/lib/blog';

export function LatestInsights() {
  const posts = getAllPosts().slice(0, 6);

  if (posts.length === 0) return null;

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle radial glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(157, 78, 221, 0.12) 0%, transparent 70%)',
        }}
      />

      <div className="container-wide relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span
            className="text-sm font-medium uppercase tracking-wider mb-4 block"
            style={{
              background: 'linear-gradient(90deg, #e0aaff, #c77dff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Blog
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Latest Insights
          </h2>
          <p className="text-[#b794c7] text-lg mt-4 leading-relaxed">
            Expert analysis on paid acquisition, attribution, and growth systems
          </p>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post) => {
            const catColor = categoryMeta[post.category]?.color ?? '#c77dff';

            return (
              <article
                key={post.slug}
                className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(199, 125, 255, 0.06) 0%, transparent 60%)',
                  }}
                />

                <div className="relative z-10 p-6 flex flex-col h-full">
                  {/* Category tag */}
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full self-start mb-4"
                    style={{
                      color: catColor,
                      background: `${catColor}18`,
                      border: `1px solid ${catColor}30`,
                    }}
                  >
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-lg font-semibold text-white mb-2 leading-snug group-hover:text-[#c77dff] transition-colors">
                    <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[#7c5a8a] text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-[#7c5a8a]">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-[#7c5a8a]" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[#c77dff] hover:text-[#e0aaff] font-medium transition-colors"
          >
            View All Articles
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
