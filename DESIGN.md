---
name: Digital Point LLC — Design System
description: Bloomberg-Operator dark register — phosphor amber on absolute black, editorial Instrument Serif italic display, Geist Sans body, native scroll, reduced-motion-first.
type: design
---

# DESIGN.md — Digital Point LLC

> Source of truth for design tokens lives in [`src/app/globals.css`](src/app/globals.css)
> under `@theme inline` and `:root`. This document is the human-readable
> companion: what's defined, what's locked, what register decisions have
> already been made.

## Aesthetic register

**Bloomberg Operator on dark.** A trading-terminal seriousness ported into a marketing site. Phosphor amber on absolute black, hairline borders, mono captions, editorial italic display. Not glassmorphism. Not gradient SaaS. Not crypto neon.

Scene sentence (forces dark): *An ops lead glances at this site at 11pm in a dim room while running diligence on whether to outsource a function. They are tired, skeptical, and rewarded by quiet density.*

## Color

### Strategy

**Restrained.** Tinted-near-black surfaces with a single saturated accent (amber) carrying ≤10% of the visible surface. Blue is a secondary semantic, used only on data/AI moments. The Phase 18 hero atmosphere is the one Committed exception: amber + blue washes at low opacity define the hero scene.

### Palette

| Role | Token | Value | Use |
|---|---|---|---|
| Canvas | `--bg-canvas` | `#000000` | Body, hero, default surface |
| Surface | `--bg-secondary` | `#050505` | Cards, elevated regions |
| Surface alt | `--bg-tertiary` | `#030303` | Striped regions, alt-rows |
| Elevated | `--bg-elevated` | `#0A0A0A` | Modals, popovers, top of stack |
| Amber primary | `--accent` / `--accent-primary` | `#FF8800` | CTAs, focus, active state, data accents |
| Amber bright | `--accent-bright` | `#FFA833` | Hover, emphasis, selection |
| Amber deep | `--accent-deep` | `#C26800` | Pressed state, structural shadows |
| Amber glow | `--accent-glow` | `rgba(255,136,0,0.25)` | Atmospheric, focus rings |
| Amber glow soft | `--accent-glow-soft` | `rgba(255,136,0,0.08)` | Subtle wash, hover halos |
| Blue secondary | `--accent-secondary` | `#2A8FBD` | AI/data semantic moments only |
| Ring stroke | `--ring-stroke` | `#3A2D14` | Sub-1% chroma amber for hairlines on amber surfaces |
| CTA text on amber | `--cta-text-on-amber` | `#1A0E00` | Black-tinted text on amber CTA |
| Text primary | `--text-primary` | `#ECECEC` | Body, headings |
| Text secondary | `--text-secondary` | `#A8A8A8` | Lead paragraphs, deemphasized body |
| Text tertiary / muted | `--text-tertiary` / `--text-muted` | `#9A9A9A` | Captions, eyebrows (post-V7 site-wide), meta |
| Text error | `--text-error` | `#F87171` | Form errors, destructive states |
| Border subtle | `--border-subtle` | `rgba(255,255,255,0.06)` | Hairline dividers in dense regions |
| Border default | `--border-default` | `rgba(255,255,255,0.10)` | Card borders, table rules |
| Border bright | `--border-bright` | `rgba(255,136,0,0.30)` | Active, focused, amber-themed |

### Bans

- **Zero violet, indigo, purple anywhere** on content surfaces. The legacy comment in `globals.css` calls the system "purple" — it is documentation rot. The actual values are amber. Do not "fix" the values to match the comment.
- No pure `#000` text or `#fff` text. Use `--text-primary` (`#ECECEC`) and `--cta-text-on-amber` (`#1A0E00`).
- No gradient text. Solid amber for emphasis, weight contrast for hierarchy.
- No glassmorphism by default. Hero atmosphere is the only blur-adjacent effect, and it's a Three.js sphere stack, not a backdrop-filter card.

### Atmospheric exception (locked, Phase 18.5)

Hero background only:
- Amber `#FF8800` ≤ 30% opacity
- Blue `#2A8FBD` ≤ 22% opacity
- Body background also runs a doubled-intensity radial wash (24% amber / 20% blue / 8% center fill) per Phase 18.6 P5 — broad ambient, scrollable (no `background-attachment: fixed` after P7 perf pass).

## Typography

### Families

