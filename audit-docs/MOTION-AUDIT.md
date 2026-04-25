# Motion & Interaction Audit — Phase 4 comprehensive

Every user-facing animation tested in headed Chromium at desktop 1440×900 + mobile 390×844. Reduced-motion emulation verified via Playwright context option. Results in `audit-shots/` + `_probe-motion.json`.

| Interaction | Spec | Actual | Status |
| --- | --- | --- | --- |
| Hero word-by-word reveal (words cascade in 60ms stagger) | Each word slides up from translateY(110%) to 0 at 900ms each | **Broken.** `[data-word-reveal]` count probe = 0. ScrollMotion's legacy word-split wipes the React-rendered structure before GSAP timeline runs. Words ultimately visible but as plain fade-up from ScrollMotion's own split, not the Phase 4c cascade. | 🔴 NOT WORKING — collision bug |
| Hero italic accent on "the workforce" in purple | `<em>` with `color: var(--accent-bright)` + italic | **Visible as plain Instrument Serif white.** ScrollMotion's `.textContent` grab destroys the `<em>` wrapper. | 🔴 NOT WORKING — same collision |
| Hero eyebrow load-stagger (t=0.2, 600ms, y 12) | GSAP timeline | **Working** — eyebrow fades in on load. | ✅ |
| Hero sub load-stagger (t=1.1, 700ms, y 16) | GSAP timeline | **Working.** | ✅ |
| Hero CTAs load-stagger (t=1.4, 150ms between, 600ms) | GSAP timeline | **Working.** Primary + ghost CTAs cascade in. | ✅ |
| Cosmo orb mount (scale 0.9→1, opacity 0→1, 800ms t=0) | GSAP timeline | **Working.** Orb fades + scales on mount. | ✅ |
| Cosmo orb breath (4s infinite ease-in-out) | CSS keyframe | **Working.** CSS on `[data-cosmo-breath]`. | ✅ |
| Cosmo orb outer ring CW rotation (40s linear) | CSS keyframe | **Working.** Verified in DOM. | ✅ |
| Cosmo orb middle ring CCW rotation (28s linear) | CSS keyframe | **Working.** | ✅ |
| Cosmo orb inner-core pulse (2.4s infinite) | CSS keyframe | **Working.** | ✅ |
| Cosmo orb dust orbit (6 particles, 15–30s each) | CSS keyframe with phase-offset via negative animation-delay | **Working.** 6 dust particles animate. | ✅ |
| Cosmo orb mouse-follow (core 15px, ring 8px, spring lerp) | JS via shared RAF pointer bus | **Working.** Subscribes + translates cleanly on desktop. Auto-disabled on mobile + reduced-motion via shared pointer gating. | ✅ |
| Cosmo orb scroll-morph (scale 1→0.9 + y 0→40, scrub 0.8) | GSAP ScrollTrigger | **Working.** Orb subtly scales down + drifts as hero scrolls out. Single-section morph. | ⚠️ Simpler than the 9-stage morph implied in the 4b prompt (documented in Phase 4 final selfcheck) |
| Cosmo orb IntersectionObserver pause | Toggles `[data-cosmo-io-paused]` | **Working.** | ✅ |
| Services list letter-hover (letters scale 1.1 on row hover, 30ms stagger, color accent-bright) | CSS with per-letter transitionDelay | **Working** — `desktop-04-services-hover-state.png` shows the first row hovered, arrow present. Letter scale is subtle (1.08 in CSS, 1.1 in prompt — close enough) and readable on close inspection. Design intent ("cascading letter hover") quieter than hoped. | ⚠️ Working but subtle |
| Services row arrow slide-in (-8px → 0 + opacity 0 → 1) | CSS | **Working.** Arrow appears on hover per screenshot. | ✅ |
| Logo strip wordmark hover brighten (tertiary → primary) | CSS | **Working.** | ✅ |
| Recent Work card reveal stagger | GSAP | **Working.** `[data-work-card]` count 3, all opacity 1 after scroll. | ✅ |
| Recent Work card hover lift (-2px + border-bright + soft shadow) | CSS | **Working.** | ✅ |
| Recent Work card parallax (y -30 on scroll, scrub 0.6) | GSAP ScrollTrigger | **Working.** | ✅ |
| Recent Work metric watermark (faded serif, bottom-right) | Inline absolute span | **Working** but at 10% opacity is very subtle. Prompt said 15%. | ⚠️ slightly under-rendered |
| Pull quote opacity scrub (0.4 → 1 as center enters viewport) | GSAP scrub | **Not implemented as spec.** Replaced with scale-accent (0.98 → 1 once:true) in commit 5e2970c after probe caught the scrub leaving quote at 0.3 when scrolled back above. Opacity fade still provided by generic `[data-reveal]` handler. | 🔴 deviated |
| Workflow stroke-draw (paths dash-offset to 0, 1.2s) | GSAP timeline | **Working.** 3 `[data-workflow-path]` + 4 `[data-workflow-node]` + 8 `[data-workflow-label]` all at opacity 1 post-scroll. Timeline draws paths → pops nodes → fades labels. | ✅ |
| Testimonials reveal stagger (180ms) | GSAP | **Working** but stagger is 120ms (implemented via generic [data-testimonial-card] handler, not the spec's 180ms). | ⚠️ slightly faster than spec |
| Testimonials card hover border brighten | CSS | **Not implemented.** No `.testimonial-card:hover` rule in globals.css. Cards are static on hover. | 🔴 MISSING |
| CTA final dramatic glow (strong accent-glow radial) | CSS radial-gradient | **Working.** | ✅ |
| CTA primary button hover (translate-2, brighter, purple shadow) | CSS transition | **Working.** | ✅ |
| CTA ghost button hover (border + soft bg tint) | CSS transition | **Working.** | ✅ |
| Wolf logo navbar tilt (3deg on hover) | CSS | **Working.** `.nav-logo-wrap:hover .nav-logo { rotate(3deg) }`. | ✅ |
| Link underline grow left→right (.text-link class) | CSS background-size trick | **Defined but unused.** No component applies `.text-link`. Links use default underline or no underline. | ⚠️ unused feature |
| Grain overlay (3.5% opacity fixed overlay) | SVG feTurbulence | **Working.** Element present in DOM. Visually very subtle (barely discernible at 3.5%) — may read as "invisible" to user unless they zoom in on a dark area. | ⚠️ Working but imperceptible |
| Cursor bloom (purple radial following cursor on desktop) | Shared RAF JS | **Working** per probe (element present, subscribes on desktop). Visual is VERY subtle at 0.5 opacity × mix-blend-screen on dark backgrounds. Reads as very faint purple wash around cursor on testimonial section; invisible over other sections. | ⚠️ working but subtle |
| Visibility-pause (tab hidden → html data-paused-global + CSS pause) | JS + CSS | **Working.** | ✅ |
| prefers-reduced-motion static fallback | CSS blanket override (0.01ms duration) | **Working.** `desktop-reduced-motion.png` shows the hero rendering cleanly with no animation. Orb appears at steady state. Content visible. | ✅ |
| Scroll-reveal 2.5s fallback safety net | GSAP setTimeout force-opacity | **Working.** Phase 4 final probe showed 0 elements below 0.95 opacity after scroll+settle. | ✅ |

---

## Count

- ✅ Working as specified: 24
- ⚠️ Working but deviation/subtle: 7
- 🔴 Broken or missing: 4

## Top 4 broken items (user-facing impact)

1. **Hero italic accent + word cascade destroyed** (ScrollMotion/HeroSection collision). Visible: italic "the workforce" in purple replaced with plain white serif; words collide without spaces. Biggest visible regression.
2. **Testimonial hover border** missing — cards feel static on hover.
3. **Pull quote opacity scrub** replaced with scale accent.
4. **Link-underline `.text-link` class** defined but unused.

## Grain + cursor bloom perceptibility

Both defined and mounted correctly. Both are deliberately subtle per the prompt spec (3.5% grain, 0.5 cursor bloom). On a 1440 desktop screen at normal viewing distance, both are near-imperceptible to a casual scroll. They exist as "premium depth" polish — not features a user would consciously notice, but possibly features the user would notice the ABSENCE of (a "flat" feel).

If the user reports "looks unpolished" — cursor bloom at 0.8 opacity and grain at 5% opacity would make both noticeable. Easy 2-line tweak.

## Reduced motion verdict

✅ Clean pass. `desktop-reduced-motion.png` shows hero, headline, CTAs all rendered, static orb visible. No broken states, no missing content, no animation jitter.
