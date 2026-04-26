'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Props = {
  onClick: () => void;
  panelOpen: boolean;
};

/**
 * Phase 16 D.5 — Cosmo chat trigger with DP mascot embed.
 *
 * The mini button now embeds /Dp-logo1.png (mascot) instead of the
 * abstract gradient orb. Idle 'breathe' animation (4s scale 1↔1.04)
 * via CSS keyframes; hover scales 1.08 + brightness 1.15. Pure CSS,
 * no JS animation loops, prefers-reduced-motion disables breathe.
 *
 * Wave animation (30s idle trigger) preserved for first-time-visitor
 * attention.
 */
export default function ChatTrigger({ onClick, panelOpen }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showWave, setShowWave] = useState(false);

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

  const handleClick = () => {
    setHasInteracted(true);
    onClick();
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      data-chat-trigger
      aria-label={panelOpen ? 'Close chat' : 'Open AI chat'}
      className={[
        'fixed bottom-6 right-6 z-50',
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
  );
}
