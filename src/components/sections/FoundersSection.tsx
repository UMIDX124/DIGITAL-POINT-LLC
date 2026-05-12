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
    role: 'Co-Founder · Paid media + account restructure',
    initials: 'MF',
    photo: '/team/faizan-square-512.jpg',
    bio: 'Built the operations side of Digital Point. Eight-plus years running paid acquisition, attribution, and lead pipelines for growth-stage companies. Shipped the first agent stack out of necessity after watching too many ops hires churn through the same playbook.',
    href: 'https://linkedin.com/in/faizanrafiq',
  },
  {
    name: 'Anwaar Tayyab',
    role: 'Co-Founder · Attribution + data integration',
    initials: 'AT',
    bio: 'Built the analytics and reporting infrastructure side. Turns messy data into clear weekly narratives. Treats every broken funnel like a puzzle. Writes the production runbooks every DPL agent ships with.',
    href: 'https://linkedin.com/in/anwaartayyab',
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
              <p className="pillar-card__desc">{f.bio}</p>
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
