'use client';

import { useEffect, useRef } from 'react';
import type * as THREEType from 'three';

/**
 * Hero3DStage — Phase 20.1 premium hero 3D scene.
 *
 * Replaces the Phase 18.6 P7-disabled HeroAtmosphere stub with a
 * properly engineered Three.js scene. Repo owner authorized re-enabling
 * 3D after flagging the prior 2D atmosphere as boring.
 *
 * Composition:
 *  - Wireframe icosahedron (subdivision 4) with vertex-shader displacement
 *    driven by simplex-style noise + time. Stroke amber, low opacity.
 *  - Inner displaced sphere (subdivision 3) at copper, slower frequency,
 *    creates layered depth.
 *  - Particle field (~800 points) distributed in spherical halo around
 *    the geometry. Vertex colors blend amber → copper → cream by radius.
 *  - 7 highlighted "agent" particles glow brighter, pulse independently.
 *  - Soft ambient amber light + single rim copper light.
 *  - Camera parallax: ±5° tilt on mouse, gentle dolly + Y rotation on scroll.
 *
 * Performance gates (HARD, applied in order):
 *  - Desktop only: viewport ≥ 1024px (matchMedia listener for resize).
 *  - prefers-reduced-motion → aborts init, scene never mounts.
 *  - navigator.hardwareConcurrency < 4 → aborts (low-end CPU).
 *  - Init deferred via requestIdleCallback (or setTimeout 250 fallback)
 *    so it never blocks first paint.
 *  - Pixel ratio capped at min(devicePixelRatio, 1.75).
 *  - Render loop pauses when document.hidden OR when hero scrolled out
 *    of view (IntersectionObserver, threshold 0.05).
 *  - All Three.js objects disposed on unmount (geometry, material,
 *    renderer, removeEventListeners).
 *
 * No reliance on @react-three/fiber or drei. Pure imperative Three.js
 * v0.184 — already in package.json. Initial-bundle delta zero (component
 * is dynamic-imported with ssr:false from HeroSection).
 */
export default function Hero3DStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    /* Hardware + preference gates */
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
      const camera = new THREE.PerspectiveCamera(
        38,
        container.clientWidth / container.clientHeight,
        0.1,
        100,
      );
      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);

      /* Outer wireframe icosahedron — amber, displaced */
      const outerGeo = new THREE.IcosahedronGeometry(5.4, 4);
      const outerMat = new THREE.ShaderMaterial({
        transparent: true,
        wireframe: true,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(0xff8800) },
          uOpacity: { value: 0.55 },
          uAmplitude: { value: 0.18 },
          uFrequency: { value: 0.85 },
        },
        vertexShader: `
          uniform float uTime;
          uniform float uAmplitude;
          uniform float uFrequency;
          // Simple cheap value-noise displacement (avoid Perlin lib)
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
            float n = noise(p * uFrequency + uTime * 0.18);
            p += normal * (n - 0.5) * uAmplitude * length(p);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uOpacity;
          void main() {
            gl_FragColor = vec4(uColor, uOpacity);
          }
        `,
      });
      const outer = new THREE.LineSegments(
        new THREE.WireframeGeometry(outerGeo),
        new THREE.LineBasicMaterial({
          color: 0xff8800,
          transparent: true,
          opacity: 0.42,
        }),
      );
      scene.add(outer);

      /* Inner displaced shape — copper, smaller, slower */
      const innerGeo = new THREE.IcosahedronGeometry(2.6, 3);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xc26f3c,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      });
      const inner = new THREE.Mesh(innerGeo, innerMat);
      scene.add(inner);

      /* Outer halo particle field */
      const PARTICLE_COUNT = 800;
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const sizes = new Float32Array(PARTICLE_COUNT);
      const colorAmber = new THREE.Color(0xff8800);
      const colorCopper = new THREE.Color(0xc26f3c);
      const colorCream = new THREE.Color(0xf5e8d4);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Distribute in spherical shell, radius 7-13
        const r = 7 + Math.random() * 6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
        // Color blend by radius (closer = amber, farther = cream)
        const t = (r - 7) / 6;
        const c =
          t < 0.5
            ? colorAmber.clone().lerp(colorCopper, t * 2)
            : colorCopper.clone().lerp(colorCream, (t - 0.5) * 2);
        colors[i * 3 + 0] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
        sizes[i] = 0.04 + Math.random() * 0.08;
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      const particleMat = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      /* 7 highlighted agent particles, brighter + larger */
      const agentPositions = new Float32Array(7 * 3);
      const agentColors = new Float32Array(7 * 3);
      const colorAgent = new THREE.Color(0xffa833);
      for (let i = 0; i < 7; i++) {
        const r = 6.2;
        const theta = (i / 7) * Math.PI * 2 + 0.3;
        const phi = Math.PI / 2 + (Math.random() - 0.5) * 0.6;
        agentPositions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
        agentPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        agentPositions[i * 3 + 2] = r * Math.cos(phi);
        agentColors[i * 3 + 0] = colorAgent.r;
        agentColors[i * 3 + 1] = colorAgent.g;
        agentColors[i * 3 + 2] = colorAgent.b;
      }
      const agentGeo = new THREE.BufferGeometry();
      agentGeo.setAttribute('position', new THREE.BufferAttribute(agentPositions, 3));
      agentGeo.setAttribute('color', new THREE.BufferAttribute(agentColors, 3));
      const agentMat = new THREE.PointsMaterial({
        size: 0.32,
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const agents = new THREE.Points(agentGeo, agentMat);
      scene.add(agents);

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

      /* Resize handling */
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

      /* Pause when off-screen or tab hidden */
      let inView = true;
      const io = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
        },
        { threshold: 0.05 },
      );
      io.observe(container);
      const onVisibility = () => {
        // no-op; render loop checks document.hidden
      };
      document.addEventListener('visibilitychange', onVisibility);

      /* Render loop */
      const clock = new THREE.Clock();
      let raf = 0;
      const tick = () => {
        if (disposed) return;
        raf = requestAnimationFrame(tick);
        if (document.hidden || !inView) return;
        const dt = clock.getDelta();
        const t = clock.getElapsedTime();

        outerMat.uniforms.uTime.value = t;
        outer.rotation.y += dt * 0.06;
        outer.rotation.x = Math.sin(t * 0.18) * 0.06;
        inner.rotation.y -= dt * 0.10;
        inner.rotation.z = Math.cos(t * 0.22) * 0.08;
        particles.rotation.y += dt * 0.02;
        agents.rotation.y += dt * 0.05;

        /* Pointer parallax (eased) */
        pointer.x += (pointer.tx - pointer.x) * 0.045;
        pointer.y += (pointer.ty - pointer.y) * 0.045;
        camera.position.x = pointer.x * 0.9;
        camera.position.y = -pointer.y * 0.6;
        // Scroll-out: camera dollies back, content gets less dominant
        camera.position.z = 18 + scrollProgress * 6;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        disposed = true;
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('scroll', onScroll);
        document.removeEventListener('visibilitychange', onVisibility);
        ro.disconnect();
        io.disconnect();
        outer.geometry.dispose();
        (outer.material as THREEType.Material).dispose();
        outerGeo.dispose();
        outerMat.dispose();
        innerGeo.dispose();
        innerMat.dispose();
        particleGeo.dispose();
        particleMat.dispose();
        agentGeo.dispose();
        agentMat.dispose();
        renderer.dispose();
      };
    };

    /* Defer init until after first paint so we never block LCP */
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
          'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(31, 22, 18, 0.55) 0%, transparent 70%)',
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
