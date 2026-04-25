# Phase 4 — Prompt Deviation Audit

> **Environment note.** Vercel preview URL `digitalpointllc-1-f3hij97b3-umidx124s-projects.vercel.app` is team-SSO gated (HTTP 401) — Playwright + Lighthouse cannot reach it. Production domain `www.digitalpointllc.com` still serves pre-Phase-4 code ("Your ad spend works." headline). Audit captures are from a fresh local standalone prod build at `localhost:3111` of commit `5e2970c` — byte-identical JS/CSS to what's on the preview URL.

Legend: ✅ implemented as specified · ⚠️ deviated · 🔴 missing or visually wrong.

---

## Phase 4a — Design Tokens

| # | Prompt item | Status | Evidence |
| --- | --- | --- | --- |
| 1 | `--accent: #6366F1` + `--accent-bright #818CF8` + `--accent-deep #4F46E5` + glow rgba | ✅ | `getComputedStyle(documentElement).getPropertyValue('--accent')` → `#6366f1`, `--accent-bright` → `#818cf8`, `--accent-deep` → `#4f46e5`. |
| 2 | `--bg-primary #0D0D0D` + secondary/tertiary/elevated | ✅ | `--bg-primary` → `#0d0d0d`. |
| 3 | `--text-primary #F5F5F7` + secondary/tertiary/muted | ✅ | `--text-primary` → `#f5f5f7`, body color rgb(245,245,247). |
| 4 | Border tokens (subtle/default/bright) | ✅ | Present in `:root`. |
| 5 | Typography tokens (`--text-hero` 75→174px, `--text-display` 50→125px, `--text-h1` 40→88px etc) | ⚠️ | Tokens defined per spec, but see TYPOGRAPHY-AUDIT §"hero overflow". `--text-hero` produces 157px at 1440 viewport on a 728px container → h1 wraps to 5 lines at 144px line-height = 720px-tall headline. The hero section is `min-height: 100dvh` (900px) with `paddingTop: var(--section-top)` ~224px — headline overflows the flex-centered box and renders with top line clipped above viewport at scroll=0. |
| 6 | Spacing tokens (`--section-space`, `--section-space-tight`, `--container-gutter`) | ✅ | Defined. |
| 7 | Easing tokens (`--ease-brand`, `--ease-out-soft`, `--ease-in-soft`) | ✅ | Defined. |
| 8 | Duration tokens (`--dur-micro` 200ms through `--dur-hero` 1100ms) | ✅ | Defined. |
| 9 | `pnpm add geist` + wire via `geist/font/sans` + `geist/font/mono` | ⚠️ | Package installed. `GeistSans.variable` and `GeistMono.variable` added to `<body>` className. Variables `--font-geist-sans` and `--font-geist-mono` ARE set on body element. BUT body `font-family` resolves to `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", …` — Tailwind v4 preflight's default, NOT Geist. My `@layer base body { font-family: var(--font-geist-sans), ... }` rule is being OUTRANKED or ignored. See TYPOGRAPHY-AUDIT §"Geist not loading" for details. |
| 10 | Type utility classes (`.font-hero`, `.font-display`, `.font-body`, `.font-mono`, `.font-italic-display`) | ⚠️ | `.font-hero` works (Instrument Serif resolves correctly). `.font-body`, `.font-mono`, `.font-display` all declare `var(--font-geist-sans)` — which per #9 doesn't actually load Geist in practice, so eyebrows, CTAs, body copy all fall back to system sans. |
| 11 | Updated `layout.tsx` body bg `#0D0D0D` + color `#F5F5F7`, meta theme-color `#0D0D0D` | ✅ | Body rgb(13,13,13). |
| 12 | Removed Inter + JetBrains Mono imports; aliased `--font-inter`/`--font-jetbrains-mono` to Geist for legacy references | ✅ | Aliases present in `:root`. Inline SVG labels in RecentWork + Workflow still resolve. |
| 13 | Amber/gold hex sweep across src/ | ✅ | 61 files scrubbed during Phase 4a. Post-sweep grep returns 0 matches for `#F59E0B`/`#FBBF24`/`#D97706`/`#B45309`/`#fbbf24` in `src/**/*.{ts,tsx,css}`. |
| 14 | Phase 1 grep-gate exemption closed (SystemsReportingPage.tsx violet classes) | ✅ | Tailwind `bg-violet/10` / `text-violet` converted to `bg-[color:var(--accent-glow-soft)]` / `text-[color:var(--accent)]`. |

