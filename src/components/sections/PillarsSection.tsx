'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { copy } from '@/lib/copy';

export function PillarsSection() {
  const { eyebrow, headline, body, cards } = copy.pillars;

  return (
    <section
      id="pillars"
      className="relative section-padding"
      style={{ background: 'var(--bg-canvas)', borderBottom: '1px solid #27272A' }}
    >
      <div className="container-wide">
        <header className="max-w-3xl mb-16">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] tracking-tight text-[color:var(--ivory)]">
            {headline}
          </h2>
          <p className="mt-6 text-[16px] md:text-[17px] leading-[1.6] text-[color:var(--ivory-dim)] max-w-2xl">
            {body}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-pillars>
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group relative flex flex-col card-flat p-8 min-h-[340px] focus-ring"
              data-pillar-card
            >
              <p className="eyebrow mb-6">{card.eyebrow}</p>

              <h3 className="font-display text-[26px] md:text-[30px] leading-[1.1] tracking-tight text-[color:var(--ivory)]">
                {card.title}
              </h3>

              <p className="mt-4 text-[14.5px] leading-[1.55] text-[color:var(--ivory-dim)]">
                {card.body}
              </p>

              <ul className="mt-auto pt-8 divide-hairline">
                {card.stats.map((stat) => (
                  <li
                    key={stat}
                    className="py-2.5 font-mono text-[12px] text-[color:var(--muted)] tracking-wide"
                  >
                    {stat}
                  </li>
                ))}
              </ul>

              <span className="absolute top-8 right-8 text-[color:var(--muted)] group-hover:text-[color:var(--accent)] transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
