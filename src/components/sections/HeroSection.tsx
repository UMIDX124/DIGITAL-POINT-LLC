'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CosmoOrb } from '@/components/cosmo/CosmoOrb';
import { splitIntoWords, isWhitespace } from '@/lib/wordSplit';

/**
 * Phase 4c editorial hero.
 *
 * Divyansh-style split-layout: headline + sub + CTAs on the left, Cosmo orb
 * on the right. Mobile collapses to a single column with the orb below the
 * content.
 *
 * Headline "Meet the workforce you don't have to hire." ships with a 3-part
 * structure so "the workforce" is rendered as Instrument Serif italic in
 * accent-bright. Each non-space word is wrapped in a .word > .word-inner
 * pair for GSAP staggered translateY reveal.
 *
 * Scroll-morph on the orb is wired here (not in the component) because the
 * hero owns the scroll length that drives the morph.
 */

// Word-split the headline but preserve italic spans for "the workforce".
const HEAD_PARTS: Array<{ text: string; italic: boolean }> = [
  { text: 'Meet', italic: false },
  { text: 'the workforce', italic: true },
  { text: "you don't have to hire.", italic: false },
];

const HERO_EYEBROW = 'Digital Point LLC · AI-powered operations · Since 2017';
const HERO_SUB =
  'AI workflows and trained operators that run your marketing, back-office, and reporting — together. So you scale without scaling headcount.';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const orbWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!reduced) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        // Cosmo orb fade + scale
        tl.fromTo(
          '[data-hero-orb]',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8 },
          0,
        )
          // Eyebrow
          .fromTo(
            '[data-hero-eyebrow]',
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.6 },
            0.2,
          )
          // Headline words — staggered translateY from 110% to 0
          .fromTo(
            '[data-hero-headline] .word-inner',
            { yPercent: 110 },
            { yPercent: 0, duration: 0.9, stagger: 0.06, ease: 'cubic-bezier(0.65, 0.05, 0, 1)' },
            0.35,
          )
          // Sub
          .fromTo(
            '[data-hero-sub]',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.7 },
            1.1,
          )
          // CTAs
          .fromTo(
            '[data-hero-cta] > *',
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
            1.4,
          );
      }

      // Orb scroll-morph tied to hero scroll length.
      const orbEl = orbWrapRef.current;
      if (orbEl && !reduced) {
        gsap.to(orbEl, {
          scale: 0.9,
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // Subtle parallax — eyebrow drifts up slower than content (Phase 4h).
      if (!reduced) {
        gsap.to('[data-hero-eyebrow]', {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.9,
          },
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      ctx.revert();
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
              letterSpacing: '0.12em',
              color: 'var(--text-tertiary)',
            }}
          >
            {HERO_EYEBROW}
          </p>

          <h1
            className="font-hero mb-8"
            data-hero-headline
            style={{ fontSize: 'var(--text-hero)', color: 'var(--text-primary)', maxWidth: '16ch' }}
          >
            {HEAD_PARTS.map((part, pi) => {
              const tokens = splitIntoWords(part.text);
              return tokens.map((tok, ti) => {
                if (isWhitespace(tok)) return <span key={`s-${pi}-${ti}`}>{tok}</span>;
                const WordTag: 'span' | 'em' = part.italic ? 'em' : 'span';
                return (
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
                  </WordTag>
                );
              });
            })}
            {/* Trailing space between part 1 and part 2 */}
          </h1>

          <p
            className="font-body mb-10"
            data-hero-sub
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--text-secondary)',
              maxWidth: '42ch',
              lineHeight: 1.55,
            }}
          >
            {HERO_SUB}
          </p>

          <div className="flex flex-wrap gap-4" data-hero-cta>
            <Link href="/free-growth-audit" className="cta-primary">
              Book a free audit
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="#recent-work" className="cta-ghost">
              See what we run
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
