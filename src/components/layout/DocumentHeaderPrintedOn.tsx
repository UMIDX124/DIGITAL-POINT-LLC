'use client';

import { useEffect, useState } from 'react';

function format(now: Date) {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  return `PRINTED ON ${y}.${m}.${d}`;
}

export function DocumentHeaderPrintedOn() {
  const [label, setLabel] = useState(() => format(new Date()));

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = setInterval(() => setLabel(format(new Date())), 60 * 60_000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{label}</span>;
}
