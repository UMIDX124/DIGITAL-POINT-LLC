import Link from 'next/link';
import { PRICING_CONFIG } from '@/lib/pricing-config';

export function FeaturedGrowthSection() {
  const tier1Price = PRICING_CONFIG.tier1.formatted;
  const tier2Price = PRICING_CONFIG.tier2.formatted;

  return (
    <section className="dpl-growth-services" aria-label="Growth Services">
      <div className="dpl-section__rail" aria-hidden="true">
        <span className="dpl-section__rail-label">
          Section 01b · Growth Services
        </span>
      </div>
      <div className="dpl-section__page" aria-hidden="true">
        p.01b / p.09
      </div>

      <div className="dpl-growth-services__inner">
        <header className="dpl-growth-services__header">
          <p className="dpl-eyebrow">
            <span className="dpl-eyebrow__rule" aria-hidden="true" />
            Growth Services
          </p>
          <h2 className="dpl-growth-services__title">
            Choose Your Growth Velocity
          </h2>
          <p className="dpl-growth-services__subtitle">
            Flexible packages designed to establish your web presence and accelerate organic lead generation.
          </p>
        </header>

        <div className="dpl-growth-services__grid">
          {/* Tier 1 - Growth Pages / Visibility (Featured Dark Card) */}
          <article className="dpl-growth-services__tier dpl-growth-services__tier--featured">
            <div className="dpl-growth-services__tier-head">
              <span className="dpl-growth-services__tier-label dpl-growth-services__tier-label--accent">Tier 1</span>
              <h3 className="dpl-growth-services__tier-title">Growth &amp; Visibility Suite</h3>
              <p className="dpl-growth-services__tier-price">
                {tier1Price}<span className="dpl-growth-services__tier-cadence">/mo</span>
              </p>
              <p className="dpl-growth-services__tier-audience">
                Perfect for Small to Medium Businesses
              </p>
            </div>
            
            <div className="dpl-growth-services__tier-body">
              <p className="dpl-growth-services__tier-desc">
                This package is designed for businesses that need a professional online presence, better visibility, and a strong foundation for growth.
              </p>
              <ul className="dpl-growth-services__tier-list">
                <li>SEO</li>
                <li>Google My Business (GMB)</li>
                <li>Citation Pages</li>
                <li>Social Media Management</li>
              </ul>
            </div>

            <div className="dpl-growth-services__tier-footer">
              <Link
                href="/pricing#growth-suite"
                className="dpl-btn dpl-growth-services__cta-btn dpl-growth-services__cta-btn--featured"
              >
                Start Growing – {tier1Price}
              </Link>
            </div>
          </article>

          {/* Tier 2 - Other AI related Services (Light Card) */}
          <article className="dpl-growth-services__tier">
            <div className="dpl-growth-services__tier-head">
              <span className="dpl-growth-services__tier-label">Tier 2</span>
              <h3 className="dpl-growth-services__tier-title">Other AI related Services</h3>
              <p className="dpl-growth-services__tier-price">
                {tier2Price}<span className="dpl-growth-services__tier-cadence">/mo</span>
              </p>
              <p className="dpl-growth-services__tier-audience">
                Perfect for Medium Businesses, Growing Brands, and Agencies
              </p>
            </div>
            
            <div className="dpl-growth-services__tier-body">
              <p className="dpl-growth-services__tier-desc">
                Deploy fully managed AI agents and automated handoff workflows to run your repeat operations.
              </p>
              <ul className="dpl-growth-services__tier-list">
                <li>Production AI Agent Workflows</li>
                <li>System Handoffs &amp; Pipeline Automation</li>
                <li>Remote Operators (Human-in-the-loop Exception Handling)</li>
                <li>Slack Connect Integration &amp; Real-time Dashboards</li>
              </ul>
            </div>

            <div className="dpl-growth-services__tier-footer">
              <Link
                href="/pricing#pilot-tier"
                className="dpl-btn dpl-growth-services__cta-btn"
              >
                Scale Your Business – {tier2Price}
              </Link>
            </div>
          </article>
        </div>
      </div>

      <style>{`
        .dpl-growth-services {
          position: relative !important;
          background: var(--color-canvas) !important;
          color: var(--color-text-primary) !important;
          padding-block: var(--space-16) !important;
          border-top: 1px solid var(--color-hairline) !important;
          border-bottom: 1px solid var(--color-hairline) !important;
        }

        .dpl-growth-services__inner {
          max-width: var(--maxw-display) !important;
          margin-inline: auto !important;
          padding-inline: var(--space-6) !important;
        }

        @media (min-width: 768px) {
          .dpl-growth-services__inner {
            padding-inline: var(--space-10) !important;
          }
        }

        .dpl-growth-services__header {
          margin-block-end: 3.5rem !important;
        }

        .dpl-growth-services__title {
          font-family: var(--font-sans), sans-serif !important;
          font-size: clamp(2rem, 4.5vw, 3rem) !important;
          font-weight: 700 !important;
          line-height: 1.1 !important;
          letter-spacing: -0.025em !important;
          color: var(--color-ink) !important;
          margin: 0.5rem 0 var(--space-3) 0 !important;
        }

        .dpl-growth-services__subtitle {
          font-family: var(--font-sans), sans-serif !important;
          font-size: 16px !important;
          line-height: 1.5 !important;
          color: var(--color-text-secondary) !important;
          margin: 0 !important;
          max-width: 38rem !important;
        }

        .dpl-growth-services__grid {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 2rem !important;
          align-items: stretch !important;
        }

        @media (min-width: 900px) {
          .dpl-growth-services__grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2.5rem !important;
          }
        }

        .dpl-growth-services__tier {
          background: var(--color-canvas-raised) !important;
          border: 1px solid var(--color-hairline-strong) !important;
          padding: 2.25rem 2rem !important;
          border-radius: 4px !important;
          display: flex !important;
          flex-direction: column !important;
          transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
          position: relative !important;
        }

        .dpl-growth-services__tier:hover {
          border-color: rgba(10, 10, 11, 0.25) !important;
        }

        .dpl-growth-services__tier--featured {
          background: var(--color-canvas-dark) !important;
          color: var(--color-text-on-dark) !important;
          border-color: var(--color-accent) !important;
          box-shadow: 0 8px 32px rgba(255, 136, 0, 0.12) !important;
        }

        .dpl-growth-services__tier--featured:hover {
          border-color: var(--color-accent) !important;
        }

        .dpl-growth-services__tier-head {
          display: flex !important;
          flex-direction: column !important;
          border-bottom: 1px solid var(--color-hairline) !important;
          padding-block-end: 1.5rem !important;
          margin-block-end: 1.5rem !important;
        }

        .dpl-growth-services__tier--featured .dpl-growth-services__tier-head {
          border-bottom-color: var(--color-hairline-on-dark) !important;
        }

        .dpl-growth-services__tier-label {
          font-family: var(--font-mono), monospace !important;
          font-size: 10px !important;
          font-weight: 600 !important;
          letter-spacing: 0.12em !important;
          text-transform: uppercase !important;
          color: var(--color-text-tertiary) !important;
          margin-block-end: 0.5rem !important;
        }

        .dpl-growth-services__tier-label--accent {
          color: var(--color-accent) !important;
        }

        .dpl-growth-services__tier-title {
          font-family: var(--font-sans), sans-serif !important;
          font-size: 1.5rem !important;
          font-weight: 700 !important;
          color: inherit !important;
          margin: 0 0 0.5rem 0 !important;
        }

        .dpl-growth-services__tier-price {
          font-family: var(--font-mono), monospace !important;
          font-size: clamp(2rem, 3.5vw, 2.5rem) !important;
          font-weight: 600 !important;
          color: inherit !important;
          line-height: 1 !important;
          margin: 0 0 0.5rem 0 !important;
        }

        .dpl-growth-services__tier-cadence {
          font-size: 14px !important;
          font-weight: 400 !important;
          color: var(--color-text-tertiary) !important;
        }

        .dpl-growth-services__tier--featured .dpl-growth-services__tier-cadence {
          color: var(--color-text-on-dark-tertiary) !important;
        }

        .dpl-growth-services__tier-audience {
          font-family: var(--font-sans), sans-serif !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          color: var(--color-accent-text) !important;
          margin: 0 !important;
        }

        .dpl-growth-services__tier--featured .dpl-growth-services__tier-audience {
          color: var(--color-accent) !important;
        }

        .dpl-growth-services__tier-body {
          flex: 1 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 1.5rem !important;
          margin-block-end: 2.25rem !important;
        }

        .dpl-growth-services__tier-desc {
          font-family: var(--font-sans), sans-serif !important;
          font-size: 14.5px !important;
          line-height: 1.55 !important;
          color: var(--color-text-secondary) !important;
          margin: 0 !important;
        }

        .dpl-growth-services__tier--featured .dpl-growth-services__tier-desc {
          color: var(--color-text-on-dark-secondary) !important;
        }

        .dpl-growth-services__tier-list {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 0.625rem !important;
        }

        .dpl-growth-services__tier-list li {
          font-family: var(--font-sans), sans-serif !important;
          font-size: 13.5px !important;
          line-height: 1.4 !important;
          color: var(--color-text-secondary) !important;
          padding-inline-start: 1rem !important;
          position: relative !important;
        }

        .dpl-growth-services__tier--featured .dpl-growth-services__tier-list li {
          color: var(--color-text-on-dark-secondary) !important;
        }

        .dpl-growth-services__tier-list li::before {
          content: '·' !important;
          position: absolute !important;
          left: 0 !important;
          color: var(--color-accent) !important;
          font-weight: bold !important;
        }

        .dpl-growth-services__tier-footer {
          margin-block-start: auto !important;
        }

        .dpl-growth-services__cta-btn {
          width: 100% !important;
          height: 2.875rem !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: var(--color-ink) !important;
          color: var(--color-canvas) !important;
          font-weight: 600 !important;
          border-radius: 2px !important;
          font-size: 14px !important;
          transition: background-color 0.15s ease !important;
        }

        .dpl-growth-services__cta-btn:hover {
          background: var(--color-ink-soft) !important;
        }

        .dpl-growth-services__cta-btn--featured {
          background: var(--color-accent) !important;
          color: var(--color-canvas-dark) !important;
        }

        .dpl-growth-services__cta-btn--featured:hover {
          background: #ffa033 !important;
        }
      `}</style>
    </section>
  );
}

export default FeaturedGrowthSection;
