'use client';

import { useEffect, useRef } from 'react';
import type * as THREEType from 'three';

/**
 * Hero3DStage v3 — Phase 20.1.2 cinematic premium hero.
 *
 * Reference: Hubtown.com hero (cinematic glowing centerpiece + volumetric
 * light shafts + atmospheric depth + mountain silhouettes). DPL palette
 * adaptation: amber/copper/cream where Hubtown uses cyan/blue.
 *
 * Composition (back-to-front render order):
 *
 *   1. ATMOSPHERIC FOG via THREE.FogExp2 — volumetric depth that softens
 *      far geometry and reads as actual atmosphere, not flat black.
 *
 *   2. CENTRAL CRYSTAL — Octahedron at subdivision 1 (8 visible facets).
 *      Custom shader: facet-based normal coloring + internal emissive
 *      glow + fresnel rim + time-driven pulse. Suspended at origin,
 *      slow rotation across all axes, breathing scale.
 *
 *   3. CRYSTAL CORE LIGHT — small bright sphere at origin with additive
 *      blend, pulses with the crystal. Reads as light leaking through
 *      the crystal's translucency.
 *
 *   4. VOLUMETRIC LIGHT SHAFTS — 3 cone geometries above the crystal,
 *      additive blend, gradient-alpha shader (bright at apex, fade out).
 *      Slow rotation. Reads as god-rays / light from above without
 *      requiring real volumetric shader (cheap GPU).
 *
 *   5. ORBITAL ELEMENTS — 3 thin tori at varying tilts and copper/amber
 *      colors, slow counter-rotation, gives the scene scale + telemetry
 *      register.
 *
 *   6. AMBIENT PARTICLE FIELD — 1200 points, spherical shell, vertex
 *      colors blend amber → copper → cream by distance.
 *
 *   7. FOREGROUND DRIFT — 200 particles drifting toward camera, cream
 *      color, additive blend. Reads as data motes.
 *
 *   8. CAMERA CINEMATIC MOTION — slight breathing dolly + parallax tilt
 *      on pointer + scroll-driven recede.
 *
 * Performance gates (HARD, applied before any GPU work):
 *  - viewport ≥ 1024px (matchMedia)
 *  - prefers-reduced-motion → aborts init
 *  - navigator.hardwareConcurrency < 4 → aborts (low-end CPU)
 *  - Init via requestIdleCallback (1500ms timeout) — never blocks LCP
 *  - Pixel ratio capped at min(devicePixelRatio, 1.75)
 *  - Render loop pauses when document.hidden OR scrolled out of view
 *  - Full disposal on unmount
 */
