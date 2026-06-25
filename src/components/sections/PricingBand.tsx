import Link from "next/link";

/**
 * F·12. Pricing band immediately under the hero. Buyers no longer have to
 * scroll past nine sections to see what we charge. Long-form math stays in
 * MathSection further down for second-screen depth.
 */
const tiers = [
  {
    label: "01 · Audit",
    price: "Free",
    cad: "45 min · co-founder review",
    href: "/audit",
    cta: "Book audit",
  },
  {
    label: "02 · Pilot",
    price: "$2,500",
    cad: "30 days · one workflow · cancel any month",
    href: "/pricing",
    cta: "Pilot terms",
  },
  {
    label: "03 · Retainer",
    price: "$2,500",
    cad: "Per month · cancel any month, no annual lock-in",
    href: "/pricing",
    cta: "Retainer terms",
    featured: true,
  },
  {
    label: "04 · Recovery",
    price: "$5K–$10K",
    cad: "Broken-agent diagnostic plus fix",
    href: "/recovery",
    cta: "Recovery scope",
  },
];

export function PricingBand() {
  return (
    <section className="dpl-pricing-band" aria-label="Pricing at a glance">
      <div className="dpl-pricing-band__inner">
        <p className="dpl-pricing-band__eyebrow">
          <span className="dpl-pricing-band__rule" aria-hidden="true" />
          Pricing at a glance
        </p>

        {/* Dedicated Featured Growth Suite Block */}
        <div className="dpl-pricing-band__featured-block">
          <div className="dpl-pricing-band__featured-info">
            <span className="dpl-pricing-band__featured-tag">
              ★ Featured All-in-One Suite
            </span>
            <h3 className="dpl-pricing-band__featured-title">
              The Growth &amp; Visibility Suite
            </h3>
            <p className="dpl-pricing-band__featured-desc">
              Unify Organic SEO, local Google Map optimization, citation sync across top business directories, and consistent social media post scheduling under a single co-founder managed subscription.
            </p>
          </div>
          
          <div className="dpl-pricing-band__featured-action">
            <div className="dpl-pricing-band__featured-price-box">
              <span className="dpl-pricing-band__featured-price">$1,150</span>
              <span className="dpl-pricing-band__featured-cad">/ month</span>
            </div>
            <Link href="/pricing#growth-suite" className="dpl-pricing-band__featured-link">
              Growth terms <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* 4-tier grid below */}
        <ul className="dpl-pricing-band__grid" role="list">
          {tiers.map((t) => (
            <li
              key={t.label}
              className={`dpl-pricing-band__cell${t.featured ? " is-featured" : ""}`}
            >
              <p className="dpl-pricing-band__label">{t.label}</p>
              <p className="dpl-pricing-band__price">{t.price}</p>
              <p className="dpl-pricing-band__cad">{t.cad}</p>
              <Link href={t.href} className="dpl-pricing-band__link">
                {t.cta} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        /* Featured top block styling */
        .dpl-pricing-band__featured-block {
          background: var(--color-canvas-dark) !important;
          color: var(--color-text-on-dark) !important;
          border: 1px solid var(--color-accent) !important;
          box-shadow: 0 6px 30px rgba(255, 136, 0, 0.12) !important;
          padding: 1.75rem !important;
          border-radius: 4px !important;
          margin-bottom: 2.25rem !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 1.25rem !important;
          position: relative !important;
        }

        @media (min-width: 768px) {
          .dpl-pricing-band__featured-block {
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            gap: 3rem !important;
          }
        }

        .dpl-pricing-band__featured-info {
          flex: 1 !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: 0.5rem !important;
        }

        .dpl-pricing-band__featured-tag {
          font-family: var(--font-mono), monospace !important;
          font-size: 9px !important;
          letter-spacing: 0.12em !important;
          text-transform: uppercase !important;
          color: var(--color-accent) !important;
          border: 1px solid rgba(255, 136, 0, 0.22) !important;
          background: rgba(255, 136, 0, 0.04) !important;
          padding: 0.2rem 0.5rem !important;
          border-radius: 2px !important;
        }

        .dpl-pricing-band__featured-title {
          font-family: var(--font-sans), sans-serif !important;
          font-size: clamp(1.4rem, 2.2vw, 1.75rem) !important;
          font-weight: 600 !important;
          color: var(--color-text-on-dark) !important;
          margin: 0 !important;
          letter-spacing: -0.02em !important;
        }

        .dpl-pricing-band__featured-desc {
          font-family: var(--font-sans), sans-serif !important;
          font-size: 14px !important;
          line-height: 1.55 !important;
          color: var(--color-text-on-dark-secondary) !important;
          margin: 0 !important;
          max-width: 44rem !important;
        }

        .dpl-pricing-band__featured-action {
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: 0.6rem !important;
          min-width: 11rem !important;
        }

        @media (min-width: 768px) {
          .dpl-pricing-band__featured-action {
            align-items: flex-end !important;
            text-align: right !important;
          }
        }

        .dpl-pricing-band__featured-price-box {
          display: flex !important;
          align-items: baseline !important;
          gap: 0.25rem !important;
        }

        .dpl-pricing-band__featured-price {
          font-family: var(--font-mono), monospace !important;
          font-size: clamp(2.2rem, 4vw, 2.75rem) !important;
          font-weight: 600 !important;
          color: var(--color-text-on-dark) !important;
          line-height: 1 !important;
        }

        .dpl-pricing-band__featured-cad {
          font-family: var(--font-mono), monospace !important;
          font-size: var(--text-xs) !important;
          color: var(--color-text-on-dark-tertiary) !important;
        }

        .dpl-pricing-band__featured-link {
          font-family: var(--font-mono), monospace !important;
          font-size: 11px !important;
          letter-spacing: 0.12em !important;
          text-transform: uppercase !important;
          color: var(--color-accent) !important;
          text-decoration: none !important;
          border-bottom: 1px solid transparent !important;
          padding-block-end: 1px !important;
          transition: border-color var(--motion-fast) var(--ease-out) !important;
        }

        .dpl-pricing-band__featured-link:hover {
          border-bottom-color: var(--color-accent) !important;
        }

        /* 4-Column Grid Override */
        @media (min-width: 720px) {
          .dpl-pricing-band__grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

export default PricingBand;

