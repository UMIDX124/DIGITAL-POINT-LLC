/**
 * Shared pointer RAF — one mousemove listener + one requestAnimationFrame
 * loop shared across every consumer that needs pointer-tracked motion on
 * desktop (Cosmo orb mouse-follow in Phase 4b; cursor bloom in Phase 4g).
 *
 * Why shared: three independent RAF loops would compound to ~45 wake-ups
 * per frame on desktop. One shared loop runs handlers in the same tick.
 *
 * Disabled paths (subscribe returns a no-op unsubscribe + handler never
 * fires):
 *   - SSR (no window)
 *   - prefers-reduced-motion: reduce
 *   - viewport width < 768 (treat as mobile; no cursor to follow anyway)
 *
 * Pointer state:
 *   - x / y        — raw normalized −1..1 viewport coords (0 = center)
 *   - sx / sy      — spring-lerped smooth values, same range
 *   - active       — false until the user moves the pointer; prevents a
 *                    "jump to origin" on first mount
 */

'use client';

export type PointerState = {
  x: number;
  y: number;
  sx: number;
  sy: number;
  active: boolean;
};

type Handler = (state: PointerState) => void;

const LERP_FACTOR = 0.085;

let installed = false;
let rafId = 0;
let listenersAttached = false;
const handlers = new Set<Handler>();

const state: PointerState = { x: 0, y: 0, sx: 0, sy: 0, active: false };

function isDisabled(): boolean {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  if (window.matchMedia('(max-width: 767px)').matches) return true;
  return false;
}

function handleMove(e: MouseEvent) {
  state.x = (e.clientX / window.innerWidth) * 2 - 1;
  state.y = (e.clientY / window.innerHeight) * 2 - 1;
  state.active = true;
}

function tick() {
  state.sx += (state.x - state.sx) * LERP_FACTOR;
  state.sy += (state.y - state.sy) * LERP_FACTOR;
  handlers.forEach((h) => h(state));
  rafId = requestAnimationFrame(tick);
}

function install() {
  if (installed || isDisabled()) return;
  installed = true;
  if (!listenersAttached) {
    window.addEventListener('mousemove', handleMove, { passive: true });
    listenersAttached = true;
  }
  rafId = requestAnimationFrame(tick);
}

function uninstall() {
  if (!installed) return;
  installed = false;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
  if (listenersAttached) {
    window.removeEventListener('mousemove', handleMove);
    listenersAttached = false;
  }
  state.x = 0; state.y = 0; state.sx = 0; state.sy = 0; state.active = false;
}

export function subscribePointer(handler: Handler): () => void {
  if (isDisabled()) return () => {};
  handlers.add(handler);
  if (handlers.size === 1) install();
  return () => {
    handlers.delete(handler);
    if (handlers.size === 0) uninstall();
  };
}

/** For debugging / reading state synchronously. */
export function readPointer(): Readonly<PointerState> {
  return state;
}
