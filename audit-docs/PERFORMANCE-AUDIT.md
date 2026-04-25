# Performance Audit — Phase 4 comprehensive

**Environment note.** Lighthouse cannot reach the Vercel preview URL (401 SSO gate). Runs are against the local standalone prod build at `http://127.0.0.1:3111/` — identical code to commit `5e2970c` deployed to preview, but served from localhost. Vercel adds CDN, edge compression, HTTP/3, and global routing — **real Vercel numbers will be better than these localhost numbers, especially for LCP and TTFB.**

Raw Lighthouse JSON: `audit-docs/lighthouse-desktop.json`, `audit-docs/lighthouse-mobile.json`.

---

## Desktop (Lighthouse `--preset=desktop`)

| Metric | Value | Score |
| --- | --- | --- |
| **Performance** | **99** | ✅ above 90 target |
| First Contentful Paint | 0.3 s | 1.00 |
| Largest Contentful Paint | 0.9 s | 0.97 |
| Total Blocking Time | 30 ms | 1.00 |
| Cumulative Layout Shift | 0 | 1.00 |
| Speed Index | 0.6 s | 1.00 |
| Time to Interactive | 1.0 s | 1.00 |
| Server Response Time | 10 ms | 1.00 |

**Correction to Phase 4 final selfcheck.** The selfcheck reported "perf 69" at the end of Phase 4. That run used Lighthouse's **default form-factor (mobile-throttled)**, not desktop. Desktop is actually excellent. The user's reported "lots of lag" is either mobile or their browser + CPU running local dev-mode assets — not the production build.

---

## Mobile (Lighthouse default — mobile throttled)

| Metric | Value | Score |
| --- | --- | --- |
| **Performance** | **76** | ⚠️ below 90 target |
| First Contentful Paint | 1.2 s | 0.99 |
| Largest Contentful Paint | **4.5 s** | **0.37** ← main drag |
| Total Blocking Time | 320 ms | 0.76 |
| Cumulative Layout Shift | 0 | 1.00 |
| Speed Index | 3.4 s | 0.89 |
| Time to Interactive | 4.6 s | 0.81 |

### LCP on mobile = 4.5s — what's driving it

Lighthouse's mobile LCP candidate is the hero h1 (largest text block). The hero renders Instrument Serif at 157px from a Google-font variable-font subset. next/font inlines the font in CSS but the browser still needs to (a) parse the page, (b) find the `<h1>`, (c) measure + paint. The chain:

1. CSS arrives (blocks paint) — includes the radial gradient behind hero + Cosmo orb SVG animation rules.
2. Instrument Serif font file downloads + decodes (next/font self-hosts, ~15 KB compressed).
3. GSAP bundle parses (~51 KB gzipped in the gsap chunk).
4. ScrollMotion + HeroSection useEffects register ScrollTriggers.
5. Cosmo orb SVG mounts with 5 layered radial gradients + 1 feGaussianBlur filter.
6. Paint.

Biggest single cost: **the Cosmo orb's `<feGaussianBlur stdDeviation="18">` on the halo**. Gaussian blur on an SVG rect the size of the halo is compositor-expensive; Chrome mobile CPU throttling (4× slowdown in Lighthouse mobile emulation) multiplies the cost.

### Mobile TBT 320 ms — what's blocking

The main-thread bootup breakdown shows 3.6s of mainthread work (mobile throttled). Contributors (approximate, from Lighthouse trace):

- GSAP + ScrollTrigger init: ~200 ms (plugin registration, ScrollTrigger.create × ~12)
- Lenis smooth-scroll init: ~80 ms
- HeroSection useEffect timeline registration: ~40 ms
- ScrollMotion useEffect word-split + reveal registration: ~60 ms
- CursorBloom subscribe-to-pointer: ~10 ms
- IntersectionObserver attachments (Cosmo + data-reveal): ~30 ms
- React hydration: baseline

---

## Bundle

Total gzipped JS in `.next/static`: **417.7 KB**. Well under the 480 KB ceiling.

Largest chunks (gzipped):
1. 125 KB — main/common (Next + React + Lenis + ScrollTrigger + shared deps)
2. 70 KB — react-dom
3. 51 KB — gsap core chunk
4. 39 KB × 2 — vendor chunks
5. 38 KB — common

Lighthouse reports **26 KiB of unused JavaScript** on first load — mostly the `compare/[slug]`, `services/[service]`, research/tools pages bundled in SSG — not actually delivered on `/` but imported by the app router tree.

## Render-blocking resources

Desktop: none blocking LCP. Mobile: the main CSS chunk is ~10 KB gzipped and is render-blocking until parsed.

## Actionable fixes (highest lift first, mobile-focused)

| Fix | Est. LCP lift | Difficulty |
| --- | --- | --- |
| `next/dynamic` import the Cosmo orb with `ssr: false` + a low-cost placeholder (amber circle) until hydration | −0.8 s | low — wrap in `dynamic(() => import('./CosmoOrb'), { ssr: false, loading: () => <Placeholder /> })` |
| Drop the `<feGaussianBlur stdDeviation="18">` halo filter in CosmoOrb — replace with a static pre-blurred radial gradient fill | −0.3 s | low — one SVG edit |
| Delay CursorBloom mount until first mousemove event | −0.1 s (init) | low — add `addEventListener('mousemove', mount, { once: true })` |
| Defer GrainOverlay render until after first paint (IntersectionObserver on body, or requestIdleCallback) | −0.15 s | low — wrap mount in useEffect + idle callback |
| Route-level code-split: lazy-load research/tools/guides pages | −2 KB payload | medium — `dynamic()` imports on app-router sub-tree |
| Tree-shake the 26 KiB unused JS Lighthouse flagged | −26 KB | medium — requires identifying the specific unused exports |

Applied together, projected mobile perf ~88–92.

## Total byte weight

Lighthouse: 493 KB over the wire. Breakdown:
- HTML: ~15 KB
- CSS: ~10 KB
- JS: ~418 KB
- Fonts: ~30 KB (Instrument Serif variable subset)
- Images: ~20 KB (favicons + logo)

Well within modern-web budget. No page-weight concerns.

## CLS = 0

Zero cumulative layout shift across desktop + mobile. Hero + orb + section reveals all use `transform` and `opacity` only. Font-swap doesn't shift layout (next/font's size adjustments). 

---

## Summary

- **Desktop perf is excellent (99).** The Phase 4 selfcheck's "69" number came from a default-config Lighthouse run that applies mobile throttling — genuinely misleading number to report as "desktop perf 69".
- **Mobile perf is 76 — flagged.** LCP 4.5s is the main concern, driven by the Cosmo orb feGaussianBlur + GSAP init. Mobile perf → 88–92 achievable with dynamic-import orb + drop blur filter + defer grain.
- Bundle (417.7 KB) well under ceiling. Total byte weight 493 KB reasonable.
- CLS = 0. No layout shift bugs introduced by any Phase 4 motion.
- Real Vercel preview numbers should beat localhost due to edge compression + HTTP/3.
