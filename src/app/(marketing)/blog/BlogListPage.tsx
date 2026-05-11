import Link from 'next/link';
import type { BlogPost, BlogCategory } from '@/lib/blog';

interface Props {
  posts: BlogPost[];
  categories: { name: BlogCategory; count: number }[];
  categoryMeta: Record<string, { color: string; slug: string; description: string }>;
}

export function BlogListPage({ posts, categories, categoryMeta }: Props) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Blog · Legacy archive · Pending new content cluster</span>
          </div>

          <h1 className="hero-title text-balance">
            Field notes from <span className="hero-title__amber">running</span> AI in production.
          </h1>

          <p className="hero-sub text-pretty">
            The archive below is performance-marketing era content from 2024-2025.
            We&apos;re currently sequencing a fresh content cluster on AI agent deployment,
            workflow automation, and pricing transparency. Until then these pages
            stay accessible but are not indexed.
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
            <Link href="/recovery" className="btn btn-ghost">Recovery service</Link>
          </div>
        </div>
      </section>

      {categories.length > 0 ? (
        <section className="section-sm section-divider">
          <div className="container-wide">
            <p className="eyebrow" style={{ marginBlockEnd: '1rem' }}>Categories</p>
            <div className="stack-row">
              {categories.map((c) => {
                const meta = categoryMeta[c.name];
                if (!meta) return null;
                return (
                  <Link
                    key={c.name}
                    href={`/blog/category/${meta.slug}`}
                    className="stack-badge"
                    style={{ textDecoration: 'none' }}
                  >
                    <span style={{ color: 'var(--color-text-primary)' }}>{c.name}</span>
                    <span style={{ marginInlineStart: '0.5rem', color: 'var(--color-text-tertiary)' }}>
                      {c.count}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section section-divider">
        <div className="container-wide">
          <div className="pillar-grid pillar-grid--three">
            {posts.slice(0, 24).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="pillar-card"
                style={{ textDecoration: 'none' }}
              >
                <span className="pillar-card__index">
                  {post.category} · {post.readTime}
                </span>
                <h3 className="pillar-card__title">{post.title}</h3>
                <p className="pillar-card__desc">{post.excerpt}</p>
                <div className="pillar-card__link">
                  <span className="btn-link">Read post</span>
                </div>
              </Link>
            ))}
          </div>
          {posts.length > 24 ? (
            <p
              className="hero-microcopy"
              style={{ marginBlockStart: '2rem', textAlign: 'center' }}
            >
              Showing 24 of {posts.length} archived posts. Browse by category above.
            </p>
          ) : null}
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">New content shipping soon</p>
            <h2 className="section-title text-balance">
              Pricing transparency, agent recovery, production runbooks.
            </h2>
            <p className="section-desc text-pretty">
              Three new clusters in the queue: AI Agent deployment patterns,
              workflow automation case studies, and the math on pricing.
            </p>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: 0 }}>
              <Link href="/audit" className="btn btn-primary">Book a free audit</Link>
              <Link href="/recovery" className="btn btn-ghost">Recovery service</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogListPage;