- **Display:** Instrument Serif (italic for hero em, regular elsewhere). Loaded as `InstrumentSerifLocal` with metric overrides (ascent 95% / descent 22%) and `font-display: optional`. Do not change to `swap` — it brings back the Phase 17b CLS regression.
- **Sans / body:** Geist Sans (via `next/font` `geist` package).
- **Mono:** Geist Mono — used for eyebrows, data labels, ticker readouts.

### Scale (modular, 1.25× base 16px)

| Token | Value | Use |
|---|---|---|
| `--fs-xs` | 12px | Eyebrow, footer meta |
| `--fs-sm` | 14px | Caption, mono labels |
| `--fs-base` | 16px | Body |
| `--fs-md` | 18px | Emphasized body |
| `--fs-lg` | 24px | Long-form body, blockquote |
| `--fs-xl` | 32px | h4, sub-headings |
| `--fs-2xl` | 40px | h3, service row mobile |
| `--fs-3xl` | 48px | Section h2 mobile |
| `--fs-4xl` | 60px | Service row desktop |
| `--fs-5xl` | 72px | Section h2 desktop |
| `--fs-6xl` | 88px | Hero h1 mobile |
| `--fs-7xl` | 120px | Hero h1 desktop |

Fluid clamps:
- `--text-hero` = clamp(88px, 8vw, 120px)
- `--text-h1` = clamp(48px, 5vw, 72px)
- `--text-h2` = clamp(32px, 4.3vw, 69px)
- `--text-h3` = clamp(24px, 3vw, 48px)
- `--text-service-row` = clamp(40px, 4vw, 60px)

### Line-heights

- `--lh-display` 1.02 (hero)
- `--lh-tight` 1.10
- `--lh-snug` 1.25
- `--lh-normal` 1.5
- `--lh-relaxed` 1.65

### Letter-spacing

- `--ls-display` -0.03em
- `--ls-tight` -0.02em (heading default)
- `--ls-normal` 0
- `--ls-mono` 0.15em
- `--ls-mono-wide` 0.20em (eyebrow uppercase)

### Width caps

- `--maxw-heading-display` 44rem (~704px) — hero h1
- `--maxw-heading-section` 36rem (~576px)
- `--maxw-pullquote` 36rem
- `--maxw-body` 42rem (~672px) — body paragraphs cap here, never wider

### Utility classes

| Class | Family | Weight | LH | LS | Notes |
|---|---|---|---|---|---|
| `.font-hero` | Instrument Serif | 400 | 0.92 | -0.02em | Hero h1 only |
| `.font-display` | Geist Sans | 500 | 0.95 | -0.03em | Big sans display |
| `.font-body` | Geist Sans | 400 | 1.5 | -0.01em | Body default |
| `.font-italic-display` | Instrument Serif italic | 400 | 1.32 | (inherit) | `padding-block: 0.12em` for descender clearance — DO NOT remove |
| `.font-mono` | Geist Mono | 400 | (inherit) | 0 | `tnum` enabled |
| `.eyebrow` | inherit | 500 | (inherit) | 0.15em | Color: `--text-muted` site-wide post-V7 |

**Eyebrow carve-out:** `.services-pin-section-eyebrow` retains `--accent-bright` (amber) per Pillar 4 P1.1 invariant. Display-size eyebrow on pure black reads near-invisible in muted gray despite 7.4:1 math contrast.

## Spacing + rhythm

### Fluid spacing scale

- `--space-1` 6→8px
- `--space-2` 10→12px
- `--space-3` 14→16px
- `--space-4` 20→24px
- `--space-5` 28→32px
- `--space-6` 32→40px
- `--space-7` 36→48px
- `--space-8` 40→64px

### Section rhythm

- `--section-sm` 48→80px
- `--section-main` 64→112px
- `--section-lg` 88→160px
- `--section-top` 112→224px
- `--section-space` clamp(100px, 12.5vh, 174px) — Divyansh-port primary rhythm
- `--section-space-tight` clamp(64px, 8vh, 96px)

### Container

- `--site-margin` 16→48px
- `--container-gutter` 24→64px
- `.container-wide` and `.container-narrow` primitives in globals.css

Vary spacing for rhythm — same padding everywhere is monotony. Hero is breathing room (`--section-top`); FAQ is dense (`--section-sm`).

## Elevation + borders

- Cards: `--bg-secondary` (`#050505`) with 1px `--border-default`. No shadows. Use `--bg-elevated` (`#0A0A0A`) only for popovers/modals/dropdowns.
- Hairlines: 1px `--border-subtle` for dense rows. `.divide-hairline > * + *` utility for vertical lists.
- Active state: 1px `--border-bright` (amber 30%) plus optional `--accent-glow` halo.

### Bans

