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

export const motion = new Proxy({} as Record<string, ReturnType<typeof makeMotionTag>>, {
  get(_target, prop: string) {
    return makeMotionTag(prop);
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
