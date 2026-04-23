import { copy } from '@/lib/copy';

/**
 * Phase 2 testimonials. Asymmetric layout — one featured card spans a wide
 * column, two standard cards stack on the right. No framer-motion, no glass,
 * no stock photos. Avatars are hand-drawn SVG amber-ring initials.
 */
export function TestimonialsSection() {
  const { eyebrow, headline, items } = copy.testimonials;
  const featured = items.find((t) => t.featured) ?? items[0];
  const rest = items.filter((t) => t !== featured);

  return (
    <section
      className="relative section-main"
      style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
      id="testimonials"
    >
      <div className="container-wide">
        <header className="max-w-2xl mb-[var(--space-8)]">
          <p className="eyebrow mb-5" data-reveal>{eyebrow}</p>
          <h2 className="t-h2 font-display text-[color:var(--ivory)]" data-reveal>
            {headline}
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5" data-testimonials>
          {/* Featured — 7 cols */}
          <div className="lg:col-span-7">
            <TestimonialCard item={featured} size="featured" />
          </div>
          {/* Two stacked — 5 cols */}
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
      className={
        'card-flat p-[var(--space-5)] md:p-[var(--space-6)] h-full flex flex-col ' +
        (isFeatured ? 'justify-between min-h-[420px]' : 'justify-between')
      }
      data-testimonial-card
    >
      <div>
        <MetricTag metric={item.metric} label={item.metricLabel} />
        <blockquote
          className={
            (isFeatured ? 't-h4' : 't-h6') +
            ' font-display leading-snug text-[color:var(--ivory)] mt-[var(--space-5)] max-w-[36ch]'
          }
        >
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      </div>
      <figcaption className="mt-[var(--space-6)] pt-[var(--space-4)] border-t border-[color:var(--border)] flex items-center gap-3">
        <InitialAvatar initials={item.initials} size={isFeatured ? 'lg' : 'md'} />
        <div>
          <div className="font-display text-[color:var(--ivory)] text-[15px]">{item.author}</div>
          <div className="text-[color:var(--muted)] text-[12px]">{item.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

function MetricTag({ metric, label }: { metric: string; label: string }) {
  return (
    <div className="inline-flex items-baseline gap-2">
      <span className="font-mono text-[color:var(--amber)] text-[13px] tracking-[0.08em]">
        {metric}
      </span>
      <span className="eyebrow" style={{ color: 'var(--muted)' }}>
        {label}
      </span>
    </div>
  );
}

/**
 * Hand-coded amber-ring initial avatar. No photo, no lucide user icon.
 * Concentric thin amber ring + serif initials inside, single color, scales
 * with `size` prop.
 */
function InitialAvatar({ initials, size }: { initials: string; size: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 44 : 36;
  const fontSize = size === 'lg' ? 14 : 12;
  return (
    <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} aria-hidden="true">
      <circle
        cx={dim / 2}
        cy={dim / 2}
        r={dim / 2 - 1}
        fill="var(--bg)"
        stroke="var(--amber)"
        strokeWidth="1"
      />
      <text
        x={dim / 2}
        y={dim / 2 + fontSize / 3}
        fontSize={fontSize}
        fontFamily="var(--font-instrument-serif)"
        fill="var(--ivory)"
        textAnchor="middle"
        style={{ letterSpacing: '0.04em' }}
      >
        {initials}
      </text>
    </svg>
  );
}
