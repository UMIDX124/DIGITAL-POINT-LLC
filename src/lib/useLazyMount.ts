'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Phase 7 — IntersectionObserver-based lazy mount for heavy below-fold
 * sections. Returns `{ ref, mounted }`. Wrap the section in a placeholder
 * with reserved height (min-h-* or contain-intrinsic-size) so layout
 * doesn't shift when the real content swaps in.
 *
 * SSR-safe: returns mounted=false on the server, hydrates client-side
 * and flips true once the placeholder enters viewport ± rootMargin.
 */
export function useLazyMount(rootMargin = '200px') {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    if (typeof window === 'undefined') return;
    if (!('IntersectionObserver' in window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: feature-detection fallback
      setMounted(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          obs.disconnect();
        }
      },
      { rootMargin },
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [mounted, rootMargin]);

  return { ref, mounted };
}
