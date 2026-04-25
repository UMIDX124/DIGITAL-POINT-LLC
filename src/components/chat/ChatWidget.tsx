'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ChatTrigger from './ChatTrigger';

const ChatPanel = dynamic(() => import('./ChatPanel'), {
  ssr: false,
  loading: () => null,
});

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatTrigger onClick={() => setOpen((o) => !o)} panelOpen={open} />
      {open && <ChatPanel open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
