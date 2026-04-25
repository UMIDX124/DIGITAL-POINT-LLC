'use client';

import { useRef, useEffect, useState } from 'react';

type Props = {
  text: string;
  trigger: 'hover' | 'view';
  speed?: number;
  className?: string;
};

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

/**
 * Phase 6 v2 — Matrix-flash scramble effect for service rows.
 * GPU-light: only setState per RAF tick, single text node update.
 * Honors prefers-reduced-motion (no scramble, just static text).
 */
export default function ScrambleText({ text, trigger, speed = 30, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  // Initialize state directly from text prop. If `text` changes later, the
  // animation effect below resets `display` from a callback, not in an
  // initialization effect (avoids the React 19 set-state-in-effect lint).
  const [display, setDisplay] = useState(text);
  const animatingRef = useRef(false);
  const lastTextRef = useRef(text);
  if (lastTextRef.current !== text) {
    lastTextRef.current = text;
    if (!animatingRef.current) {
      // Synchronous update before paint, no effect needed.
      // Safe because we gate it behind a ref comparison.
      setDisplay(text);
    }
  }

  const scramble = () => {
    if (animatingRef.current) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    animatingRef.current = true;
    const chars = text.split('');
    let frame = 0;
    const totalFrames = Math.max(8, Math.ceil(chars.length * (speed / 16)));

    const tick = () => {
      const progress = frame / totalFrames;
      const settled = Math.floor(chars.length * progress);
      const next = chars
        .map((c, i) => {
          if (i < settled) return c;
          if (c === ' ' || c === '/' || c === '.' || c === ',') return c;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join('');
      setDisplay(next);
      if (frame < totalFrames) {
        frame += 1;
        requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        animatingRef.current = false;
      }
    };

    requestAnimationFrame(tick);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (trigger === 'hover') {
      const parent = el.closest('[data-service-row]') || el.parentElement;
      if (!parent) return;
      const onEnter = () => scramble();
      parent.addEventListener('mouseenter', onEnter);
      return () => parent.removeEventListener('mouseenter', onEnter);
    }

    if (trigger === 'view') {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            scramble();
            obs.disconnect();
          }
        },
        { threshold: 0.6 },
      );
      obs.observe(el);
      return () => obs.disconnect();
    }
  }, [trigger, text, speed]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}
