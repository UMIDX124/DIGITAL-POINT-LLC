# Phase 4 Master Audit

## Environment note at the top (load-bearing)

The Vercel preview URL specified in the audit brief (`digitalpointllc-1-f3hij97b3-umidx124s-projects.vercel.app`) is **team-SSO gated** (HTTP 401) and inaccessible to headless browsers without a bypass token. The production domain `www.digitalpointllc.com` has NOT been promoted to Phase 4 — it still serves pre-Phase-4 "Your ad spend works." copy. **All audit captures are from a fresh local standalone prod build at `localhost:3111`, built from commit `5e2970c` — byte-identical to what the preview URL serves.** Vercel-side edge compression + HTTP/3 likely improves the mobile perf number modestly; every visual + typography + color + motion finding in this audit will be faithful to the preview URL render.

---

## 1. Critical issues (P0 — fix before any production promotion)

### P0-1. Hero italic accent + word cascade destroyed by ScrollMotion collision
**Evidence.** `desktop-01-hero.png` shows the headline as plain white Instrument Serif with no italic, no purple accent on "the workforce", and the classic Phase-2 word-collision bug ("Meetthe workforceyou don't have to hire"). `[data-word-reveal]` probe count = 0.
**Cause.** `ScrollMotion.tsx` (mounted in `(marketing)/layout.tsx`) still runs the Phase 2/3a hero word-split routine: grabs `.textContent`, wipes the h1, rebuilds plain spans. This destroys `HeroSection.tsx`'s Phase 4c React-rendered `<em class="font-italic-display">` wrapper and every `.word-inner` + `data-word-reveal`. The Phase 3a space-preservation fix was in the React structure, which ScrollMotion wipes, so we hit the old spacing bug AND lose the italic accent in a single collision.
**Fix.** Delete the `Hero headline — split by word` block in `ScrollMotion.tsx` (lines ~20–51). HeroSection now owns word-split + reveal.

### P0-2. Geist Sans does not actually load
**Evidence.** Every sans-serif element (body, eyebrows, CTAs, sub copy, service indices, logo marks, pull-quote attribution) falls back to Tailwind v4's default `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`. See computed-style table in TYPOGRAPHY-AUDIT.md.
**Cause.** `GeistSans.variable` and `GeistMono.variable` CSS variables are set on `<body>` correctly. But Tailwind v4 preflight's `html { font-family: var(--default-font-family) }` outranks the `@layer base body { font-family: var(--font-geist-sans) }` rule — OR the cascade-layer ordering buries it. The `--font-sans` token in `@theme inline` also points to a stack, but the preflight doesn't consume it at body level.
**Fix.** Add `--default-font-family: var(--font-geist-sans), ui-sans-serif, ...` to `@theme inline` (Tailwind v4 uses this for preflight). Or apply `font-sans` utility class directly on body. Or move the body font-family rule out of `@layer base` into an ordinary rule.

### P0-3. Hero h1 overflows the 100dvh content box at 1440×900
**Evidence.** `desktop-01-hero.png` shows the headline's first line rendered at y=-136 (above the fold). H1 rendered-height = 578px, content-box height = 564px, delta = −14px upward clip at flex-center.
**Cause.** `--text-hero: clamp(4.7rem, 10.9vw, 10.9rem)` resolves to 156.96px at 1440 viewport. On the 728px-wide left column (1.4fr of 1.4fr/1fr grid), the h1 wraps to ~5 lines at 144px line-height → 720px tall if unconstrained. Hero section `min-height: 100dvh` (900px) − paddingTop 224px − paddingBottom 112px = 564px content box. H1 alone overruns.
**Fix options.** Any one:
(a) Scale back the token — `clamp(3.5rem, 7.5vw, 7.5rem)` maxes at 120px; on 728px container that's ~4 lines at 115px = 460px ✓.
(b) Widen the hero to a 1-col centered layout so the full 1440−gutter gets the h1 (reads bigger, wraps to ~3 lines).
(c) Reduce paddingTop to `--section-main` (112px) so content box = 676px.

## 2. Major issues (P1 — must fix for polish pass)

