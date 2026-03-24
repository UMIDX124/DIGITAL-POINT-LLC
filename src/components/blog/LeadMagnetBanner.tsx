'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3 } from 'lucide-react';

export function LeadMagnetBanner() {
  return (
    <section
      className="rounded-2xl p-8 md:p-12 text-center my-12"
      style={{
        background: 'linear-gradient(135deg, rgba(123,44,191,0.18) 0%, rgba(13,8,21,0.9) 50%, rgba(157,78,221,0.12) 100%)',
        border: '1px solid rgba(199, 125, 255, 0.2)',
      }}
    >
      <div className="flex justify-center mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)',
            boxShadow: '0 4px 24px rgba(123, 44, 191, 0.4)',
          }}
        >
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
      </div>

      <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
        Get Your Free Growth Audit
      </h3>
      <p className="text-[#b794c7] text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
        We&apos;ll analyze your ad accounts, attribution setup, and conversion funnels.
        No sales pitch&nbsp;&mdash; just clear next steps.
      </p>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Link
          href="/free-growth-audit"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)',
            boxShadow: '0 4px 16px rgba(123, 44, 191, 0.3)',
          }}
        >
          Book Free Audit
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/results"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            color: '#c77dff',
            border: '1px solid rgba(199, 125, 255, 0.3)',
            background: 'rgba(157, 78, 221, 0.08)',
          }}
        >
          See Results First
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
