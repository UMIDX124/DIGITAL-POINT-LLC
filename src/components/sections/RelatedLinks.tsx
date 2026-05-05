import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export type RelatedLink = {
  href: string;
  label: string;
  body: string;
};

export function RelatedLinks({
  eyebrow,
  headline,
  links,
}: {
  eyebrow: string;
  headline: string;
  links: RelatedLink[];
}) {
  return (
    <section
      className="relative"
      style={{
        background: 'var(--bg-canvas)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'var(--section-space-tight)',
        paddingBottom: 'var(--section-space-tight)',
      }}
      aria-label="Related pages"
    >
      <div className="container-wide">
        <header className="max-w-3xl mb-10">
          <p
            className="font-mono uppercase mb-4"
            style={{
              fontSize: '12px',
              letterSpacing: '0.18em',
              color: 'var(--text-tertiary)',
            }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'var(--text-h3)',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              maxWidth: 'var(--maxw-heading-section)',
            }}
          >
            {headline}
          </h2>
        </header>
        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          {links.map((link) => (
            <li
              key={link.href}
              className="group"
              style={{
                borderBottom: '1px solid var(--border-subtle)',
                borderRight: '1px solid var(--border-subtle)',
              }}
            >
              <Link
                href={link.href}
                className="flex flex-col h-full p-6 focus-ring transition-colors hover:bg-[var(--bg-secondary)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="font-display"
                    style={{
                      fontSize: '17px',
                      color: 'var(--text-primary)',
                      lineHeight: 1.25,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {link.label}
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: 'var(--accent-primary)' }}
                    aria-hidden="true"
                  />
                </div>
                <p
                  className="mt-3 text-[13.5px] leading-[1.55]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.body}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
