'use client';

import { useEffect } from 'react';

/**
 * Phase 4g/4h — global visibility pause. Sets html[data-paused-global="true"]
 * when the tab is hidden. Paired CSS in globals.css flips animation-play-
 * state: paused on continuous-motion descendants (Cosmo orb layers, grain)
 * so the GPU can idle and battery isn't burned on a hidden tab.
 */
export function VisibilityPause() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onChange = () => {
      if (document.hidden) {
        document.documentElement.dataset.pausedGlobal = 'true';
      } else {
        delete document.documentElement.dataset.pausedGlobal;
      }
    };
    document.addEventListener('visibilitychange', onChange);
    onChange();
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);
  return null;
}
