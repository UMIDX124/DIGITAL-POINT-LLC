# AGENT MEMORY SNAPSHOT — pre-compaction recovery file

> If you are reading this after a context compaction: you are mid-way through a Phase 4 audit cycle. The user is unhappy with the Phase 4 result and wants comprehensive fixes. You completed a self-audit and pushed everything to the `audit/phase-4-comprehensive` branch. The user's planning assistant (running in another chat) is preparing a comprehensive fix prompt based on the audit. **Until that fix prompt arrives, do NOT touch any code in `src/`.** Your only allowed actions: (a) print the GitHub URL list if asked, (b) clarify any audit finding if asked, (c) execute the fix prompt when it arrives. Read `MASTER-AUDIT.md`, `PROMPT-DEVIATIONS.md`, and `WOLF-LOGO-FORENSICS.md` fresh after recovery to refresh context fully.

---

## 1. Repo + branch state

- **Repo path:** `/Users/laptopchoice/Projects/_services/digitalpointllc-1`
- **GitHub remote:** `git@github.com:UMIDX124/DIGITAL-POINT-LLC.git` (origin)
- **Current branch:** `audit/phase-4-comprehensive`
- **Audit branch parent:** commit `5e2970c` on `redesign/divyansh-taste` (Phase 4 final tip + pull-quote fix)
- **Last audit commit:** `e934259` — "audit: comprehensive phase-4 self-audit — screenshots + deviations + perf + master summary"
- **Tree state:** clean. No uncommitted changes. `_audit-capture.js` was deleted before commit.
- **Production domain:** `www.digitalpointllc.com` is on a PRE-Phase-4 commit (still serves "Your ad spend works." headline). Phase 4 has never been promoted to prod.
- **Vercel preview URL for Phase 4 final:** `https://digitalpointllc-1-f3hij97b3-umidx124s-projects.vercel.app` — team-SSO gated (HTTP 401), inaccessible to headless browsers.

---

## 2. Full Phase 4 history (8 phases + 1 fix = 9 commits)

### Phase 4a — Design tokens + Geist + Divyansh × 0.78 typography scale
- Commit: `bc48a94`
- Files modified: `src/app/globals.css`, `src/app/layout.tsx`, `package.json` (`+geist@1.7.0`)
- Color tokens: `--accent #6366F1`, `--accent-bright #818CF8`, `--accent-deep #4F46E5`, glow rgba variants, `--bg-primary #0D0D0D`, `--bg-secondary #111114`, `--bg-tertiary #0A0A0B`, `--bg-elevated #151518`, `--text-primary #F5F5F7`, `--text-secondary #A1A1AA`, `--text-tertiary #71717A`, `--text-muted #52525B`
- Border tokens: `--border-subtle 6%w`, `--border-default 10%w`, `--border-bright 30%purple`
- Typography: `--text-hero clamp(4.7rem, 10.9vw, 10.9rem)`, `--text-display`, `--text-h1` thru `--text-h6`, `--text-body 17px`, `--text-small 14px`, `--text-micro 12px`
- Motion: `--ease-brand cubic-bezier(0.65,0.05,0,1)`, `--ease-out-soft`, `--ease-in-soft`, `--dur-micro 200ms`, `--dur-short 300ms`, `--dur-medium 500ms`, `--dur-long 800ms`, `--dur-hero 1100ms`
- Section spacing: `--section-space clamp(6.25rem, 12.5vh, 10.9rem)`, `--section-space-tight`, `--container-gutter`, plus retained Phase 1 `--section-sm/main/lg/top`, `--site-margin`, `--space-1..8`
- Type utility classes: `.font-hero` (Instrument Serif), `.font-display` (Geist 500), `.font-body`, `.font-mono`, `.font-italic-display`
- Geist install: `pnpm add geist` → `geist@1.7.0`. Imports `GeistSans` + `GeistMono` from `geist/font/sans` + `geist/font/mono` in `layout.tsx`. Variables added to `<body>` className alongside `instrumentSerif.variable`.
- Legacy aliases: `--font-inter` + `--font-jetbrains-mono` retargeted to Geist for non-rewritten components. Same for legacy `--amber*` / `--plum*` / `--signal*` / `--violet*` color vars retargeted to purple.
- Universal sed sweep: 61 files, all `#F59E0B` / `#FBBF24` / `#D97706` / `#B45309` / `#fbbf24` and `rgba(217,119,6,*)` / `rgba(245,158,11,*)` swapped to purple equivalents. SystemsReportingPage.tsx Tailwind violet classes converted to `bg-[color:var(--accent-glow-soft)]` / `text-[color:var(--accent)]` (closes Phase 1 grep-gate exemption).