### P1-1. Mobile Lighthouse perf 76 (target 90)
**Evidence.** `lighthouse-mobile.json`. LCP 4.5s, TBT 320ms, TTI 4.6s. Desktop perf is 99.
**Drivers.** Cosmo orb `feGaussianBlur stdDeviation="18"` halo filter; GSAP + Lenis + ScrollTrigger init; 5 SVG orb layers rendering on mobile throttle.
**Fix projection.** Dynamic-import orb (-0.8s LCP), drop blur filter (-0.3s), defer grain mount (-0.15s), delay cursor bloom (-0.1s init), tree-shake 26 KiB unused JS. Combined projection: mobile perf 88–92.

### P1-2. Testimonial card hover missing
**Evidence.** `.testimonial-card:hover` rule does NOT exist in `globals.css`. Cards are inert on hover.
**Fix.** Add the rule:
```css
.testimonial-card {
  transition: border-color var(--dur-short) var(--ease-out-soft);
}
.testimonial-card:hover {
  border-color: var(--border-bright);
}
```

### P1-3. Wolf logo reads as favicon not mascot
**Evidence.** Nav logo 36×38 px, footer logo 40×42 px. On 1440 desktop = 2.5% viewport width.
**Fix.** Scale to 48 px nav + 64 px footer. If the source PNG actually shows a wolf, this brings the mascot to brand-visible size.

### P1-4. Service row names collide with section h2 size
**Evidence.** Both 79.2px Instrument Serif. No size hierarchy between the "Five practices" title and the five individual rows.
**Fix.** Either bump service row names to `--text-hero` scaled (e.g. 120px), OR drop the section h2 to `--text-h2` (62px) so rows read as the dominant visual element.

### P1-5. Grain overlay + cursor bloom too subtle to register
**Evidence.** 3.5% grain + 0.5 cursor bloom × mix-blend-screen × 8% color alpha = near-imperceptible on normal viewing. Motion audit: both "working but subtle."
**Fix.** Bump grain to 5–6% opacity. Bump cursor bloom to 0.8 opacity. If user wants "luxury feel" registered, these need to be felt.

## 3. Minor issues (P2 — nice to fix)

- P2-1. Hero container `max-w-[90rem]` while every other wide section uses `.container-wide` (80rem). 160px width delta reads as "hero is wider" at 1440.
- P2-2. Watermark opacity 10% vs prompt-spec 15% on Recent Work cards. Faded watermark intent intact, just quieter.
- P2-3. Pull quote uses `--text-h1` (79px) vs arguable intent of `--text-hero`. Hero-scale quote would dominate more.
- P2-4. Testimonials stagger 120ms vs spec 180ms.
- P2-5. `.text-link` CSS class defined but no component applies it. Dead CSS. Either apply it (prose links in footer? testimonial quotes?) or delete.
- P2-6. Pull quote opacity-scrub replaced with scale-accent (commit 5e2970c). Content contract preserved; deviation from 4h prompt spec.
- P2-7. Cosmo scroll-morph is single-stage (hero scroll length only), not the 9-stage morph the 4b prompt implied across every section. Flagged in Phase 4 selfcheck as intentional scoping decision.

## 4. Things that worked well

- Color system migration. Zero amber residue. Zero violet/indigo leak. Purple applied consistently across accent surfaces.
- `--ease-brand` + duration tokens flow cleanly across every component.
- Cosmo orb base — breath, rings, inner-pulse, dust, mouse-follow, IO-pause, reduced-motion static fallback — all working.
- Shared RAF architecture — single pointer listener for Cosmo + CursorBloom.
- Scroll-reveal 2.5s fallback contract held through Phase 4 (0 elements below 0.95 opacity in any viewport probe).
- Mobile collapse. Every section falls back cleanly to single-column.
- Section spacing rhythm. `--section-space` / `--section-space-tight` used consistently.
- Testimonials: Marcus Thompson card no longer truncates (fixes Phase 2 bug).
- Desktop Lighthouse perf 99.
- Build: clean, 360 SSG pages, 0 warnings.

## 5. Honest self-assessment

### Percentage match to Divyansh visual language

**Honest estimate: 60–65%.**

