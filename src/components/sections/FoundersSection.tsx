import Image from 'next/image';
import { InitialsAvatar } from '@/components/brand/InitialsAvatar';

type Variant = 'compact' | 'full';

type Founder = {
  name: string;
  role: string;
  initials: string;
  photo?: string;
  bio: string;
  href: string;
};

const founders: Founder[] = [
  {
    name: 'M. Faizan Rafiq',
    role: 'Co-founder · Paid media + account restructure',
    initials: 'MF',
    photo: '/team/faizan-square-512.jpg',
    bio: 'Faizan rebuilds account structure end-to-end when he sees broad-targeting waste past $50K/month spend. The pattern repeats across e-commerce DTC accounts. Most of his audits surface 20-35% budget leakage in the first hour.',
    href: 'https://www.linkedin.com/in/m-faizan101',
  },
  {
    name: 'Anwaar Tayyab',
    role: 'Co-founder · Attribution + data integration',
    initials: 'AT',
    bio: "Anwaar runs attribution rebuilds for B2B SaaS accounts where pipeline data lives in 5+ tools without integration. The signal his work is landing: a CMO can defend the marketing budget to the board 90 days in, without engineering's help.",
    href: 'https://www.linkedin.com/in/anwaar-tayyab-565680a',
  },
];

type Props = {
  variant?: Variant;
};

export function FoundersSection({ variant = 'compact' }: Props) {
  const isFull = variant === 'full';

  return (
    <section className="section section-divider">
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
                    width={96}
                    height={96}
                    sizes="96px"
                    priority={isFull && i === 0}
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: '50%',
                      border: '2px solid var(--color-accent)',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <InitialsAvatar initials={f.initials} size={96} ariaLabel={f.name} />
                )}
                <div>
                  <h3
                    className="font-display"
                    style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}
                  >
                    {f.name}
                  </h3>
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
                [design only] · pattern from advisory work, specific case studies to publish post-signoff
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
