import Link from 'next/link';
import type { BlogPost, BlogCategory } from '@/lib/blog';

interface Props {
  posts: BlogPost[];
  categories: { name: BlogCategory; count: number }[];
  categoryMeta: Record<string, { color: string; slug: string; description: string }>;
}

export function BlogListPage({ posts, categories, categoryMeta }: Props) {
  const indexable = posts.filter((p) => p.indexable === true);
  const legacy = posts.filter((p) => p.indexable !== true);
  const indexableCategories = new Set(indexable.map((p) => p.category));
  const legacyCategories = categories.filter((c) => !indexableCategories.has(c.name));

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Blog · Field notes · Production AI agent operations</span>
          </div>

          <h1 className="hero-title text-balance">
            What works, what <span className="hero-title__amber">breaks</span>, and what we ship next.
          </h1>

          <p className="hero-sub text-pretty">
            New cluster: AI agent deployment patterns, workflow automation case work,
            and pricing transparency. The legacy archive below the new posts covers
            paid-media and attribution work from 2024-2025 (kept accessible but
            noindexed pending a content refresh).
          </p>

          <div className="hero-cta-row">
            <Link href="/audit" className="dpl-btn dpl-btn--ink">Book a free audit</Link>
            <Link href="/recovery" className="dpl-btn dpl-btn--ghost">Recovery service</Link>
          </div>
        </div>
      </section>

      {indexable.length > 0 ? (
        <section className="section section-divider">
          <div className="container-wide">
            <div className="section-header">
              <p className="eyebrow eyebrow--accent">New · Production cluster</p>
              <h2 className="section-title text-balance">Latest field notes.</h2>
            </div>
            <div className="pillar-grid pillar-grid--three" style={{ marginBlockStart: '3rem' }}>
              {indexable.map((post) => (
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
          </div>
        </section>
      ) : null}

      {legacyCategories.length > 0 ? (
        <section className="section-sm section-divider">
          <div className="container-wide">
            <p className="eyebrow" style={{ marginBlockEnd: '1rem' }}>Legacy archive · Categories</p>
            <div className="stack-row">
              {legacyCategories.map((c) => {
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

      {legacy.length > 0 ? (
        <section className="section section-divider">
          <div className="container-wide">
            <div className="section-header">
              <p className="eyebrow">Legacy archive · Noindex · Paid-media era</p>
              <h2 className="section-title text-balance">2024-2025 archive.</h2>
              <p className="section-desc text-pretty">
                Performance marketing, attribution, paid acquisition, and CAC/ROAS
                analysis. Accessible at their URLs, excluded from the sitemap pending
                a content refresh aligned with the new positioning.
              </p>
            </div>
            <div
              className="pillar-grid pillar-grid--three"
              style={{ marginBlockStart: '2.5rem' }}
            >
              {legacy.slice(0, 18).map((post) => (
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
                </Link>
              ))}
            </div>
            {legacy.length > 18 ? (
              <p
                className="hero-microcopy"
                style={{ marginBlockStart: '2rem', textAlign: 'center' }}
              >
                Showing 18 of {legacy.length} archived posts. Browse by category above.
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow eyebrow--accent">Ship a production agent</p>
            <h2 className="section-title text-balance">
              Free audit. Written deployment plan in 5 days.
            </h2>
            <div className="hero-cta-row" style={{ justifyContent: 'center', marginBlockStart: 0 }}>
              <Link href="/audit" className="dpl-btn dpl-btn--ink">Book a free audit</Link>
              <Link href="/recovery" className="dpl-btn dpl-btn--ghost">Recovery service</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogListPage;
