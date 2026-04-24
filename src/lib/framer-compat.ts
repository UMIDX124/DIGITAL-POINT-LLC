/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Phase 3a: framer-motion compatibility shim.
 *
 * Legacy sub-page components (PerformanceMarketingPage, RemoteWorkforcePage,
 * SystemsReportingPage, AboutPage, ContactPage, ResultsPage, CaseStudiesPage,
 * and a handful of UI bits) still carry `import { motion, AnimatePresence,
 * useInView } from 'framer-motion'` patterns. Those pages are scheduled for
 * full rewrites in Phase 3b. Until the rewrite, this shim lets us remove the
 * framer-motion package (~40 KB gzipped) without breaking compilation.
 *
 * Behavior: `motion.X` renders as a plain `<X>`; `AnimatePresence` just
 * renders children; `useInView` always reports true. Framer animation props
 * (initial, animate, exit, transition, whileHover, whileInView, variants,
 * layout, layoutId, etc.) are stripped silently — the legacy motion effects
 * disappear on those sub-pages. Reveal animations on them go away until
 * Phase 3b replaces them with proper server-component + GSAP reveals.
 */

import * as React from 'react';

type AnyProps = Record<string, any>;

const FRAMER_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'transition',
  'variants',
  'whileHover',
  'whileTap',
  'whileInView',
  'whileFocus',
  'whileDrag',
  'viewport',
  'layout',
  'layoutId',
  'layoutDependency',
  'layoutScroll',
  'layoutRoot',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'dragTransition',
  'dragListener',
  'dragControls',
  'custom',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'onDrag',
  'onDragStart',
  'onDragEnd',
  'onDirectionLock',
  'onHoverStart',
  'onHoverEnd',
  'onViewportEnter',
  'onViewportLeave',
  'onTap',
  'onTapStart',
  'onTapCancel',
]);

function stripFramerProps(props: AnyProps): AnyProps {
  const out: AnyProps = {};
  for (const k in props) {
    if (!FRAMER_PROPS.has(k)) out[k] = props[k];
  }
  return out;
}

/**
 * `motion` — proxy that returns a React component for any tag access.
 * Usage: `<motion.div initial={{opacity:0}}>` renders as `<div>`.
 */
export const motion: any = new Proxy(
  {},
  {
    get(_target, tag: string) {
      const Component = React.forwardRef<unknown, AnyProps>(function MotionTag(props, ref) {
        const clean = stripFramerProps(props);
        return React.createElement(tag as any, { ...clean, ref }, props.children);
      });
      Component.displayName = `motion.${tag}`;
      return Component;
    },
  },
);

/**
 * `AnimatePresence` — passthrough wrapper. Exit animations are dropped.
 * Accepts any extra Framer props (`mode`, `initial`, `onExitComplete`, etc.)
 * and ignores them so legacy code compiles without change.
 */
export function AnimatePresence({
  children,
}: {
  children?: React.ReactNode;
  mode?: 'sync' | 'wait' | 'popLayout' | string;
  initial?: boolean;
  onExitComplete?: () => void;
  propagate?: boolean;
  custom?: unknown;
}) {
  return React.createElement(React.Fragment, null, children);
}

/**
 * `useInView` — returns `true` always so `isInView ? … : …` ternaries render
 * the revealed state without any scroll-based gating. Sub-pages that relied on
 * this for fade-in lose the staggered effect; still-legible content.
 * Accepts any ref + options signature for API compatibility.
 */
export function useInView(
  _ref?: React.RefObject<unknown> | React.MutableRefObject<unknown>,
  _options?: {
    once?: boolean;
    margin?: string;
    amount?: number | 'some' | 'all';
    root?: React.RefObject<Element>;
    initial?: boolean;
  },
): boolean {
  return true;
}

/** Misc no-op exports that show up occasionally in legacy code. */
export const useMotionValue = (initial: number) => ({
  get: () => initial,
  set: () => {},
  on: () => () => {},
});
export const useTransform = <T,>(_a: unknown, _b: unknown, _c: unknown): T => undefined as unknown as T;
