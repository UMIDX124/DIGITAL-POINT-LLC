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
    const refresh = () => setLabel(format(new Date()));
    refresh();
    const id = setInterval(refresh, 60 * 60_000);
    window.addEventListener('focus', refresh);
    return () => {
      clearInterval(id);
      window.removeEventListener('focus', refresh);
    };
  }, []);

  return <span suppressHydrationWarning>{label}</span>;
}
