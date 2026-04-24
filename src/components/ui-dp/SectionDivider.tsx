'use client';

import { motion, useInView } from '@/lib/framer-compat';
import { useRef } from 'react';

type DividerVariant = 'wave' | 'curve' | 'angle';

interface SectionDividerProps {
  variant?: DividerVariant;
  flip?: boolean;
  className?: string;
}

export function SectionDivider({ variant = 'wave', flip = false, className = '' }: SectionDividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        height: '70px',
        transform: flip ? 'scaleY(-1)' : undefined,
        marginTop: '-1px',
        marginBottom: '-1px',
      }}
      aria-hidden="true"
    >
      {variant === 'wave' && <WaveSVG />}
      {variant === 'curve' && <CurveSVG />}
      {variant === 'angle' && <AngleSVG />}
    </motion.div>
  );
}

function WaveSVG() {
  return (
    <svg
      viewBox="0 0 1440 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="wave-grad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B45309" stopOpacity="0" />
          <stop offset="20%" stopColor="#D97706" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.35" />
          <stop offset="80%" stopColor="#D97706" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wave-grad-inner" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D97706" stopOpacity="0" />
          <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.2" />
          <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Primary wave */}
      <path
        d="M0 45 C240 10, 480 65, 720 35 C960 5, 1200 55, 1440 30"
        stroke="url(#wave-grad)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Secondary wave — offset for depth */}
      <path
        d="M0 38 C300 60, 600 15, 900 42 C1100 58, 1300 20, 1440 40"
        stroke="url(#wave-grad-inner)"
        strokeWidth="1"
        fill="none"
      />
      {/* Subtle filled area beneath the primary wave */}
      <path
        d="M0 45 C240 10, 480 65, 720 35 C960 5, 1200 55, 1440 30 L1440 70 L0 70 Z"
        fill="url(#wave-grad)"
        opacity="0.08"
      />
    </svg>
  );
}

function CurveSVG() {
  return (
    <svg
      viewBox="0 0 1440 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="curve-grad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D97706" stopOpacity="0" />
          <stop offset="25%" stopColor="#F59E0B" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.4" />
          <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="curve-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Soft glow behind the curve */}
      <ellipse cx="720" cy="35" rx="500" ry="25" fill="url(#curve-glow)" />
      {/* Main arc */}
      <path
        d="M0 55 Q720 -10, 1440 55"
        stroke="url(#curve-grad)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner lighter arc */}
      <path
        d="M100 52 Q720 5, 1340 52"
        stroke="url(#curve-grad)"
        strokeWidth="0.75"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

function AngleSVG() {
  return (
    <svg
      viewBox="0 0 1440 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="angle-grad" x1="0" y1="35" x2="1440" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B45309" stopOpacity="0" />
          <stop offset="15%" stopColor="#D97706" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.35" />
          <stop offset="85%" stopColor="#D97706" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="angle-fill" x1="720" y1="20" x2="720" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D97706" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Angled line pair — like a shallow chevron pointing down */}
      <path
        d="M0 50 L720 20 L1440 50"
        stroke="url(#angle-grad)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M0 50 L720 20 L1440 50 L1440 70 L0 70 Z"
        fill="url(#angle-fill)"
      />
      {/* Second subtle line */}
      <path
        d="M100 53 L720 28 L1340 53"
        stroke="url(#angle-grad)"
        strokeWidth="0.75"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}
