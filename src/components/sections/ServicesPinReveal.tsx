'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { copy } from '@/lib/copy';
import LetterHoverText from '@/components/effects/LetterHoverText';

/**
 * Phase 19 cinematic service reveal.
 * Desktop (≥1024px): GSAP ScrollTrigger pin + scrub. The section pins for
 * 5 viewport heights of scroll; each service frame is a stop in a
 * scroll-scrubbed timeline. Numeral scales + parallaxes, content
 * cross-fades and word-cascades, atmosphere amber intensity shifts per
 * stop. Native scroll preserved (no Lenis). prefers-reduced-motion:
 * timeline skipped, frames render statically (CSS fallback).
 * Mobile (<1024px): Phase 11 letter-hover list (unchanged).
 */

export function ServicesPinReveal() {
  const { eyebrow, headline, items } = copy.servicesList;
  const sectionRef = useRef<HTMLElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    if (!window.matchMedia('(min-width: 1024px)').matches) return;

    const stack = stackRef.current;
    const section = sectionRef.current;
    if (!stack || !section) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const frames = Array.from(stack.querySelectorAll<HTMLElement>('.services-pin-frame'));
      if (!frames.length) return;

      // Set initial states — only first frame visible, others hidden below.
      frames.forEach((frame, i) => {
        const num = frame.querySelector<HTMLElement>('.services-pin-num');
        const content = frame.querySelector<HTMLElement>('.services-pin-content');
        if (i === 0) {
          gsap.set(frame, { autoAlpha: 1, y: 0 });
          if (num) gsap.set(num, { scale: 1, opacity: 0.12 });
          if (content) gsap.set(content, { opacity: 1, y: 0 });
        } else {
          gsap.set(frame, { autoAlpha: 0, y: 60 });
          if (num) gsap.set(num, { scale: 0.55, opacity: 0 });
          if (content) gsap.set(content, { opacity: 0, y: 30 });
        }
      });

      // Each frame holds for ~1 viewport-height of scroll. Pin distance =
      // (frames.length) viewport heights, so the user scrolls past the
      // section over 5 viewport heights and each frame gets equal time.
      const pinDistance = window.innerHeight * frames.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${pinDistance}`,
          scrub: 0.6,
          pin: stack,
          pinSpacing: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: 'power2.inOut' },
      });

      // Build per-frame transitions. Frame i fully visible at progress
      // i/(frames.length), transitions out as i+1 transitions in.
      frames.forEach((frame, i) => {
        const num = frame.querySelector<HTMLElement>('.services-pin-num');
        const content = frame.querySelector<HTMLElement>('.services-pin-content');
        if (i === 0) return; // first frame is initial state
        const offset = i; // each frame gets 1 unit (= 1 viewport height)
        // Outgoing previous frame
        const prevFrame = frames[i - 1];
        const prevNum = prevFrame.querySelector<HTMLElement>('.services-pin-num');
        const prevContent = prevFrame.querySelector<HTMLElement>('.services-pin-content');
        tl.to(
          prevFrame,
          { autoAlpha: 0, y: -40, duration: 1 },
          offset - 0.5,
        );
        if (prevNum) tl.to(prevNum, { scale: 1.15, opacity: 0, duration: 1 }, offset - 0.5);
        if (prevContent) tl.to(prevContent, { opacity: 0, y: -20, duration: 0.8 }, offset - 0.5);
        // Incoming current frame
        tl.to(
          frame,
          { autoAlpha: 1, y: 0, duration: 1 },
          offset - 0.4,
        );
        if (num) tl.fromTo(
          num,
          { scale: 0.55, opacity: 0 },
          { scale: 1, opacity: 0.12, duration: 1.2 },
          offset - 0.4,
        );
        if (content) tl.fromTo(
          content,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          offset - 0.3,
        );
      });

      ScrollTrigger.refresh();

      cleanup = () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === section) t.kill();
        });
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="services-pin-section section-deferred"
    >
      <div className="container-wide services-pin-header-wrap">
        <header className="services-pin-header mb-12 lg:mb-16">
          <p className="services-pin-section-eyebrow font-mono uppercase mb-5" data-reveal>
            {eyebrow}
          </p>
          <h2 className="services-pin-section-headline font-hero text-balance" data-reveal>
            {headline}
          </h2>
        </header>
      </div>

      {/* Desktop: GSAP-pinned cinematic frame stack. Phase 19 supersedes the
          Phase 13 CSS-sticky pin (the sticky version still works for
          prefers-reduced-motion + no-JS users via the fallback CSS rules
          in globals.css). */}
      <div ref={stackRef} className="services-pin-stack">
        {items.map((item, i) => (
          <article
            key={item.label}
            className="services-pin-frame"
            data-pin-index={i}
          >
            <div className="services-pin-frame-inner container-wide">
              <span className="services-pin-num font-italic-display" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="services-pin-content">
                <h3 className="services-pin-title font-display">
                  {item.label}
                </h3>
                <p className="services-pin-desc font-body">{item.description}</p>
                <Link href={item.href} className="services-pin-link text-link">
                  See {item.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile fallback: Phase 11 letter-hover list. */}
      <div className="container-wide services-pin-mobile">
        <ul className="services-rows" data-services-list>
          {items.map((item) => (
            <li key={item.label} data-service-item>
              <Link
                href={item.href}
                className="service-row group focus-ring"
                data-service-row
              >
                <span
                  className="service-index font-mono uppercase"
                  aria-hidden="true"
                >
                  {String(items.indexOf(item) + 1).padStart(2, '0')}
                </span>
                <span className="service-name font-hero">
                  <LetterHoverText text={`/ ${item.label}`} />
                </span>
                <span
                  className="service-arrow hidden md:inline-block"
                  aria-hidden="true"
                >
                  <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                    <line x1="0" y1="6" x2="28" y2="6" stroke="currentColor" strokeWidth="1.25" />
                    <polyline
                      points="22,1 28,6 22,11"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
