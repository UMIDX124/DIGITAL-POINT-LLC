'use client';

import { useEffect, useRef } from 'react';
import type * as THREEType from 'three';

/**
 * Hero3DStage v6 — Phase 20.1.8 character pass.
 *
 * v5 (faceted icosahedron) read as decorative geometry, not a brand
 * subject. UF: "ye 3d object pointless, zero character. koi 3d bot
 * banao animation ke saath." v6 replaces the icosahedron with the
 * DPL brand mascot (rounded amber head + two eyes + smile + side
 * ears + antenna with pulsing bulb), built from Three.js primitives
 * with proper PBR materials and character animation.
 *
 * Bot anatomy (Group hierarchy):
 *   bot
 *     head        (IcosahedronGeometry compressed to soft-cube)
 *     eyeL/eyeR   (SphereGeometry — cream emissive)
 *     pupilL/R    (SphereGeometry — dark, lerp toward pointer)
 *     smile       (TorusGeometry half — cream emissive)
 *     earL/earR   (CylinderGeometry along x-axis — darker amber)
 *     antenna     (CylinderGeometry stalk + SphereGeometry bulb)
 *
 * Animation:
 *   - group.position.y: sin(t*0.55) * 0.12 (gentle hover)
 *   - group.rotation.y: lerp toward pointer.x * 0.4
 *   - group.rotation.x: lerp toward pointer.y * 0.2
 *   - blink: every ~5s, eye scale.y goes 1 → 0.08 → 1 over 240ms
 *   - antenna bulb: emissive intensity sin(t*1.6) + scale pulse
 *   - pupils: lerp world position toward pointer for "tracking"
 *
 * Atmosphere upgrades over v5:
 *   - fog density 0.055 → 0.075 (deeper haze)
 *   - tone mapping exposure 1.05 → 0.88 (richer shadows)
 *   - ambient light 0.18 → 0.10 (stronger contrast)
 *   - back rim light intensity bumped + jade-tinted secondary
 *
 * Stage retained from v5: hex grid floor, beam, accent ring,
 * particle field with shader bob (zero per-frame JS).
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
      renderer.toneMappingExposure = 0.88;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x080706, 0.075);

      const camera = new THREE.PerspectiveCamera(
        38,
        container.clientWidth / container.clientHeight,
        0.1,
        80,
      );
      camera.position.set(0, 1.2, 11);
      camera.lookAt(1.6, 0.6, 0);

      /* === Lights === */
      const ambient = new THREE.AmbientLight(0xfff0d4, 0.10);
      scene.add(ambient);

      // Key light — amber from above-front
      const keyLight = new THREE.DirectionalLight(0xff8800, 1.4);
      keyLight.position.set(2, 5, 4);
      scene.add(keyLight);

      // Fill — soft cream from front
      const fillLight = new THREE.DirectionalLight(0xfff0d4, 0.45);
      fillLight.position.set(-2, 2, 5);
      scene.add(fillLight);

      // Rim — copper from behind so silhouette pops against fog
      const rimLight = new THREE.DirectionalLight(0xc26f3c, 0.85);
      rimLight.position.set(-3, 3, -5);
      scene.add(rimLight);

      // Inner pulse — point light at bot center for emissive feedback
      const corePulse = new THREE.PointLight(0xff8800, 1.8, 6, 1.6);
      scene.add(corePulse);

      /* === BOT GROUP === */
      const bot = new THREE.Group();
      bot.position.set(2.5, 0.5, 0);
      scene.add(bot);

      // Materials
      const headMat = new THREE.MeshStandardMaterial({
        color: 0xff8800,
        emissive: 0xff8800,
        emissiveIntensity: 0.32,
        metalness: 0.55,
        roughness: 0.32,
      });
      const earMat = new THREE.MeshStandardMaterial({
        color: 0x8c5530,
        emissive: 0xc26f3c,
        emissiveIntensity: 0.18,
        metalness: 0.7,
        roughness: 0.4,
      });
      const eyeMat = new THREE.MeshStandardMaterial({
        color: 0xfff0d4,
        emissive: 0xfff0d4,
        emissiveIntensity: 0.85,
        metalness: 0.0,
        roughness: 0.25,
      });
      const pupilMat = new THREE.MeshStandardMaterial({
        color: 0x080706,
        emissive: 0x080706,
        emissiveIntensity: 0,
        metalness: 0.2,
        roughness: 0.4,
      });
      const smileMat = new THREE.MeshStandardMaterial({
        color: 0xfff0d4,
        emissive: 0xfff0d4,
        emissiveIntensity: 0.65,
        metalness: 0.0,
        roughness: 0.30,
      });
      const stalkMat = new THREE.MeshStandardMaterial({
        color: 0x6b3a1f,
        metalness: 0.85,
        roughness: 0.35,
      });
      const bulbMat = new THREE.MeshStandardMaterial({
        color: 0xff8800,
        emissive: 0xff8800,
        emissiveIntensity: 1.4,
        metalness: 0.2,
        roughness: 0.2,
      });

      // Head — soft rounded "cube" via icosahedron + non-uniform scale
      const headGeo = new THREE.IcosahedronGeometry(0.95, 4);
      const head = new THREE.Mesh(headGeo, headMat);
      head.scale.set(1.10, 0.96, 1.02);
      bot.add(head);

      // Side ears (headphone-style)
      const earGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.20, 24, 1);
      const earL = new THREE.Mesh(earGeo, earMat);
      earL.position.set(-0.95, 0, 0);
      earL.rotation.z = Math.PI / 2;
      bot.add(earL);
      const earR = new THREE.Mesh(earGeo, earMat);
      earR.position.set(0.95, 0, 0);
      earR.rotation.z = Math.PI / 2;
      bot.add(earR);

      // Eyes (whites)
      const eyeGeo = new THREE.SphereGeometry(0.20, 24, 20);
      const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
      eyeL.position.set(-0.30, 0.12, 0.78);
      bot.add(eyeL);
      const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
      eyeR.position.set(0.30, 0.12, 0.78);
      bot.add(eyeR);

      // Pupils (dark dots that lerp toward pointer)
      const pupilGeo = new THREE.SphereGeometry(0.085, 16, 14);
      const pupilL = new THREE.Mesh(pupilGeo, pupilMat);
      pupilL.position.set(-0.30, 0.12, 0.95);
      bot.add(pupilL);
      const pupilR = new THREE.Mesh(pupilGeo, pupilMat);
      pupilR.position.set(0.30, 0.12, 0.95);
      bot.add(pupilR);

      // Smile — half-torus arc
      const smileGeo = new THREE.TorusGeometry(0.22, 0.040, 10, 28, Math.PI);
      const smile = new THREE.Mesh(smileGeo, smileMat);
      smile.position.set(0, -0.30, 0.85);
      smile.rotation.z = Math.PI; // arc opens upward (smile)
      bot.add(smile);

      // Antenna stalk + bulb
      const stalkGeo = new THREE.CylinderGeometry(0.028, 0.028, 0.45, 14);
      const stalk = new THREE.Mesh(stalkGeo, stalkMat);
      stalk.position.set(0, 1.05, 0);
      bot.add(stalk);
      const bulbGeo = new THREE.SphereGeometry(0.10, 18, 16);
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.position.set(0, 1.32, 0);
      bot.add(bulb);

      // Inner glow sphere (additive) inside head — subtle warm core
      const innerGlowGeo = new THREE.SphereGeometry(0.55, 16, 16);
      const innerGlowMat = new THREE.MeshBasicMaterial({
        color: 0xffae5b,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      });
      const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat);
      bot.add(innerGlow);

      /* === Beam (kept from v5, follows bot) === */
      const beamGeo = new THREE.ConeGeometry(2.4, 11, 64, 1, true);
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
            vRadial = length(position.xz) / 2.4;
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
            float a = (1.0 - yNorm) * 0.92 * radialFade;
            vec3 col = mix(uColorBottom, uColorTop, yNorm);
            gl_FragColor = vec4(col, clamp(a, 0.0, 0.85));
          }
        `,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.rotation.z = Math.PI;
      beam.position.set(2.5, 6.2, -0.2);
      scene.add(beam);

      /* === HEX GRID FLOOR === */
      const HEX_R = 0.9;
      const HEX_W = HEX_R * Math.sqrt(3);
      const ROWS = 18;
      const COLS = 22;
      const lineVerts: number[] = [];
      const lineColors: number[] = [];
      const cAmber = new THREE.Color(0xff8800);
      const cCopper = new THREE.Color(0xc26f3c);
      const cDim = new THREE.Color(0x110a06);

      for (let r = -ROWS / 2; r < ROWS / 2; r++) {
        for (let c = -COLS / 2; c < COLS / 2; c++) {
          const cx = c * HEX_W + (r % 2 === 0 ? 0 : HEX_W / 2);
          const cz = r * HEX_R * 1.5;
          const distFromCenter = Math.sqrt(cx * cx + cz * cz);
          const t = Math.min(1, distFromCenter / 16);
          const tint = cAmber.clone().lerp(cDim, 0.40 + t * 0.55);

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
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const hex = new THREE.LineSegments(hexGeo, hexMat);
      hex.position.set(0, -1.5, 0);
      scene.add(hex);

      // Copper accent ring under bot
      const ringGeo = new THREE.RingGeometry(2.0, 2.25, 64, 1);
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
      ring.position.set(2.5, -1.49, 0);
      scene.add(ring);

      /* === PARTICLES (shader-bobbed, 800 count) === */
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
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            float alpha = smoothstep(0.5, 0.0, d) * 0.85;
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
      window.addEventListener('pointermove', onPointer, { passive: true });
      let scrollProgress = 0;
      let cachedHeight = container.clientHeight || window.innerHeight;

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

      // Mark canvas active for fallback fade-out.
      container.classList.add('is-canvas-active');

      /* === Render loop === */
      const clock = new THREE.Clock();
      let raf = 0;

      // Blink state — eye scale.y goes 1 → 0.08 → 1 around random intervals.
      let nextBlinkAt = 1.5 + Math.random() * 3;
      let blinkProgress = 1; // 1 = fully open; 0..1 transient during blink
      let blinkPhase: 'idle' | 'closing' | 'opening' = 'idle';
      let blinkStart = 0;
      const BLINK_DUR = 0.12;

      const tick = () => {
        if (disposed) return;
        raf = requestAnimationFrame(tick);
        if (document.hidden || !inView) return;
        const t = clock.getElapsedTime();

        // Scroll progress (cheap)
        scrollProgress = Math.max(0, Math.min(1, (window.scrollY || 0) / cachedHeight));

        // Pointer smoothing
        pointer.x += (pointer.tx - pointer.x) * 0.045;
        pointer.y += (pointer.ty - pointer.y) * 0.045;

        const pulse = 0.5 + 0.5 * Math.sin(t * 0.6);
        const bulbPulse = 0.5 + 0.5 * Math.sin(t * 1.6);

        /* Bot group — gentle hover + look toward pointer */
        bot.position.x = 2.5;
        bot.position.y = 0.5 + Math.sin(t * 0.55) * 0.12;
        bot.rotation.y = pointer.x * 0.40;
        bot.rotation.x = -pointer.y * 0.18;

        /* Pupils — track pointer further than head rotates */
        const pupilOffsetX = pointer.x * 0.06;
        const pupilOffsetY = -pointer.y * 0.05;
        pupilL.position.x = -0.30 + pupilOffsetX;
        pupilL.position.y = 0.12 + pupilOffsetY;
        pupilR.position.x = 0.30 + pupilOffsetX;
        pupilR.position.y = 0.12 + pupilOffsetY;

        /* Blink state machine */
        if (blinkPhase === 'idle' && t >= nextBlinkAt) {
          blinkPhase = 'closing';
          blinkStart = t;
        }
        if (blinkPhase === 'closing') {
          const k = Math.min(1, (t - blinkStart) / BLINK_DUR);
          blinkProgress = 1 - k;
          if (k >= 1) {
            blinkPhase = 'opening';
            blinkStart = t;
          }
        } else if (blinkPhase === 'opening') {
          const k = Math.min(1, (t - blinkStart) / BLINK_DUR);
          blinkProgress = k;
          if (k >= 1) {
            blinkPhase = 'idle';
            nextBlinkAt = t + 2.5 + Math.random() * 4;
          }
        }
        const eyeOpen = 0.08 + blinkProgress * 0.92;
        eyeL.scale.y = eyeOpen;
        eyeR.scale.y = eyeOpen;
        pupilL.scale.y = Math.max(0.05, eyeOpen);
        pupilR.scale.y = Math.max(0.05, eyeOpen);

        /* Head emissive subtle pulse */
        headMat.emissiveIntensity = 0.28 + pulse * 0.18;

        /* Antenna bulb pulse — emissive + scale */
        bulbMat.emissiveIntensity = 0.9 + bulbPulse * 1.0;
        const bulbScale = 0.95 + bulbPulse * 0.18;
        bulb.scale.setScalar(bulbScale);

        /* Inner head glow */
        innerGlow.scale.setScalar(0.95 + pulse * 0.20);
        innerGlowMat.opacity = 0.18 + pulse * 0.14;
        innerGlow.position.copy(bot.position);
        innerGlow.position.x = bot.position.x;

        /* Core point light follows bot, pulses */
        corePulse.position.set(bot.position.x, bot.position.y + 0.1, 0.5);
        corePulse.intensity = 1.4 + pulse * 1.0;

        /* Beam follows bot x */
        beam.position.x = bot.position.x;
        beam.position.z = -0.2;
        beam.rotation.y = Math.sin(t * 0.18) * 0.04;

        /* Ring follows bot x */
        ring.position.x = bot.position.x;

        /* Hex floor — slow scroll toward camera */
        hex.position.z = (t * 0.25) % 1.35;

        /* Halo bob via shader */
        haloMat.uniforms.uTime.value = t;

        /* Camera */
        const breathe = Math.sin(t * 0.55) * 0.20;
        camera.position.x = pointer.x * 0.5;
        camera.position.y = 1.2 - pointer.y * 0.3;
        camera.position.z = 11 + breathe + scrollProgress * 6;
        camera.lookAt(1.6, 0.6, 0);

        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        disposed = true;
        cancelAnimationFrame(raf);
        container.classList.remove('is-canvas-active');
        window.removeEventListener('pointermove', onPointer);
        ro.disconnect();
        io.disconnect();
        // Dispose every geometry + material we created.
        headGeo.dispose();
        headMat.dispose();
        earGeo.dispose();
        earMat.dispose();
        eyeGeo.dispose();
        eyeMat.dispose();
        pupilGeo.dispose();
        pupilMat.dispose();
        smileGeo.dispose();
        smileMat.dispose();
        stalkGeo.dispose();
        stalkMat.dispose();
        bulbGeo.dispose();
        bulbMat.dispose();
        innerGlowGeo.dispose();
        innerGlowMat.dispose();
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
          'radial-gradient(ellipse 130% 95% at 60% 55%, rgba(48, 28, 18, 0.85) 0%, rgba(18, 12, 9, 0.65) 35%, rgba(8, 7, 6, 0.95) 75%, rgba(0, 0, 0, 1) 100%)',
      }}
    >
      {/* Phase 20.1.8 mobile / reduced-motion / low-CPU fallback.
          SVG bot silhouette mirroring the live 3D character: rounded
          head, two eyes, smile arc, side ears, antenna with bulb. */}
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
          <radialGradient id="hero-bot-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(255,168,51,0.85)" />
            <stop offset="55%" stopColor="rgba(255,136,0,0.40)" />
            <stop offset="100%" stopColor="rgba(255,136,0,0.0)" />
          </radialGradient>
          <linearGradient id="hero-bot-head" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff8800" />
            <stop offset="100%" stopColor="#a04f1e" />
          </linearGradient>
        </defs>

        {/* atmospheric beam */}
        <polygon points="335,0 465,0 520,360 280,360" fill="url(#hero-beam)" opacity="0.85" />

        {/* horizon grid */}
        <g stroke="rgba(255,168,51,0.32)" strokeWidth="1" fill="none">
          <line x1="0" y1="380" x2="800" y2="380" />
          <line x1="-120" y1="430" x2="920" y2="430" opacity="0.7" />
          <line x1="-260" y1="490" x2="1060" y2="490" opacity="0.5" />
          <line x1="320" y1="380" x2="280" y2="500" opacity="0.7" />
          <line x1="400" y1="380" x2="400" y2="500" opacity="0.85" />
          <line x1="480" y1="380" x2="520" y2="500" opacity="0.7" />
        </g>

        {/* bot glow halo */}
        <circle cx="400" cy="260" r="170" fill="url(#hero-bot-glow)" opacity="0.85" />

        {/* bot — anchored at (400, 260), 300px square */}
        <g transform="translate(400 260)">
          {/* antenna */}
          <line x1="0" y1="-90" x2="0" y2="-130" stroke="#6b3a1f" strokeWidth="3" />
          <circle cx="0" cy="-138" r="11" fill="#ff8800" />
          <circle cx="0" cy="-138" r="11" fill="rgba(255,240,212,0.85)" opacity="0.45" />

          {/* ears */}
          <ellipse cx="-95" cy="0" rx="14" ry="22" fill="#7d4823" stroke="rgba(194,111,60,0.6)" strokeWidth="1.5" />
          <ellipse cx="95" cy="0" rx="14" ry="22" fill="#7d4823" stroke="rgba(194,111,60,0.6)" strokeWidth="1.5" />

          {/* head */}
          <rect x="-85" y="-78" width="170" height="148" rx="36" ry="36" fill="url(#hero-bot-head)" stroke="rgba(255,240,212,0.45)" strokeWidth="1.5" />

          {/* eye whites */}
          <circle cx="-30" cy="0" r="20" fill="#fff0d4" />
          <circle cx="30" cy="0" r="20" fill="#fff0d4" />
          {/* pupils */}
          <circle cx="-30" cy="0" r="9" fill="#080706" />
          <circle cx="30" cy="0" r="9" fill="#080706" />

          {/* smile */}
          <path d="M -22 38 Q 0 56 22 38" stroke="#fff0d4" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>

        {/* ground reflection ring */}
        <ellipse cx="400" cy="400" rx="160" ry="14" fill="none" stroke="rgba(194,111,60,0.55)" strokeWidth="1.5" />
      </svg>

      <canvas ref={canvasRef} className="block h-full w-full hero-3d-canvas" style={{ display: 'block' }} />
    </div>
  );
}