- **No side-stripe borders** (`border-left` / `border-right` >1px as accent). Locked invariant.
- **No nested cards.** A card inside a card is always wrong.
- **No drop shadows** as the primary depth signal. Depth comes from surface tint differential, not blur.

## Motion

### Tokens

- `--ease-brand` cubic-bezier(0.65, 0.05, 0, 1) — signature ease, locked
- `--ease-out-soft` cubic-bezier(0.33, 1, 0.68, 1)
- `--ease-in-soft` cubic-bezier(0.32, 0, 0.67, 0)
- `--dur-micro` 100ms
- `--dur-short` 200ms
- `--dur-medium` 350ms
- `--dur-long` 600ms
- `--dur-hero` 800ms

### Rules

- Ease out with exponential curves only (out-quart / out-quint / out-expo or `--ease-out-soft`). No bounce, no elastic.
- Never animate CSS layout properties. Compose with `transform` and `opacity`.
- Every motion has a `prefers-reduced-motion` killswitch:
  - AutomationOrbit 90s rotation: paused.
  - Hero atmosphere parallax: handler unbound, no rAF tick.
  - HeroDataTicker: ticker frozen, opacities preserved.
  - Three.js sphere drift: not loaded at all (chunk gated by reduced-motion check).
- Scroll-reveal safety net: `ScrollMotion.tsx` 2.5s fallback observes `[data-reveal]`, `[data-stagger-item]`, `[data-service-item]`, `[data-work-card]`, `[data-testimonial-card]`, `[data-pillar-card]`, `[data-workflow-label]`, `[data-word-reveal]`, `[data-letter-reveal]`. Add new reveal selectors to that list when introducing them.

## Components — primitives in use

Defined in `globals.css` and reused across sections:

- `.card-flat` — flat surface card (no shadow, hairline border)
- `.divide-hairline` — vertical hairline rules
- `.container-wide` / `.container-narrow` — gutter-aware containers
- `.section-main` / `.section-sm` / `.section-lg` / `.section-top` — section rhythm wrappers
- `.eyebrow` — uppercase mono kicker (muted gray, V7 site-wide)
- `.focus-ring` — accessible focus visual (amber)
- `[data-slot="button"]` — Tailwind transition override; do not remove

shadcn/ui primitives live in `src/components/ui/`. DPL-specific overrides in `src/components/ui-dp/`.

## Section kit (composed)

Located in `src/components/sections/` and `src/components/hero/`:

- **Hero:** `HeroSection` orchestrates `HeroAtmosphere` (Three.js, lazy + reduced-motion gated) → `HeroAtmosphereFallback` (CSS gradient stack) → `HeroDataTicker` (substrate) → `HeroHeadline` → `HeroCTA` → `HeroTrustStrip` → `AutomationOrbit` (Palette D geometry, locked).
- **Services:** `ServicesListSection` or `ServicesPinReveal` (5 pillars, locked order).
- **Process:** `ProcessSection` (Lead → Scored → Routed → Reported, locked composition).
- **Pillars:** `PillarsSection`.
- **Proof:** `CaseStudiesPreview`, `ProofSection`, `StatStripSection`, `ProofBar`, `TrustStrip`.
- **Story:** `PullQuoteSection` (Faizan, preserved), `FounderSection`.
- **Conversion:** `CTASection`, `FounderFormSection`, `AuditPage`.
- **Misc:** `FAQSection` (canonical at `/faq`), `LogoStripSection` (env-gated null), `TestimonialsSection` (returns null).

## What's banned (locked)

- Side-stripe borders (any `border-left` / `border-right` >1px as a colored accent).
- Gradient text (`background-clip: text` over a gradient).
- Glassmorphism as default.
- The hero-metric template (big number + small label + supporting stats).
- Identical card grids (same-sized cards, icon + heading + text, repeated).
- Modal as first thought.
- Em dashes (use commas/colons/semicolons/parentheses).
- Generic email surfaces (mailto, info@, contact email in headers). Single allowed surface: literal `<code>hello@</code>` token in footer philosophy block.
- Lenis or any scroll-jacking library. Native scroll only.

## Where to look

- Tokens (truth): [`src/app/globals.css`](src/app/globals.css) — `@theme inline` + `:root` blocks.
- Tailwind shim: [`tailwind.config.ts`](tailwind.config.ts) (content glob + plugin only).
- Locked invariants: [`CLAUDE.md`](CLAUDE.md).
- Phase audit history: [`docs/PHASE_*`](docs/).
- Component inventory: [`src/components/`](src/components/).
