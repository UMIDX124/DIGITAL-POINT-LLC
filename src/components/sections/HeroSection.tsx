'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import MagneticCTA from '@/components/effects/MagneticCTA';
import { AutomationOrbit } from '@/components/hero/AutomationOrbit';
import { HeroDataTicker } from '@/components/hero/HeroDataTicker';
// Phase 16 A.1 — AutomationFlow kept on disk pending replacement ship.
// import { AutomationFlow } from '@/components/hero/AutomationFlow';

/**
 * Phase 6 v2 editorial hero — AI-first hybrid positioning.
 *
 * Word-reveal animation is component-owned (no ScrollMotion dependency).
 * GSAP is lazy-imported in useEffect so it doesn't block first paint.
 * The headline is a flat token list with explicit space tokens between
 * HEAD_PARTS so adjacent inline-block .word elements render with visible
 * inter-word whitespace.
 */

// Phase 11 addendum — hero brackets removed. Headline is now hardcoded JSX
// (was a HEAD_PARTS array iteration with [ ] decorative spans). The italic
// em wraps "the AI" only; the period attaches inline outside the em.

const HERO_EYEBROW = 'DIGITAL POINT LLC · EST. 2017';
const HERO_SUB =
  'AI agents lead. Automation handles the repeat. Trained operators back the loop. Together they run your CRM, ops, reporting, and growth workflows — so you scale without scaling headcount.';

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
      // Phase 9 — animation timeline tightened. Last word lands ~780ms
      // (was ~1.77s). delay 0.4 → 0.15, duration 0.95 → 0.45, stagger
      // 0.07 → 0.035. Surrounding cascade (orb/eyebrow/sub/CTAs) shrunk
      // proportionally so the entire hero settles in <1.2s.
      gsap.fromTo(
        innerEls,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.035,
          ease: 'cubic-bezier(0.65, 0.05, 0, 1)',
          delay: 0.15,
          onComplete: () => {
            innerEls.forEach((el) => {
              el.style.transform = 'translateY(0%)';
              el.style.opacity = '1';
            });
            window.clearTimeout(safetyId);
          },
        },
      );

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('[data-hero-orb]', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5 }, 0)
        .fromTo('[data-hero-eyebrow]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.1)
        .fromTo('[data-hero-sub]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45 }, 0.55)
        .fromTo('[data-hero-cta] > *', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.7);

      // Scroll-tied effects. Phase 17b 2A-REFIX (Scope C) — added
      // anticipatePin + fastScrollEnd + invalidateOnRefresh to smooth
      // pin engagement and resize behaviour. Snap y/scale to integer
      // pixels via gsap snap so sub-pixel transform interpolation can't
      // accumulate floating-point error during scrub — the symptom user
      // reported as font vibration / jiggering on slow scroll.
      const orbEl = orbWrapRef.current;
      const triggers: ScrollTrigger[] = [];
      if (orbEl) {
        triggers.push(
          ScrollTrigger.create({
            trigger: sectionRef.current!,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            animation: gsap.to(orbEl, {
              scale: 0.9,
              y: 40,
              ease: 'none',
              snap: { y: 1 },
            }),
          }),
        );
      }
      triggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current!,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          animation: gsap.to('[data-hero-eyebrow]', {
            y: -20,
            ease: 'none',
            snap: { y: 1 },
          }),
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
      {/* Phase 16 C — Bloomberg Operator data substrate replaces the
          Phase 6 conic ambient blur and the legacy radial glow. */}
      <HeroDataTicker />

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
            style={{
              fontSize: 'var(--text-hero)',
              color: 'var(--text-primary)',
              maxWidth: 'var(--maxw-heading-display)',
              /* Phase 17b 2A-REFIX — was --lh-display (1.02), too tight for
                 italic descenders on .hero-em. Bumped to --lh-tight (1.10)
                 to give the line box room for the italic 'I' tail without
                 affecting headline visual weight materially. */
              lineHeight: 'var(--lh-tight)',
              letterSpacing: 'var(--ls-display)',
            }}
          >
            <span className="word inline-block overflow-hidden align-top">
              <span className="word-inner inline-block" data-word-reveal>Hire</span>
            </span>
            <span aria-hidden="true">{' '}</span>
            <em className="hero-em font-italic-display not-italic">
              <span className="word inline-block overflow-hidden align-top">
                <span className="word-inner inline-block" data-word-reveal>the</span>
              </span>
              <span aria-hidden="true">{' '}</span>
              <span className="word inline-block overflow-hidden align-top">
                <span className="word-inner inline-block" data-word-reveal>AI</span>
              </span>
            </em>
            <span aria-hidden="true">. </span>
            <span className="word inline-block overflow-hidden align-top">
              <span className="word-inner inline-block" data-word-reveal>Skip</span>
            </span>
            <span aria-hidden="true">{' '}</span>
            <span className="word inline-block overflow-hidden align-top">
              <span className="word-inner inline-block" data-word-reveal>the</span>
            </span>
            <span aria-hidden="true">{' '}</span>
            <span className="word inline-block overflow-hidden align-top">
              <span className="word-inner inline-block" data-word-reveal>headcount.</span>
            </span>
          </h1>

          <p
            className="font-body mb-10"
            data-hero-sub
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--text-secondary)',
              maxWidth: 'var(--maxw-body)',
              lineHeight: 1.55,
            }}
          >
            {HERO_SUB}
          </p>

          <div className="flex flex-wrap items-center gap-6" data-hero-cta>
            <MagneticCTA strength={0.3} radius={90}>
              <Link href="/free-growth-audit" className="cta-primary" data-cta-primary>
                Book a free 30-min audit
                <span aria-hidden="true">→</span>
              </Link>
            </MagneticCTA>
            <Link href="/case-studies" className="text-link inline-flex items-center gap-1.5">
              See how it runs
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

          {/* Phase 17b 3-restructured D2 — trust micro-copy under primary CTA. */}
          <p
            className="hero-trust-microcopy mt-4"
            style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              letterSpacing: '0.02em',
            }}
          >
            Free · 30 min · No sales pitch · Co-founder reviews personally
          </p>

          {/* Phase 13 — operator-accountability trust signals.
              CSS-only stagger fade-in (no GSAP, no JS), kicks in after the
              hero word-reveal completes. prefers-reduced-motion in CSS. */}
          <div className="hero-trust-signals" aria-label="Track record">
            <span className="hero-trust-signal">
              <span className="hero-trust-signal-bullet" aria-hidden="true" />
              $50M ad spend operated
            </span>
            <span className="hero-trust-signal">
              <span className="hero-trust-signal-bullet" aria-hidden="true" />
              200+ audits shipped
            </span>
            <span className="hero-trust-signal">
              <span className="hero-trust-signal-bullet" aria-hidden="true" />
              8 years operating, not pitching
            </span>
          </div>
        </div>

        <div
          ref={orbWrapRef}
          className="hero-pulse-wrap relative flex items-center justify-center"
          data-hero-orb
        >
          {/* Phase 16 A.1 — orbital system replacing Phase 14 2×2 grid.
              Cosmo mascot at center as the "sun"; 4 process nodes on two
              concentric rings; SVG light-cone arcs imply Lead → AI →
              Operator → CRM signal flow. 90s GPU rotation, mobile-hidden,
              reduced-motion static. */}
          <AutomationOrbit />
        </div>
      </div>
    </section>
  );
}