export default function Hero3DStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wide = window.matchMedia('(min-width: 1024px)').matches;
    const lowCpu = (navigator.hardwareConcurrency ?? 8) < 4;
    if (reduced || !wide || lowCpu) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    const init = async () => {
      if (disposed) return;
      const THREE = await import('three');

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(container.clientWidth, container.clientHeight, false);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0e0a06, 0.040);

      const camera = new THREE.PerspectiveCamera(
        38,
        container.clientWidth / container.clientHeight,
        0.1,
        80,
      );
      camera.position.set(0, 0.4, 14);
      camera.lookAt(0, 0, 0);

      /* === 1. CENTRAL CRYSTAL (octahedron) === */
      const crystalGeo = new THREE.OctahedronGeometry(2.2, 1);
      const crystalMat = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uColorCore: { value: new THREE.Color(0xff8800) },     // amber inside
          uColorMid: { value: new THREE.Color(0xc26f3c) },      // copper mid
          uColorRim: { value: new THREE.Color(0xfff0d4) },      // cream rim
          uPulse: { value: 0.0 },
        },
        vertexShader: `
          varying vec3 vWorldNormal;
          varying vec3 vViewPosition;
          varying vec3 vLocalPosition;
          void main() {
            vLocalPosition = position;
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vec4 mvPos = viewMatrix * worldPos;
            vViewPosition = -mvPos.xyz;
            vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          varying vec3 vWorldNormal;
          varying vec3 vViewPosition;
          varying vec3 vLocalPosition;
          uniform vec3 uColorCore;
          uniform vec3 uColorMid;
          uniform vec3 uColorRim;
          uniform float uPulse;
          uniform float uTime;
          void main() {
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = pow(1.0 - max(dot(normalize(vWorldNormal), viewDir), 0.0), 1.8);

            // Core glow falloff from origin
            float distFromCenter = length(vLocalPosition) / 2.2;
            float coreGlow = 1.0 - smoothstep(0.0, 1.0, distFromCenter);

            // Subtle facet-based color shift via normal
            float facetShade = 0.5 + 0.5 * vWorldNormal.y;

            // Three-stop blend
            vec3 col = mix(uColorCore, uColorMid, smoothstep(0.0, 0.55, fresnel));
            col = mix(col, uColorRim, smoothstep(0.55, 1.0, fresnel));
            col = mix(col, uColorCore * 1.4, coreGlow * 0.45);
            col *= 0.85 + 0.30 * facetShade;

            float intensity = 0.70 + 0.50 * uPulse;
            float alpha = mix(0.12, 0.92, fresnel) + coreGlow * 0.35;
            gl_FragColor = vec4(col * intensity, clamp(alpha, 0.05, 1.0));
          }
        `,
      });
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      crystal.position.set(0, 0.2, 0);
      scene.add(crystal);

      /* Crystal core light — small bright sphere at origin with bloom-like additive */
      const coreGeo = new THREE.SphereGeometry(0.42, 24, 24);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xfff0d4,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.copy(crystal.position);
      scene.add(core);

      /* === 2. VOLUMETRIC LIGHT SHAFTS — 3 cones from above === */
      const shafts: { mesh: THREEType.Mesh; baseRot: number }[] = [];
      const shaftMaterial = (color: number, opacity: number) =>
        new THREE.ShaderMaterial({
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uColor: { value: new THREE.Color(color) },
            uOpacity: { value: opacity },
          },
          vertexShader: `
            varying float vY;
            void main() {
              vY = position.y;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying float vY;
            uniform vec3 uColor;
            uniform float uOpacity;
            void main() {
              // y goes from -h to 0 in cone (apex at top in our orientation)
              // Map to 0..1 alpha falloff: bright near apex, fade toward base
              float a = smoothstep(0.0, 1.0, (vY + 6.0) / 6.0);
              gl_FragColor = vec4(uColor, a * uOpacity);
            }
          `,
        });
      const shaftConfigs = [
        { x: 0.0, color: 0xffa833, opacity: 0.32, scale: 1.0 },
        { x: -1.5, color: 0xc26f3c, opacity: 0.20, scale: 0.85 },
        { x: 1.7, color: 0xfff0d4, opacity: 0.18, scale: 0.75 },
      ];
      for (const cfg of shaftConfigs) {
        const coneGeo = new THREE.ConeGeometry(2.4 * cfg.scale, 6, 32, 1, true);
        const coneMat = shaftMaterial(cfg.color, cfg.opacity);
        const cone = new THREE.Mesh(coneGeo, coneMat);
        // Position cone so apex points DOWN at the crystal level (y ≈ 0).
        // Default cone has apex at (0, +h/2, 0) and base at (0, -h/2, 0).
        // Rotate 180° around Z so apex is at -h/2 (down). Then translate up
        // so apex sits at y ≈ 0 (crystal level) and base extends upward.
        cone.rotation.z = Math.PI;
        cone.position.set(cfg.x, 3.0, -1.0);
        scene.add(cone);
        shafts.push({ mesh: cone, baseRot: cfg.x * 0.05 });
      }

      /* === 3. ORBITAL RINGS === */
      const rings: { mesh: THREEType.Mesh; speed: number }[] = [];
      const ringConfigs = [
        { tilt: 0.0, color: 0xffa833, radius: 4.4, tube: 0.010, speed: 0.12 },
        { tilt: 0.42, color: 0xc26f3c, radius: 5.6, tube: 0.014, speed: -0.08 },
        { tilt: -0.85, color: 0x2c5f5a, radius: 7.0, tube: 0.011, speed: 0.06 },
      ];
      for (const cfg of ringConfigs) {
        const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 12, 200);
        const ringMat = new THREE.MeshBasicMaterial({
          color: cfg.color,
          transparent: true,
          opacity: 0.50,
          blending: THREE.AdditiveBlending,
          fog: false,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = cfg.tilt;
        scene.add(ring);
        rings.push({ mesh: ring, speed: cfg.speed });
      }

      /* === 4. AMBIENT PARTICLE FIELD === */
      const HALO_COUNT = 1200;
      const haloPos = new Float32Array(HALO_COUNT * 3);
      const haloCol = new Float32Array(HALO_COUNT * 3);
      const cAmber = new THREE.Color(0xff8800);
      const cCopper = new THREE.Color(0xc26f3c);
      const cCream = new THREE.Color(0xfff0d4);
      for (let i = 0; i < HALO_COUNT; i++) {
        const r = 7 + Math.random() * 8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        haloPos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
        haloPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        haloPos[i * 3 + 2] = r * Math.cos(phi);
        const t = (r - 7) / 8;
        const c =
          t < 0.5
            ? cAmber.clone().lerp(cCopper, t * 2)
            : cCopper.clone().lerp(cCream, (t - 0.5) * 2);
        haloCol[i * 3 + 0] = c.r;
        haloCol[i * 3 + 1] = c.g;
        haloCol[i * 3 + 2] = c.b;
      }
      const haloGeo = new THREE.BufferGeometry();
      haloGeo.setAttribute('position', new THREE.BufferAttribute(haloPos, 3));
      haloGeo.setAttribute('color', new THREE.BufferAttribute(haloCol, 3));
      const haloMat = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        fog: true,
      });
      const halo = new THREE.Points(haloGeo, haloMat);
      scene.add(halo);

      /* === 5. FOREGROUND DRIFT === */
      const DRIFT_COUNT = 200;
      const driftPos = new Float32Array(DRIFT_COUNT * 3);
      const driftVel = new Float32Array(DRIFT_COUNT);
      for (let i = 0; i < DRIFT_COUNT; i++) {
        driftPos[i * 3 + 0] = (Math.random() - 0.5) * 18;
        driftPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
        driftPos[i * 3 + 2] = -8 + Math.random() * 18;
        driftVel[i] = 0.4 + Math.random() * 0.8;
      }
      const driftGeo = new THREE.BufferGeometry();
      driftGeo.setAttribute('position', new THREE.BufferAttribute(driftPos, 3));
      const driftMat = new THREE.PointsMaterial({
        size: 0.022,
        color: 0xfff0d4,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        fog: false,
      });
      const drift = new THREE.Points(driftGeo, driftMat);
      scene.add(drift);

      /* Pointer + scroll state */
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onPointer = (e: PointerEvent) => {
        const w = window.innerWidth || 1;
        const h = window.innerHeight || 1;
        pointer.tx = (e.clientX / w - 0.5) * 2;
        pointer.ty = (e.clientY / h - 0.5) * 2;
      };
      let scrollProgress = 0;
      const onScroll = () => {
        const y = window.scrollY || 0;
        const h = container.clientHeight || window.innerHeight;
        scrollProgress = Math.max(0, Math.min(1, y / h));
      };
      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });

      /* Resize */
      const onResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(container);

      /* Pause when off-screen */
      let inView = true;
      const io = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
        },
        { threshold: 0.05 },
      );
      io.observe(container);

      /* Render loop */
      const clock = new THREE.Clock();
      let raf = 0;
      const driftPosAttr = driftGeo.getAttribute('position') as THREEType.BufferAttribute;

      const tick = () => {
        if (disposed) return;
        raf = requestAnimationFrame(tick);
        if (document.hidden || !inView) return;
        const dt = clock.getDelta();
        const t = clock.getElapsedTime();

        /* Crystal — slow tumble + breathing scale + shader pulse */
        crystalMat.uniforms.uTime.value = t;
        crystalMat.uniforms.uPulse.value = 0.5 + 0.5 * Math.sin(t * 0.78);
        const scale = 1.0 + Math.sin(t * 0.78) * 0.04;
        crystal.scale.setScalar(scale);
        crystal.rotation.x = t * 0.18;
        crystal.rotation.y = t * 0.12;
        crystal.rotation.z = Math.sin(t * 0.22) * 0.18;

        /* Core light pulses */
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.78);
        core.scale.setScalar(0.85 + pulse * 0.50);
        coreMat.opacity = 0.55 + pulse * 0.40;

        /* Light shafts — slow sway around their X position */
        for (let i = 0; i < shafts.length; i++) {
          const s = shafts[i];
          s.mesh.rotation.y = Math.sin(t * 0.18 + i) * 0.10;
          s.mesh.position.x = shaftConfigs[i].x + Math.sin(t * 0.13 + i * 1.5) * 0.18;
        }

        /* Orbital rings */
        for (const r of rings) {
          r.mesh.rotation.z += dt * r.speed;
        }

        /* Halo slow rotation */
        halo.rotation.y += dt * 0.020;

        /* Foreground drift */
        for (let i = 0; i < DRIFT_COUNT; i++) {
          driftPosAttr.array[i * 3 + 2] += dt * driftVel[i];
          if (driftPosAttr.array[i * 3 + 2] > 12) {
            driftPosAttr.array[i * 3 + 0] = (Math.random() - 0.5) * 18;
            driftPosAttr.array[i * 3 + 1] = (Math.random() - 0.5) * 12;
            driftPosAttr.array[i * 3 + 2] = -8;
          }
        }
        driftPosAttr.needsUpdate = true;

        /* Camera cinematic motion */
        pointer.x += (pointer.tx - pointer.x) * 0.045;
        pointer.y += (pointer.ty - pointer.y) * 0.045;
        const breathe = Math.sin(t * 0.62) * 0.40;
        camera.position.x = pointer.x * 0.85;
        camera.position.y = 0.4 - pointer.y * 0.55;
        camera.position.z = 14 + breathe + scrollProgress * 8;
        camera.lookAt(0, 0.2, 0);

        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        disposed = true;
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('scroll', onScroll);
        ro.disconnect();
        io.disconnect();
        crystalGeo.dispose();
        crystalMat.dispose();
        coreGeo.dispose();
        coreMat.dispose();
        for (const s of shafts) {
          s.mesh.geometry.dispose();
          (s.mesh.material as THREEType.Material).dispose();
        }
        for (const r of rings) {
          r.mesh.geometry.dispose();
          (r.mesh.material as THREEType.Material).dispose();
        }
        haloGeo.dispose();
        haloMat.dispose();
        driftGeo.dispose();
        driftMat.dispose();
        renderer.dispose();
      };
    };

    type IdleWindow = typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const w = window as IdleWindow;
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(() => {
        init();
      }, { timeout: 1500 });
    } else {
      timeoutId = setTimeout(init, 250);
    }

    return () => {
      disposed = true;
      if (idleId !== null && typeof w.cancelIdleCallback === 'function') {
        w.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) clearTimeout(timeoutId);
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="hero-3d-stage absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 110% 90% at 50% 55%, rgba(31, 22, 18, 0.75) 0%, rgba(15, 12, 10, 0.55) 45%, rgba(10, 9, 8, 0.0) 90%)',
      }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ display: 'block' }}
      />
      {/* Mountain silhouette layer — pure SVG, sits in front of canvas
          for foreground depth (Hubtown reference). Uses copper-bronze
          tint to read as warm distant geometry, not literal mountains. */}
      <svg
        className="hero-3d-silhouettes absolute inset-x-0 bottom-0 w-full"
        viewBox="0 0 1440 360"
        preserveAspectRatio="xMidYMax slice"
        style={{ pointerEvents: 'none', height: '36%' }}
      >
        <defs>
          <linearGradient id="mountFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(140, 107, 63, 0.28)" />
            <stop offset="100%" stopColor="rgba(31, 22, 18, 0.85)" />
          </linearGradient>
          <linearGradient id="mountMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(194, 111, 60, 0.32)" />
            <stop offset="100%" stopColor="rgba(15, 12, 10, 0.95)" />
          </linearGradient>
          <linearGradient id="mountNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(10, 9, 8, 0.85)" />
            <stop offset="100%" stopColor="rgba(10, 9, 8, 1.0)" />
          </linearGradient>
        </defs>
        <path
          d="M0 240 L80 200 L160 220 L240 180 L320 200 L400 170 L480 195 L560 165 L640 188 L720 158 L800 180 L880 152 L960 175 L1040 148 L1120 170 L1200 142 L1280 168 L1360 145 L1440 165 L1440 360 L0 360 Z"
          fill="url(#mountFar)"
        />
        <path
          d="M0 285 L100 250 L200 270 L300 245 L400 268 L500 240 L600 264 L700 235 L800 260 L900 232 L1000 256 L1100 228 L1200 252 L1300 226 L1400 250 L1440 248 L1440 360 L0 360 Z"
          fill="url(#mountMid)"
        />
        <path
          d="M0 320 L120 305 L240 318 L360 302 L480 320 L600 304 L720 322 L840 306 L960 324 L1080 308 L1200 326 L1320 310 L1440 326 L1440 360 L0 360 Z"
          fill="url(#mountNear)"
        />
      </svg>
    </div>
  );
}
