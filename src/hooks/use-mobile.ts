import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Phase 8 — useIsMobile via useSyncExternalStore.
 *
 * Replaces the previous useState+useEffect pattern that triggered the
 * react-hooks/set-state-in-effect lint. useSyncExternalStore is the
 * canonical React 18+ primitive for syncing external state (viewport
 * matchMedia) into React, with proper SSR support via getServerSnapshot.
 */
function subscribe(callback: () => void): () => void {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

function getSnapshot(): boolean {
  return window.innerWidth < MOBILE_BREAKPOINT
}

function getServerSnapshot(): boolean {
  return false
}

export function useIsMobile(): boolean {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
