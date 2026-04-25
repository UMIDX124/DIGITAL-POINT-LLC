'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { CosmoOrb } from '@/components/cosmo/CosmoOrb';
import MagneticCTA from '@/components/effects/MagneticCTA';
import { splitIntoWords, isWhitespace } from '@/lib/wordSplit';

/**
 * Phase 6 v2 editorial hero — AI-first hybrid positioning.
 *
 * Word-reveal animation is component-owned (no ScrollMotion dependency).
 * GSAP is lazy-imported in useEffect so it doesn't block first paint.
 * The headline is a flat token list with explicit space tokens between
 * HEAD_PARTS so adjacent inline-block .word elements render with visible
 * inter-word whitespace.
 */

// Word-split the headline but preserve italic spans for "the AI".
// Each part flushes as inline-block .word elements; spaces between parts
// are inserted explicitly as inline (non-block) text spans so the layout
// renders with proper whitespace.
const HEAD_PARTS: Array<{ text: string; italic: boolean }> = [
  { text: 'Hire', italic: false },
  { text: 'the AI.', italic: true },
  { text: 'Skip the headcount.', italic: false },
];

const HERO_EYEBROW = 'DIGITAL POINT LLC · EST. 2017';
const HERO_SUB =
  'AI agents lead. Automation handles the repeat. Trained operators back the loop. Together they run your marketing, back-office, and reporting — so you scale without scaling headcount.';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const orbWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const headline = headlineRef.current;
    if (!headline) return;

    const innerEls = Array.from(
      headline.querySelectorAll<HTMLSpanElement>('[data-word-reveal]'),
    );

    // Forced final-state helper — used by both the reduced-motion path and
    // the 1.5s safety net that protects against GSAP scheduling regressions
    // (Phase 6 visual probe caught the .to() landing opacity but stranding
    // yPercent: 110 — clipped by .word overflow:hidden).
    const forceVisible = () => {
      innerEls.forEach((el) => {
        el.style.transform = 'translateY(0%)';
        el.style.opacity = '1';
      });
    };

    if (reduced) {
      forceVisible();
      return;
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    // Safety net — if the GSAP timeline ever fails to land yPercent:0 within
    // 1.5s, force the final state so the headline is never invisible.
    const safetyId = window.setTimeout(forceVisible, 1500);

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // Word reveal — direct fromTo (not chained inside a timeline). This
      // avoids the Phase 6 regression where `.to(innerEls, ...)` after a
      // `gsap.set()` landed opacity but not yPercent. fromTo guarantees
      // both FROM and TO states are explicit and the tween covers both
      // properties cleanly. onComplete clears any stuck transform string.
      gsap.fromTo(
        innerEls,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.07,
          ease: 'cubic-bezier(0.65, 0.05, 0, 1)',
          delay: 0.4,
          onComplete: () => {
            // Belt-and-suspenders: kill any residual transform inline style
            // so even if a future tween glitches, words stay visible.
            innerEls.forEach((el) => {
              el.style.transform = 'translateY(0%)';
              el.style.opacity = '1';
            });
            window.clearTimeout(safetyId);
          },
        },
      );

      // Surrounding mount cascade — orb + eyebrow + sub + CTAs.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('[data-hero-orb]', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8 }, 0)
        .fromTo('[data-hero-eyebrow]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo('[data-hero-sub]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 1.15)
        .fromTo('[data-hero-cta] > *', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, 1.4);

      // Scroll-tied effects.
      const orbEl = orbWrapRef.current;
      const triggers: ScrollTrigger[] = [];
      if (orbEl) {
        triggers.push(
          ScrollTrigger.create({
            trigger: sectionRef.current!,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
            animation: gsap.to(orbEl, { scale: 0.9, y: 40, ease: 'none' }),
          }),
        );
      }
      triggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current!,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
          animation: gsap.to('[data-hero-eyebrow]', { y: -20, ease: 'none' }),
        }),
      );

      ScrollTrigger.refresh();

      cleanup = () => {
        tl.kill();
        triggers.forEach((t) => t.kill());
      };
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(safetyId);
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero relative w-full overflow-hidden"
      style={{
        background: 'var(--bg-primary)',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'var(--section-top)',
        paddingBottom: 'var(--section-main)',
      }}
    >
      {/* Ambient purple glow — bottom-right corner */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 85% 90%, var(--accent-glow-soft), transparent 60%)',
        }}
      />

      {/* Conic ambient sweep (Phase 6 C.3) — desktop only, behind content */}
      <div className="hero-ambient" aria-hidden="true" />

      <div
        className="relative mx-auto w-full max-w-[90rem] grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center"
        style={{ paddingInline: 'var(--container-gutter)' }}
      >
        <div className="hero-content">
          <p
            className="font-mono uppercase mb-8"
            data-hero-eyebrow
            style={{
              fontSize: 'var(--text-micro)',
              letterSpacing: '0.16em',
              color: 'var(--text-tertiary)',
            }}
          >
            {HERO_EYEBROW}
          </p>

          <h1
            ref={headlineRef}
            className="font-hero mb-8"
            data-hero-headline
            style={{ fontSize: 'var(--text-hero)', color: 'var(--text-primary)', maxWidth: '18ch' }}
          >
            {HEAD_PARTS.map((part, pi) => {
              const tokens = splitIntoWords(part.text);
              const renderedTokens: React.ReactNode[] = [];
              if (part.italic) {
                renderedTokens.push(
                  <span key={`br-open-${pi}`} aria-hidden="true" className="em-bracket">
                    [
                  </span>,
                );
              }
              tokens.forEach((tok, ti) => {
                if (isWhitespace(tok)) {
                  renderedTokens.push(
                    <span key={`s-${pi}-${ti}`} aria-hidden="true">
                      {' '}
                    </span>,
                  );
                  return;
                }
                const WordTag: 'span' | 'em' = part.italic ? 'em' : 'span';
                renderedTokens.push(
                  <WordTag
                    key={`w-${pi}-${ti}`}
                    className={
                      'word inline-block overflow-hidden align-top ' +
                      (part.italic ? 'font-italic-display not-italic' : '')
                    }
                    style={
                      part.italic
                        ? { color: 'var(--accent-bright)', fontStyle: 'italic' }
                        : undefined
                    }
                  >
                    <span className="word-inner inline-block" data-word-reveal>
                      {tok}
                    </span>
                  </WordTag>,
                );
              });

              if (part.italic) {
                renderedTokens.push(
                  <span key={`br-close-${pi}`} aria-hidden="true" className="em-bracket">
                    ]
                  </span>,
                );
              }

              // Inter-part space: keeps adjacent inline-block .word siblings
              // visibly separated.
              if (pi < HEAD_PARTS.length - 1) {
                renderedTokens.push(
                  <span key={`gap-${pi}`} aria-hidden="true">
                    {' '}
                  </span>,
                );
              }
              return renderedTokens;
            })}
          </h1>

          <p
            className="font-body mb-10"
            data-hero-sub
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--text-secondary)',
              maxWidth: '46ch',
              lineHeight: 1.55,
            }}
          >
            {HERO_SUB}
          </p>

          <div className="flex flex-wrap items-center gap-6" data-hero-cta>
            <MagneticCTA strength={0.3} radius={90}>
              <Link href="/free-growth-audit" className="cta-primary" data-cta-primary>
                Book a free audit
                <span aria-hidden="true">→</span>
              </Link>
            </MagneticCTA>
            <Link href="#recent-work" className="text-link inline-flex items-center gap-1.5">
              See what we run
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>
          </div>
        </div>

        <div
          ref={orbWrapRef}
          className="hero-orb-wrap relative flex items-center justify-center"
          data-hero-orb
        >
          <CosmoOrb size="md" scrollMorph={true} mouseFollow={true} />
        </div>
      </div>
    </section>
  );
}
