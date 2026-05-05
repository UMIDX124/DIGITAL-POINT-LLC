# Digital Point LLC — Project Durable Rules

> Project-scoped supplement to global `~/.claude/CLAUDE.md`. Global rules apply in full; this file appends project-specific invariants. **Locked invariants listed here are FATAL halt conditions if violated.**

---

## Session-start protocol (READ FIRST)

Before touching any code:

1. Read this file in full. Do not skim. K1-K17 + locked invariants + Phase 18-19 history are non-negotiable.
2. Read `DESIGN.md` (design system), `PRODUCT.md` (service offerings), `MASTER-WEBSITE-PROMPT.md` (original brief).
3. Read most recent handoff: `ls *HANDOFF*.md *PHASE*.md` → newest first.
4. Read `~/.claude/CLAUDE.md` (global rules — universal anti-patterns, real-data rule, stop-slop discipline).
5. Read `~/.claude/projects/-Users-laptopchoice-Projects-Websites-Audit/memory/MEMORY.md` for cross-project memory.
6. Only then start work. **Never re-derive a locked decision.** If memory contradicts this file, this file wins.

---

## Personal working preferences (Umer-specific, applies to all DPL work)

### Communication
- **Hinglish OK.** When user writes Urdu/English mix, respond same way. Don't translate his Hinglish to English in replies unless asked.
- **Lead with problems, then with what worked.** Issue first, praise second. Never the reverse.
- **Token-efficient.** No fluff. No mid-task summaries. No "I'd be happy to help" greetings.
- **Numbers over adjectives.** "Bundle dropped 47KB" beats "much smaller now."
- **End-of-turn:** one or two sentences. What changed, what's next. Nothing else.
- **When stuck:** say so directly. Don't iterate silently.
- **Never claim work is done that isn't shipped + verified.**

### Anti-patterns (NEVER write, NEVER propose)
- **No em-dashes anywhere.** Period or comma.
- **No three-item rhetorical lists.** Two beats three.
- **No binary contrasts** ("not X — it's Y" / "isn't a tool, it's a verb"). State Y directly.
- **No throat-clearing openers** ("Here's the thing:" / "It turns out" / "The truth is" / "Let me be clear").
- **No business jargon.** Banned: navigate, unpack, lean into, landscape, double down, deep dive, take a step back, moving forward, circle back, on the same page, game-changer, next-generation, industry-leading, cutting-edge.
- **No adverbs** (no -ly words; specific offenders: really, just, literally, genuinely, honestly, simply, actually, truly).
- **No vague declaratives** ("The implications are significant" → name the implication).
- **No Wh- sentence starters** (What/When/Where/Who/Why/How as the leading word).
- **No passive voice.** Find the actor.
- **No AI-template tier proposals** (Free/Pro/Agency, /for-agencies route, ROI calculator) without explicit user approval.
- **No "Talk to founder →" CTAs.** Use specific labels: "Book scoping call," "Run audit."
- **No fake testimonials, fake logos, fake metrics.** TestimonialsSection already returns null per the locked invariants — don't unilaterally re-enable with fabricated quotes.

### Real-data rule (universal)
Every claim, every metric, every customer logo on the DPL site must:
- Trace to a named source (real client agreement, real measurement, real Lighthouse / CrUX / GSC data) OR
- Be explicitly marked `[design only]` until real

LLMs are explainer-only. They never generate metrics.

### Workflow rules
- **One commit per coherent change.** No autonomous 19-commit batches without screenshot gate.
- **Screenshot diff after each commit** during visual passes. (Lesson from CrawlIQ 2026-05-05 magazine-theme regression — burned a full day reverting.)
- **Quality gates per commit:** `pnpm exec tsc --noEmit` → 0 errors, `pnpm lint` → 0 warnings, `pnpm build` → succeeds, headless screenshot → no empty regions, K11 Lighthouse mobile median ≥ 92 if perf-impacting, K17 atmosphere caps respected if Three.js touched.
- **VS Code Claude plans. Terminal Claude executes.** Unless auto-mode is explicitly active, VS Code Claude does not run code-changing tools — it drafts prompts/plans for terminal Claude.
- **Pause for user before deploys.** No `vercel deploy --prod` without explicit "ship it."

### Skill bundles available (project-scoped at `.claude/skills/`)
56 skills installed via copy from CrawlIQ on 2026-05-06:
- **marketingskills** (40 skills) — `copywriting`, `page-cro`, `seo-audit`, `ai-seo`, `schema-markup`, `pricing-strategy`, `competitor-alternatives`, `sales-enablement`, `customer-research`, etc. Foundation file: `.agents/product-marketing-context.md` — every marketing skill reads this first.
- **stop-slop** — anti-AI-prose ruleset. Final pass on every word of marketing copy.
- **remotion** — programmatic video generation in React.
- **agent-skills-for-context-engineering** (14 skills) — for orchestration / multi-agent / memory work, less applicable to marketing site.

