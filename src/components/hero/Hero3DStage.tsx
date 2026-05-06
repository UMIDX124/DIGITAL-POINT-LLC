'use client';

import { useEffect, useRef } from 'react';
import type * as THREEType from 'three';

/**
 * Hero3DStage v4 — Phase 20.1.3 Hubtown-clone cinematic.
 *
 * UF reference fully understood after multi-frame video analysis: the
 * Hubtown hero is a glowing CUBE on water with mountain walls wrapping
 * the sides + ONE dominant light beam from above + left vertical section
 * nav. v4 rebuilds the scene to match that signature with DPL amber
 * palette substitution.
 *
 * Composition (back-to-front):
 *
 *   1. ATMOSPHERIC FOG (THREE.FogExp2) — depth softening, color #0a0908.
 *
 *   2. MOUNTAIN WALLS — 2 large 3D plane geometries with displacement
 *      shader, positioned left + right of cube wrapping the scene like
 *      a valley. Copper-bronze tinted, recede into fog.
 *
 *   3. WATER PLANE — below cube, shader-based sine-wave displacement +
 *      vertex-color depth gradient. Catches reflected amber from cube +
 *      light beam. Stretches to horizon.
 *
 *   4. CENTRAL CUBE — RoundedBoxGeometry approximated via subdivided
 *      BoxGeometry with vertex shader edge softening. Custom shader:
 *      internal emissive glow + edge highlight + facet-shade. Amber
 *      core, copper edges, cream rim. Suspended slightly above water.
 *
 *   5. CORE LIGHT — bright sphere inside cube origin (additive blend,
 *      no depth write) reads as light source through the translucent
 *      cube material.
 *
 *   6. DOMINANT LIGHT BEAM — single large cone above cube, custom
 *      gradient-alpha shader, intense at apex (cube top), fades upward
 *      and outward. Additive blend.
 *
 *   7. AMBIENT PARTICLE FIELD — 1500 points scattered above water
 *      surface, drift slowly. Vertex colors blend amber → cream.
 *
 *   8. CAMERA — slightly elevated angle (Y +1.2) looking down at the
 *      cube + horizon. Breathing dolly + parallax + scroll recede.
 *
 * Performance: same gates as v3 (desktop ≥1024px, prefers-motion,
 * hardwareConcurrency ≥4, requestIdleCallback init, IO pause off-screen,
 * full disposal on unmount).
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
      scene.fog = new THREE.FogExp2(0x0a0908, 0.045);

      const camera = new THREE.PerspectiveCamera(
        42,
        container.clientWidth / container.clientHeight,
        0.1,
        80,
      );
      camera.position.set(0, 1.2, 12);
      camera.lookAt(0, 0.4, 0);

      /* === 1. CENTRAL CUBE — glowing emissive box === */
      const cubeGeo = new THREE.BoxGeometry(3.0, 3.0, 3.0, 8, 8, 8);
      const cubeMat = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uColorCore: { value: new THREE.Color(0xff8800) },
          uColorEdge: { value: new THREE.Color(0xc26f3c) },
          uColorRim: { value: new THREE.Color(0xfff0d4) },
          uPulse: { value: 0.0 },
        },
        vertexShader: `
          varying vec3 vWorldNormal;
          varying vec3 vViewPosition;
          varying vec3 vLocalPosition;
          varying float vEdgeFactor;
          void main() {
            vLocalPosition = position;
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vec4 mvPos = viewMatrix * worldPos;
            vViewPosition = -mvPos.xyz;
            vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
            // Edge factor: high near cube edges, low on faces
            vec3 absPos = abs(position) / 1.5;
            float maxAxis = max(max(absPos.x, absPos.y), absPos.z);
            vec3 sortedAxes = absPos;
            // distance from face center: 1.0 at edges, 0.0 at face center
            vEdgeFactor = pow(min(min(1.0 - absPos.x, 1.0 - absPos.y), 1.0 - absPos.z) * 1.5, 0.6);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          varying vec3 vWorldNormal;
          varying vec3 vViewPosition;
          varying vec3 vLocalPosition;
          varying float vEdgeFactor;
          uniform vec3 uColorCore;
          uniform vec3 uColorEdge;
          uniform vec3 uColorRim;
          uniform float uPulse;
          uniform float uTime;
          void main() {
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = pow(1.0 - max(dot(normalize(vWorldNormal), viewDir), 0.0), 2.0);

            // Internal glow falloff from cube center
            float distFromCenter = length(vLocalPosition) / 1.5;
            float coreGlow = 1.0 - smoothstep(0.0, 1.0, distFromCenter);

            // Facet shade — top brighter than bottom
            float facetShade = 0.55 + 0.45 * (vWorldNormal.y * 0.5 + 0.5);

            // Color blend: core (inside) → edge (faces) → rim (silhouette)
            vec3 col = mix(uColorEdge, uColorCore, coreGlow);
            col = mix(col, uColorRim, fresnel * 0.85);
            col *= 0.70 + 0.40 * facetShade;

            // Bright edge highlight where cube edges are visible
            float edgeBrightness = 1.0 - vEdgeFactor;
            col += uColorRim * edgeBrightness * 0.45;

            float intensity = 0.85 + 0.30 * uPulse;
            float alpha = mix(0.18, 0.95, fresnel) + coreGlow * 0.45 + edgeBrightness * 0.35;
            gl_FragColor = vec4(col * intensity, clamp(alpha, 0.06, 1.0));
          }
        `,
      });
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.set(0, 0.7, 0);
      scene.add(cube);

      /* Crystal core sphere — bright additive light at cube center */
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
      core.position.copy(cube.position);
      scene.add(core);

      /* === 2. DOMINANT LIGHT BEAM — single large cone above cube === */
      const beamGeo = new THREE.ConeGeometry(3.6, 12, 64, 1, true);
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
            // Cone has y from -h/2 (apex) to +h/2 (base) when default
            // After rotation Z=PI: y from +h/2 (apex bottom) to -h/2 (base top)
            // Use absolute distance from center for radial fade
            vRadial = length(position.xz) / 3.6;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying float vY;
          varying float vRadial;
          uniform vec3 uColorTop;
          uniform vec3 uColorBottom;
          void main() {
            // y goes -6 (apex bottom) to +6 (base top) after rotation
            // Map: apex (cube) bright, fade upward
            float yNorm = clamp((vY + 6.0) / 12.0, 0.0, 1.0);
            // Radial fade: tighter at center, transparent at edges
            float radialFade = 1.0 - smoothstep(0.5, 1.0, vRadial);
            float a = (1.0 - yNorm) * 0.85 * radialFade;
            vec3 col = mix(uColorBottom, uColorTop, yNorm);
            gl_FragColor = vec4(col, a);
          }
        `,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.rotation.z = Math.PI; // apex points DOWN at cube
      beam.position.set(0, 6.7, -0.2);
      scene.add(beam);

      /* === 3. WATER PLANE — sine-wave displacement + reflection wash === */
      const waterGeo = new THREE.PlaneGeometry(60, 30, 80, 40);
      const waterMat = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uColorDeep: { value: new THREE.Color(0x0a0908) },
          uColorShallow: { value: new THREE.Color(0xff8800) },
          uColorRim: { value: new THREE.Color(0xfff0d4) },
        },
        vertexShader: `
          uniform float uTime;
          varying vec3 vPos;
          varying float vWave;
          void main() {
            vPos = position;
            float w1 = sin(position.x * 0.4 + uTime * 0.7) * 0.06;
            float w2 = cos(position.y * 0.3 + uTime * 0.5) * 0.05;
            float w3 = sin((position.x + position.y) * 0.25 + uTime * 0.4) * 0.04;
            vWave = w1 + w2 + w3;
            vec3 p = position;
            p.z += vWave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColorDeep;
          uniform vec3 uColorShallow;
          uniform vec3 uColorRim;
          uniform float uTime;
          varying vec3 vPos;
          varying float vWave;
          void main() {
            // Distance from cube origin (in xy of plane, plane is on xy)
            float dist = length(vPos.xy) / 14.0;
            float reflection = (1.0 - smoothstep(0.0, 0.45, dist)) * 0.85;
            // Wave brightness — bright peaks
            float waveLight = smoothstep(0.0, 0.06, vWave) * 0.35;
            vec3 col = mix(uColorDeep, uColorShallow, reflection);
            col = mix(col, uColorRim, waveLight);
            // Far horizon fade
            float horizonFade = 1.0 - smoothstep(0.5, 1.0, dist);
            float alpha = (reflection * 0.70 + waveLight * 0.35) * horizonFade;
            gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.85));
          }
        `,
      });
      const water = new THREE.Mesh(waterGeo, waterMat);
      water.rotation.x = -Math.PI / 2;
      water.position.set(0, -1.2, 0);
      scene.add(water);

      /* === 4. MOUNTAIN WALLS (left + right) === */
      const mountainShader = (side: number) =>
        new THREE.ShaderMaterial({
          transparent: true,
          side: THREE.DoubleSide,
          uniforms: {
            uColor: { value: new THREE.Color(0x1f1612) },
            uHighlight: { value: new THREE.Color(0xc26f3c) },
            uSide: { value: side },
          },
          vertexShader: `
            varying float vRidge;
            varying vec3 vPos;
            float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
            float noise(vec3 p) {
              vec3 i = floor(p), f = fract(p);
              f = f * f * (3.0 - 2.0 * f);
              float n = mix(
                mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                    mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                    mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
                f.z
              );
              return n;
            }
            void main() {
              vec3 p = position;
              // Displacement creates jagged ridges
              float ridge = noise(p * 0.45) * 1.6 + noise(p * 0.18) * 2.4;
              p.z -= ridge;
              vRidge = ridge;
              vPos = p;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }
          `,
          fragmentShader: `
            varying float vRidge;
            varying vec3 vPos;
            uniform vec3 uColor;
            uniform vec3 uHighlight;
            uniform float uSide;
            void main() {
              // Highlight ridge tops
              float ridgeNorm = clamp(vRidge / 4.0, 0.0, 1.0);
              vec3 col = mix(uColor, uHighlight, ridgeNorm * 0.55);
              // Vertical fade — top fades into atmosphere
              float yFade = 1.0 - smoothstep(2.0, 8.0, vPos.y);
              gl_FragColor = vec4(col, yFade * 0.95);
            }
          `,
        });
      const mountainGeoLeft = new THREE.PlaneGeometry(20, 14, 60, 30);
      const mountainLeft = new THREE.Mesh(mountainGeoLeft, mountainShader(-1));
      mountainLeft.position.set(-12, 1, -3);
      mountainLeft.rotation.y = Math.PI * 0.32;
      scene.add(mountainLeft);

      const mountainGeoRight = new THREE.PlaneGeometry(20, 14, 60, 30);
      const mountainRight = new THREE.Mesh(mountainGeoRight, mountainShader(1));
      mountainRight.position.set(12, 1, -3);
      mountainRight.rotation.y = -Math.PI * 0.32;
      scene.add(mountainRight);

      /* === 5. AMBIENT PARTICLE FIELD === */
      const HALO_COUNT = 1500;
      const haloPos = new Float32Array(HALO_COUNT * 3);
      const haloCol = new Float32Array(HALO_COUNT * 3);
      const cAmber = new THREE.Color(0xff8800);
      const cCream = new THREE.Color(0xfff0d4);
      for (let i = 0; i < HALO_COUNT; i++) {
        haloPos[i * 3 + 0] = (Math.random() - 0.5) * 28;
        haloPos[i * 3 + 1] = -0.5 + Math.random() * 7;
        haloPos[i * 3 + 2] = -8 + Math.random() * 14;
        const t = Math.random();
        const c = cAmber.clone().lerp(cCream, t);
        haloCol[i * 3 + 0] = c.r;
        haloCol[i * 3 + 1] = c.g;
        haloCol[i * 3 + 2] = c.b;
      }
      const haloGeo = new THREE.BufferGeometry();
      haloGeo.setAttribute('position', new THREE.BufferAttribute(haloPos, 3));
      haloGeo.setAttribute('color', new THREE.BufferAttribute(haloCol, 3));
      const haloMat = new THREE.PointsMaterial({
        size: 0.04,
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
      const haloPosAttr = haloGeo.getAttribute('position') as THREEType.BufferAttribute;

      const tick = () => {
        if (disposed) return;
        raf = requestAnimationFrame(tick);
        if (document.hidden || !inView) return;
        const dt = clock.getDelta();
        const t = clock.getElapsedTime();

        /* Cube — slow rotation + breathing pulse */
        cubeMat.uniforms.uTime.value = t;
        cubeMat.uniforms.uPulse.value = 0.5 + 0.5 * Math.sin(t * 0.6);
        cube.rotation.y = t * 0.10;
        cube.rotation.x = Math.sin(t * 0.18) * 0.10;
        cube.position.y = 0.7 + Math.sin(t * 0.55) * 0.15;

        /* Core light pulses */
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.6);
        core.scale.setScalar(0.85 + pulse * 0.55);
        coreMat.opacity = 0.55 + pulse * 0.40;
        core.position.copy(cube.position);

        /* Beam follows cube + slight pulse */
        beam.position.x = cube.position.x;
        beam.position.z = cube.position.z - 0.2;
        beam.rotation.y = Math.sin(t * 0.18) * 0.04;
        (beamMat.uniforms.uColorTop.value as THREEType.Color).setHSL(
          0.085,
          1.0,
          0.50 + pulse * 0.10,
        );

        /* Water animates via shader uTime */
        waterMat.uniforms.uTime.value = t;

        /* Halo slow drift — particles bob in place */
        for (let i = 0; i < HALO_COUNT; i++) {
          const baseY = haloPos[i * 3 + 1];
          haloPosAttr.array[i * 3 + 1] = baseY + Math.sin(t * 0.5 + i * 0.13) * 0.08;
        }
        haloPosAttr.needsUpdate = true;

        /* Camera cinematic motion */
        pointer.x += (pointer.tx - pointer.x) * 0.045;
        pointer.y += (pointer.ty - pointer.y) * 0.045;
        const breathe = Math.sin(t * 0.55) * 0.3;
        camera.position.x = pointer.x * 0.7;
        camera.position.y = 1.2 - pointer.y * 0.4;
        camera.position.z = 12 + breathe + scrollProgress * 7;
        camera.lookAt(0, 0.4, 0);

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
        cubeGeo.dispose();
        cubeMat.dispose();
        coreGeo.dispose();
        coreMat.dispose();
        beamGeo.dispose();
        beamMat.dispose();
        waterGeo.dispose();
        waterMat.dispose();
        mountainGeoLeft.dispose();
        (mountainLeft.material as THREEType.Material).dispose();
        mountainGeoRight.dispose();
        (mountainRight.material as THREEType.Material).dispose();
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
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}
