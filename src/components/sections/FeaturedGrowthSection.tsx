import Link from 'next/link';

export function FeaturedGrowthSection() {
  return (
    <section className="dpl-featured-growth" aria-label="Featured growth and visibility suite">
      <div className="dpl-section__rail" aria-hidden="true">
        <span className="dpl-section__rail-label" style={{ color: 'var(--color-text-on-dark-tertiary)' }}>
          Section 01b · Featured
        </span>
      </div>
      <div className="dpl-section__page" aria-hidden="true" style={{ color: 'var(--color-text-on-dark-tertiary)' }}>
        p.01b / p.09
      </div>

      <div className="dpl-featured-growth__inner">
        <div className="dpl-featured-growth__grid">
          {/* Left Column - Product Focus */}
          <div className="dpl-featured-growth__focus">
            <span className="dpl-featured-growth__badge">
              <span className="dpl-featured-growth__pulse" aria-hidden="true" />
              Most Popular Service
            </span>
            
            <h2 className="dpl-featured-growth__title">
              The Growth &amp;<br />
              <span className="dpl-featured-growth__title--amber">Visibility Suite</span>
            </h2>

            <div className="dpl-featured-growth__price-box">
              <span className="dpl-featured-growth__price">$1,150</span>
              <span className="dpl-featured-growth__cadence">/ month</span>
            </div>

            <p className="dpl-featured-growth__desc">
              Siloed channels lead to leaked attribution. We integrate Organic SEO, local Google Map rankings, citation synchronization, and active social presence into a single compounding flywheel. Replaces $3,000/mo of fractured agency overhead with co-founder level oversight.
            </p>

            <div className="dpl-featured-growth__ctas">
              <Link href="/pricing#growth-suite" className="dpl-btn dpl-btn--ink dpl-featured-growth__btn">
                Secure the Growth Suite
              </Link>
              <Link href="/blog/local-visibility-flywheel" className="dpl-featured-growth__link">
                Read Visibility Guide &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column - Four Pillars Grid */}
          <div className="dpl-featured-growth__pillars-wrapper">
            <div className="dpl-featured-growth__pillars">
              <article className="dpl-featured-growth__card">
                <span className="dpl-featured-growth__card-index">01 · SEO</span>
                <div className="dpl-featured-growth__card-header">
                  <h3 className="dpl-featured-growth__card-title">Organic SEO</h3>
                  <span className="dpl-featured-growth__card-price">$400/mo</span>
                </div>
                <p className="dpl-featured-growth__card-desc">
                  High-intent keyword targeting, technical health audits, and conversion optimization.
                </p>
              </article>

              <article className="dpl-featured-growth__card">
                <span className="dpl-featured-growth__card-index">02 · GMB</span>
                <div className="dpl-featured-growth__card-header">
                  <h3 className="dpl-featured-growth__card-title">Google Business</h3>
                  <span className="dpl-featured-growth__card-price">$250/mo</span>
                </div>
                <p className="dpl-featured-growth__card-desc">
                  Weekly profile updates, review generation strategies, and local map pack rankings.
                </p>
              </article>

              <article className="dpl-featured-growth__card">
                <span className="dpl-featured-growth__card-index">03 · Citations</span>
                <div className="dpl-featured-growth__card-header">
                  <h3 className="dpl-featured-growth__card-title">Citation Pages</h3>
                  <span className="dpl-featured-growth__card-price">$250/mo</span>
                </div>
                <p className="dpl-featured-growth__card-desc">
                  Manual submissions and NAP alignment across top platforms to build search trust.
                </p>
              </article>

              <article className="dpl-featured-growth__card">
                <span className="dpl-featured-growth__card-index">04 · Social</span>
                <div className="dpl-featured-growth__card-header">
                  <h3 className="dpl-featured-growth__card-title">Social Content</h3>
                  <span className="dpl-featured-growth__card-price">$250/mo</span>
                </div>
                <p className="dpl-featured-growth__card-desc">
                  Consistent organic posts, custom graphics, and copy to validate brand activity.
                </p>
              </article>
            </div>
            
            <p className="dpl-featured-growth__footnote">
              * Save $150/mo when bundled as the All-in-One Suite. Cancel any month, no long-term contracts.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .dpl-featured-growth {
          position: relative !important;
          background: var(--color-canvas-dark) !important;
          color: var(--color-text-on-dark) !important;
          padding-block: var(--space-16) !important;
          border-top: 1px solid var(--color-accent) !important;
          border-bottom: 1px solid var(--color-hairline-on-dark) !important;
        }

        .dpl-featured-growth__inner {
          max-width: var(--maxw-display) !important;
          margin-inline: auto !important;
          padding-inline: var(--space-6) !important;
        }

        @media (min-width: 768px) {
          .dpl-featured-growth__inner {
            padding-inline: var(--space-10) !important;
          }
        }

        .dpl-featured-growth__grid {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 3.5rem !important;
          align-items: center !important;
        }

        @media (min-width: 1024px) {
          .dpl-featured-growth__grid {
            grid-template-columns: 1fr 1.1fr !important;
            gap: 5rem !important;
          }
        }

        .dpl-featured-growth__focus {
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
        }

        .dpl-featured-growth__badge {
          display: inline-flex !important;
          align-items: center !important;
          gap: var(--space-2) !important;
          font-family: var(--font-mono), monospace !important;
          font-size: 11px !important;
          letter-spacing: 0.12em !important;
          text-transform: uppercase !important;
          color: var(--color-accent) !important;
          border: 1px solid rgba(255, 136, 0, 0.22) !important;
          background: rgba(255, 136, 0, 0.04) !important;
          padding: 0.25rem 0.625rem !important;
          border-radius: 2px !important;
          margin-bottom: var(--space-6) !important;
        }

        .dpl-featured-growth__pulse {
          display: inline-block !important;
          width: 6px !important;
          height: 6px !important;
          border-radius: 50% !important;
          background: var(--color-accent) !important;
          box-shadow: 0 0 8px var(--color-accent) !important;
          animation: dpl-pulse-glow 2s infinite ease-in-out !important;
        }

        @keyframes dpl-pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        .dpl-featured-growth__title {
          font-family: var(--font-sans), sans-serif !important;
          font-size: clamp(2rem, 5vw, 3.25rem) !important;
          font-weight: 700 !important;
          line-height: 1.1 !important;
          letter-spacing: -0.03em !important;
          margin: 0 0 var(--space-4) 0 !important;
          color: var(--color-text-on-dark) !important;
        }

        .dpl-featured-growth__title--amber {
          color: var(--color-accent) !important;
        }

        .dpl-featured-growth__price-box {
          display: flex !important;
          align-items: baseline !important;
          gap: 0.25rem !important;
          margin-bottom: var(--space-6) !important;
        }

        .dpl-featured-growth__price {
          font-family: var(--font-mono), monospace !important;
          font-size: clamp(2.5rem, 5vw, 3.5rem) !important;
          font-weight: 600 !important;
          color: var(--color-text-on-dark) !important;
          line-height: 1 !important;
        }

        .dpl-featured-growth__cadence {
          font-family: var(--font-mono), monospace !important;
          font-size: var(--text-sm) !important;
          color: var(--color-text-on-dark-tertiary) !important;
        }

        .dpl-featured-growth__desc {
          font-family: var(--font-sans), sans-serif !important;
          font-size: 15px !important;
          line-height: 1.6 !important;
          color: var(--color-text-on-dark-secondary) !important;
          margin: 0 0 var(--space-8) 0 !important;
        }

        .dpl-featured-growth__ctas {
          display: flex !important;
          flex-wrap: wrap !important;
          align-items: center !important;
          gap: var(--space-4) !important;
        }

        .dpl-featured-growth__btn {
          background: var(--color-accent) !important;
          color: var(--color-canvas-dark) !important;
          font-weight: 600 !important;
          padding-inline: 1.75rem !important;
          height: 2.75rem !important;
          border-radius: 2px !important;
        }

        .dpl-featured-growth__btn:hover {
          background: #ffa033 !important;
        }

        .dpl-featured-growth__link {
          font-family: var(--font-sans), sans-serif !important;
          font-size: var(--text-sm) !important;
          font-weight: 500 !important;
          color: var(--color-text-on-dark-secondary) !important;
          text-decoration: none !important;
          transition: color 0.15s ease !important;
        }

        .dpl-featured-growth__link:hover {
          color: var(--color-accent) !important;
        }

        /* Pillars Grid (Right Column) */
        .dpl-featured-growth__pillars-wrapper {
          display: flex !important;
          flex-direction: column !important;
          gap: var(--space-4) !important;
        }

        .dpl-featured-growth__pillars {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 1rem !important;
        }

        @media (min-width: 480px) {
          .dpl-featured-growth__pillars {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        .dpl-featured-growth__card {
          background: rgba(255, 255, 255, 0.02) !important;
          border: 1px solid var(--color-hairline-on-dark) !important;
          padding: 1.25rem !important;
          border-radius: 4px !important;
          transition: border-color 0.15s ease !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
        }

        .dpl-featured-growth__card:hover {
          border-color: rgba(255, 136, 0, 0.3) !important;
        }

        .dpl-featured-growth__card-index {
          font-family: var(--font-mono), monospace !important;
          font-size: 10px !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          color: var(--color-text-on-dark-tertiary) !important;
          margin-bottom: var(--space-2) !important;
        }

        .dpl-featured-growth__card-header {
          display: flex !important;
          justify-content: space-between !important;
          align-items: baseline !important;
          width: 100% !important;
          margin-bottom: 0.5rem !important;
          gap: 0.5rem !important;
        }

        .dpl-featured-growth__card-title {
          font-family: var(--font-sans), sans-serif !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          color: var(--color-text-on-dark) !important;
          margin: 0 !important;
        }

        .dpl-featured-growth__card-price {
          font-family: var(--font-mono), monospace !important;
          font-size: var(--text-sm) !important;
          font-weight: 500 !important;
          color: var(--color-accent) !important;
        }

        .dpl-featured-growth__card-desc {
          font-family: var(--font-sans), sans-serif !important;
          font-size: 13px !important;
          line-height: 1.45 !important;
          color: var(--color-text-on-dark-secondary) !important;
          margin: 0 !important;
        }

        .dpl-featured-growth__footnote {
          font-family: var(--font-sans), sans-serif !important;
          font-size: 12px !important;
          color: var(--color-text-on-dark-tertiary) !important;
          margin: 0 !important;
          padding-inline-start: 0.25rem !important;
        }
      `}</style>
    </section>
  );
}

export default FeaturedGrowthSection;
