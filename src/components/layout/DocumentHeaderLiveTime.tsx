'use client';

import { useEffect, useState } from 'react';

/**
 * F·25 fix. The pre-rebrand "FAIZAN ON-CALL · WILMINGTON HH:MM" framing
 * implied a live status that the SSR HTML could not honestly carry. SSR
 * now ships an unambiguous "last published" stamp. Post-hydration the
 * client switches to live Wilmington UTC time, no on-call framing.
 */
const PUBLISHED = 'WILMINGTON · LAST PUBLISHED 2026.05.15';

function liveLabel(now: Date) {
  const hh = String(now.getUTCHours()).padStart(2, '0');
  const mm = String(now.getUTCMinutes()).padStart(2, '0');
  return `WILMINGTON · ${hh}:${mm} UTC`;
}

export function DocumentHeaderLiveTime() {
  const [label, setLabel] = useState(PUBLISHED);

  useEffect(() => {
    const tick = () => setLabel(liveLabel(new Date()));
    const immediate = setTimeout(tick, 0);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interval = reduce ? null : setInterval(tick, 30_000);
    return () => {
      clearTimeout(immediate);
      if (interval) clearInterval(interval);
    };
  }, []);

  return <span suppressHydrationWarning>{label}</span>;
}
