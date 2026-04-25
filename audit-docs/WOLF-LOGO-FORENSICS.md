# Wolf Logo Forensics — Phase 4 comprehensive

User reports: "wolf logo missing entirely (was supposed to be in navbar AND footer)."

## Verdict

**The wolf logo IS mounted, but it is 36 px wide in the navbar and 40 px wide in the footer — so small that it reads as a favicon, not the brand mascot.** The user's perception of "missing" is correct in impact if not in literal fact.

## Asset forensics

```
public/
├── Dp-logo1.png                     (324 KB — THE brand logo asset)
├── apple-touch-icon.png
├── favicon-16.png
├── favicon-32.png
├── favicon.ico
└── favicon.png
```

Single logo asset at `/public/Dp-logo1.png`. No separate wolf-mascot SVG or PNG exists. The "wolf" the user is referring to is either (a) the design inside `Dp-logo1.png` itself (a wolf mascot rendered at whatever resolution the source file holds — unknown from audit, would need to open it in an image viewer) or (b) a NEW wolf asset that was never delivered to the repo but was assumed to exist.

## Import locations

```
src/app/layout.tsx:131
  logo: "https://www.digitalpointllc.com/Dp-logo1.png"
  (JSON-LD schema only — not rendered)

src/app/(conversion)/layout.tsx:18
  <Image src="/Dp-logo1.png" ... width={44} height={44} />
  (free-growth-audit / conversion page layout — not the marketing shell)

src/components/layout/Footer.tsx:30
  <Image src="/Dp-logo1.png" ... width={40} height={40} style={{ width: '40px' }} />
  (footer logo — marketing shell)

src/components/layout/Navigation.tsx:79
  <Image src="/Dp-logo1.png" ... width={40} height={40} style={{ width: '36px' }} />
  (nav logo — marketing shell)

src/components/seo/FAQSchema.tsx:65
  url: 'https://www.digitalpointllc.com/Dp-logo1.png'
  (JSON-LD only — not rendered)
```

## Rendered sizes (from live DOM probe)

| Location | Rendered dimensions | Source |
| --- | --- | --- |
| Navigation | **36 × 38.25 px** | Next `<Image src="/Dp-logo1.png" width={40} height={40} style={{width:'36px',height:'auto'}} />` |
| Footer | **40 × 42.5 px** | Next `<Image src="/Dp-logo1.png" width={40} height={40} style={{width:'40px',height:'auto'}} />` |

The logo renders at the top-left of the navbar (next to "Digital Point" text) and top-left of the footer. In `desktop-01-hero.png` you can clearly see the small circular logo beside "Digital Point · LLC · SINCE 2017" at the top-left corner. The footer crop (`desktop-11-footer.png`) is an actual footer capture — check whether the logo is visible there.

## Image dimensions

`public/Dp-logo1.png` is 324 KB — for a 40×40 px render that's ~200× overkill. The source is likely a large high-resolution wolf illustration that's being shrunk to favicon dimensions.

## Why the user reads "missing"

- 36 px wide on a 1440 px viewport is **2.5 %** of horizontal width. At normal viewing distance, that's below visual threshold for recognizing mascot detail. If the wolf image has any intricate features (fur texture, eyes, stance), none resolve at 36 px.
- No padding / container treatment — it sits flush against the text, so the mascot isn't framed or given breathing room.
- The footer size (40 px) is slightly larger but still favicon-scale.
- The Divyansh reference has no mascot at all — so the user's expectation may be closer to a proper **brand mark** (60–80 px tall in nav, 80–120 px tall as a footer signature) rather than a tiny inline icon.

## Phase 4 deviation

None. Phase 4 never specified a logo size change — the 36/40 px renders are inherited from Phase 2/3a. Phase 4h added the `.nav-logo` tilt-on-hover class, which confirms the nav logo is CLASS-wrapped correctly.

## Recommended fix options

1. **Scale up.** Change nav logo to `width={64}` + `style={{ width: '48px' }}` and footer to `width={96}` + `style={{ width: '64px' }}`. Uses existing asset. One-file change each. Recovers brand presence without affecting layout significantly.
2. **Add dedicated wolf SVG.** If the brand identity actually includes a wolf-specific mark distinct from `Dp-logo1.png`, that asset needs to be delivered (not in the repo today). Create `public/wolf-mark.svg` (hand-coded or from brand assets) and swap the `src` prop.
3. **Give the logo room.** Wrap in a container with `padding-left: var(--space-2)` and a thin vertical `border-right: 1px solid var(--border-subtle)` separator. Frames the mark as an intentional brand signature.
4. **Full re-audit.** Open `public/Dp-logo1.png` in a viewer and confirm whether the image ACTUALLY shows a wolf or just shows "DP" initials / a generic mark. If it's not actually a wolf, the user's expectation diverges from the existing asset — they may want a new wolf mascot commissioned/designed.

## Summary

- Asset: present at `/public/Dp-logo1.png` (324 KB PNG).
- Nav mount: present at `src/components/layout/Navigation.tsx:79`, renders 36×38 px.
- Footer mount: present at `src/components/layout/Footer.tsx:30`, renders 40×42 px.
- User's "missing entirely" claim is **perception accurate, fact imprecise**: the logo is in the DOM but at a size too small to register as a brand mascot.
- Phase 4 did not regress this — it's the same rendering code as Phase 3a. Phase 4h's `.nav-logo` tilt was added to the existing element.
