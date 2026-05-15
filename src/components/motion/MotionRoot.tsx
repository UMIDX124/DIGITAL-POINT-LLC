'use client';

import dynamic from 'next/dynamic';

// Defer motion root components past first paint. None are needed for LCP:
// VisibilityPause pauses animations off-screen, MouseTracker publishes
// cursor CSS vars, SectionProgress shows a top-right page indicator.
// ssr: false works here because this wrapper itself is a Client Component.
const VisibilityPause = dynamic(
  () => import('./VisibilityPause').then((m) => m.VisibilityPause),
  { ssr: false },
);
const MouseTracker = dynamic(
  () => import('./MouseTracker').then((m) => m.MouseTracker),
  { ssr: false },
);
const SectionProgress = dynamic(
  () => import('./SectionProgress').then((m) => m.SectionProgress),
  { ssr: false },
);

export function MotionRoot() {
  return (
    <>
      <VisibilityPause />
      <MouseTracker />
      <SectionProgress />
    </>
  );
}
