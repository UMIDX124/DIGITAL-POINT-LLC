'use client';

import { useEffect, useState } from 'react';

function format(now: Date) {
  const hh = String(now.getUTCHours()).padStart(2, '0');
  const mm = String(now.getUTCMinutes()).padStart(2, '0');
  return `UPDATED LIVE · FAIZAN ON-CALL · WILMINGTON ${hh}:${mm}`;
}

export function DocumentHeaderLiveTime() {
  const [label, setLabel] = useState(() => format(new Date()));

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = setInterval(() => setLabel(format(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{label}</span>;
}