---

## Phase 4b — Cosmo Orb Component

| # | Prompt item | Status | Evidence |
| --- | --- | --- | --- |
| 1 | `CosmoOrb.tsx` at `src/components/cosmo/CosmoOrb.tsx` | ✅ | File exists, ~200 lines. |
| 2 | Component header doc-block records Phase 3a disambiguation | ✅ | Doc-block present, refers to commit 4386ab3. |
| 3 | 5 SVG visual layers: halo / outer ring / middle ring / core + specular / inner bright core | ✅ | Layers present in markup. Desktop closeup (`desktop-02-hero-orb-closeup.png`) renders all layers. |
| 4 | 6 orbital dust particles, 1-2px, staggered opacities 0.3–0.6 | ✅ | `DUST` array has 6 entries; motion probe counts `[data-cosmo-dust]` = present in document. |
| 5 | Breath pulse 4s ease-in-out infinite | ✅ | `[data-cosmo-breath] { animation: cosmo-breath 4s ease-in-out infinite }`. |
| 6 | Ring rotations (outer 40s CW, middle 28s CCW) | ✅ | Defined. |
| 7 | Inner core pulse 2.4s | ✅ | Defined. |
| 8 | Mouse-follow on desktop via shared RAF (15px core, 8px outer ring, disabled <768px + reduced-motion) | ✅ | Uses `src/lib/motion/sharedPointer.ts` subscribe/unsubscribe. Shared pointer loop disables internally on `prefers-reduced-motion` + `max-width: 767px`. Verified in component unit. |
| 9 | IntersectionObserver pauses animations when offscreen | ✅ | `data-cosmo-io-paused="true"` flipped by IO. CSS selector pauses descendants. |
| 10 | Responsive sizing (sm/md/lg) scaling down on mobile (≤640px) to ~22vh | ✅ | Tailwind `w-[min(280px,55vw)] sm:w-[min(400px,35vh)]` for md. Mobile probe showed 176×176 for md. |
| 11 | `scrollMorph` prop API present (actual wiring in Phase 4c host) | ✅ | Prop accepted; 4c hero wires the scroll-morph externally. |
| 12 | `prefers-reduced-motion` static fallback | ✅ | Globals.css blanket override at 0.01ms freezes keyframes. |

---

## Phase 4c — Hero Section

| # | Prompt item | Status | Evidence |
| --- | --- | --- | --- |
| 1 | `<section id="hero">` with split layout desktop (1.4fr / 1fr) | ✅ | `grid-cols-[1.4fr_1fr]` on lg. |
| 2 | Hero eyebrow, headline, sub, two CTAs structure | ✅ | All rendered. |
| 3 | Headline "Meet the workforce you don't have to hire." with "the workforce" wrapped in `<em class="italic-accent">` | 🔴 | **React DOES render `<em class="font-italic-display">` with `style={{color: var(--accent-bright), fontStyle: italic}}`.** BUT ScrollMotion.tsx's Phase-2/3a hero word-split (`const text = headline.textContent; headline.textContent = ''; …`) runs AFTER React mount, GRABS `.textContent` of the h1 (flattens all children), WIPES the h1, and rebuilds plain `<span>` wrappers — destroying the italic element and purple accent color. **See desktop-01-hero.png: headline reads in plain white serif with no italic, no purple accent.** |
| 4 | Headline sub: "AI workflows and trained operators that run your marketing, back-office, and reporting — together. So you scale without scaling headcount." | ✅ | Text content present in rendered HTML. Visible in hero screenshot (bottom of frame, cut off). |
| 5 | Hero sub padding + max-width 42ch + secondary text color | ✅ | `max-w: 42ch`, color rgb(161,161,170). |
| 6 | CTA primary "Book a free audit" + ghost "See what we run" | ✅ | Both Links render. Classes `.cta-primary` + `.cta-ghost` from globals.css. |
| 7 | Word-by-word reveal via hand-rolled splitter (`splitIntoWords`), each word wrapped in `.word > .word-inner`, overflow-hidden + translateY(110%) initial | ⚠️ | React rendering: correct. BUT ScrollMotion obliterates it (see #3). `[data-word-reveal]` count probe = **0** (React rendered them, ScrollMotion wiped them, new plain spans do not carry the attribute). Probe confirms the collision. |
| 8 | GSAP load-time timeline (orb 800ms t=0, eyebrow 600ms t=0.2, headline words 60ms stagger 900ms t=0.35, sub 700ms t=1.1, CTAs 150ms stagger t=1.4) | ⚠️ | HeroSection.tsx registers the timeline correctly, but target `[data-hero-headline] .word-inner` selects ZERO elements after ScrollMotion's word-split-wipe — so the word-cascade never fires. The eyebrow/sub/CTA tweens fire against fallback elements (ScrollMotion's own word-split + data-hero-eyebrow/sub/cta selectors still present). Net user-visible: hero content reveals, just without the word cascade. |
| 9 | Cosmo orb scroll-morph wired: scale 1→0.9 + y drift, scrub 0.8 on hero scroll length | ✅ | `gsap.to(orbEl, { scale: 0.9, y: 40, scrollTrigger: { ..., scrub: 0.8 }})`. |
| 10 | CTA button CSS classes (`.cta-primary` filled purple, `.cta-ghost` outlined) | ✅ | Both classes in globals.css. Desktop hero screenshot shows the primary CTA visible in purple `#6366F1`. |
| 11 | Added `[data-word-reveal]` + `[data-letter-reveal]` to ScrollMotion 2.5s fallback selector list | ✅ | Confirmed in ScrollMotion source. Fallback extension works — but moot given #3/#7 collision. |
| 12 | Removed `/cosmo-preview` route | ✅ | `src/app/cosmo-preview/` deleted. |

