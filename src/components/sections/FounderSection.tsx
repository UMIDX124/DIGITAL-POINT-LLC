import Image from 'next/image';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';

/**
 * Phase 19 Path 3 — co-founder section, real-photo ready.
 *
 * Asset contract:
 *   /public/founders/faizan.jpg  (1200x1500 portrait, neutral background)
 *   /public/founders/anwaar.jpg  (1200x1500 portrait, neutral background)
 * If files don't exist, NextImage returns 404 and the alt text shows.
 * To gracefully handle pre-asset state, FOUNDERS array has `photo` flag;
 * when false, monogram tile renders with hairline border instead of an
 * avatar with gradient (Bloomberg Operator restraint preserved).
 *
 * Layout: 2-column grid (photo / content) per founder, alternating
 * orientation. Editorial pacing: each founder gets the full container
 * width, stacked vertically with generous --section-space-tight breaks.
 *
 * Phase 19 supersedure of Phase 18 founder card pattern: removed
 * gradient-text monogram avatar (locked-rule violation), removed glass
 * card wrapper (no glassmorphism), removed cosmic gradient background
 * (overdone purple-era inheritance).
 */

type Founder = {
  name: string;
  role: string;
  bio: string;
  photo: boolean; // toggle to true when /public/founders/<slug>.jpg exists
  slug: string;
  linkedin?: string;
};

const FOUNDERS: ReadonlyArray<Founder> = [
  {
    name: 'M. Faizan Rafiq',
    role: 'Co-Founder',
    slug: 'faizan',
    photo: false,
    bio: 'Operated paid acquisition and lead pipelines for growth-stage businesses for eight years. Built the first agent stack out of necessity after watching too many ops hires churn through the same playbook. Reviews every audit.',
    linkedin: 'https://linkedin.com/in/faizanrafiq',
  },
  {
    name: 'Anwaar Tayyab',
    role: 'Co-Founder',
    slug: 'anwaar',
    photo: false,
    bio: 'Built the data, attribution, and reporting backbone. Spent five years stitching together CRMs, ad platforms, and finance systems by hand. Now designs the agent observability layer so nothing runs unwatched.',
    linkedin: 'https://linkedin.com/in/anwaartayyab',
  },
];

function Monogram({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div
      className="founder-monogram"
      role="img"
      aria-label={`${name} portrait placeholder`}
    >
      <span className="founder-monogram-initials font-italic-display">{initials}</span>
      <span className="founder-monogram-meta font-mono uppercase">portrait pending</span>
    </div>
  );
}

export function FounderSection() {
  return (
    <section
      className="relative section-deferred"
      style={{
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
      aria-label="Co-founders"
    >
      <div className="container-wide" style={{ paddingInline: 'var(--container-gutter)' }}>
        <header className="founder-section-header" data-reveal>
          <p
            className="font-mono uppercase mb-5"
            style={{
              fontSize: 'var(--text-micro)',
              letterSpacing: '0.18em',
              color: 'var(--text-muted)',
            }}
          >
            Operators, not account managers
          </p>
          <h2
            className="font-hero text-balance"
            style={{
              fontSize: 'var(--text-h1)',
              color: 'var(--text-primary)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              maxWidth: 'var(--maxw-heading-section)',
            }}
          >
            Every engagement starts with a co-founder review.
          </h2>
          <p
            className="mt-6 font-body"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              maxWidth: 'var(--maxw-body)',
            }}
          >
            No sales team. No account handoffs. The two people who built the
            agent stack also sign off on every deployment.
          </p>
        </header>

        <div className="founder-grid">
          {FOUNDERS.map((f, i) => (
            <article
              key={f.slug}
              className="founder-row"
              data-orient={i % 2 === 0 ? 'left' : 'right'}
              data-reveal
            >
              <div className="founder-portrait">
                {f.photo ? (
                  <Image
                    src={`/founders/${f.slug}.jpg`}
                    alt={`${f.name}, ${f.role}`}
                    width={1200}
                    height={1500}
                    className="founder-portrait-img"
                    sizes="(min-width: 1024px) 480px, 100vw"
                  />
                ) : (
                  <Monogram name={f.name} />
                )}
              </div>
              <div className="founder-body">
                <p
                  className="font-mono uppercase"
                  style={{
                    fontSize: 'var(--text-micro)',
                    letterSpacing: '0.18em',
                    color: 'var(--accent-bright)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')} · {f.role}
                </p>
                <h3
                  className="font-hero"
                  style={{
                    fontSize: 'var(--text-h3)',
                    color: 'var(--text-primary)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    marginBottom: '1.25rem',
                  }}
                >
                  {f.name}
                </h3>
                <p
                  className="font-body"
                  style={{
                    fontSize: 'var(--text-body)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    maxWidth: 'var(--maxw-body)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {f.bio}
                </p>
                {f.linkedin && (
                  <Link
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link inline-flex items-center gap-2"
                    style={{
                      fontSize: 'var(--text-small)',
                    }}
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
