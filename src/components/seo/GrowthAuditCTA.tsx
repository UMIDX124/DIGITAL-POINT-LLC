'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface GrowthAuditCTAProps {
  variant?: 'inline' | 'banner' | 'compact';
  title?: string;
  description?: string;
  className?: string;
}

export function GrowthAuditCTA({
  variant = 'banner',
  title = 'Want to find what\'s broken?',
  description = 'Get a free growth audit. No pitch, no commitment — just clarity on what to fix next.',
  className = '',
}: GrowthAuditCTAProps) {
  if (variant === 'compact') {
    return (
      <Link
        href="/free-growth-audit"
        className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
        style={{
          background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)',
          boxShadow: '0 4px 16px rgba(123, 44, 191, 0.3)',
        }}
      >
        Get Your Growth Audit
        <ArrowRight className="w-4 h-4" />
      </Link>
    );
  }

  if (variant === 'inline') {
    return (
      <div
        className={`rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap ${className}`}
        style={{
          background: 'linear-gradient(135deg, rgba(123, 44, 191, 0.12), rgba(157, 78, 221, 0.06))',
          border: '1px solid rgba(199, 125, 255, 0.2)',
        }}
      >
        <div>
          <p className="text-white font-medium text-sm">{title}</p>
          <p className="text-[#9080a0] text-xs mt-0.5">{description}</p>
        </div>
        <Link
          href="/free-growth-audit"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shrink-0"
          style={{
            background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)',
          }}
        >
          Free Audit <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    );
  }

  // Banner variant (default)
  return (
    <div
      className={`rounded-2xl p-8 md:p-10 text-center ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(123, 44, 191, 0.15), rgba(157, 78, 221, 0.08))',
        border: '1px solid rgba(199, 125, 255, 0.2)',
      }}
    >
      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-[#b794c7] text-sm mb-6 max-w-lg mx-auto">{description}</p>
      <Link href="/free-growth-audit">
        <motion.span
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl"
          style={{
            background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)',
            boxShadow: '0 4px 16px rgba(123, 44, 191, 0.3)',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Your Growth Audit
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </Link>
    </div>
  );
}
