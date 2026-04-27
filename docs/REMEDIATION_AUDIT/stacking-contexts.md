# A2 — Stacking-Context Pollution Map

**Generated:** 2026-04-27
**Raw artefact:** `docs/REMEDIATION_AUDIT/raw/stacking-context.txt`

---

## Findings summary

104 stacking-context-related declarations site-wide. Categorization:

| Category | Count | Architectural? | Kill candidate? |
|---|---|---|---|
| `transform:` (animation states / hover lift / GSAP) | ~70 | Yes — animation/UX | No |
| `will-change: transform` (animation hints) | **10** | Mixed | **2 kill candidates** |
| `backdrop-filter: blur(...)` (chat panel only) | 2 | Yes | No |
| `filter: drop-shadow(...) / brightness(...)` | 2 | Yes (`brightness(1.15)` on Cosmo hover, drop-shadow on conversion-layout brand mark) | No |
| `contain: paint` LIVE | **0** | n/a | **NONE — already fixed in Pillar 2A-REFIX** |
| `contain: paint` (in comments documenting prior fix) | 4 | n/a | n/a |
| `clip-path:` | **0** | n/a | n/a |
| `mask:` (mask-image edges only) | 2 | Yes — marquee edge fade | No |
| `isolation: isolate` | **0** | n/a | n/a |
| `mix-blend-mode:` | **0** | n/a | n/a |

---

## CRITICAL FINDING — Pillar 2A-REFIX root-cause fix preserved

The directive's stated concern: "Drop `contain: paint` from any ancestor of `.hero-em` — this has been the root cause of italic descender clipping pattern across six iterations of patches."

**Verification:** `grep -nE 'contain:.*paint' src/app/globals.css` returns **4 hits, all in CSS comments** documenting the Pillar 2A-REFIX fix. Zero live `contain: paint` declarations.

The 4 comment hits:
- `globals.css:466` — `.font-italic-display` block comment referencing Pillar 5 root-cause analysis
- `globals.css:1178, 1181` — `.section-deferred` block comment from Pillar 1 / 2A-REFIX fix
- `globals.css:1312` — `.services-pin-frame` block comment from Pillar 14 / 2A-REFIX fix

**The directive's C3 spec is already satisfied for the italic-descender case.** Pillar 2A-REFIX dropped `contain: paint` from `.section-deferred` and `.services-pin-frame`; both are now `contain: layout style`. Forensics F1.1 (Pillar 5 audit, since reverted but evidence stands) confirmed 0 stacking-context creators in `.hero-em` ancestor chain.

The actual italic descender clip mechanism per Pillar 5 forensics F1.3 was a **bottom-axis padding shortfall**, not a stacking-context issue. Pillar 5 R1 patched the correct axis (then was reverted as part of the broader hero-state recovery). The descender clip will recur on production until R1 is re-shipped via a different commit chain or directive.

---

## `will-change: transform` — 10 occurrences, 2 kill candidates

| File:Line | Selector | Context | Kill? |
|---|---|---|---|
| `globals.css:663` | `.nav-logo-wrap:hover .nav-logo` parent | nav logo hover rotate prep | retain (hover-active) |
| `globals.css:750` | `.cta-primary` | hover lift prep | retain |
| `globals.css:795` | `.word-inner` | hero word-reveal slide prep | retain — used by GSAP |
| `globals.css:869` | hero-ticker animation rule | ticker pulse prep | retain |
| `globals.css:965` | `.cosmo-fab` | hover scale prep | retain |
| `globals.css:976` | `.cosmo-mascot` | breathe animation prep | retain |
| `globals.css:1170` | `.section-deferred` | deferred-section animation hint | **KILL CANDIDATE** — section-level, no per-section animation |
| `globals.css:1225` | `.services-pin-frame` | sticky-pin animation hint | retain (architectural) |
| `globals.css:1429, 1435` | results-page anim targets | results-section reveal | retain |

**2 kill candidates.** Both are over-applied `will-change` on always-mounted elements (anti-pattern: `will-change` should be transient, not permanent). Removing them lifts the GPU layer hint without functional impact — possible micro-improvement to compositor cost.

---

## Other stacking-context creators

- **`backdrop-filter: blur(16px)`** on ChatPanel (2 hits, including `-webkit-` prefix) — required for the chat panel's frosted-glass aesthetic; cannot be removed without visual loss.
- **`filter: drop-shadow(...)`** in `(conversion)/layout.tsx:26` — applied to a brand-mark wrapper on the conversion route; aesthetic, not architectural. Could be replaced with `box-shadow` on a wrapping box (no stacking context). Low priority.
- **`filter: brightness(1.15)`** on `.cosmo-fab:hover .cosmo-mascot` — Cosmo hover state per locked invariant. Retain.

---

## Phase 2 C3 verdict

**C3 is already substantively shipped.** The italic descender clip cause cited in C3 (`contain: paint` in `.hero-em` ancestor chain) was eliminated in Pillar 2A-REFIX commit `e8620d8`. Pillar 5 forensics F1.1 confirmed empirically. The 2 `will-change` kill candidates (`globals.css:1170` + `1225` review) are minor; recommend bundling into a single hygiene commit rather than a dedicated C3 commit.

**The directive's C3 reference to "the root cause of italic descender clipping pattern across six iterations" is incorrect for the current production state.** The actual current italic descender bottom-clip (per Pillar 5 forensics F1.3 Δbottom −3.5 to −4.6 px) is a `padding-block-end` shortfall on `.hero-em`, not a stacking-context issue. Pillar 5 R1 fix (reverted at `6a47aec` as part of broader hero-state recovery) addressed it correctly via `padding-block-end: clamp(0.20em, 0.05lh, 0.34em)`. **Recommend re-shipping Pillar 5 R1 padding fix in isolation as a separate commit** — outside Phase 2 C3 scope, since C3 spec doesn't cover the actual current root cause.
