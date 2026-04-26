'use client';

/**
 * Phase 17b 3-restructured A3 — footer Cookies link wrapper.
 *
 * Footer.tsx is a server component, so the click-to-reopen-banner handler
 * has to live in a client island. This wrapper reads the link content
 * server-side via children and adds the dispatch behaviour client-side.
 */

import Link from 'next/link';
import type { MouseEvent, ReactNode } from 'react';

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function CookiePrefsLink({ href, className, children }: Props) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (typeof document !== 'undefined') {
      e.preventDefault();
      document.dispatchEvent(new Event('dpl:open-cookie-prefs'));
    }
  };
  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
