'use client';

import { useEffect, useState } from 'react';

/**
 * SectionProgress — top-right operator-doc page indicator.
 *
 * Reads the page indicators DPL already renders inside named sections
 * (`<div class="dpl-section__page">p.04 / p.09</div>`) and the matching
 * vertical rail label (`<span class="dpl-section__rail-label">Section
 * 04 · Pillars</span>`), then surfaces the active one as a small
 * fixed mono strip in the top-right. As the user scrolls, the strip
 * updates to the section currently dominant in the viewport.
 *
 * Implementation: one IntersectionObserver across all
 * `.dpl-section__rail-label` elements with a 50% root margin so the
 * active section is the one whose label has crossed roughly the
 * middle of the viewport. Passive, fires only on intersection state
 * change — far cheaper than a scroll listener.
 */
export function SectionProgress() {
  const [label, setLabel] = useState<string | null>(null);
  const [page, setPage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const labels = Array.from(
      document.querySelectorAll<HTMLElement>('.dpl-section__rail-label'),
    );
    if (labels.length === 0) return;

    const sectionOf = (label: HTMLElement) =>
      label.closest<HTMLElement>('section, .dpl-section, [data-section]') ?? label;
    const pageOf = (label: HTMLElement) => {
      const section = sectionOf(label);
      return section.querySelector<HTMLElement>('.dpl-section__page')?.textContent ?? null;
    };

    // Track which sections are currently in the activation band.
    const active = new Set<HTMLElement>();

    const recompute = () => {
      if (active.size === 0) return;
      let nearest: HTMLElement | null = null;
      let nearestTop = Infinity;
      const mid = window.innerHeight / 2;
      for (const el of active) {
        const section = sectionOf(el);
        const top = Math.abs(section.getBoundingClientRect().top - mid);
        if (top < nearestTop) {
          nearestTop = top;
          nearest = el;
        }
      }
      if (nearest) {
        setLabel(nearest.textContent?.trim() ?? null);
        setPage(pageOf(nearest)?.trim() ?? null);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.add(entry.target as HTMLElement);
          else active.delete(entry.target as HTMLElement);
        }
        recompute();
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    labels.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (!label) return null;

  return (
    <aside
      className="dpl-progress"
      aria-hidden="true"
      data-design-only="true"
    >
      <span className="dpl-progress__label">{label}</span>
      {page ? <span className="dpl-progress__page">{page}</span> : null}
    </aside>
  );
}

export default SectionProgress;
