# Color Audit — Phase 4 comprehensive

## Root palette validation

```
--accent           #6366f1  ✓ per spec
--accent-bright    #818cf8  ✓ per spec
--accent-deep      #4f46e5  ✓ per spec
--bg-primary       #0d0d0d  ✓ per spec
--text-primary     #f5f5f7  ✓ per spec
body bg (computed) rgb(13, 13, 13)  ✓
body color         rgb(245, 245, 247)  ✓
```

## Amber / gold residue in source

```bash
grep -rniE "#F59E0B|#FBBF24|#D97706|#B45309|#fbbf24" src/ --include='*.{tsx,ts,css}'
```

Result: **0 matches** (excluding the self-documenting comment in `globals.css` that describes the retirement).

All Phase 4a sed swaps held. No amber residue in the delivered code.

## Violet / indigo Tailwind class leaks

```bash
grep -rniE "\b(violet|indigo)\b" src/ --include='*.{tsx,ts,css}'
```

Result: **0 matches** (excluding the `/* amber or indigo */` reference in globals.css docblock).

Phase 1 grep-gate exemption (SystemsReportingPage.tsx `bg-violet/10` + `text-violet`) was closed in Phase 4a via sed swap to `bg-[color:var(--accent-glow-soft)]` + `text-[color:var(--accent)]`. Holds.

## Brand purple consistency

Every accent surface sampled from the homepage probes resolves to one of the three purple tokens:

- CTA primary background: `rgb(99, 102, 241)` → `--accent` ✓
- Hero italic accent (if it were not destroyed by the word-split collision): specified `var(--accent-bright)` = #818cf8 ✓
- Metric chips in testimonials: `var(--accent-bright)` ✓
- Pull quote attribution underline-tone (unused): would be `--accent` ✓
- Workflow connector stroke: `var(--accent)` ✓
- Workflow node dot: `var(--accent-bright)` ✓
- Recent Work dashboard viz line: `var(--accent)` ✓
- Recent Work big stat: `var(--accent-bright)` ✓

No off-brand purples. Zero leaked "grape" or "fuchsia" or Tailwind default violet (which is #8b5cf6, different from #6366f1).

## Section background variance

| Section | Token | Hex |
| --- | --- | --- |
| Hero | `--bg-primary` | #0D0D0D |
| Services | `--bg-secondary` | #111114 |
| Logo strip | `--bg-tertiary` | #0A0A0B |
| Recent Work | `--bg-primary` | #0D0D0D |
| Pull quote | `--bg-tertiary` | #0A0A0B |
| Workflow | `--bg-primary` | #0D0D0D |
| Testimonials | `--bg-secondary` | #111114 |
| CTA | `--bg-tertiary` | #0A0A0B |

Section backgrounds hit all three tones as specified. The variance is SUBTLE — between #0A0A0B and #0D0D0D the delta is 3 hex values = ~1.5% brightness. On a well-calibrated monitor it reads as a breath; on a dimmer monitor or in bright ambient light, the variance is near-invisible.

The user perceived this as "flat" most likely because the between-section borders (`border-bottom: 1px solid var(--border-subtle)` = 6% white alpha) are also very faint. Together, the cumulative effect is "one dark page" rather than distinct stacked sections. Divyansh himself uses a warmer ivory light-mode palette, so his section breath is created by different mechanisms (cream tones + type size shifts).

Options if the user wants more variance:
- Widen the spread: `--bg-primary: #0D0D0D`, `--bg-secondary: #16161A`, `--bg-tertiary: #050507` — doubles the contrast.
- Use `--border-default` (10% white) instead of `--border-subtle` (6%) for between-section seams.
- Add a thin horizontal accent line in `--border-bright` (30% purple) between hero and services only (as a brand signature moment).

## Ambient glows

| Placement | Intensity | Readable? |
| --- | --- | --- |
| Hero bottom-right | `radial-gradient(ellipse 70% 55% at 85% 90%, var(--accent-glow-soft), transparent 60%)` (8% alpha) | Subtle; presence felt |
| Pull quote center | `radial-gradient(ellipse 50% 40% at 50% 50%, var(--accent-glow-soft), transparent 70%)` | Visible in screenshot |
| CTA center | `radial-gradient(ellipse 65% 55% at 50% 55%, var(--accent-glow), transparent 70%)` (25% alpha) | Prominent, works |
| Testimonial section | None | Flat |
| Workflow | None | Flat |

CTA glow is the strongest (25% alpha) and reads clearly. Pull quote + hero are softer. Testimonials and workflow have none — those sections lean on `bg-secondary` / `bg-primary` surface shift alone.

## Cursor bloom

`var(--accent-glow-soft)` (8% alpha) × `mix-blend-mode: screen` × `opacity: 0.5`. Net: ~4% opacity purple wash following cursor. Near-invisible on dark section backgrounds. This matches the "subtle premium" design intent but is so subtle most users won't notice it exists.

## Grain overlay

`mix-blend-mode: overlay; opacity: 0.035` (3.5%). Present. Barely perceptible without zooming in. Adds texture in theory; in practice below visual threshold at normal viewing distance.

## Wolf logo purple drop-shadow (conversion layout only)

In `(conversion)/layout.tsx`:
```tsx
filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5)) drop-shadow(0 8px 16px rgba(99,102,241,0.3))',
```

Uses `rgba(99, 102, 241)` = purple. ✓ on brand. (Was amber `rgba(217, 119, 6)` pre-Phase-4a; got sed-swapped during Phase 4a rgba sweep.)

## Destructive color (error states)

`--color-destructive: #DC2626` — red, unchanged from Phase 0. Used in form error states. Not a brand color; kept for accessibility / convention. No issue.

## Summary

- ✅ No amber residue
- ✅ No violet/indigo Tailwind class leaks
- ✅ All accent surfaces resolve to the three-purple system cleanly
- ⚠️ Section bg variance technically present but subtle — user reading as "flat" is a perception issue the spec invited (3-hex-value deltas are intentionally quiet)
- ⚠️ Cursor bloom + grain overlay both present but deliberately imperceptible at spec opacities

Color system is clean. The "feels unpolished" perception is more typography + hero overflow than color.