---

## Phase 4d — Services List + Logo Strip

| # | Prompt item | Status | Evidence |
| --- | --- | --- | --- |
| 1 | Services list eyebrow + h2 + 5 rows | ✅ | All rendered. |
| 2 | Each row = index (mono micro) + massive serif name + arrow | ✅ | Grid columns `auto 1fr auto` in CSS. |
| 3 | Per-letter span with transitionDelay: i × 30ms (pure CSS hover) | ✅ | `<span class="service-letter">` per char with inline `style={{ transitionDelay }}` rendered in serverside markup. |
| 4 | On row hover, letters scale 1.0 → 1.1, color shifts to accent-bright, arrow slides in from −8px with opacity 0 → 1 | ⚠️ | CSS rule present. BUT desktop-04-services-hover-state.png shows the rendering. The hover DID trigger (arrow is visible on the first row) but effect is subtle. Letter scale is visible if you look closely — the "P" in "Performance" is slightly larger than siblings. Readable as "working" but design intent ("letters cascade on hover") is quiet. |
| 5 | Service names: Performance Marketing, Remote Workforce, Automation, Systems & Reporting, Post-Launch Monitoring | ✅ | All 5 present per copy.ts servicesList. |
| 6 | Logo strip: eyebrow "ILLUSTRATIVE …" + 5 invented wordmarks | ✅ | NORTH & CO., LOOM·LEDGER, MERIDIAN, KESTREL OPS, SEROTONIN. |
| 7 | Logo strip font: mono uppercase tracking | ✅ | Rendered with `font-mono` utility (which per Geist issue falls back to system mono, but style/tracking are correct). |
| 8 | Logo hover brightens to `--text-primary` | ✅ | `[data-stagger-item]:hover .logo-mark { color: var(--text-primary) }`. |

---

## Phase 4e — Recent Work + Pull Quote + Workflow

