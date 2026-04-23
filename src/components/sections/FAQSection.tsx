'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { copy } from '@/lib/copy';
import { cn } from '@/lib/utils';

export function FAQSection() {
  const { eyebrow, headline, items } = copy.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="relative section-padding"
      style={{ background: '#0A0A0B', borderBottom: '1px solid #27272A' }}
      id="faq"
    >
      <div className="container-narrow">
        <header className="max-w-3xl mb-14">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] tracking-tight text-[color:var(--ivory)]">
            {headline}
          </h2>
        </header>

        <div className="divide-hairline" style={{ borderTop: '1px solid #27272A' }}>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left flex items-start justify-between gap-6 py-6 group focus-ring"
                  aria-expanded={isOpen}
                >
                  <span className={cn(
                    'font-display text-[20px] md:text-[22px] leading-snug transition-colors',
                    isOpen ? 'text-[color:var(--amber)]' : 'text-[color:var(--ivory)]'
                  )}>
                    {item.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 mt-1 shrink-0 transition-transform text-[color:var(--muted)]',
                      isOpen ? 'rotate-180 text-[color:var(--amber)]' : ''
                    )}
                  />
                </button>
                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
                  style={{ maxHeight: isOpen ? '400px' : '0', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pb-6 pr-12 text-[15px] leading-[1.65] text-[color:var(--ivory-dim)]">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