We landed Divyansh's structural archetypes — split hero, massive editorial list, illustrative logo strip, recent work asymmetric grid, pull quote, workflow diagram, testimonials, CTA. The TOKEN system ports his typography scale ratios (× 0.78), signature easing curve, spacing rhythm, section-space fluid clamps.

We did NOT land:
- His typography RENDER — because Geist Sans isn't actually loading, our body copy is system sans. Divyansh's is PP Neue Montreal Medium — a specific geometric Grotesk with unique character.
- His hero impact — our hero h1 overflows the container while his fits cleanly, his italic accent on the rotating word is the visual signature and ours is destroyed by the ScrollMotion collision.
- His kinetic marquees (explicitly skipped per divergence list — fine).
- His cream ivory palette (intentionally diverged for DPL brand — fine).
- His saturated orange accent (intentionally diverged — fine).
- His rich motion grammar — SplitText letter-level reveals, true parallax, direction-aware marquees. We have GSAP-timeline reveals + scroll-morph + scrub, which are Divyansh-adjacent but 30% less dense.

### Percentage of the user's "95% replica" goal achieved

**Honest estimate: 55–60%.**

The 95% target was ambitious given:
- Our purple + dark palette diverges intentionally from ivory + orange — so "visual replica" excludes palette.
- Our content is DPL-first with a Cosmo orb addition — diverges from Divyansh's editorial portfolio positioning.
- We hit the structural archetype (yes) but the RENDER (no) due to three critical bugs (P0-1, P0-2, P0-3).

With P0 items fixed + P1-1 (mobile perf) + P1-2 (testimonial hover) + P1-3 (logo size) + P1-4 (service row hierarchy) + P1-5 (grain + cursor bloom opacity), I'd project climbing from 60% → 80%. Reaching genuine 95% replica would require also:
- Geist swap landed correctly so body type reads as "geometric Grotesk" not "system sans"
- Kinetic marquee or some equivalent horizontal scroll moment (intentional divergence; unlikely to add)
- Letter-level reveal on at least one heading (hand-rolled SplitText equivalent, not yet built)
- Tighter hero h1 + ornament composition (P0-3 fix opens this)

### The 3 biggest reasons it falls short

1. **Geist Sans isn't loading.** This is the single biggest typography signal. Every sans element falls to system UI sans. The Divyansh feel is partially about the tracking + x-height + rhythm of his geometric Grotesk body. We lose that entirely.
2. **Hero word-split collision destroys the italic accent.** The visual signature of the hero — "the workforce" in purple italic serif — is wiped by a ScrollMotion bug, replaced with plain white serif. The hero then reads flat, not editorial.
3. **Hero overflows 100dvh at 1440×900.** First line clipped above the fold at page load. First impression is literally incomplete. Combined with #2, the hero reads broken.

Every other issue is polish. Those three are the core. Fix those and perceived quality jumps substantially without touching any other component.

## 6. Recommended fix scope (ordered impact-per-effort)

### Tier A — 15 minutes total, massive perception lift
- Delete the ScrollMotion hero word-split block (P0-1). Restores italic purple accent + word cascade + removes space-collision bug.
- Add `--default-font-family: var(--font-geist-sans)` to `@theme inline` in globals.css (P0-2). Body type becomes Geist everywhere.
- Shrink `--text-hero` clamp max to `8rem` (P0-3). Hero fits the container.

### Tier B — 30 minutes, polish gaps
- Scale wolf logo to 48/64 px (P1-3).
- Add `.testimonial-card:hover` border rule (P1-2).
- Bump grain opacity to 5%, cursor bloom to 0.8 (P1-5).
- Bump service row names above section h2 scale OR drop section h2 size (P1-4).

### Tier C — 60–90 minutes, mobile perf
- Dynamic-import Cosmo orb (P1-1). Biggest single mobile LCP win.
- Drop feGaussianBlur halo → pre-baked radial gradient.
- Defer grain + cursor bloom mount to post-first-paint.

### Tier D — optional, design enrichment
- Hand-roll SplitText letter-level reveal on one section heading.
- Widen section background variance if user explicitly wants more "layered" feel.
- Add a kinetic marquee for services or logos (was intentionally skipped).

Do Tier A first. Redeploy. Ask the user to re-audit. The majority of "feels unpolished" complaints should resolve there.
