'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Props = {
  onClick: () => void;
  panelOpen: boolean;
};

/**
 * Phase 16 D.5 — Cosmo chat trigger with DP mascot embed.
 * Phase 17b 3-restructured A2 — footer-aware visibility.
 *
 * The mini button embeds /Dp-logo1.png (mascot). Idle 'breathe' (4s
 * scale 1↔1.04), hover scales 1.08 + brightness 1.15. Pure CSS, no JS
 * animation loops, prefers-reduced-motion disables breathe.
 *
 * Wave animation (30s idle trigger) preserved for first-time-visitor
 * attention.
 *
 * Footer-aware: IntersectionObserver on the site <footer> element.
 * When footer enters viewport (≥5%), FAB transitions translateY(120%)
 * + opacity:0 + pointer-events:none over 200ms ease-out. Returns when
 * footer exits viewport. Idle/hover animations unchanged — they nest
 * inside the visibility transform.
 */
export default function ChatTrigger({ onClick, panelOpen }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showWave, setShowWave] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    if (panelOpen || hasInteracted) return;
    const timer = setTimeout(() => setShowWave(true), 30_000);
    return () => clearTimeout(timer);
  }, [panelOpen, hasInteracted]);

  useEffect(() => {
    if (!showWave) return;
    const timer = setTimeout(() => setShowWave(false), 4_000);
    return () => clearTimeout(timer);
  }, [showWave]);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const obs = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  const handleClick = () => {
    setHasInteracted(true);
    onClick();
  };

  return (
    /* Phase 17b 3-restructured A2 — outer wrapper handles footer-aware
       translateY/opacity. Inner button retains cosmo-fab hover scale +
       breathe animations from globals.css unaltered. */
    <div
      className="fixed bottom-6 right-6 z-50"
      style={{
        transform: footerVisible ? 'translateY(120%)' : 'translateY(0)',
        opacity: footerVisible ? 0 : 1,
        pointerEvents: footerVisible ? 'none' : 'auto',
        transition: 'transform 200ms ease-out, opacity 200ms ease-out',
      }}
      aria-hidden={footerVisible}
    >
    <button
      ref={ref}
      onClick={handleClick}
      data-chat-trigger
      aria-label={panelOpen ? 'Close chat' : 'Open AI chat'}
      tabIndex={footerVisible ? -1 : 0}
      className={[
        'h-16 w-16 rounded-full',
        'cosmo-fab',
        'transition-transform duration-200 ease-out',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-bright)]',
        'chat-trigger',
        showWave ? 'chat-trigger-wave' : '',
        panelOpen ? 'chat-trigger-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="block h-full w-full rounded-full relative overflow-hidden">
        <Image
          src="/Dp-logo1.png"
          alt=""
          fill
          sizes="64px"
          className="cosmo-mascot object-contain p-1"
          priority={false}
          unoptimized
        />
        {/* Sparkle on wave (first-visit attention cue) */}
        {showWave && (
          <span className="chat-trigger-sparkle absolute -top-1 -right-1 h-3 w-3" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-white/90">
              <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
            </svg>
          </span>
        )}
      </span>
    </button>
    </div>
  );
}
