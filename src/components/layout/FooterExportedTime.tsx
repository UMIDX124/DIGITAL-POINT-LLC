'use client';

import { useEffect, useState } from 'react';

function format(now: Date) {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  const hh = String(now.getUTCHours()).padStart(2, '0');
  const mm = String(now.getUTCMinutes()).padStart(2, '0');
  return `${y}.${m}.${d} ${hh}:${mm} UTC`;
}

export function FooterExportedTime() {
  const [label, setLabel] = useState(() => format(new Date()));

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = setInterval(() => setLabel(format(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{label}</span>;
}
