'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  onClick: () => void;
  panelOpen: boolean;
};

/**
 * Phase 6 v2 / Phase 11 chat trigger — gradient-orb mini button.
 *
 * Animations are pure CSS keyframes (bob/wink/wave/sparkle) declared in
 * globals.css under the chat-trigger-* family. Auto-paused via
 * html[data-paused-global="true"] (tab visibility) and disabled under
 * prefers-reduced-motion.
 *
 * Wave animation triggers once after 30s of idle (no click + no panel
 * open), then resets if user has interacted.
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
        'bg-gradient-to-br from-[#C4B5FD] via-[#A78BFA] to-[#7C3AED]',
        'shadow-[0_0_24px_rgba(167,139,250,0.55),inset_0_1px_2px_rgba(255,255,255,0.4)]',
        'hover:scale-110 hover:shadow-[0_0_32px_rgba(167,139,250,0.85)]',
        'active:scale-95',
        'transition-transform duration-200 ease-out',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-bright)]',
        'chat-trigger',
        showWave ? 'chat-trigger-wave' : '',
        panelOpen ? 'chat-trigger-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ willChange: 'transform' }}
    >
      <span className="block h-full w-full rounded-full relative overflow-hidden">
        {/* Inner specular highlight */}
        <span
          className="absolute top-3 left-3 h-3 w-3 rounded-full bg-white/85 blur-[1.5px]"
          aria-hidden="true"
        />
        {/* Inner core orb */}
        <span
          className="absolute inset-0 m-auto h-9 w-9 rounded-full bg-gradient-to-br from-white/40 via-white/10 to-transparent"
          aria-hidden="true"
        />
        {/* Wink shutter */}
        <span className="chat-trigger-wink absolute inset-x-3 top-1/2 h-[2px] -translate-y-1/2 rounded-full" aria-hidden="true" />
        {/* Sparkle on wave */}
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
