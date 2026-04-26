'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { BlogCategory } from '@/lib/blog';

interface InContentCTAProps {
  category?: BlogCategory;
}

const variants: Record<string, { hook: string; heading: string }> = {
  attribution: {
    heading: 'Not sure which channels actually drive revenue?',
    hook: 'Our free audit shows you exactly where to look.',
  },
  paidAds: {
    heading: 'Think your ad spend could work harder?',
    hook: "We'll show you where the waste is — free.",
  },
  default: {
    heading: 'Want a team that actually moves the needle?',
    hook: 'See what a real growth audit looks like.',
  },
};

function getVariant(category?: BlogCategory) {
  if (!category) return variants.default;
  const lower = category.toLowerCase();
  if (lower.includes('attribution') || lower.includes('analytics')) {
    return variants.attribution;
  }
  if (lower.includes('paid') || lower.includes('ads') || lower.includes('cac') || lower.includes('roas')) {
    return variants.paidAds;
  }
  return variants.default;
}

export function InContentCTA({ category }: InContentCTAProps) {
  const variant = getVariant(category);

  return (
    <aside
      className="my-10 rounded-xl py-6 px-6 md:px-8"
      style={{
        background: 'linear-gradient(135deg, rgba(167,139,250,0.08) 0%, rgba(180,83,9,0.04) 100%)',
        borderLeft: '3px solid #7C3AED',
      }}
    >
      <p className="text-white font-display font-semibold text-lg leading-snug mb-1">
        {variant.heading}
      </p>
      <p className="text-[#D6D0C2] text-sm mb-4">
        {variant.hook}
      </p>
      <Link
        href="/free-growth-audit"
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background: 'linear-gradient(135deg, #4338CA 0%, #7C3AED 100%)',
          boxShadow: '0 4px 16px rgba(180,83,9, 0.3)',
        }}
      >
        Get Your Free Audit
        <ArrowRight className="w-4 h-4" />
      </Link>
    </aside>
  );
}
