'use client';

import { useEffect, useRef } from 'react';
import type * as THREEType from 'three';

/**
 * Hero3DStage v5 — Phase 20.1.6 cinematic rebuild.
 *
 * v4 deliverables (cube + water + mountains + beam) failed visual review:
 * cube read as flat-shaded Maya still-life, mountain planes were buried
 * by fog (never reached the screen), water plane produced a brown smear
 * with no reflection cue. v5 simplifies the scene to a single dominant
 * focal point with proper PBR lighting and a recognizable cinematic
 * motif (hex grid floor + light beam).
 *
 * Composition:
 *   1. Atmospheric exponential fog (warm near-black)
 *   2. Hexagonal grid floor — emissive amber lines fading into fog
 *   3. Faceted icosahedron — MeshStandardMaterial with emissive amber
 *      core + metalness + low roughness; matches CosmoMark v2 mark
 *   4. Inner glow sphere (additive blend) reading as light source
 *      through the icosahedron faces
 *   5. Backface fresnel-rim shell — slightly larger icosahedron, only
 *      backfaces, gradient alpha → produces silhouette glow
 *   6. Dominant beam cone above mark, additive blend, gradient alpha
 *   7. PointLight inside mark + AmbientLight for global lift
 *   8. 1500 particle field, amber → cream lerp
 *
 * Performance gates retained: desktop ≥1024px, prefers-motion,
 * hardwareConcurrency ≥4, requestIdleCallback init, IO pause off-screen.
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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(container.clientWidth, container.clientHeight, false);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0a0908, 0.055);

      const camera = new THREE.PerspectiveCamera(
        38,
        container.clientWidth / container.clientHeight,
        0.1,
        80,
      );
      camera.position.set(0, 1.2, 11);
      camera.lookAt(0, 0.6, 0);

      /* === Lights === */
      const ambient = new THREE.AmbientLight(0xfff0d4, 0.18);
      scene.add(ambient);

      const keyLight = new THREE.PointLight(0xff8800, 4.5, 14, 1.6);
      keyLight.position.set(0, 1.0, 0);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xfff0d4, 0.4);
      fillLight.position.set(2, 4, 3);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xc26f3c, 0.55);
      rimLight.position.set(-3, 2, -4);
      scene.add(rimLight);

      /* === 1. CENTRAL FACETED OCTAHEDRON ===
         Icosahedron at detail=1 produces 80 visible triangle facets —
         matches the diamond mark and reads as a properly cut crystal
         under PBR. */
      const markGeo = new THREE.IcosahedronGeometry(1.55, 1);
      const markMat = new THREE.MeshStandardMaterial({
        color: 0x2a1a10,
        emissive: 0xff8800,
        emissiveIntensity: 0.55,
        metalness: 0.85,
        roughness: 0.18,
        flatShading: true,
        transparent: true,
        opacity: 0.92,
      });
      const mark = new THREE.Mesh(markGeo, markMat);
      mark.position.set(0, 0.7, 0);
      scene.add(mark);

      /* Inner emissive core sphere */
      const coreGeo = new THREE.SphereGeometry(0.55, 24, 24);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xfff0d4,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.copy(mark.position);
      scene.add(core);

      /* Backface fresnel-rim shell — slightly larger icosahedron, only
         backfaces visible, gradient alpha pushes a soft halo around the
         mark silhouette. */
      const rimGeo = new THREE.IcosahedronGeometry(1.85, 1);
      const rimMat = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uColor: { value: new THREE.Color(0xff8800) },
          uPulse: { value: 0 },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vViewPos;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vViewPos = -mv.xyz;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vViewPos;
          uniform vec3 uColor;
          uniform float uPulse;
          void main() {
            vec3 viewDir = normalize(vViewPos);
            float fresnel = pow(1.0 - abs(dot(normalize(vNormal), viewDir)), 2.4);
            float a = fresnel * (0.55 + uPulse * 0.20);
            gl_FragColor = vec4(uColor, a);
          }
        `,
      });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.position.copy(mark.position);
      scene.add(rim);

      /* === 2. HEX GRID FLOOR ===
         Procedural hex grid using LineSegments — emissive amber lines
         on a dark plane that fade to transparent in distance via fog. */
      const HEX_R = 0.9;
      const HEX_W = HEX_R * Math.sqrt(3);
      const ROWS = 18;
      const COLS = 22;
      const lineVerts: number[] = [];
      const lineColors: number[] = [];
      const cAmber = new THREE.Color(0xff8800);
      const cCopper = new THREE.Color(0xc26f3c);
      const cDim = new THREE.Color(0x1f1612);

      for (let r = -ROWS / 2; r < ROWS / 2; r++) {
        for (let c = -COLS / 2; c < COLS / 2; c++) {
          const cx = c * HEX_W + (r % 2 === 0 ? 0 : HEX_W / 2);
          const cz = r * HEX_R * 1.5;
          const distFromCenter = Math.sqrt(cx * cx + cz * cz);
          const t = Math.min(1, distFromCenter / 16);
          const tint = cAmber.clone().lerp(cDim, 0.35 + t * 0.55);

          // 6 hex corners
          const pts: [number, number][] = [];
          for (let k = 0; k < 6; k++) {
            const a = (k / 6) * Math.PI * 2 + Math.PI / 6;
            pts.push([cx + Math.cos(a) * HEX_R, cz + Math.sin(a) * HEX_R]);
          }
          for (let k = 0; k < 6; k++) {
            const [x1, z1] = pts[k];
            const [x2, z2] = pts[(k + 1) % 6];
            lineVerts.push(x1, 0, z1, x2, 0, z2);
            lineColors.push(tint.r, tint.g, tint.b, tint.r, tint.g, tint.b);
          }
        }
      }
      const hexGeo = new THREE.BufferGeometry();
      hexGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
      hexGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(lineColors), 3));
      const hexMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const hex = new THREE.LineSegments(hexGeo, hexMat);
      hex.position.set(0, -1.5, 0);
      scene.add(hex);

      // Subtle copper accent ring under the mark
      const ringGeo = new THREE.RingGeometry(2.2, 2.45, 64, 1);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cCopper,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(0, -1.49, 0);
      scene.add(ring);

      /* === 3. DOMINANT BEAM === */
      const beamGeo = new THREE.ConeGeometry(2.6, 11, 64, 1, true);
      const beamMat = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uColorTop: { value: new THREE.Color(0xff8800) },
          uColorBottom: { value: new THREE.Color(0xfff0d4) },
        },
        vertexShader: `
          varying float vY;
          varying float vRadial;
          void main() {
            vY = position.y;
            vRadial = length(position.xz) / 2.6;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying float vY;
          varying float vRadial;
          uniform vec3 uColorTop;
          uniform vec3 uColorBottom;
          void main() {
            float yNorm = clamp((vY + 5.5) / 11.0, 0.0, 1.0);
            float radialFade = 1.0 - smoothstep(0.4, 1.0, vRadial);
            float a = (1.0 - yNorm) * 1.10 * radialFade;
            vec3 col = mix(uColorBottom, uColorTop, yNorm);
            gl_FragColor = vec4(col, clamp(a, 0.0, 0.95));
          }
        `,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.rotation.z = Math.PI;
      beam.position.set(0, 6.2, -0.2);
      scene.add(beam);

      /* === 4. PARTICLE FIELD ===
         Phase 20.1.7 perf — count 1500 → 800 (47% reduction). Bob is
         now done in the vertex shader (`uTime` + per-vertex seed) so
         the per-frame JS loop that updated 1500 vertices and called
         needsUpdate=true is gone. Net: zero JS work per frame for
         particles, GPU does the displacement. */
      const HALO_COUNT = 800;
      const haloPos = new Float32Array(HALO_COUNT * 3);
      const haloCol = new Float32Array(HALO_COUNT * 3);
      const haloSeed = new Float32Array(HALO_COUNT);
      const cAmberP = new THREE.Color(0xff8800);
      const cCream = new THREE.Color(0xfff0d4);
      for (let i = 0; i < HALO_COUNT; i++) {
        haloPos[i * 3 + 0] = (Math.random() - 0.5) * 26;
        haloPos[i * 3 + 1] = -0.5 + Math.random() * 7;
        haloPos[i * 3 + 2] = -8 + Math.random() * 14;
        haloSeed[i] = Math.random() * 6.2832;
        const t = Math.random();
        const c = cAmberP.clone().lerp(cCream, t);
        haloCol[i * 3 + 0] = c.r;
        haloCol[i * 3 + 1] = c.g;
        haloCol[i * 3 + 2] = c.b;
      }
      const haloGeo = new THREE.BufferGeometry();
      haloGeo.setAttribute('position', new THREE.BufferAttribute(haloPos, 3));
      haloGeo.setAttribute('color', new THREE.BufferAttribute(haloCol, 3));
      haloGeo.setAttribute('aSeed', new THREE.BufferAttribute(haloSeed, 1));
      const haloMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: true,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 32.0 * Math.min(window.devicePixelRatio, 1.5) },
          fogColor: { value: scene.fog.color },
          fogDensity: { value: (scene.fog as THREEType.FogExp2).density },
        },
        vertexShader: `
          attribute float aSeed;
          attribute vec3 color;
          uniform float uTime;
          uniform float uSize;
          varying vec3 vColor;
          varying float vFogDepth;
          void main() {
            vColor = color;
            vec3 p = position;
            p.y += sin(uTime * 0.5 + aSeed) * 0.08;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            vFogDepth = -mv.z;
            gl_Position = projectionMatrix * mv;
            gl_PointSize = uSize / -mv.z;
          }
        `,
        fragmentShader: `
          uniform vec3 fogColor;
          uniform float fogDensity;
          varying vec3 vColor;
          varying float vFogDepth;
          void main() {
            // round point with soft edge
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            float alpha = smoothstep(0.5, 0.0, d) * 0.85;
            // fog falloff
            float fogFactor = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
            vec3 col = mix(vColor, fogColor, fogFactor);
            gl_FragColor = vec4(col, alpha * (1.0 - fogFactor));
          }
        `,
      });
      const halo = new THREE.Points(haloGeo, haloMat);
      scene.add(halo);

      /* === Pointer + scroll === */
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onPointer = (e: PointerEvent) => {
        const w = window.innerWidth || 1;
        const h = window.innerHeight || 1;
        pointer.tx = (e.clientX / w - 0.5) * 2;
        pointer.ty = (e.clientY / h - 0.5) * 2;
      };
      // Phase 20.1.7 — scrollProgress is now read inline in the tick
      // function. The dedicated scroll listener was removed; on every
      // wheel event it forced a layout read (container.clientHeight)
      // which compounded with Lenis firing 60+/s. The tick function
      // already runs once per frame and reads stable cached values.
      let scrollProgress = 0;
      let cachedHeight = container.clientHeight || window.innerHeight;
      window.addEventListener('pointermove', onPointer, { passive: true });

      const onResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        cachedHeight = h || window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(container);

      let inView = true;
      const io = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
        },
        { threshold: 0.05 },
      );
      io.observe(container);

      /* === Render loop === */
      const clock = new THREE.Clock();
      let raf = 0;

      const tick = () => {
        if (disposed) return;
        raf = requestAnimationFrame(tick);
        if (document.hidden || !inView) return;
        const t = clock.getElapsedTime();

        // Update scroll progress once per frame (cheap: no clientHeight read)
        scrollProgress = Math.max(0, Math.min(1, (window.scrollY || 0) / cachedHeight));

        const pulse = 0.5 + 0.5 * Math.sin(t * 0.6);

        /* Mark — slow rotation + breathing pulse */
        mark.rotation.y = t * 0.18;
        mark.rotation.x = Math.sin(t * 0.22) * 0.20;
        mark.position.y = 0.7 + Math.sin(t * 0.55) * 0.15;
        markMat.emissiveIntensity = 0.45 + pulse * 0.35;

        /* Rim */
        rim.position.copy(mark.position);
        rim.rotation.copy(mark.rotation);
        rimMat.uniforms.uPulse.value = pulse;

        /* Core */
        core.scale.setScalar(0.85 + pulse * 0.55);
        coreMat.opacity = 0.55 + pulse * 0.40;
        core.position.copy(mark.position);

        /* Key light pulse — drives the whole scene reaction */
        keyLight.intensity = 3.6 + pulse * 1.6;
        keyLight.position.copy(mark.position);

        /* Beam */
        beam.position.x = mark.position.x;
        beam.position.z = mark.position.z - 0.2;
        beam.rotation.y = Math.sin(t * 0.18) * 0.04;

        /* Hex floor — slow scroll toward camera */
        hex.position.z = (t * 0.25) % 1.35;

        /* Halo bob done in vertex shader; just push uTime */
        haloMat.uniforms.uTime.value = t;

        /* Camera */
        pointer.x += (pointer.tx - pointer.x) * 0.045;
        pointer.y += (pointer.ty - pointer.y) * 0.045;
        const breathe = Math.sin(t * 0.55) * 0.25;
        camera.position.x = pointer.x * 0.7;
        camera.position.y = 1.2 - pointer.y * 0.4;
        camera.position.z = 11 + breathe + scrollProgress * 6;
        camera.lookAt(0, 0.6, 0);

        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        disposed = true;
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onPointer);
        ro.disconnect();
        io.disconnect();
        markGeo.dispose();
        markMat.dispose();
        rimGeo.dispose();
        rimMat.dispose();
        coreGeo.dispose();
        coreMat.dispose();
        beamGeo.dispose();
        beamMat.dispose();
        hexGeo.dispose();
        hexMat.dispose();
        ringGeo.dispose();
        ringMat.dispose();
        haloGeo.dispose();
        haloMat.dispose();
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
          'radial-gradient(ellipse 120% 90% at 50% 60%, rgba(31, 22, 18, 0.80) 0%, rgba(15, 12, 10, 0.55) 45%, rgba(10, 9, 8, 0.0) 90%)',
      }}
    >
      {/* Phase 20.1.7 mobile / reduced-motion / low-CPU fallback. Static
          SVG: faceted-diamond mark + horizon grid + descending beam.
          Hidden when canvas is active (canvas has higher z-index) so
          desktop users see the 3D scene; mobile gets the static graphic
          instead of an empty radial gradient. */}
      <svg
        className="hero-3d-fallback"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-beam" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="rgba(255,168,51,0.0)" />
            <stop offset="55%" stopColor="rgba(255,168,51,0.18)" />
            <stop offset="100%" stopColor="rgba(255,240,212,0.50)" />
          </linearGradient>
          <radialGradient id="hero-mark-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(255,168,51,0.95)" />
            <stop offset="55%" stopColor="rgba(255,136,0,0.45)" />
            <stop offset="100%" stopColor="rgba(255,136,0,0.0)" />
          </radialGradient>
          <linearGradient id="hero-mark-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff8800" />
            <stop offset="100%" stopColor="#c26f3c" />
          </linearGradient>
        </defs>

        {/* atmospheric beam */}
        <polygon
          points="335,0 465,0 520,360 280,360"
          fill="url(#hero-beam)"
          opacity="0.85"
        />

        {/* horizon grid — 6 perspective lines */}
        <g stroke="rgba(255,168,51,0.32)" strokeWidth="1" fill="none">
          <line x1="0" y1="380" x2="800" y2="380" />
          <line x1="-120" y1="430" x2="920" y2="430" opacity="0.7" />
          <line x1="-260" y1="490" x2="1060" y2="490" opacity="0.5" />
          <line x1="200" y1="380" x2="100" y2="500" opacity="0.6" />
          <line x1="320" y1="380" x2="280" y2="500" opacity="0.7" />
          <line x1="400" y1="380" x2="400" y2="500" opacity="0.85" />
          <line x1="480" y1="380" x2="520" y2="500" opacity="0.7" />
          <line x1="600" y1="380" x2="700" y2="500" opacity="0.6" />
        </g>

        {/* mark glow halo */}
        <circle cx="400" cy="260" r="160" fill="url(#hero-mark-glow)" opacity="0.85" />

        {/* faceted-diamond silhouette — matches CosmoMark v2 */}
        <g transform="translate(400 260)">
          <polygon
            points="0,-100 86,-50 86,50 0,100 -86,50 -86,-50"
            fill="url(#hero-mark-face)"
            stroke="rgba(255,240,212,0.75)"
            strokeWidth="1.5"
            opacity="0.92"
          />
          <polygon
            points="0,-100 86,-50 0,0"
            fill="rgba(255,240,212,0.18)"
          />
          <polygon
            points="0,-100 -86,-50 0,0"
            fill="rgba(0,0,0,0.20)"
          />
          <circle cx="0" cy="0" r="14" fill="rgba(255,240,212,0.95)" />
        </g>

        {/* ground reflection ring */}
        <ellipse
          cx="400"
          cy="400"
          rx="160"
          ry="14"
          fill="none"
          stroke="rgba(194,111,60,0.55)"
          strokeWidth="1.5"
        />
      </svg>

      <canvas
        ref={canvasRef}
        className="block h-full w-full hero-3d-canvas"
        style={{ display: 'block' }}
      />
    </div>
  );
}
