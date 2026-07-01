import Link from "next/link";

export function PersonaRouter() {
  return (
    <section className="dpl-persona-router" aria-label="Choose your pathway">
      <div className="dpl-section__rail" aria-hidden="true">
        <span className="dpl-section__rail-label">
          Section 01a · Direct Pathway
        </span>
      </div>
      
      <div className="dpl-persona-router__inner">
        <header className="dpl-persona-router__header">
          <p className="dpl-eyebrow">
            <span className="dpl-eyebrow__rule" aria-hidden="true" />
            Where should we start?
          </p>
          <h2 className="dpl-persona-router__title">
            Select the pathway that matches your business goals
          </h2>
        </header>

        <div className="dpl-persona-router__grid">
          {/* Pathway 1: Growth & Visibility */}
          <div className="dpl-persona-card dpl-persona-card--marketing">
            <div className="dpl-persona-card__glow" />
            <span className="dpl-persona-card__tag">Visibility &amp; Customers</span>
            <h3 className="dpl-persona-card__title">I want to get more customers and local visibility</h3>
            <div className="dpl-persona-card__audience">
              <span className="dpl-persona-card__audience-dot" />
              Ideal for Small &amp; Medium Businesses
            </div>
            <p className="dpl-persona-card__desc">
              Establish a dominant online presence, rank higher on Google Maps search, and sync your business across top directories with active social media management.
            </p>
            <ul className="dpl-persona-card__list">
              <li>Local SEO &amp; Organic Rankings</li>
              <li>Google Business Profile (GMB) Management</li>
              <li>Citation pages</li>
              <li>Social Media Management</li>
            </ul>
            <div className="dpl-persona-card__footer">
              <Link href="/pricing#growth-suite" className="dpl-btn dpl-persona-card__btn">
                Explore Growth Services <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Pathway 2: Operations & AI Agents */}
          <div className="dpl-persona-card dpl-persona-card--ops">
            <div className="dpl-persona-card__glow" />
            <span className="dpl-persona-card__tag">Automation &amp; Efficiency</span>
            <h3 className="dpl-persona-card__title">I want to automate repetitive operations with AI</h3>
            <div className="dpl-persona-card__audience">
              <span className="dpl-persona-card__audience-dot" />
              Ideal for Mid-Market &amp; Agencies
            </div>
            <p className="dpl-persona-card__desc">
              Deploy managed AI agents, automated system handoffs, and custom workflow pipelines to reduce manual administrative overhead by 90%.
            </p>
            <ul className="dpl-persona-card__list">
              <li>Free Stack Audit &amp; Written Blueprint</li>
              <li>30-Day Fixed Scoped AI Agent Pilot</li>
              <li>Ongoing Automated Operations Retainer</li>
              <li>Emergency Diagnostics &amp; Recovery</li>
            </ul>
            <div className="dpl-persona-card__footer">
              <Link href="/pricing" className="dpl-btn dpl-persona-card__btn dpl-persona-card__btn--ops">
                Explore AI Operations <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dpl-persona-router {
          position: relative !important;
          background: var(--color-canvas) !important;
          color: var(--color-text-primary) !important;
          padding-block: var(--space-12) !important;
          border-bottom: 1px solid var(--color-hairline) !important;
          overflow: hidden !important;
        }

        .dpl-persona-router__inner {
          max-width: var(--maxw-display) !important;
          margin-inline: auto !important;
          padding-inline: var(--space-6) !important;
        }

        @media (min-width: 768px) {
          .dpl-persona-router__inner {
            padding-inline: var(--space-10) !important;
          }
        }

        .dpl-persona-router__header {
          margin-block-end: 2.5rem !important;
        }

        .dpl-persona-router__title {
          font-family: var(--font-sans), sans-serif !important;
          font-size: clamp(1.8rem, 4vw, 2.5rem) !important;
          font-weight: 700 !important;
          line-height: 1.15 !important;
          letter-spacing: -0.02em !important;
          color: var(--color-ink) !important;
          margin: 0.5rem 0 0 0 !important;
          max-width: 36rem !important;
        }

        .dpl-persona-router__grid {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 2rem !important;
        }

        @media (min-width: 820px) {
          .dpl-persona-router__grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        .dpl-persona-card {
          position: relative !important;
          background: var(--color-canvas-raised) !important;
          border: 1px solid var(--color-hairline-strong) !important;
          padding: 2.5rem 2rem !important;
          border-radius: 6px !important;
          display: flex !important;
          flex-direction: column !important;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease !important;
          overflow: hidden !important;
        }

        .dpl-persona-card:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.04) !important;
        }

        .dpl-persona-card--marketing {
          background: var(--color-canvas-dark) !important;
          color: var(--color-text-on-dark) !important;
          border-color: var(--color-hairline-on-dark) !important;
          border-left: 4px solid var(--color-accent) !important;
        }

        .dpl-persona-card--marketing:hover {
          border-color: var(--color-accent) !important;
          box-shadow: 0 12px 40px rgba(255, 136, 0, 0.12) !important;
        }

        .dpl-persona-card--ops {
          border-left: 4px solid var(--color-accent) !important;
        }

        .dpl-persona-card--ops:hover {
          border-color: var(--color-accent) !important;
          box-shadow: 0 12px 40px rgba(255, 136, 0, 0.08) !important;
        }

        /* Glowing background effect on hover */
        .dpl-persona-card__glow {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          opacity: 0 !important;
          transition: opacity 0.3s ease !important;
          pointer-events: none !important;
          z-index: 0 !important;
        }

        .dpl-persona-card--marketing .dpl-persona-card__glow {
          background: radial-gradient(circle at 10% 10%, rgba(255, 136, 0, 0.08) 0%, transparent 60%) !important;
        }

        .dpl-persona-card--ops .dpl-persona-card__glow {
          background: radial-gradient(circle at 10% 10%, rgba(255, 136, 0, 0.05) 0%, transparent 60%) !important;
        }

        .dpl-persona-card:hover .dpl-persona-card__glow {
          opacity: 1 !important;
        }

        .dpl-persona-card__tag {
          font-family: var(--font-mono), monospace !important;
          font-size: 10px !important;
          font-weight: 600 !important;
          letter-spacing: 0.12em !important;
          text-transform: uppercase !important;
          margin-block-end: 0.75rem !important;
          display: inline-block !important;
          z-index: 1 !important;
        }

        .dpl-persona-card--marketing .dpl-persona-card__tag {
          color: var(--color-accent) !important;
        }

        .dpl-persona-card--ops .dpl-persona-card__tag {
          color: var(--color-accent) !important;
        }

        .dpl-persona-card__title {
          font-family: var(--font-sans), sans-serif !important;
          font-size: clamp(1.3rem, 2.5vw, 1.6rem) !important;
          font-weight: 700 !important;
          line-height: 1.25 !important;
          color: var(--color-ink) !important;
          margin: 0 0 0.5rem 0 !important;
          letter-spacing: -0.01em !important;
          z-index: 1 !important;
        }

        .dpl-persona-card__audience {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
          background: rgba(255, 136, 0, 0.06) !important;
          border: 1px solid rgba(255, 136, 0, 0.2) !important;
          color: var(--color-accent) !important;
          font-family: var(--font-mono), monospace !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          padding: 0.25rem 0.75rem !important;
          border-radius: 9999px !important;
          margin-block-end: 1.25rem !important;
          width: fit-content !important;
          z-index: 1 !important;
        }

        .dpl-persona-card__audience-dot {
          width: 5px !important;
          height: 5px !important;
          background-color: var(--color-accent) !important;
          border-radius: 50% !important;
          display: inline-block !important;
        }

        .dpl-persona-card--marketing .dpl-persona-card__title {
          color: var(--color-text-on-dark) !important;
        }

        .dpl-persona-card__desc {
          font-family: var(--font-sans), sans-serif !important;
          font-size: 14.5px !important;
          line-height: 1.55 !important;
          color: var(--color-text-secondary) !important;
          margin: 0 0 1.5rem 0 !important;
          z-index: 1 !important;
        }

        .dpl-persona-card--marketing .dpl-persona-card__desc {
          color: var(--color-text-on-dark-secondary) !important;
        }

        .dpl-persona-card__list {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 0 2.25rem 0 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 0.625rem !important;
          z-index: 1 !important;
        }

        .dpl-persona-card__list li {
          font-family: var(--font-sans), sans-serif !important;
          font-size: 13.5px !important;
          line-height: 1.4 !important;
          color: var(--color-text-secondary) !important;
          padding-inline-start: 1.25rem !important;
          position: relative !important;
        }

        .dpl-persona-card--marketing .dpl-persona-card__list li {
          color: var(--color-text-on-dark-secondary) !important;
        }

        .dpl-persona-card__list li::before {
          content: '→' !important;
          position: absolute !important;
          left: 0 !important;
          font-weight: bold !important;
          transition: transform 0.2s ease !important;
        }

        .dpl-persona-card--marketing .dpl-persona-card__list li::before {
          color: var(--color-accent) !important;
        }

        .dpl-persona-card--ops .dpl-persona-card__list li::before {
          color: var(--color-accent) !important;
        }

        .dpl-persona-card:hover .dpl-persona-card__list li::before {
          transform: translateX(3px) !important;
        }

        .dpl-persona-card__footer {
          margin-block-start: auto !important;
          z-index: 1 !important;
        }

        .dpl-persona-card__btn {
          width: 100% !important;
          height: 3rem !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: var(--color-ink) !important;
          color: var(--color-canvas) !important;
          font-weight: 600 !important;
          border-radius: 4px !important;
          font-size: 14.5px !important;
          transition: background-color 0.2s ease !important;
          text-decoration: none !important;
        }

        .dpl-persona-card__btn:hover {
          background: var(--color-ink-soft) !important;
        }

        .dpl-persona-card--marketing .dpl-persona-card__btn {
          background: var(--color-accent) !important;
          color: var(--color-canvas-dark) !important;
        }

        .dpl-persona-card--marketing .dpl-persona-card__btn:hover {
          background: #ffa033 !important;
        }

        .dpl-persona-card--ops .dpl-persona-card__btn {
          background: var(--color-accent) !important;
          color: var(--color-canvas-dark) !important;
        }

        .dpl-persona-card--ops .dpl-persona-card__btn:hover {
          background: #ffa033 !important;
        }
      `}</style>
    </section>
  );
}

export default PersonaRouter;