When user asks for marketing copy: read PMC → invoke `copywriting` (or relevant CRO skill) → run `stop-slop` final pass → score ≥35/50 before commit.

If `.agents/product-marketing-context.md` doesn't exist yet for DPL, generate it via the `product-marketing-context` skill in auto-draft mode before any copy work.

---

## Locked Invariants

### Brand + Visual

- **Bloomberg Operator palette purity** — `#000` canvas, `#FF8800` amber primary, `#2A8FBD` instrument blue secondary. Zero violet, indigo, or purple anywhere on content surfaces. (See atmospheric exception below.)
- **Hero copy** — `Hire the AI. Skip the headcount.` (em wraps "the AI" only; period inline outside em; `.hero-h1-line-2` nowrap wrapper at ≥640px). Phase 18.6 P2: em renders as `font-display font-bold not-italic` (Geist Sans bold, amber-accent), superseding the prior italic-display treatment to fix the `.hero-em` descender clearance regression. Phase 18.6 P1 (fourth pass): `<br>` between sentences removed; `.hero-h1-line-2` `display: block` provides the break.
- **5-service order** — AI Agents → Workflow Automation → Remote Operators → Performance Marketing → Systems & Reporting.
- **AutomationOrbit Palette D geometry** — outer rx=138 ry=98, inner rx=62 ry=42, 4 cardinal nodes, 90s rotation, prefers-reduced-motion killswitch. SVG-internal; container bounds may evolve (Phase 18 V4) but geometry is locked.
- **HeroDataTicker substrate** — top-right with current opacities (0.18 amber / 0.12 UTC / 0.18 instrument-blue). Substrate stacking position (between atmosphere and content) is locked per K9.
- **Logo SHA** — `Dp-logo1.png` `ed31936ca7a0f13a20170f68a6faad27b06afe30a4f4d2a825480def9e78bc2f`. Mascot file at `public/Dp-logo1.png` unchanged.

### Architecture + Behavior

- **Phase 19 supersedure (repo-owner authorized 2026-04-30):** Lenis smooth-scroll RE-INTRODUCED with proper GSAP ScrollTrigger bridge. Mounted via `SmoothScrollProvider` in marketing layout. Bridge contract: lenis ticker drives gsap.ticker; ScrollTrigger.update fires on every lenis scroll event; anchor-link clicks (`a[href^="#"]`) intercepted globally and routed through `lenis.scrollTo` so hash navigation lands precisely. `prefers-reduced-motion: reduce` skips Lenis init (native scroll preserved). Bundle cost ~7kb gzipped. Supersedes the Phase 8 "no Lenis" lock.
- Marquee logo strip null-returned (env-gated `NEXT_PUBLIC_MARQUEE_ENABLED`).
- `TestimonialsSection.tsx` returns null.
- `font-display: optional` + size-adjust descriptors preserved on `InstrumentSerifLocal` regular + italic.
- FAQ at `/faq` route with FAQPage JSON-LD schema.
- Process timeline composition (Lead → Scored → Routed → Reported).
- Faizan pull-quote section preserved.
- Cosmo FAB IntersectionObserver footer-aware visibility.
- Phase 12 contact strategy: zero generic email surfaces; ContactPoint URL-based; `<code>hello@</code>` literal in Footer philosophy block is the ONE allowed email-shaped surface (Pillar 4 R7).

### Phase 17b additions

- **V3 italic descender STRUCTURAL fix** — `.hero-em-inner` inline-block child establishes BFC for italic descender clearance; supersedes Pillar 5 R1 parametric padding-block clamp on `.hero-em` (preserved in commit `499d965` for safety-net rollback).
- **V7 Pillar 4 P1.1 carve-out** — `.eyebrow` utility class is muted gray site-wide per V7 (Path 1 carve-out, 2026-04-28). EXCEPTION: `.services-pin-section-eyebrow` retains `var(--accent-bright)` amber per Pillar 4 P1.1 invariant (display-size eyebrow on pure black reads near-invisible in muted gray despite 7.4:1 math contrast — perceptual hierarchy demands amber). All other site-wide `.eyebrow`-class consumers use `var(--text-muted)`.

### Phase 18 atmospheric exception (authorized 2026-04-28; amended Phase 18.5 2026-04-28)

**K17 amended threshold (Phase 18.5, repo-owner authorized):** Amber `#FF8800` may render at ≤30% opacity in hero background atmosphere layer (CSS radial-gradient OR Three.js sphere material). Blue `#2A8FBD` may render at ≤22% opacity in same context. Exception applies ONLY to background layers behind hero content; content surfaces (text, buttons, borders, icons) remain at full Bloomberg Operator palette discipline. Zero violet/indigo/purple anywhere remains absolute (K1 unchanged). K17 violation thresholds updated accordingly.

