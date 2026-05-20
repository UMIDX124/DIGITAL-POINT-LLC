import Link from 'next/link';

/**
 * F·12. Pricing band immediately under the hero. Buyers no longer have to
 * scroll past nine sections to see what we charge. Long-form math stays in
 * MathSection further down for second-screen depth.
 */
const tiers = [
  {
    label: '01 · Audit',
    price: 'Free',
    cad: '45 min · co-founder review',
    href: '/audit',
    cta: 'Book audit',
  },
  {
    label: '02 · Pilot',
    price: '$2,500',
    cad: '30 days · one workflow · cancel any month',
    href: '/pricing',
    cta: 'Pilot terms',
  },
  {
    label: '03 · Retainer',
    price: '$2,500',
    cad: 'Per month · cancel any month, no annual lock-in',
    href: '/pricing',
    cta: 'Retainer terms',
    featured: true,
  },
  {
    label: '04 · Recovery',
    price: '$5K–$10K',
    cad: 'Broken-agent diagnostic plus fix',
    href: '/recovery',
    cta: 'Recovery scope',
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
        <ul className="dpl-pricing-band__grid" role="list">
          {tiers.map((t) => (
            <li
              key={t.label}
              className={`dpl-pricing-band__cell${t.featured ? ' is-featured' : ''}`}
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
    </section>
  );
}

export default PricingBand;
