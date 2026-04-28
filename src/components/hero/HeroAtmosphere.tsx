'use client';

import { useEffect, useRef } from 'react';
// Tree-shaken Three.js imports per Phase 18.5.D directive — only the
// classes we use, not the umbrella `import * as THREE from 'three'`.
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  SphereGeometry,
  MeshStandardMaterial,
  AmbientLight,
  DirectionalLight,
  Color,
} from 'three';

/**
 * Phase 18.5.D — Hero floating sphere layer.
 *
 * Three imperative Three.js spheres rendered in a <canvas> absolutely
 * positioned within .hero-section, z-index 1 (above CSS atmosphere
 * background, below .hero-grid content which sits at z-index 2 per the
 * Phase 18.B Ambiguity #2 carve-out).
 *
 * Sphere geometry table (Phase 18.5 directive § B2 with K17-buffered
 * opacities to absorb Lightning CSS / numeric rounding):
 *
 *   Sphere | Radius | Position (% of canvas) | Material color | Opacity | Drift
 *   A      | 380px  | top -8%, left -10%     | #FF8800        | 0.27    | 45s
 *   B      | 260px  | bottom 8%, left 50%    | #2A8FBD        | 0.25    | 38s
 *   C      | 200px  | top 30%, right 6%      | #FF8800        | 0.17    | 52s
 *
 * Material: MeshStandardMaterial, metalness 0.0, roughness 0.9, transparent.
 * Lighting: AmbientLight #ffffff @ 0.3 + DirectionalLight #ffd9a8 @ 0.6 at (5, 3, 5).
 * Animation: per-sphere y-axis rotation at the period above. No translation,
 * no scale, no orbital motion. requestAnimationFrame, paused via
 * IntersectionObserver when canvas is out of viewport (threshold 0).
 *
 * Phase 18.5.E (this commit) wires the parallax: scroll-linked translateY
 * per sphere with factors A:0.05 / B:0.08 / C:0.03 (parallaxFactor field
 * on each sphere spec), clamped ±24px (MAX_PARALLAX_TRANSLATE_PX),
 * rAF-throttled via single in-flight scrollRafId, passive scroll listener,
 * disabled on prefers-reduced-motion (window.matchMedia gate at mount).
 *
 * Mounted via next/dynamic with { ssr: false } from the parent
 * HeroSection. Canvas init deferred via requestIdleCallback (fallback
 * setTimeout 200ms) so the CSS atmosphere renders immediately and the
 * Three.js setup doesn't block first paint.
 */

type SphereSpec = {
  radiusPx: number;
  /** Position as fractional canvas coordinates (0..1). Negative = off-canvas. */
  posXFrac: number;
  posYFrac: number;
  /** Hex color WITHOUT leading #. */
  hex: number;
  opacity: number;
  emissiveIntensity: number;
  /** Drift period in seconds. Used to derive y-axis rotation rate. */
  driftPeriodSeconds: number;
  /** Phase 18.5.E parallax factor (scrollY × factor → translateY, clamped ±24px). */
  parallaxFactor: number;
};

const SPHERES: readonly SphereSpec[] = [
  // A — large amber, top-left, drifts slowest in viewport scroll
  { radiusPx: 380, posXFrac: -0.10, posYFrac: -0.08, hex: 0xff8800, opacity: 0.27, emissiveIntensity: 0.05, driftPeriodSeconds: 45, parallaxFactor: 0.05 },
  // B — medium blue, bottom-center
  { radiusPx: 260, posXFrac: 0.50, posYFrac: 0.92, hex: 0x2a8fbd, opacity: 0.25, emissiveIntensity: 0.04, driftPeriodSeconds: 38, parallaxFactor: 0.08 },
  // C — small amber, upper-right
  { radiusPx: 200, posXFrac: 0.94, posYFrac: 0.30, hex: 0xff8800, opacity: 0.17, emissiveIntensity: 0.03, driftPeriodSeconds: 52, parallaxFactor: 0.03 },
];

const MAX_PARALLAX_TRANSLATE_PX = 24;

