import { copy } from '@/lib/copy';

/**
 * Phase 4f testimonials. Asymmetric 7/5 grid: featured left, two stacked
 * right. Cards sit on bg-elevated (slight lift from bg-secondary section
 * bg), hover brightens border to accent-glow.
 *
 * Avatar = purple-filled circle with white serif initial, 40/44 px.
 * Metric chip at top of each card in mono micro.
 */

export function TestimonialsSection() {
  const { eyebrow, headline, items } = copy.testimonials;
  const featured = items.find((t) => t.featured) ?? items[0];
  const rest = items.filter((t) => t !== featured);

  return (
    <section
      className="relative"
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
      id="testimonials"
    >
      <div className="container-wide">
        <header className="max-w-2xl mb-[var(--section-space-tight)]">
          <p
            className="font-mono uppercase mb-5"
            data-reveal
            style={{
              fontSize: 'var(--text-micro)',
              letterSpacing: '0.12em',
              color: 'var(--text-tertiary)',
            }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-hero"
            data-reveal
            style={{
              fontSize: 'var(--text-h2)',
              color: 'var(--text-primary)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            {headline}
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5" data-testimonials>
          <div className="lg:col-span-7">
            <TestimonialCard item={featured} size="featured" />
          </div>
          <div className="lg:col-span-5 grid grid-cols-1 gap-5">
            {rest.map((t) => (
              <TestimonialCard key={t.author} item={t} size="standard" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type Testimonial = typeof copy.testimonials.items[number];

function TestimonialCard({ item, size }: { item: Testimonial; size: 'featured' | 'standard' }) {
  const isFeatured = size === 'featured';
  return (
    <figure
      className="testimonial-card h-full flex flex-col justify-between"
      data-testimonial-card
      style={{
        background: 'var(--bg-elevated)',
        borderRadius: '2px',
        padding: isFeatured ? '2rem' : '1.75rem',
        minHeight: isFeatured ? '26rem' : '14rem',
      }}
    >
      <div>
        <div className="inline-flex items-baseline gap-2 mb-6">
          <span
            className="font-mono tabular-nums"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--accent-bright)',
              letterSpacing: '0.02em',
            }}
          >
            {item.metric}
          </span>
          <span
            className="font-mono uppercase"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'var(--text-tertiary)',
            }}
          >
            {item.metricLabel}
          </span>
        </div>
        <blockquote
          className={isFeatured ? 'font-hero' : 'font-body'}
          style={
            isFeatured
              ? {
                  fontSize: 'var(--text-h4)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  maxWidth: '36ch',
                }
              : {
                  fontSize: '1.0625rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.5,
                  letterSpacing: '-0.005em',
                  maxWidth: '36ch',
                }
          }
        >
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      </div>
      <figcaption
        className="mt-8 pt-5 flex items-center gap-3"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <InitialAvatar initials={item.initials} size={isFeatured ? 'lg' : 'md'} />
        <div>
          <div
            className="font-body"
            style={{
              fontSize: 'var(--text-small)',
              color: 'var(--text-primary)',
              fontWeight: 500,
            }}
          >
            {item.author}
          </div>
          <div
            className="font-body"
            style={{
              fontSize: 'var(--text-micro)',
              color: 'var(--text-tertiary)',
            }}
          >
            {item.role}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

function InitialAvatar({ initials, size }: { initials: string; size: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 44 : 40;
  const fontSize = size === 'lg' ? 15 : 13;
  return (
    <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} aria-hidden="true">
      <defs>
        <radialGradient id={`avatar-grad-${initials}`} cx="40%" cy="36%" r="65%">
          <stop offset="0%" stopColor="var(--accent-bright)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--accent-deep)" stopOpacity="1" />
        </radialGradient>
      </defs>
      <circle
        cx={dim / 2}
        cy={dim / 2}
        r={dim / 2}
        fill={`url(#avatar-grad-${initials})`}
      />
      <text
        x={dim / 2}
        y={dim / 2 + fontSize / 3 + 0.5}
        fontSize={fontSize}
        fontFamily="var(--font-instrument-serif)"
        fill="#FFFFFF"
        textAnchor="middle"
        style={{ letterSpacing: '0.04em', fontWeight: 500 }}
      >
        {initials}
      </text>
    </svg>
  );
}
