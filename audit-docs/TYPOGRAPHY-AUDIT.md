# Typography Audit — Phase 4 comprehensive

Computed styles captured from a real render at desktop 1440×900 (local standalone prod build of commit `5e2970c`). Raw JSON at `audit-docs/_probe-typography.json`.

## Headline findings

### 🔴 CRITICAL — Geist Sans is NOT loading

Every sans-serif element on the homepage falls back to Tailwind v4's default `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` stack. The `GeistSans.variable` class IS added to `<body>` (sets `--font-geist-sans: "Geist Sans"`), but body font-family never resolves to it.

Evidence (computed `font-family` per element):

| Element | Expected | Actually renders as |
| --- | --- | --- |
| body | `Geist Sans, ...` | **`ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji"…`** |
| hero eyebrow | `Geist Mono` | **`ui-sans-serif, system-ui, sans-serif, …`** |
| hero sub | `Geist Sans` | **`ui-sans-serif, system-ui, sans-serif, …`** |
| hero CTA primary | `Geist Sans 500` | **`ui-sans-serif, system-ui, sans-serif, …`** |
| hero CTA ghost | `Geist Sans 500` | **`ui-sans-serif, system-ui, sans-serif, …`** |
| services index | `Geist Mono` | **`ui-sans-serif, system-ui, sans-serif, …`** |
| logo strip mark | `Geist Mono` | **`ui-sans-serif, system-ui, sans-serif, …`** |
| pull quote attrib | `Geist Mono` | **`ui-sans-serif, system-ui, sans-serif, …`** |
| CTA body | `Geist Sans` | **`ui-sans-serif, system-ui, sans-serif, …`** |

The Instrument Serif display face DOES load (hero h1, all h2 / h3, pull quote, testimonial quote, avatar initial all render Instrument Serif per probe). So next/font is working — the issue is specific to the Geist integration.

**Root cause hypothesis.** Tailwind v4's preflight includes `html { font-family: var(--default-font-family) }` using the theme's generated default. My `@layer base body { font-family: var(--font-geist-sans), ... }` rule should override that, but something in the specificity chain (possibly `.antialiased` utility from Tailwind or a cascade-layer ordering issue between `@import "tailwindcss"` + `@layer base`) is winning at the body selector level. Visual result: everything that isn't `.font-hero` / `.font-italic-display` / `h1..h6` (which use `var(--font-instrument-serif)`) falls to system sans.

**User-visible consequence:** headline (Instrument Serif) + body (system sans) pairing — but the pair is Instrument Serif + macOS system sans, NOT the specified Instrument Serif + Geist. System sans is visually close enough to "generic sans" that it reads OK but the Divyansh-style "geometric Grotesk body" — specifically the tighter tracking + shorter x-height of Geist Sans — is missing.

### 🔴 CRITICAL — hero h1 overflows the viewport

| Metric | Value |
| --- | --- |
| hero h1 rendered font-size | **156.96px** (`--text-hero` clamp resolves to 10.9vw at 1440 viewport = 156.96) |
| hero h1 line-height | 144.4px |
| hero h1 container width | 728px (left column of 1.4fr/1fr grid) |
| hero h1 total rendered height | **578px** (wraps to ~4–5 lines) |
| hero section min-height | 900px (100dvh) |
| hero padding-top | 224px (`--section-top`) |
| hero padding-bottom | 112px (`--section-main`) |
| content box height | 900 − 224 − 112 = **564px** |
| h1 alone needs | **578px** |

The h1 is 14px taller than the flex-centered content box. When flex centers the content vertically, the top of the h1 renders at `y = -136` (above the viewport fold). That's what the screenshot shows: `desktop-01-hero.png` reads "Meetthe / workforceyou / don't have to / hire." — the first line is pushed above the visible area on initial load.

**The token `--text-hero: clamp(4.7rem, 10.9vw, 10.9rem)` is too large for a 1.4fr split-layout container.** Either the hero should be full-width (1-col) so the h1 gets the full container width and wraps to fewer lines, or the token should be scaled back (e.g. `--text-hero: clamp(3.5rem, 8vw, 8rem)` → 115px max at 1440 = 3 lines on 728px = ~432px total, fits the 564px box).

### 🔴 CRITICAL — word-split collision corrupts hero headline

`ScrollMotion.tsx` (mounted in `(marketing)/layout.tsx`) still runs the Phase 2/3a hero word-split:

```ts
const headline = document.querySelector('[data-hero-headline]');
if (headline && !headline.dataset.split) {
  const text = headline.textContent ?? '';  // <- flattens all children to string
  headline.textContent = '';                 // <- wipes the DOM
  const parts = text.split(' ');
  parts.forEach(...createElement('span')...);
}
```

`HeroSection.tsx` (Phase 4c) renders the h1 with nested `<em class="font-italic-display" style={color:accent-bright,italic}>the workforce</em>` for accent + a `<span class="word"><span class="word-inner" data-word-reveal>{word}</span></span>` structure per word.

Both run on mount. ScrollMotion's `.textContent = ''` wins and **destroys**:
1. The italic `<em>` accent on "the workforce"
2. The purple `--accent-bright` color on those two words
3. All `data-word-reveal` attributes (probe returns count = 0)
4. The `.word-inner` overflow-hidden wrappers