### Phase 4b — Cosmo orb component
- Commit: `4fae110`
- New files: `src/components/cosmo/CosmoOrb.tsx`, `src/lib/motion/sharedPointer.ts`, `src/app/cosmo-preview/page.tsx` (temp dev route)
- Modified: `src/app/globals.css` (orb keyframes + IO-paused gate)
- CosmoOrb is a purely decorative SVG mascot. **DISAMBIGUATION CRITICAL:** the prior Phase 3a SupportChatbot ("Cosmo chatbot") was deleted in commit 4386ab3. The new orb reuses the "Cosmo" brand name but contains ZERO AI SDK, ZERO chat, ZERO API calls. If chat ever returns, name it differently (e.g. DPLAssistant).
- 5 SVG layers: outer halo (radial-gradient + feGaussianBlur stdDeviation=18) → outer ring (1px stroke, dashed, 154px radius, CSS spin CW 40s) → middle ring (1.25px stroke solid, 138px radius, CCW 28s) → core sphere (130px radius radial-gradient + specular highlight) → inner bright core (26px radius, pulses 2.4s) + 6 orbital dust particles (1.1–2.0px, 15–30s phase-staggered orbits).
- API: `size? sm/md/lg='md'`, `scrollMorph?: boolean=true` (consumed by hero), `mouseFollow?: boolean=true` (auto-disabled <768px + reduced-motion via shared-pointer gating), `className?`, `aria-label?='AI automation orb — decorative'`.
- Mouse-follow: subscribes to `subscribePointer` from `sharedPointer.ts`. Translates core 15px max + outer ring 8px max via `translate3d`.
- IntersectionObserver: flips `data-cosmo-io-paused="true"` when offscreen. Globals.css selector pauses descendant `animation-play-state`.
- CSS keyframes: `cosmo-breath`, `cosmo-inner-pulse`, `cosmo-ring-spin-cw`, `cosmo-ring-spin-ccw`, `cosmo-dust-orbit`. All on `[data-cosmo-root]` selector.
- `sharedPointer.ts` exposes `subscribePointer(handler)` returning unsubscribe. One mousemove listener, one RAF loop, spring-lerp 0.085. Auto-no-ops on SSR / reduced-motion / max-width 767px.

