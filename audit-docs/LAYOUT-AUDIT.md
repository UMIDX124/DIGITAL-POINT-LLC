# Layout Audit — Phase 4 comprehensive

## Critical layout bugs

### 🔴 Hero overflows the viewport on desktop 1440×900

Detailed in TYPOGRAPHY-AUDIT.md §"hero h1 overflows":

- Hero is `min-height: 100dvh` (900px), padding-top 224px + padding-bottom 112px → content box 564px.
- H1 at `--text-hero` (157px @ 1440) wraps on 728px container column to ~4–5 lines → 578px tall.
- H1 alone needs MORE vertical space than the flex-centered content box.
- Result: h1 starts at `y = -136` — first line above the fold on page load.

Visible in `desktop-01-hero.png` — headline reads "Meetthe / workforceyou / don't have to / hire." with top line clipped and sub copy + CTAs pushed below the fold.

### 🔴 Container width inconsistency between sections

Different sections use different container primitives:

| Section | Container | Max-width |
| --- | --- | --- |
| Hero | `div.mx-auto.w-full.max-w-[90rem]` inline | 1440 px |
| Services | `.container-wide` | 80rem = 1280 px |
| Logo strip | `.container-wide` | 1280 px |
| Recent Work | `.container-wide` | 1280 px |
| Pull quote | `.container-narrow` | 64rem = 1024 px |
| Workflow | `.container-wide` | 1280 px |
| Testimonials | `.container-wide` | 1280 px |
| CTA | `.container-narrow` | 1024 px |
| Footer | `.container-wide` | 1280 px |

Hero uses `max-w-[90rem]` (1440px) INLINE — breaks from the `.container-wide` (1280px) pattern used by every other wide section. At 1440 viewport this is a 160px width delta vs other sections. Visually: hero content reaches further to each edge than services/work/testimonials — which read as "narrower" by contrast.

Recommend: either swap hero to `.container-wide` for consistency, OR promote every wide section to 1440px max.

## Section spacing rhythm

Using the `--section-space` (100 → 174 px) clamp for section padding top + bottom:

| Section | Top pad | Bottom pad | Notes |
| --- | --- | --- | --- |
| Hero | `--section-top` (224 px) | `--section-main` (112 px) | Correct for hero |
| Services | `--section-space` (174 px) | `--section-space` (174 px) | Correct |
| Logo strip | `--section-space-tight` (96 px) | `--section-space-tight` | Correct — tight rhythm between work + strip |
| Recent Work | `--section-space` (174 px) | `--section-space` (174 px) | Correct |
| Pull quote | `--section-space` (174 px) | `--section-space` (174 px) | Correct |
| Workflow | `--section-space` (174 px) | `--section-space` (174 px) | Correct |
| Testimonials | `--section-space` (174 px) | `--section-space` (174 px) | Correct |
| CTA | `--section-space` (174 px) | `--section-space` (174 px) | Correct |

Section padding is consistent. Spacing rhythm reads coherently.

## Mobile-specific findings

From `mobile-01-hero.png` + `mobile-02-services.png` + `mobile-fullpage.png`:

- Hero collapses to 1-column — h1 + eyebrow + sub + CTAs stack, orb below. Expected.
- Orb at 22vh on mobile (176 px). Reasonable size.
- Services list rows maintain grid — index / name / arrow. Arrow hidden below `md:` per design.
- Logo strip wraps to 2 rows at mobile width. Fine.
- Recent Work cards stack vertically. Expected.
- Pull quote wraps — 16ch max-width + clamp keeps it proportional.
- Workflow switches to vertical `<ol>`. Expected.
- Testimonials stack. Expected.

No mobile layout crashes.

## Grid alignment

Recent Work 7/5 asymmetric: desktop renders as 7-col featured (815 px wide) + 5-col split with two 591 px-tall cards. Symmetrical within the split. ✓

Testimonials 7/5: same layout. Marcus Thompson card (middle-right position) renders fully at 287 px tall — no truncation (addresses a Phase 2 bug). ✓

## Asymmetry opportunities not taken

Divyansh's homepage features deliberate asymmetry in section layouts (hero uses a 60/40 with large image tile, recent work uses a non-grid vertical scroll, testimonials are masonry). We use:
- Hero 60/40 split ✓
- Services list centered full-width ✓ (was never meant to be asymmetric)
- Recent Work 7/5 asymmetric ✓
- Workflow horizontal linear — symmetric
- Testimonials 7/5 asymmetric ✓

Overall asymmetry lift aligns with spec.

## Summary

- **1 critical layout bug:** hero h1 overflows the 100dvh flex-centered content box at 1440×900. Fix in TYPOGRAPHY-AUDIT.
- **1 inconsistency:** hero container is 1440px max-w while every other section is 1280px. Visible drift.
- Section spacing rhythm coherent and correct.
- Mobile collapse clean across all 8 sections.
- Grid asymmetry aligns with Divyansh's pattern (hero + work + testimonials all asymmetric).