HeroSection's GSAP timeline then targets `[data-hero-headline] .word-inner` — **zero elements** because ScrollMotion rebuilt plain `<span>`s. The word cascade never fires. The eyebrow/sub/CTA stagger still fires against their own selectors.

Net visible result (from `desktop-01-hero.png`): white Instrument Serif headline, NO italic accent, NO purple color on "the workforce", NO word-by-word cascade. The headline ALSO shows the old Phase 2 spacing bug leaking through: "Meetthe workforceyou don't have to hire" — words colliding because ScrollMotion's split inserts inline-blocks with `span.textContent = w + ' '` and the trailing whitespace in an inline-block span collapses at layout time. The Phase 3a fix (text-node spaces between spans) was IN the React-rendered structure, which ScrollMotion wiped. So we hit the legacy bug plus the new bug at once.

---

## Scale + rhythm findings

| Element | Font-size | Line-height | Letter-spacing | Font | Notes |
| --- | --- | --- | --- | --- | --- |
| hero h1 | 156.96 | 144.4 (0.92) | -3.14 | Instrument Serif | Oversized for container — see above |
| services h2 | 79.2 | 75.24 (0.95) | -1.58 | Instrument Serif | Correct — `--text-h1` |
| services row name | 79.2 | 79.2 (1.0) | -1.58 | Instrument Serif | **Same size as section h2 — Divyansh rows are VISIBLY LARGER than section h2.** Hierarchy is flat. |
| recent-work h2 | 61.92 | 61.92 | -1.24 | Instrument Serif | `--text-h2` |
| recent-work card title | 43.2 | 45.36 (1.05) | -0.86 | Instrument Serif | clamp for `--text-h4` at 1440 |
| pull quote text | 79.2 | 87.1 (1.1) | -1.58 | Instrument Serif | Using `--text-h1`. Prompt implied hero-scale; this is half-size. |
| workflow h2 | 61.92 | 61.92 | -1.24 | Instrument Serif | Consistent |
| workflow label h3 | 30 | 27.6 (0.92) | -0.3 | Instrument Serif | ~h5 size |
| testimonials h2 | 61.92 | 61.92 | -1.24 | Instrument Serif | Consistent |
| testimonial quote | 40 | 46 (1.15) | -0.4 | Instrument Serif | `--text-h4` featured card; standard cards use 17px body |
| CTA headline | 79.2 | 83.16 (1.05) | -1.58 | Instrument Serif | `--text-h1`, italic |
| CTA body | 17 | 26.35 (1.55) | -0.17 | **system sans (not Geist)** | |
| body default | 16 | 24 | normal | **system sans (not Geist)** | |
| eyebrows (hero, sections) | 12 | 18 (1.5) | 1.44 | **system sans (not Geist Mono)** | Tracking is correct at 0.12em. Weight looks fine. |
| logo strip mark | 14 | 21 | 2.1 | **system sans (not Geist Mono)** | |

### Sizing observations

- Section `h2` tokens (`--text-h2` = 61.92px at 1440) are consistent across Recent Work, Workflow, Testimonials ✓.
- Services h2 + Pull Quote text + CTA headline all use `--text-h1` = 79.2px. Consistent.
- **Service row names SHOULD be larger than the section header** per Divyansh's "massive editorial list" pattern, but both render at 79.2px. No visible hierarchy.
- Hero h1 at 157px dwarfs every other display element on the page. Divyansh's hero is only 120px. Our hero is +30% oversized at max clamp.
- Workflow labels at 30px feel small next to 62px section header (2× ratio is correct, but visual weight is thin).

### Font hierarchy summary

Size scale actually rendered:
```
157 — hero h1        (oversized)
 79 — services h2, services row, pull quote, CTA          (collision — ≥3 different elements same size)
 62 — recent-work h2, workflow h2, testimonials h2         (correct)
 43 — recent-work card title
 40 — testimonial quote (featured)
 30 — workflow label
 17 — hero sub, CTA body
 16 — body default
 14 — logo strip
 12 — eyebrow, workflow label, service index
```

Four different sizes cluster at 79 / 62 — ambiguity between "section h1" and "section h2". Divyansh's scale has clearer gaps (120 hero / 90 h2 / 48 body-large / 18 body). Our scale is correct in ratio but the flatness at 79/62 plus the 157 hero outlier plus the missing Geist body creates the "sizes look inconsistent" perception the user flagged.

---

## Actionable fix priorities

1. **Fix Geist loading.** Add explicit font-family override higher in cascade — either set `--default-font-family: var(--font-geist-sans)` in `@theme inline`, or apply `font-sans` utility to `<body>` (generates a class-level rule), or move the `@layer base body` rule into a non-layered block so it outranks preflight. One-line CSS change, recovers every sans element to Geist in one pass.
2. **Shrink `--text-hero`.** Either to `clamp(3.5rem, 8vw, 8rem)` (115px max) OR widen the hero to a 1-column centered layout so the full 1440px grid is available for the h1.
3. **Stop the ScrollMotion word-split on the hero.** The HeroSection now owns the word-split + reveal. Remove the Phase 2/3a hero-split block from ScrollMotion.tsx. This restores the italic accent + purple color on "the workforce" and the word-by-word cascade.
4. **Bump service row names above section h2.** Options: use `--text-hero` clamp scaled-down OR keep the rows at `--text-h1` but drop the services h2 to `--text-h2` / `--text-h3`. Current equal sizes read as "two titles, no section."