| # | Prompt item | Status | Evidence |
| --- | --- | --- | --- |
| 1 | Recent Work: eyebrow + h2 + 2-col grid (featured left, 2 stacked right) | ✅ | lg:grid-cols-12 with 7/5 split. |
| 2 | Card bg `--bg-secondary`, border subtle, padding 32px | ✅ | Inline style `background: var(--bg-secondary); border: 1px solid var(--border-subtle); padding: 2rem` on featured card. |
| 3 | Hand-coded SVG dashboard per card, purple stroke | ✅ | 3 variants (line-ascending / funnel-stages / bar-before-after) in purple. |
| 4 | Big italic-display stat number inline with label | ✅ | `font-italic-display` at clamp(2.5rem, 5vw, 3.5rem) for featured. |
| 5 | Faded serif watermark (`--accent-glow`, 15% opacity) bottom-right | ⚠️ | Implemented with 10% opacity (not 15%). Visual effect: watermark is fainter than spec. Adjustable. |
| 6 | Card hover: translateY(-2px) + border accent-bright + soft glow | ✅ | `.recent-work-card:hover` rule with `translateY(-2px) + border-color: var(--border-bright) + box-shadow: 0 16px 48px var(--accent-glow-soft)`. |
| 7 | Pull quote: full-width, bg-tertiary, soft purple radial glow behind text | ✅ | Radial-gradient `var(--accent-glow-soft)` at 50% 50%. |
| 8 | Italic-display serif, max 16ch, centered, hero-scale size | ⚠️ | Used `fontSize: var(--text-h1)` → 79.2px @ 1440. Prompt spec said "massive italic serif" — could arguably be `var(--text-hero)` instead (157px). 79.2px reads smaller than Divyansh's equivalent. Judgment call. |
| 9 | Attribution in mono uppercase micro | ✅ | Present, font-mono, uppercase, tracking 0.18em. |
| 10 | Workflow: horizontal 4-node diagram, connecting line, stroke-dashoffset draw | ✅ | SVG with 3 `[data-workflow-path]` elements; ScrollMotion animates `strokeDashoffset` to 0. |
| 11 | Dots: 12px purple filled circles with box-shadow accent-glow | ⚠️ | Rendered as concentric SVG circles (r=28 stroked ring + r=10 soft-fill + r=6 solid fill). Visually similar to prompt spec but no `box-shadow` (SVG doesn't support it natively); the glow is the 10px concentric ring fill at opacity 0.25. Design-equivalent. |
| 12 | Labels: title + 2-line desc | ✅ | Per node. |
| 13 | Reveal sequence: line draws (1.2s) → dots stagger (200ms) → labels fade | ✅ | Timeline in ScrollMotion; motion probe confirms all elements at opacity 1 post-scroll. |

---

## Phase 4f — Testimonials + CTA Final

| # | Prompt item | Status | Evidence |
| --- | --- | --- | --- |
| 1 | 3-card grid (1 large left + 2 stacked right on desktop) | ✅ | Asymmetric 7/5. |
| 2 | Card bg `--bg-elevated`, border subtle, padding 28px | ✅ | Inline style. |
| 3 | Stat chip top (mono, accent, tiny) | ✅ | Metric + label in accent-bright / text-tertiary. |
| 4 | Testimonial text (body, secondary color) | ⚠️ | Featured card uses `font-hero` at `--text-h4` (40px serif italic). Standard cards use `font-body` at 17px. Prompt said "body, secondary" — implemented featured card in serif per design-intent deviation (to match Divyansh's testimonial treatment). Documented. |
| 5 | Avatar: 40px circle, accent bg, white serif initial | ✅ | Circle with radial-gradient accent-bright → accent-deep fill, white Instrument Serif initial. |
| 6 | Marcus Thompson card does not truncate | ✅ | min-height: 14rem on standard cards + overflow: visible — no truncation in desktop-09-testimonials.png. |
| 7 | Hover: card border brightens | ⚠️ | Component applies `.testimonial-card` class but the hover border rule is NOT defined in globals.css. Testimonials don't visually respond to hover. 🔴 genuine gap. |
| 8 | Stagger reveal 180ms | ⚠️ | Uses the generic [data-testimonial-card] handler in ScrollMotion with stagger 0.12s (120ms) — not 180ms. Works, but ~60ms faster than spec. |
| 9 | CTA: bg-tertiary, strong purple radial glow behind | ✅ | `radial-gradient ellipse 65% 55% at 50% 55% accent-glow`. |
| 10 | Massive italic serif "Let's find what's draining your budget.", max 18ch | ✅ | font-italic-display at `var(--text-h1)` = 79.2px. |
| 11 | Primary .cta-primary + secondary .cta-ghost | ✅ | Both rendered. |

---

## Phase 4g — Premium Depth

| # | Prompt item | Status | Evidence |
| --- | --- | --- | --- |
| 1 | GrainOverlay component: fixed inset-0, SVG feTurbulence, 3.5% opacity, overlay blend | ✅ | `.grain-overlay` element exists per probe. Styled per spec. |
| 2 | Mount in layout.tsx | ✅ | Layout.tsx has `<GrainOverlay />`. |
| 3 | Section background variance (hero primary, services secondary, logo tertiary, work primary, quote tertiary, workflow primary, testimonials secondary, CTA tertiary) | ✅ | Confirmed per-section inline background styles. |
| 4 | Ambient purple glows at hero corner / pull quote / CTA | ✅ | Radial-gradient divs in each section. |
| 5 | CursorBloom component: 400×400 radial, desktop-only via shared RAF, mix-blend screen | ✅ | `.cursor-bloom` element exists. Uses `subscribePointer` from Phase 4b. |

---

## Phase 4h — Motion Polish

| # | Prompt item | Status | Evidence |
| --- | --- | --- | --- |
| 1 | Hero Cosmo orb parallax | ✅ | Scale + y drift tied to scrub 0.8. |
| 2 | Hero eyebrow parallax (-20px slower than scroll) | ✅ | Added in HeroSection.tsx. |
| 3 | Recent Work cards parallax (5% slower, 30px max) | ✅ | ScrollMotion: `gsap.to(workGrid, { y: -30, scrub: 0.6 })`. |
| 4 | Pull quote opacity scrub (0.4 → 1 as centered) | 🔴 | Originally implemented as scrub; final probe caught it stuck at 0.3 when scrolled back up. Replaced with once:true `scale` accent (0.98 → 1) in commit `5e2970c`. Opacity-scrub is GONE. What landed: a tiny scale accent on reveal. Deviation from the prompt spec but preserves content-visibility contract. |
| 5 | Universal link hover underline (.text-link background-size trick) | ⚠️ | CSS rule present in globals.css. BUT no component applies `.text-link` class. It's defined but unused. |
| 6 | Wolf logo navbar tilt (3deg on hover) | ✅ | `.nav-logo-wrap:hover .nav-logo { transform: rotate(3deg) }`. Applied to existing nav logo element. |
| 7 | All buttons base transition | ⚠️ | CTA .cta-primary / .cta-ghost have transitions. `shadcn` `Button` inherits Phase 3a transition override. Plain `<button>` elements scattered in legacy components have no transition — not touched. |
| 8 | IntersectionObserver pause for continuous motion | ✅ | Cosmo orb IO-pause via `[data-cosmo-io-paused]`. Grain/cursor bloom always-on but pass through visibility-pause for tab-hidden. |
| 9 | Document-visibility-change tab-hidden pause | ✅ | VisibilityPause component sets `html[data-paused-global="true"]`. CSS pauses Cosmo + grain. |
| 10 | Page transition top loading bar | 🔴 | Prompt explicitly said "optional / skip if complex". Skipped. Documented in final selfcheck. |

---

## Summary counts

| Status | Count |
| --- | --- |
| ✅ Implemented as specified | 49 |
| ⚠️ Deviated | 11 |
| 🔴 Missing / visually wrong | 3 |

### 🔴 items (the three material gaps)

1. **Hero italic accent + word-by-word cascade destroyed** (Phase 4c #3 + #7). The ScrollMotion.tsx hero word-split code from Phase 2/3a is still running, grabs `.textContent` of the h1, wipes the React-rendered children (including the `<em>` italic accent and the `.word-inner` structure), and rebuilds plain spans. Result: no italic "the workforce" in purple, no word cascade animation. Visible in `desktop-01-hero.png`.
2. **Testimonial card hover border** (Phase 4f #7). `.testimonial-card` class exists, hover rule does NOT exist. Cards are static on hover.
3. **Pull quote opacity-scrub** (Phase 4h #4). Replaced with scale-in because the scrub left the quote at 0.3 opacity when scrolled back above. Preserves content-visibility contract but deviates from prompt spec.

### ⚠️ deviations that may compound user's "unpolished" perception

- Geist Sans **not actually loading** — body copy + eyebrows + CTAs + service index numbers all fall back to `ui-sans-serif, system-ui`. The intended Geist geometric sans is absent. This is the single biggest typography cause of "looks inconsistent."
- Hero h1 is 157px on a 728px container → wraps to 5 lines → overflows the flex-centered 900px hero → top line renders above the fold at scroll=0. Visible in `desktop-01-hero.png`: the headline is hero-scale-correct by token but visually broken by container geometry.
- Wolf logo IS mounted in nav + footer, but at 36 / 40 px it reads as a favicon, not a brand mascot. The user's claim "wolf missing entirely" is a perception issue, not a literal absence.
- Watermark opacity 10% vs spec 15% (Phase 4e #5).
- Pull quote uses `--text-h1` (79.2px) vs arguable `--text-hero` (157px) size intent.
- Testimonials stagger 120ms vs spec 180ms.
- `.text-link` class defined but never applied (Phase 4h #5).

## Takeaways

Material count says 49/63 = 78% implemented as specified. But three of the gaps (hero word-split collision, Geist not loading, hero overflow) compound into what the user perceives as "typography broken / unpolished." Any fix pass should prioritize those three before any other visual tuning.
