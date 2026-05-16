import Image from 'next/image';
import { InitialsAvatar } from '@/components/brand/InitialsAvatar';

type Variant = 'compact' | 'full';

type Founder = {
  name: string;
  role: string;
  initials: string;
  photo?: string;
  // Vertical crop bias per founder so the face sits centered in the
  // circle. Lower % = face nudged up; higher % = nudged down.
  objectPosition: string;
  bio: string;
  href: string;
};

const founders: Founder[] = [
  {
    name: 'M. Faizan Rafiq',
    role: 'Co-founder · Paid media + account restructure',
    initials: 'MF',
    photo: '/dp-founder-faizan.jpg',
    objectPosition: 'center 28%',
    bio: 'Faizan rebuilds account structure end-to-end when he sees broad-targeting waste past $50K/month spend. The pattern repeats across e-commerce DTC accounts. Most of his audits surface 20-35% budget leakage in the first hour.',
    href: 'https://www.linkedin.com/in/muhammad-faizan-a6124717b',
  },
  {
    name: 'Anwaar Tayyab',
    role: 'Co-founder · Attribution + data integration',
    initials: 'AT',
    photo: '/dp-founder-anwaar.jpg',
    objectPosition: 'center 30%',
    bio: "Anwaar runs attribution rebuilds for B2B SaaS accounts where pipeline data lives in 5+ tools without integration. The signal his work is landing: a CMO can defend the marketing budget to the board 90 days in, without engineering's help.",
    href: 'https://www.linkedin.com/in/anwaar-tayyab-565680a',
  },
];

// Unified treatment — both founders read symmetrically as round amber-bordered
// portraits. Earlier asymmetry (circle vs hairline-square) made the lockup
// feel off-balance.
const avatarBaseStyle: React.CSSProperties = {
  width: 96,
  height: 96,
  borderRadius: '50%',
  border: '2px solid var(--color-accent)',
  objectFit: 'cover',
  flexShrink: 0,
};

type Props = {
  variant?: Variant;
};

export function FoundersSection({ variant = 'compact' }: Props) {
  const isFull = variant === 'full';

  return (
    <section className="section section-divider dpl-section">
      <div className="dpl-section__rail" aria-hidden="true">
        <span className="dpl-section__rail-label">Section 08 · Founders</span>
      </div>
      <div className="dpl-section__page" aria-hidden="true">p.08 / p.09</div>
      <div className="container-wide">
        <div className="section-header">
          <p className="eyebrow eyebrow--accent">{isFull ? 'Co-founders' : 'Operators'}</p>
          <h2 className="section-title text-balance">
            {isFull
              ? 'Two operators who shipped agents before agents were a category.'
              : 'Two co-founders. Both on every audit.'}
          </h2>
        </div>

        <div className="pillar-grid" style={{ marginBlockStart: '3rem' }}>
          {founders.map((f, i) => (
            <article key={f.name} className="pillar-card" style={{ gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                {f.photo ? (
                  <Image
                    src={f.photo}
                    alt={`${f.name}, ${f.role}`}
                    width={288}
                    height={288}
                    sizes="96px"
                    priority={isFull && i === 0}
                    style={{ ...avatarBaseStyle, objectPosition: f.objectPosition }}
                  />
                ) : (
                  <InitialsAvatar initials={f.initials} size={96} ariaLabel={f.name} />
                )}
                <div>
                  <h4
                    className="font-display"
                    style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}
                  >
                    {f.name}
                  </h4>
                  <p
                    className="font-mono"
                    style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', letterSpacing: '0.12em' }}
                  >
                    {f.role.toUpperCase()}
                  </p>
                </div>
              </div>
              <p className="pillar-card__desc" data-design-only="true">{f.bio}</p>
              <p className="pillar-card__designmark">
                Pattern from current engagements
              </p>
              <div className="pillar-card__link">
                <a href={f.href} target="_blank" rel="noopener noreferrer" className="btn-link">
                  LinkedIn
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FoundersSection;
