import { createElement, Fragment, type ReactNode } from 'react';

const motionKeys = new Set([
  'initial',
  'animate',
  'exit',
  'transition',
  'variants',
  'whileHover',
  'whileTap',
  'whileInView',
  'viewport',
  'layout',
  'layoutId',
  'drag',
  'dragConstraints',
  'dragElastic',
]);

function stripMotionProps(props: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(props)) {
    if (!motionKeys.has(k)) out[k] = v;
  }
  return out;
}

function makeMotionTag(tag: string) {
  return function MotionTag(props: Record<string, unknown>) {
    return createElement(tag, stripMotionProps(props));
  };
}

// Cache per tag so motion.div returns the same component reference on every
// access. Without this, React sees a new element.type each render and unmounts
// the subtree, killing input focus inside <motion.div> children.
const tagCache = new Map<string, ReturnType<typeof makeMotionTag>>();

export const motion = new Proxy({} as Record<string, ReturnType<typeof makeMotionTag>>, {
  get(_target, prop: string) {
    let cached = tagCache.get(prop);
    if (!cached) {
      cached = makeMotionTag(prop);
      tagCache.set(prop, cached);
    }
    return cached;
  },
});

export function AnimatePresence({
  children,
}: {
  children?: ReactNode;
  mode?: string;
  initial?: boolean;
}) {
  return createElement(Fragment, null, children);
}

export default motion;