### Phase 4c — Hero rebuild + Cosmo integration + word-by-word reveal
- Commit: `d65e1c7`
- Modified: `src/components/sections/HeroSection.tsx` (full rewrite, `'use client'`), `src/components/motion/ScrollMotion.tsx` (added `[data-word-reveal]` + `[data-letter-reveal]` to fallback selector list)
- New: `src/lib/wordSplit.ts` (`splitIntoWords` + `isWhitespace`)
- Removed: `src/app/cosmo-preview/` directory
- Added to globals.css: `.word`, `.word-inner`, `.cta-primary`, `.cta-ghost` classes
- Hero structure: split layout 1.4fr/1fr on `lg:`, mobile collapses to 1-col. Headline "Meet *the workforce* you don't have to hire." with "the workforce" as `<em class="font-italic-display">` styled `color: var(--accent-bright); font-style: italic`. Each non-space token wrapped in `<span class="word"><span class="word-inner" data-word-reveal>{word}</span></span>` — `.word` overflow-hidden, `.word-inner` translateY(110%) initial.
- Headline copy: HEAD_PARTS array `[{text:'Meet',italic:false},{text:'the workforce',italic:true},{text:"you don't have to hire.",italic:false}]`
- Sub copy: "AI workflows and trained operators that run your marketing, back-office, and reporting — together. So you scale without scaling headcount."
- Eyebrow: "Digital Point LLC · AI-powered operations · Since 2017"
- CTAs: "Book a free audit →" (cta-primary, /free-growth-audit) + "See what we run" (cta-ghost, #recent-work)
- GSAP load timeline: Cosmo fade+scale 800ms t=0, eyebrow 600ms t=0.2, headline words 60ms stagger 900ms t=0.35, sub 700ms t=1.1, CTAs 150ms stagger t=1.4
- Cosmo scroll-morph: scale 1→0.9 + y 0→40, scrub 0.8 on hero scroll length only (single-stage, not the 9-stage 4b spec implied)
- Hero eyebrow parallax: y -20px, scrub 0.9

### Phase 4d — Services list letter-hover + muted logo strip
- Commit: `b841aa9`
- Modified: `src/components/sections/ServicesListSection.tsx`, `src/components/sections/LogoStripSection.tsx`, `src/app/globals.css`
- ServicesListSection: each row label split into per-letter spans with inline `style={{ transitionDelay: i * 30ms }}`. Hover on `.service-row` triggers CSS `transform: scale(1.1)` + color shift to accent-bright via `.service-row:hover .service-letter`. Arrow slides in (-8px → 0 + opacity 0 → 1).
- Service names (unchanged): Performance Marketing / Remote Workforce / Automation / Systems & Reporting / Post-Launch Monitoring (kept "Automation" not "AI Automation" per item-3 hybrid framing).
- LogoStripSection: muted bg-tertiary section, mono uppercase wordmarks, hover brightens to text-primary via `[data-stagger-item]:hover .logo-mark`.
- Logos (invented per integrity rule): NORTH & CO., LOOM·LEDGER, MERIDIAN, KESTREL OPS, SEROTONIN — labeled "ILLUSTRATIVE — REPRESENTATIVE CLIENT TYPES WE SERVE"

### Phase 4e — Recent work + pull quote + workflow visual pass
- Commit: `eeae8e8`
- Modified: `src/components/sections/RecentWorkSection.tsx`, `src/components/sections/PullQuoteSection.tsx`, `src/components/sections/WorkflowSection.tsx`, `src/app/globals.css` (`.recent-work-card` hover rule)
- RecentWork: bg-secondary cards on bg-primary section, italic-display primary stat, faded serif metric watermark bottom-right (10% opacity — spec said 15%), purple-themed SVG viz, hover lift -2px + accent-glow-soft shadow + border-bright. 3 cases: 6.8x ROAS / +89% pipeline / 5.3x CPL.
- PullQuote: italic Instrument Serif at `--text-h1` (79px) on bg-tertiary with soft purple radial glow behind. Spec arguably implied `--text-hero` scale.
- Workflow: 4-node horizontal SVG diagram, purple stroke 2px connectors, larger nodes with glow halo (r=10 at 25% opacity under r=6 solid). Steps: Lead → Scored → Routed → Reported. Mobile vertical `<ol>`. Stroke-dashoffset draw + node scale-in + label fade-up via existing ScrollMotion timeline.

### Phase 4f — Testimonials + final CTA dramatic glow
- Commit: `c1fc179`
- Modified: `src/components/sections/TestimonialsSection.tsx`, `src/components/sections/CTASection.tsx`
- Testimonials: bg-elevated cards, asymmetric 7/5 grid (Sarah Chen featured + Marcus Thompson + Jennifer Walsh stacked), purple radial-gradient initial avatars (white serif initial inside), metric chip top, font-hero h4 quote on featured / font-body 17px on standard, min-height 14rem on standard cards (fixes Phase 2 Marcus truncation bug).
- **MISSING:** `.testimonial-card:hover` border rule does NOT exist in globals.css — cards inert on hover.
- CTASection: bg-tertiary with strong `--accent-glow` radial behind centered content, font-italic-display at h1 scale max 18ch, headline "Let's find what's draining your budget." + sub copy, .cta-primary "Book a 30-min audit →" + .cta-ghost "See case studies".

### Phase 4g — Premium depth (grain + cursor bloom + section bg variance)
- Commit: `76b0208`
- New: `src/components/background/GrainOverlay.tsx`, `src/components/background/CursorBloom.tsx`
- Modified: `src/app/layout.tsx` (mounts GrainOverlay + CursorBloom)
- GrainOverlay: fixed inset-0, pointer-events-none, z-index 1, mix-blend overlay at 3.5% opacity, inline SVG feTurbulence baseFrequency=0.85 numOctaves=2 stitchTiles=stitch.
- CursorBloom: 400×400 radial gradient (`--accent-glow-soft` 8% × 50% opacity × mix-blend-screen) following cursor on desktop only via shared-pointer subscribe. Auto-disables on mobile + reduced-motion.
- Section bg variance (already wired via 4c-4f tokens): hero/recent-work/workflow → bg-primary, services/testimonials → bg-secondary, logo strip/pull quote/CTA → bg-tertiary. Subtle 1.5%–2% brightness deltas.
- Ambient glows: hero bottom-right (accent-glow-soft 8%), pull quote center, CTA center (accent-glow 25% — strongest).

### Phase 4h — Motion polish (parallax + nav tilt + visibility pause)
- Commit: `e92abde`
- New: `src/components/motion/VisibilityPause.tsx`
- Modified: `src/components/layout/Navigation.tsx` (`.nav-logo-wrap` + `.nav-logo` classes), `src/components/motion/ScrollMotion.tsx` (parallax + pull-quote scrub originally, then replaced with scale-accent), `src/app/globals.css` (.nav-logo tilt, a.text-link underline, html[data-paused-global] pause)
- VisibilityPause: sets `html[data-paused-global="true"]` on tab visibility-hidden. CSS pauses Cosmo orb + grain.
- Navigation: nav logo image gets `.nav-logo` class; parent Link gets `.nav-logo-wrap`. CSS: `.nav-logo-wrap:hover .nav-logo { transform: rotate(3deg) }`.
- ScrollMotion additions: Recent Work cards y -30 parallax (scrub 0.6 on #recent-work, mobile-disabled via matchMedia max-width 767px), pull-quote scale accent.
- `.text-link` CSS class defined (animated underline via background-size trick) but NOT applied to any component — dead CSS.

### Phase 4h-fix — Pull quote uses once:true scale-accent (not scrub)
- Commit: `5e2970c`
- Modified: `src/components/motion/ScrollMotion.tsx`
- Reason: original 4h scrub `fromTo(opacity:0.3 → 1, scrub:0.8)` left pull quote at 0.3 opacity when scrolled back above. Probe caught 1/41 reveals < 0.95. Replaced with `fromTo(scale: 0.98 → 1, once:true, duration:0.8)` — opacity stays at 1 regardless of scroll direction.

---

## 3. The 3 critical bugs identified in self-audit

### 🔴 Bug 1 — Geist Sans not actually loading
- **Symptom:** every sans-serif element on the homepage falls back to Tailwind v4's default `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`. Body, eyebrows, sub, CTAs, service indices, logo marks, pull-quote attribution, CTA body all affected. Only `.font-hero` / `.font-italic-display` / `h1..h6` (which use `var(--font-instrument-serif)`) escape — Instrument Serif loads correctly.
- **Evidence:** `audit-docs/_probe-typography.json` — body computed font-family is `ui-sans-serif, system-ui, sans-serif, …`. Should be Geist Sans.
- **Cause:** Tailwind v4 preflight includes `html { font-family: var(--default-font-family) }` using the theme's generated default. My `@layer base body { font-family: var(--font-geist-sans), var(--font-sans), system-ui, sans-serif }` rule (in `src/app/globals.css` ~line 245-252) is being outranked OR cascade-layer ordering issue between `@import "tailwindcss"` + `@layer base` is burying it.
- **Verification:** `GeistSans.variable` IS added to `<body>` className in `src/app/layout.tsx` — the CSS variables `--font-geist-sans` and `--font-geist-mono` are set on the body element. The connection between var-set and font-family-application is what's broken.
- **Fix direction (Tier A — 1 line):** Add `--default-font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif` to the `@theme inline` block in `src/app/globals.css`. Tailwind v4 preflight reads `--default-font-family` and applies it at the html level.
- **Alternative fixes:** apply `font-sans` utility class directly on `<body>`, OR move the body font-family rule out of `@layer base` into an unlayered block, OR use `@layer utilities` so it wins specificity ties.

### 🔴 Bug 2 — ScrollMotion hero word-split DOM collision
- **Symptom:** hero headline renders as plain white Instrument Serif. NO italic accent on "the workforce". NO purple `--accent-bright` color. Words collide without spaces ("Meetthe workforceyou don't have to"). The italic + purple was supposed to be the visual signature of the hero.
- **Evidence:** `audit-shots/desktop-01-hero.png` — headline text reads "Meetthe / workforceyou / don't have to / hire." in plain white. `[data-word-reveal]` count probe = 0 despite React rendering it.
- **Cause:** `src/components/motion/ScrollMotion.tsx` lines 20-51 (Phase 2/3a hero word-split) still runs on mount:
  ```
  const headline = document.querySelector<HTMLElement>('[data-hero-headline]');
  if (headline && !headline.dataset.split) {
    const text = headline.textContent ?? '';   // <- flattens children to string
    headline.textContent = '';                  // <- WIPES the DOM
    const parts = text.split(' ');
    parts.forEach((w, i) => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.textContent = w;
      headline.appendChild(span);
      ...
    });
  }
  ```
  This destroys the React-rendered `<em class="font-italic-display">` italic accent + the `.word > .word-inner` reveal structure + every `data-word-reveal` attribute. The Phase 3a space-preservation fix (text-node spaces between spans) was IN the React-rendered structure, which ScrollMotion wipes — so we hit the legacy spacing bug AND lose the italic accent in one collision.
- **Effect on HeroSection's GSAP timeline:** the timeline targets `[data-hero-headline] .word-inner` — selects 0 elements after ScrollMotion wipe. Word cascade never fires. Eyebrow/sub/CTA stagger still works (different selectors).
- **Fix direction (Tier A — delete ~30 lines):** Remove the entire `// Hero headline — split by word` block in `src/components/motion/ScrollMotion.tsx` (lines ~20-51 of the post-Phase-4h file). HeroSection.tsx now owns word-split + reveal entirely. The fallback selector list extension for `[data-word-reveal]` stays — that's the safety net.

### 🔴 Bug 3 — Hero h1 overflows 100dvh content box at 1440×900
- **Symptom:** hero h1 first line renders at y=-136 (above the viewport fold) at scroll=0. Headline visually clipped, sub copy + CTAs pushed below the fold.
- **Evidence:** `audit-docs/_probe-typography.json` — hero h1 rect `{x:64, y:-136, w:728, h:578}`. The h1 is 578px tall; the flex-centered content box is 564px (900 viewport − 224 paddingTop − 112 paddingBottom). H1 overruns by 14px upward.
- **Cause:** `--text-hero: clamp(4.7rem, 10.9vw, 10.9rem)` resolves to `156.96px` at 1440 viewport (10.9vw = 156.96). On the 728px-wide left column (1.4fr/1fr grid), the headline wraps to ~5 lines at 144px line-height = 720px tall if unconstrained. Hero `min-height: 100dvh` = 900px on a standard viewport. paddingTop `--section-top` = 224px desktop. paddingBottom `--section-main` = 112px desktop. Content box = 564px. H1 = 578px. Overrun.
- **Fix direction (Tier A — 1 token edit in globals.css):** Change `--text-hero` clamp to `clamp(3.5rem, 7.5vw, 7.5rem)` — maxes at 120px on 1440 viewport. On 728px container that's ~4 lines at 115px = 460px. Fits the 564px box with 100px room. File: `src/app/globals.css`.
- **Alternative fix options:** widen hero to 1-col centered layout (the full 1440−gutter width gets the h1, wraps to 3 lines), OR reduce hero paddingTop from `--section-top` (224px) to `--section-main` (112px) — content box becomes 676px.

---

## 4. Wolf logo investigation findings

- **Asset:** `public/Dp-logo1.png` (324 KB single PNG). Only logo asset. No separate wolf-mascot SVG or PNG exists in the repo.
- **No file was edited that "removed" it.** The user's claim "wolf logo missing entirely" is **perception accurate, fact imprecise.** The logo IS still mounted; it just renders too small to register as a brand mascot.
- **Currently mounted at:**
  - `src/components/layout/Navigation.tsx:79` — `<Image src="/Dp-logo1.png" width={40} height={40} style={{ width: '36px', height: 'auto' }} />` → renders 36×38.25 px (2.5% of 1440px viewport)
  - `src/components/layout/Footer.tsx:30` — `<Image src="/Dp-logo1.png" width={40} height={40} style={{ width: '40px' }} />` → renders 40×42.5 px
  - `src/app/(conversion)/layout.tsx:18` — also mounts on /free-growth-audit page at width=44
  - `src/app/layout.tsx:131` and `src/components/seo/FAQSchema.tsx:65` — JSON-LD only (not rendered)
- **What needs to happen to "restore" it:** scale up. Recommend: nav `width={64}` + `style={{ width: '48px' }}`, footer `width={96}` + `style={{ width: '64px' }}`. If user has a separate dedicated wolf SVG asset they expected, that would need to be delivered (not in repo today).
- **Phase 4 did NOT regress this.** Phase 4h added the `.nav-logo` tilt-on-hover class but didn't change the size. This is a pre-Phase-4 sizing decision that user is now reading as broken.

---

## 5. Performance findings

- **Lighthouse desktop (preset=desktop):** **perf 99**, FCP 0.3s, LCP 0.9s, TBT 30ms, CLS 0, SI 0.6s, TTI 1.0s
- **Lighthouse mobile (default mobile-throttled):** **perf 76**, FCP 1.2s, LCP 4.5s ← main drag, TBT 320ms, CLS 0, SI 3.4s, TTI 4.6s
- **Phase 4 final selfcheck reported "perf 69"** — that was a default mobile-throttled run incorrectly labeled "desktop". Real desktop is 99. Real mobile is 76. **Significant correction.**
- Bundle: 417.7 KB gzipped on `/`. 62.3 KB headroom under 480 KB ceiling.
- **Mobile LCP drivers:** Cosmo orb feGaussianBlur stdDeviation=18 halo filter (compositor-expensive on mobile), GSAP + ScrollTrigger + Lenis init (~340ms combined), 5 SVG layers + 6 dust particles render cost.
- **Top 3 optimizations recommended:**
  1. `next/dynamic` import the Cosmo orb with `ssr: false` + low-cost amber circle placeholder until hydration. Estimated −0.8s LCP.
  2. Drop the `<feGaussianBlur stdDeviation="18">` halo filter — replace with pre-baked radial gradient. Estimated −0.3s LCP.
  3. Defer GrainOverlay + CursorBloom mount until after first paint via `requestIdleCallback` or `IntersectionObserver` on body. Estimated −0.25s combined.
  - Combined projection: mobile perf 88–92.

---

## 6. Self-honest match assessment

- **60–65 % match to Divyansh visual language.** Structural archetypes landed (split hero, massive editorial list, illustrative logos, asymmetric work, pull quote, workflow, testimonials, CTA). Token system ports his typography ratios (×0.78), signature easing curve, spacing rhythm. We did NOT land: typography render (Geist not loading → body is system sans), hero impact (h1 overflow + word-split collision destroying italic accent), motion grammar density (no SplitText letter reveals, no kinetic marquee — last was intentional skip).
- **55–60 % of "95 % replica" goal achieved.** Three P0 bugs (Geist, hero collision, hero overflow) compound into "looks unpolished" perception. Fix all three → projection ~80 %. Reaching genuine 95 % would also need letter-level reveal + tighter hero composition + Geist body actually applied.
- **3 biggest reasons it falls short:**
  1. Geist Sans isn't loading — every sans element is system stack
  2. ScrollMotion hero word-split collision destroys italic accent + word cascade
  3. Hero h1 overflows 100dvh — first line clipped above the fold

---

## 7. Audit doc filenames + key findings

- `MASTER-AUDIT.md` — Synthesis. P0/P1/P2 prioritized issue list. 60–65 % Divyansh match. Tier A (15 min) fixes with biggest perception lift.
- `PROMPT-DEVIATIONS.md` — 49 implemented as spec / 11 deviated / 3 missing across phases 4a–4h. Line-by-line per prompt item.
- `TYPOGRAPHY-AUDIT.md` — Geist not loading is root cause. Hero overflow detail. Per-element computed-style table. Sizing collisions at 79.2px (services/quote/CTA all same).
- `WOLF-LOGO-FORENSICS.md` — Logo present at 36/40 px = favicon-scale. Phase 4 did not regress. Scale to 48/64 px to restore brand presence.
- `PERFORMANCE-AUDIT.md` — Desktop 99, mobile 76. LCP 4.5s drivers. Top 3 optimizations.
- `LAYOUT-AUDIT.md` — Hero overflow (critical), hero container 1440 vs other sections 1280 (inconsistent), section spacing rhythm correct, mobile collapse clean.
- `MOTION-AUDIT.md` — 24 working / 7 deviated / 4 broken across all interactions. Hero word-split destroyed, testimonial hover missing, pull-quote scrub replaced with scale.
- `COLOR-AUDIT.md` — Zero amber residue. Zero violet/indigo leaks. Brand purple consistent. Section bg variance technically present but intentionally subtle (1.5 % deltas).

---

## 8. Audit screenshot filenames

- `desktop-01-hero.png`
- `desktop-02-hero-orb-closeup.png`
- `desktop-03-services.png`
- `desktop-04-services-hover-state.png`
- `desktop-05-logo-strip.png`
- `desktop-06-recent-work.png`
- `desktop-07-pullquote.png`
- `desktop-08-workflow.png`
- `desktop-09-testimonials.png`
- `desktop-10-cta.png`
- `desktop-11-footer.png`
- `desktop-12-navbar-closeup.png`
- `desktop-fullpage.png`
- `desktop-reduced-motion.png`
- `divyansh-reference.png`
- `mobile-01-hero.png`
- `mobile-02-services.png`
- `mobile-fullpage.png`
- `tablet-fullpage.png`

---

## 9. All raw GitHub URLs

### DOCS

- Master audit: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-docs/MASTER-AUDIT.md
- Prompt deviations: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-docs/PROMPT-DEVIATIONS.md
- Typography: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-docs/TYPOGRAPHY-AUDIT.md
- Wolf logo forensics: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-docs/WOLF-LOGO-FORENSICS.md
- Performance: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-docs/PERFORMANCE-AUDIT.md
- Layout: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-docs/LAYOUT-AUDIT.md
- Motion: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-docs/MOTION-AUDIT.md
- Color: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-docs/COLOR-AUDIT.md
- Memory snapshot (this file): https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-docs/AGENT-MEMORY-SNAPSHOT.md
- Lighthouse desktop: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-docs/lighthouse-desktop.json
- Lighthouse mobile: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-docs/lighthouse-mobile.json

### SCREENSHOTS

- Desktop hero: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/desktop-01-hero.png
- Desktop hero orb closeup: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/desktop-02-hero-orb-closeup.png
- Desktop services: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/desktop-03-services.png
- Desktop services hover: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/desktop-04-services-hover-state.png
- Desktop logo strip: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/desktop-05-logo-strip.png
- Desktop recent work: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/desktop-06-recent-work.png
- Desktop pull quote: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/desktop-07-pullquote.png
- Desktop workflow: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/desktop-08-workflow.png
- Desktop testimonials: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/desktop-09-testimonials.png
- Desktop CTA: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/desktop-10-cta.png
- Desktop footer: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/desktop-11-footer.png
- Desktop navbar closeup: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/desktop-12-navbar-closeup.png
- Desktop fullpage: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/desktop-fullpage.png
- Tablet fullpage: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/tablet-fullpage.png
- Mobile hero: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/mobile-01-hero.png
- Mobile services: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/mobile-02-services.png
- Mobile fullpage: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/mobile-fullpage.png
- Divyansh reference: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/divyansh-reference.png
- Reduced motion: https://raw.githubusercontent.com/UMIDX124/DIGITAL-POINT-LLC/audit/phase-4-comprehensive/audit-shots/desktop-reduced-motion.png

---

## 10. User profile

- **Communication:** mixes Roman Urdu + English. Direct, concise. Hates fluff.
- **Identity:** Owns AI automation agency. Three businesses: Digital Point LLC (DPL), Virtual Customer Solutions (VCS), Backup Solutions (BSL). Main product: Alpha Command Center (CRM SaaS).
- **GitHub:** UMIDX124
- **Email:** backupsolutions1122@gmail.com
- **Autonomy preference:** strong. Wants the agent to execute, not ask permissions for routine decisions. Use engineering judgment.
- **Verdict authority:** the user owns the visual verdict. Agent self-checks are evidence, NOT verdicts. Never write "PASS" prematurely.
- **Honest flagging:** prefers brutal honesty over generous self-grading. Flag deviations clearly. Document blockers up front.
- **Communication tells:** says "proceed" / "stop" / "verified" / "good" decisively. Long pauses or hesitation in plans irritate. Casual Hinglish phrases when the work is going well.
- **Triggers:** premature "PASS", agent over-explaining, ignoring durable rules from CLAUDE.md, unclear progress reporting.

---

## 11. Hard project rules (durable, never violate)

- **Bundle ceiling:** ≤ 480 KB gzipped on `/` route.
- **Scroll-reveal contract:** every reveal-attribute selector must be in `ScrollMotion.tsx` 2.5s fallback list. Content NEVER stays invisible past 2.5s. Every new `data-*` reveal attribute added to a component must be added to the fallback selector list in the same commit.
- **`prefers-reduced-motion`** respected on ALL motion. Static fallback for every animation.
- **IntersectionObserver pause** required for continuous animations when offscreen.
- **Mobile:** mouse-follow disabled, simpler effects.
- **Forbidden deps:** never re-introduce framer-motion (deleted Phase 3a), three.js (deleted Phase 2), AI SDK (deleted Phase 3a), tailwindcss-animate, react-spring, analytics/cookie/GTM snippets.
- **Wolf logo asset (`/public/Dp-logo1.png`)** is treated as immutable. Edit container/sizing/position only — never the asset itself.
- **No copy.ts rewrites for math/pillars/process/FAQ/founders blocks.** Hero headline + sub-headline are the only copy that's allowed to change in Phase 4. Hybrid framing (AI workflows + trained operators), NOT pure AI-first.
- **DPL primary color is purple `#6366F1`** — supersedes legacy "gold #F59E0B" rule in global `~/.claude/CLAUDE.md` for the DPL site only. Other projects (CRM, VCS, BSL) keep their existing color rules. NEVER use amber/gold/yellow/orange in DPL site CSS. Documented in commit `bc48a94` and Phase 4a selfcheck.
- **Cosmo orb is purely decorative.** Reuses the "Cosmo" brand name from the deleted Phase 3a chatbot. ZERO AI integration. If chatbot ever returns, name it differently (e.g. DPLAssistant).
- **No `--force` push. Ever.**
- **No promotion to `--prod` without explicit user request.**
- **No destructive git operations** (reset --hard, checkout --, clean -f, branch -D) without explicit user authorization.
- **Server-component-first architecture** preserved outside the hero. `'use client'` only where genuinely needed (motion components, hero word-split, Cosmo, mouse-cursor bloom).
- **ScrollMotion.tsx fallback selector contract** must hold across every commit.

---

## 12. Pending tasks

1. Plain-text URL list still needs to be printed for the user's planning assistant (their request was "Print the audit URLs output block again as plain text").
2. Awaiting comprehensive fix prompt from the planning assistant in another chat.
3. **NO code changes to `src/`** until that fix prompt arrives.
4. After compaction recovery: read this snapshot file FIRST, then check if the user has provided a fix prompt.

---

## 13. Recovery instructions for post-compaction self

If you are reading this after a context compaction:

- You are on branch `audit/phase-4-comprehensive` at commit `e934259` (or later, if a memory-snapshot commit was made post-`e934259` — see `git log -1`).
- The `redesign/divyansh-taste` branch tip is `5e2970c` (Phase 4 final + pull-quote fix).
- The user is unhappy with Phase 4. You completed a comprehensive self-audit and pushed all findings to `audit/phase-4-comprehensive`.
- The user's planning assistant is preparing a detailed fix prompt based on the audit docs.
- **Until that fix prompt arrives, do NOT touch any code in `src/`.**
- Allowed actions:
  - (a) Print the GitHub URL list (Section 9 above) if asked.
  - (b) Clarify any audit finding if asked.
  - (c) Execute the fix prompt when it arrives — read it carefully, follow the user's hard rules in Section 11, and use the audit docs as your spec.
- First action after recovery: re-read `MASTER-AUDIT.md`, `PROMPT-DEVIATIONS.md`, `TYPOGRAPHY-AUDIT.md`, and `WOLF-LOGO-FORENSICS.md` (in that order) to refresh full context.
- The 3 P0 bugs are: Geist not loading (Tailwind v4 default-font-family fix), ScrollMotion hero word-split collision (delete the legacy block), Hero h1 overflow (shrink `--text-hero` clamp).
- Tier A fixes are 15 minutes total and resolve the worst perception issues.