export default function HeroAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: WebGLRenderer | null = null;
    let scene: Scene | null = null;
    let camera: PerspectiveCamera | null = null;
    const meshes: Mesh[] = [];
    const geometries: SphereGeometry[] = [];
    const materials: MeshStandardMaterial[] = [];
    let rafId = 0;
    let scrollRafId = 0;
    let intersectObserver: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let inViewport = true;
    let initStartTime = 0;
    let lastScrollY = 0;
    let pendingScrollY = 0;
    let cancelled = false;
    // Phase 18.5.E parallax — per-sphere accumulated translateY offset,
    // updated in scroll handler, applied in tick. Initialized to 0 so
    // first tick before first scroll is identical to 18.5.D behavior.
    const parallaxYOffsets: number[] = SPHERES.map(() => 0);

    // Phase 18.5.D — defer canvas init until after first paint to avoid
    // blocking LCP. requestIdleCallback with setTimeout fallback per spec.
    const idle: (cb: () => void) => number =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (cb) => window.requestIdleCallback(cb, { timeout: 600 })
        : (cb) => window.setTimeout(cb, 200);

    const initId = idle(() => {
      if (cancelled || !canvas) return;
      initStartTime = performance.now();

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      scene = new Scene();
      camera = new PerspectiveCamera(45, width / height, 0.1, 5000);
      // Camera positioned so a sphere of radius R at z=0 occupies roughly
      // R-pixels of vertical screen space (small-angle approx — calibrated
      // empirically against canvas height).
      camera.position.set(0, 0, height);

      renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      renderer.setClearColor(0x000000, 0);

      // Lighting per directive
      const ambient = new AmbientLight(0xffffff, 0.3);
      scene.add(ambient);
      const directional = new DirectionalLight(0xffd9a8, 0.6);
      directional.position.set(5, 3, 5);
      scene.add(directional);

      // Spheres
      for (const spec of SPHERES) {
        const geometry = new SphereGeometry(spec.radiusPx, 48, 32);
        const material = new MeshStandardMaterial({
          color: new Color(spec.hex),
          metalness: 0.0,
          roughness: 0.9,
          transparent: true,
          opacity: 0, // fade in over 600ms after first frame
          emissive: new Color(spec.hex),
          emissiveIntensity: spec.emissiveIntensity,
        });
        const mesh = new Mesh(geometry, material);
        // Position: convert canvas-fractional coords to scene units so the
        // sphere center sits at the same fractional viewport position.
        // Canvas covers width × height in PerspectiveCamera at z=0 → world
        // unit = pixel.
        mesh.position.x = (spec.posXFrac - 0.5) * width;
        // Y is inverted in WebGL (positive = up); CSS spec posYFrac is
        // top-down so flip it.
        mesh.position.y = (0.5 - spec.posYFrac) * height;
        mesh.position.z = 0;
        scene.add(mesh);
        meshes.push(mesh);
        geometries.push(geometry);
        materials.push(material);
      }

      // Animation loop
      const startMs = performance.now();
      const tick = (now: number) => {
        if (cancelled || !renderer || !scene || !camera) return;
        if (!inViewport) {
          // Pause: skip render but keep rAF scheduled so we resume cleanly
          // when intersection observer fires back in.
          rafId = requestAnimationFrame(tick);
          return;
        }
        const elapsed = (now - startMs) / 1000;

        // Per-sphere y-axis rotation. driftPeriodSeconds is the 360°
        // rotation period; angular velocity = 2π / period.
        if (!reduced) {
          for (let i = 0; i < meshes.length; i++) {
            const period = SPHERES[i].driftPeriodSeconds;
            meshes[i].rotation.y = (elapsed * Math.PI * 2) / period;
          }
        }

        // 600ms fade-in after first frame
        const fadeProgress = Math.min(1, (now - initStartTime) / 600);
        for (let i = 0; i < materials.length; i++) {
          materials[i].opacity = SPHERES[i].opacity * fadeProgress;
        }

        // Phase 18.5.D baseline + 18.5.E parallax offset. baseline Y
        // re-derived from canvas height each frame so resize is
        // reflected; parallaxYOffsets[i] is set by the scroll handler
        // and is 0 when prefers-reduced-motion (handler not bound).
        for (let i = 0; i < meshes.length; i++) {
          const baselineY = (0.5 - SPHERES[i].posYFrac) * canvas.clientHeight;
          meshes[i].position.y = baselineY - parallaxYOffsets[i];
        }

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      // IntersectionObserver to pause animation when canvas leaves viewport
      intersectObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            inViewport = entry.isIntersecting;
          }
        },
        { threshold: 0 },
      );
      intersectObserver.observe(canvas);

      // ResizeObserver to handle viewport resize
      resizeObserver = new ResizeObserver(() => {
        if (!renderer || !camera || !canvas) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.position.z = h;
        camera.updateProjectionMatrix();
        // Re-position spheres against new dimensions
        for (let i = 0; i < meshes.length; i++) {
          meshes[i].position.x = (SPHERES[i].posXFrac - 0.5) * w;
          // baseline Y handled in tick (re-derived per-frame)
        }
      });
      resizeObserver.observe(canvas);
    });

    // Phase 18.5.E parallax — passive scroll listener, rAF-throttled
    // via single in-flight scrollRafId. Disabled when reduced-motion
    // (handler never bound). Per-sphere translateY = scrollY × factor,
    // hard-clamped to ±MAX_PARALLAX_TRANSLATE_PX (24px).
    const onScroll = () => {
      pendingScrollY = window.scrollY;
      if (scrollRafId) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = 0;
        const scrollY = pendingScrollY;
        if (scrollY === lastScrollY) return;
        lastScrollY = scrollY;
        for (let i = 0; i < SPHERES.length; i++) {
          const raw = scrollY * SPHERES[i].parallaxFactor;
          parallaxYOffsets[i] =
            raw > MAX_PARALLAX_TRANSLATE_PX
              ? MAX_PARALLAX_TRANSLATE_PX
              : raw < -MAX_PARALLAX_TRANSLATE_PX
                ? -MAX_PARALLAX_TRANSLATE_PX
                : raw;
        }
      });
    };

    if (!reduced) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      if (initId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(initId);
      }
      window.removeEventListener('scroll', onScroll);
      intersectObserver?.disconnect();
      resizeObserver?.disconnect();
      // Three.js cleanup
      for (const m of meshes) scene?.remove(m);
      for (const g of geometries) g.dispose();
      for (const mat of materials) mat.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-atmosphere-canvas"
      data-hero-atmosphere
      aria-hidden="true"
    />
  );
}