Currently shipped:
- Phase 18.B (`835c8e9`) initial CSS atmosphere → SUPERSEDED by 18.5.C
- Phase 18.5.C (`5afb9ff`) atmosphere intensity bump:
  `.hero-section` background — 4 stacked radial-gradients:
    L1 amber primary glow @ 12% 22% — 0.28 opacity / 55% falloff
    L2 blue secondary glow @ 88% 78% — 0.20 opacity / 55% falloff
    L3 soft amber center fill @ 50% 50% — 0.06 opacity / 70% falloff
    L4 vignette ellipse 70%×60% — `#1a130a` → `#000` at 80%
  `.hero-section::before` grain — SVG turbulence noise (240×240 tile, baseFrequency 0.85, seed 5), 0.10 layer opacity, mix-blend-mode overlay
- Phase 18.5.D (`612fdf1`) Three.js sphere layer:
  Sphere A radius 380px @ #FF8800, opacity 0.27, emissive 0.05, drift 45s
  Sphere B radius 260px @ #2A8FBD, opacity 0.25, emissive 0.04, drift 38s
  Sphere C radius 200px @ #FF8800, opacity 0.17, emissive 0.03, drift 52s
  All buffered ≤K17 caps (max amber 0.28 < 0.30; max blue 0.20 < 0.22).
- Phase 18.5.E (`6f5f17c`) parallax: scrollY × {0.05, 0.08, 0.03} per sphere, hard-clamped ±24px, passive rAF-throttled, K13 reduced-motion guards (handler-bind + rotation guard inside tick).

### Phase 18 K14 amended (initial-bundle interpretation, Phase 18.5 2026-04-28)

**K14 amended (Phase 18.5, repo-owner authorized Path 1):** "Bundle delta budget ≤95KB gzipped" applies to **initial-page-load bundle delta** only. Lazy-loaded chunks (`next/dynamic` with `{ ssr: false }`) are EXCLUDED from this measurement, since they do not affect initial paint, LCP, or mobile/reduced-motion users by design. Total chunk bytes still tracked in summary deliverable for transparency. **K11 Lighthouse mobile median ≥92 is the authoritative ship-readiness gate** (measured at every gate: D-GATE, E-GATE, G-GATE production).

Currently shipped Three.js chunk: ~520KB raw / ~129KB gzipped. Lazy-loaded only on desktop without reduced-motion, AFTER first paint via `requestIdleCallback`. Initial-page-load delta from Phase 17b baseline: ~+2KB (CSS atmosphere rules + dynamic-import shim only).

### Phase 18 Ambiguity #2 carve-out (authorized 2026-04-28)

**Hero stacking carve-out (Phase 18.B, repo-owner authorized):** The Phase 18 directive locked configuration specified `.hero-section > * { position: relative; z-index: 2 }`. That selector would promote `<HeroDataTicker />` (a `.hero-section` direct child, the substrate between atmosphere and content) above content, regressing the K9 substrate-position invariant. **Carve-out: rule applies to `.hero-section > .hero-grid` only** (the content wrapper). HeroDataTicker keeps default stacking and remains between atmosphere and content.

Phase 18.5.D ships an additional `.hero-section` direct-child element: the `<canvas class="hero-atmosphere-canvas">` (or `<div class="hero-atmosphere-fallback">` for mobile / reduced-motion). These sit at `z-index: 1` (above CSS atmosphere bg + ::before grain at `z-index: 0`, below `.hero-grid` content at `z-index: 2`). HeroDataTicker DOM order is preserved (renders AFTER atmosphere/fallback, BEFORE grid), so it stacks visually between Three.js spheres and content per K9.

---

## Kill Conditions Reference

K1–K10 are project-wide kill conditions per Phase 17b directive Part 3. K9 is specifically critical for the Phase 18 carve-out above. K11–K17 are Three.js-specific and apply only when Phase 18.C/D B2 ship is authorized in a future directive.

## Force Push

Never. Linear-forward `git push` only. Trunk-based working agreement; direct push to `main` is allowlisted in `.claude/settings.local.json` for solo-operator commits. PR review not required. History rewrite NEVER (no `--amend` on pushed commits, no `git push --force`, no rebase of pushed history). No `--no-verify` on commits. `.env` files never committed.

---

## Update protocol

If a new locked invariant gets authorized (Phase 20+ directive, repo-owner approval), append it to the appropriate "Locked Invariants" sub-section. Do NOT spawn a separate `CLAUDE_v2.md` or new handoff file — edit this in place. The proliferation of stale handoff docs is a known failure mode; user diagnosis: *"isi waja se kaam khraaabb hota he."*

If preferences change (banned word added, new workflow rule), update the "Personal working preferences" section above. Don't bury it in locked invariants — preferences are mutable, locked invariants are not.
