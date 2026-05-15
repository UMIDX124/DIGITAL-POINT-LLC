import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { comparisons, getComparisonBySlug } from '@/lib/comparisons';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};

  const url = `https://www.digitalpointllc.com/compare/${slug}`;

  return {
    title: comparison.metaTitle,
    description: comparison.description,
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.description,
      url,
      type: 'article',
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Compare · Side-by-side analysis</span>
          </div>

          <h1 className="hero-title text-balance" style={{ fontSize: 'var(--text-display)' }}>
            {comparison.title}
          </h1>

          <p className="hero-sub text-pretty">{comparison.intro}</p>

          <div className="hero-cta-row">
            <Link href="/audit" className="dpl-btn dpl-btn--ink">Book a free audit</Link>
            <Link href="#table" className="dpl-btn dpl-btn--ghost">See the comparison</Link>
          </div>
        </div>
      </section>

      <section className="section section-divider" id="table">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow">Side-by-side</p>
            <h2 className="section-title text-balance">
              {comparison.optionA.name} vs {comparison.optionB.name}
            </h2>
          </div>

          <div
            style={{
              marginBlockStart: '2.5rem',
              border: '1px solid var(--color-line-faint)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'var(--color-canvas-raised)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(8rem, 1fr) 1fr 1fr',
                background: 'var(--color-canvas-elevated)',
                borderBlockEnd: '1px solid var(--color-line-faint)',
              }}
            >
              <div className="font-mono" style={{ padding: '1rem 1.25rem', fontSize: '0.6875rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>
                Category
              </div>
              <div className="font-mono" style={{ padding: '1rem 1.25rem', fontSize: '0.6875rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                {comparison.optionA.name}
              </div>
              <div className="font-mono" style={{ padding: '1rem 1.25rem', fontSize: '0.6875rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                {comparison.optionB.name}
              </div>
            </div>
            {comparison.comparisonRows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(8rem, 1fr) 1fr 1fr',
                  borderBlockEnd: i < comparison.comparisonRows.length - 1 ? '1px solid var(--color-line-faint)' : 'none',
                }}
              >
                <div style={{ padding: '1rem 1.25rem', color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                  {row.category}
                </div>
                <div style={{ padding: '1rem 1.25rem', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                  {row.optionA}
                </div>
                <div style={{ padding: '1rem 1.25rem', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                  {row.optionB}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="pillar-grid">
            {[comparison.optionA, comparison.optionB].map((opt) => (
              <article key={opt.name} className="pillar-card">
                <span className="pillar-card__index">{opt.name}</span>
                <div>
                  <p
                    className="font-mono"
                    style={{
                      fontSize: '0.6875rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent)',
                      marginBlockEnd: '0.625rem',
                    }}
                  >
                    Pros
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {opt.pros.map((p) => (
                      <li
                        key={p}
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          alignItems: 'flex-start',
                          color: 'var(--color-text-secondary)',
                          fontSize: 'var(--text-sm)',
                          lineHeight: 1.55,
                        }}
                      >
                        <span style={{ color: 'var(--color-accent)' }}>+</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginBlockStart: '1rem' }}>
                  <p
                    className="font-mono"
                    style={{
                      fontSize: '0.6875rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-tertiary)',
                      marginBlockEnd: '0.625rem',
                    }}
                  >
                    Cons
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {opt.cons.map((c) => (
                      <li
                        key={c}
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          alignItems: 'flex-start',
                          color: 'var(--color-text-secondary)',
                          fontSize: 'var(--text-sm)',
                          lineHeight: 1.55,
                        }}
                      >
                        <span style={{ color: 'var(--color-text-tertiary)' }}>−</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header">
            <p className="eyebrow eyebrow--accent">Our recommendation</p>
            <h2 className="section-title text-balance">Where DPL would point you.</h2>
            <p className="section-desc text-pretty">{comparison.recommendation}</p>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container-wide">
          <div className="section-header section-header--center">
            <p className="eyebrow">Want help operating either option</p>
            <h2 className="section-title text-balance">
              Free 45-minute audit. Co-founder reviews your setup.
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
