'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import type { Mesh } from 'three';

function Geometry() {
  const meshRef = useRef<Mesh>(null);
  const { viewport } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      target.current.x = y * 0.25;
      target.current.y = x * 0.25;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x += (target.current.x - meshRef.current.rotation.x) * 0.04;
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.35;

  return (
    <Icosahedron ref={meshRef} args={[1, 1]} scale={scale}>
      <meshStandardMaterial
        color="#D97706"
        emissive="#92400E"
        emissiveIntensity={0.15}
        roughness={0.4}
        metalness={0.7}
        flatShading
      />
    </Icosahedron>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 2]} intensity={1.2} color="#F5F1E8" />
      <directionalLight position={[-2, -1, 1]} intensity={0.4} color="#FBBF24" />
      <Geometry />
    </>
  );
}

export function HeroOrnament() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (!mounted || reduced) {
    return <Fallback />;
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Fallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div
        className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, #FBBF24 0%, #F59E0B 30%, #D97706 60%, #92400E 90%)',
        }}
      />
    </div>
  );
}

export default HeroOrnament;
