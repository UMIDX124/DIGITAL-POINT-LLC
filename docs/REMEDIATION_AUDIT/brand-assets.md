# A5 — Brand Asset Integrity Audit

**Generated:** 2026-04-27
**Raw artefacts:** `docs/REMEDIATION_AUDIT/raw/{logo-assets,logo-references,dp-logo1-metadata,dp-logo1-sha}.txt`

---

## Locked invariant verification

| Property | Expected | Actual | Verdict |
|---|---|---|---|
| `public/Dp-logo1.png` SHA256 | `589f799b69d277e08ab1011faf7a80fd8cf4143ac610e3b1282f8b24d2195600` | `589f799b69d277e08ab1011faf7a80fd8cf4143ac610e3b1282f8b24d2195600` | ✓ **MATCH** |
| File metadata | PNG, RGBA | `PNG image data, 510 x 543, 8-bit/color RGBA, non-interlaced` | ✓ |
| File size | 329042 bytes | 329042 bytes | ✓ |
| Last modified | n/a | 2026-04-23 16:20 | unchanged since pre-Phase 17a baseline |

**Logo asset locked invariant intact.**

---

## Public asset inventory (`public/` filtered for logo/mascot/dp)

```
-rw-r--r--@ 1 laptopchoice staff 329042 Apr 23 16:20 Dp-logo1.png
```

**Single canonical mascot file.** Past Phase 17a-2 work created experimental `dp-mascot.{png,svg}` variants which were fully reverted; per Pillar 2D scope the favicons (`favicon-16/32/48/180.png`, `apple-touch-icon.png`, `icon-192/512.png`, `favicon.ico`) were re-derived from `Dp-logo1.png` via sharp alpha-stencil pipeline at amber-on-black. Those favicons are present but were generated downstream from this single canonical PNG.

**Legacy violet cartoon mascot:** zero references in source. Past phases that explored color variants (Phase 17a-2 Canva manual recolor, Phase 17a-3 Cosmo theming) all reverted. Current source uses `/Dp-logo1.png` as the sole mascot reference.

---

## Production-active logo references (5)

| File:Line | Use | Notes |
|---|---|---|
| `src/app/(conversion)/layout.tsx:18` | `<Image src="/Dp-logo1.png" ...>` | Conversion route brand mark |
| `src/components/layout/Footer.tsx:35` | `<Image src="/Dp-logo1.png" ...>` | Footer brand block |
| `src/components/chat/ChatTrigger.tsx:96` | `<Image src="/Dp-logo1.png" ...>` | Cosmo FAB mascot |
| `src/components/layout/Navigation.tsx:80` | `<Image src="/Dp-logo1.png" ...>` | Top-nav brand mark |
| `src/components/chat/ChatTrigger.tsx:15` | comment reference | `* The mini button embeds /Dp-logo1.png (mascot). Idle 'breathe' (4s)` |

**Schema.org references** (additional 3, in `src/app/layout.tsx` and `src/components/seo/FAQSchema.tsx`):
- `layout.tsx:124` — Organization JSON-LD `logo: "https://www.digitalpointllc.com/Dp-logo1.png"`
- Plus FAQ schema logo field

**Production HTML grep (post-revert state):** 12 `Dp-logo1.png` hits per recent verification. Logo wired correctly across all 4 user-facing surfaces + 2 schema.org structured-data fields.

---

## C-spec mapping

The directive does not include a C-item for logo asset work — locked invariant. **A5 is verification-only**, no remediation required. The audit confirms the SHA + file integrity + reference correctness; no further action.

If Phase 4 mascot vectorization (queued Phase 18) eventually ships, the SVG variant would JOIN the PNG (not replace) — schema.org logo URLs typically prefer raster, browser favicons prefer raster, only nav/footer mounts can swap to SVG.

---

## Verdict

- Logo asset SHA matches locked invariant ✓
- 4 production references all wired correctly ✓
- 0 legacy violet/cartoon mascot residue ✓
- 2 schema.org structured-data references ✓

**No remediation required for A5 / C-spec.**
