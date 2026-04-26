'use client';

/**
 * Phase 17b 3-restructured H1 — FAQ section + JSON-LD FAQPage schema.
 * Bloomberg Operator palette compliance: bg --bg-canvas, dividers
 * --border-subtle, plus icon rotates to X via CSS transform on the
 * active row.
 */

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { copy } from '@/lib/copy';

export function FAQSection() {
  const { eyebrow, headline, items } = copy.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="relative section-deferred"
      style={{
        background: 'var(--bg-canvas)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
      id="faq"
      aria-label="Frequently asked questions"
    >
      <div className="container-narrow">
        <header className="max-w-3xl mb-14">
          <p
            className="font-mono uppercase mb-5"
            style={{
              fontSize: 'var(--text-micro)',
              letterSpacing: '0.18em',
              color: 'var(--text-tertiary)',
            }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display text-balance"
            style={{
              fontSize: 'var(--text-h1)',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: 'var(--maxw-heading-section)',
            }}
          >
            {headline}
          </h2>
        </header>

        <div role="list" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                role="listitem"
                style={{ borderBottom: '1px solid var(--border-subtle)' }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left flex items-start justify-between gap-6 py-6 focus-ring transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: '20px',
                      lineHeight: 1.4,
                      letterSpacing: '-0.005em',
                      color: isOpen ? 'var(--accent-primary)' : 'var(--text-primary)',
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 mt-1 transition-transform duration-200"
                    style={{
                      color: isOpen ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    <Plus size={20} />
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className="overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
                  style={{ maxHeight: isOpen ? '480px' : '0', opacity: isOpen ? 1 : 0 }}
                >
                  <p
                    className="pb-6 pr-12"
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phase 17b 3-restructured H1 — JSON-LD FAQPage schema for SEO rich
          results. Renders inline at section level so Google's structured-
          data parser can pick it up directly from server-rendered HTML. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((it) => ({
              '@type': 'Question',
              name: it.q,
              acceptedAnswer: { '@type': 'Answer', text: it.a },
            })),
          }),
        }}
      />
    </section>
  );
}
