'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ChatTrigger from './ChatTrigger';

const ChatPanel = dynamic(() => import('./ChatPanel'), {
  ssr: false,
  loading: () => null,
});

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  /* Phase 13. global open hook so Contact page CTAs can trigger Cosmo
     without prop-drilling. Window event 'cosmo:open' opens the panel. */
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('cosmo:open', onOpen);
    return () => window.removeEventListener('cosmo:open', onOpen);
  }, []);

  return (
    <>
      <ChatTrigger onClick={() => setOpen((o) => !o)} panelOpen={open} />
      {open && <ChatPanel open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
