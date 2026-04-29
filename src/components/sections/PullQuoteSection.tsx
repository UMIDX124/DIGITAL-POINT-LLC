'use client';

import { useEffect, useRef } from 'react';
import { copy } from '@/lib/copy';

/**
 * Phase 19 cinematic pull quote. Word-by-word reveal on scroll-in,
 * matching the hero word-reveal animation grammar (yPercent 110 -> 0,
 * stagger 0.04, brand ease). prefers-reduced-motion: snap to final state.
 */
export function PullQuoteSection() {
  const { text, attribution } = copy.pullQuote;
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const section = sectionRef.current;
    if (!section) return;

    const wordEls = Array.from(section.querySelectorAll<HTMLElement>('[data-quote-word-inner]'));
    if (!wordEls.length) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      gsap.set(wordEls, { yPercent: 110, opacity: 0 });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(wordEls, {
            yPercent: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.04,
            ease: 'cubic-bezier(0.65, 0.05, 0, 1)',
          });
        },
      });

      cleanup = () => trigger.kill();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  // Split quote text into words for staggered word-reveal mask animation.
  const words = text.split(/(\s+)/);

  return (
    <section
      ref={sectionRef}
      className="relative section-deferred section-defer-paint"
      style={{
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: 'var(--section-space)',
        paddingBottom: 'var(--section-space)',
      }}
      aria-label="Operating principle"
    >
      <div className="relative mx-auto max-w-[88rem]" style={{ paddingInline: 'var(--container-gutter)' }}>
        <blockquote
          className="pull-quote-text font-italic-display text-center mx-auto"
          style={{
            fontSize: 'clamp(1.75rem, 3.4vw, 3.5rem)',
            color: 'var(--text-primary)',
            fontStyle: 'italic',
            lineHeight: 1.32,
            letterSpacing: '-0.015em',
            maxWidth: '80ch',
          }}
        >
          <span aria-hidden="true">&ldquo;</span>
          {words.map((w, i) => {
            if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
            return (
              <span
                key={i}
                className="inline-block overflow-hidden align-baseline"
                style={{ verticalAlign: 'baseline' }}
              >
                <span className="inline-block" data-quote-word-inner>
                  {w}
                </span>
              </span>
            );
          })}
          <span aria-hidden="true">&rdquo;</span>
          <span className="sr-only">{text}</span>
        </blockquote>

        <p
          className="mt-10 font-mono uppercase text-center"
          data-reveal
          style={{
            fontSize: 'var(--text-micro)',
            letterSpacing: '0.18em',
            color: 'var(--text-tertiary)',
          }}
        >
          {attribution}
        </p>
      </div>
    </section>
  );
}
