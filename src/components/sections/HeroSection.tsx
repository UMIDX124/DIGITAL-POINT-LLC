'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, useEffect, memo } from 'react';
import { cn } from '@/lib/utils';

/** Memoized mini chart bar to prevent re-renders */
const ChartBar = memo(function ChartBar({ h, i }: { h: number; i: number }) {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: `${h}%` }}
      transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
      className="flex-1 rounded-t"
      style={{
        background: 'linear-gradient(to top, #7b2cbf, #c77dff)',
        opacity: 0.6 + (i * 0.04),
        willChange: 'height',
      }}
    />
  );
});

/** Memoized campaign row */
const CampaignRow = memo(function CampaignRow({ campaign, i }: { campaign: { name: string; roas: string; spend: string }; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
      className="flex items-center justify-between p-2 rounded-lg"
      style={{ background: 'rgba(255,255,255,0.03)', willChange: 'transform, opacity' }}
    >
      <div>
        <div className="text-white text-sm">{campaign.name}</div>
        <div className="text-[#9080a0] text-xs">{campaign.spend}/mo</div>
      </div>
      <div
        className="text-sm font-medium"
        style={{
          background: 'linear-gradient(90deg, #c77dff, #ff6b9d)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {campaign.roas}
      </div>
    </motion.div>
  );
});

const chartData = [40, 65, 45, 80, 55, 90, 70, 95, 85, 100];
const campaigns = [
  { name: 'Meta - Lookalike', roas: '4.2x', spend: '$12,400' },
  { name: 'Google - Brand', roas: '6.8x', spend: '$4,200' },
  { name: 'YouTube - Retarget', roas: '3.1x', spend: '$8,100' },
];
const trustChips = ['8+ Years', 'No sales call', 'Co-Founder review', 'Clear next steps'];

export function HeroSection() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check once on mount — no resize listener to save main thread
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const yPlanets = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden animate-fade-in"
    >
      {/* Base gradient — CSS animation instead of framer-motion infinite */}
      <div className="absolute inset-0">
        <div
          className={cn('absolute inset-0', !isMobile && 'hero-bg-animate')}
          style={{
            background: 'linear-gradient(180deg, #0d0815 0%, #1a0a2e 25%, #2d1b4e 50%, #4a1942 75%, #2d1b4e 100%)',
          }}
        />
      </div>

      {/* Nebula layers — CSS opacity animations instead of framer-motion infinite loops */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(157,78,221,0.2) 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 60%, rgba(123,44,191,0.15) 0%, transparent 50%)',
        }}
      />
      {!isMobile && (
        <>
          <div
            className="absolute inset-0 animate-nebula-1"
            style={{
              background: 'radial-gradient(ellipse 100% 80% at 50% 80%, rgba(255,107,157,0.1) 0%, transparent 50%)',
            }}
          />
          <div
            className="absolute inset-0 animate-nebula-2"
            style={{
              background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(199,125,255,0.15) 0%, transparent 50%)',
            }}
          />
        </>
      )}

      {/* Planets — parallax on desktop, static on mobile */}
      <motion.div
        style={isMobile ? undefined : { y: yPlanets }}
        className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
      >
        <div
          className="absolute top-[8%] -right-[15%] w-36 h-36 md:w-64 md:h-64 lg:w-80 lg:h-80 md:right-[5%] md:top-[15%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #9d4edd 0%, #7b2cbf 40%, #5a189a 70%, #3c096c 100%)',
            boxShadow: '0 0 100px rgba(157,78,221,0.6), 0 0 150px rgba(123,44,191,0.4), inset -20px -20px 60px rgba(60,9,108,0.8)',
          }}
        />
        <div
          className="absolute top-[12%] right-[15%] w-12 h-12 md:w-28 md:h-28 md:top-[25%] md:right-[25%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #e0aaff 0%, #c77dff 50%, #9d4edd 100%)',
            boxShadow: '0 0 50px rgba(224,170,255,0.5), inset -8px -8px 20px rgba(157,78,221,0.6)',
          }}
        />
        <div
          className="absolute top-[5%] right-[35%] w-6 h-6 md:w-14 md:h-14 md:top-[32%] md:right-[40%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 40% 40%, #f4d3ff 0%, #e0aaff 60%, #c77dff 100%)',
            boxShadow: '0 0 25px rgba(244,211,255,0.6)',
          }}
        />
        <div
          className="absolute top-[12%] left-[12%] w-5 h-5 md:w-8 md:h-8 rounded-full"
          style={{
            background: 'radial-gradient(circle, #ff6b9d 0%, #c9184a 100%)',
            boxShadow: '0 0 20px rgba(255,107,157,0.7)',
            opacity: 0.6,
          }}
        />
        <div
          className="absolute bottom-[30%] left-[8%] w-6 h-6 md:w-10 md:h-10 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #a0c4ff 0%, #7b2cbf 100%)',
            boxShadow: '0 0 25px rgba(160,196,255,0.5)',
            opacity: 0.5,
          }}
        />
      </motion.div>

      {/* Terrain gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{ background: 'linear-gradient(to top, #0d0815 0%, transparent 100%)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 20% 100%, rgba(90,24,154,0.3) 0%, transparent 50%),
            radial-gradient(ellipse 80% 100% at 70% 100%, rgba(123,44,191,0.2) 0%, transparent 50%),
            radial-gradient(ellipse 120% 100% at 50% 100%, rgba(61,31,92,0.4) 0%, transparent 60%)
          `,
        }}
      />

      {/* Floating Dashboard Cards — CSS float animation instead of infinite framer-motion y */}
      <div className="absolute right-[5%] lg:right-[8%] top-1/2 -translate-y-1/2 z-[5] hidden lg:flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-72 rounded-2xl p-5 backdrop-blur-xl animate-float-slow"
          style={{
            background: 'rgba(157, 78, 221, 0.1)',
            border: '1px solid rgba(199, 125, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(157, 78, 221, 0.2), 0 0 60px rgba(157, 78, 221, 0.1)',
            willChange: 'transform',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60 text-sm font-medium">Growth Dashboard</span>
            <div
              className="w-6 h-6 rounded-full animate-spin-slow"
              style={{ background: 'conic-gradient(from 0deg, #c77dff, #ff6b9d, #c77dff)' }}
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[#9080a0] text-xs mb-1">Revenue This Month</div>
                <div className="font-display text-2xl font-bold text-white">$124,890</div>
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <span>↑</span>
                <span>+47%</span>
              </div>
            </div>
            <div className="flex items-end gap-1 h-12 pt-2">
              {chartData.map((h, i) => (
                <ChartBar key={i} h={h} i={i} />
              ))}
            </div>
            <div className="flex justify-between text-xs text-[#9080a0] pt-1">
              <span>Leads: 2,847</span>
              <span>CAC: $43.70</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-72 rounded-2xl p-5 backdrop-blur-xl animate-float-slow-reverse"
          style={{
            background: 'rgba(157, 78, 221, 0.1)',
            border: '1px solid rgba(199, 125, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(157, 78, 221, 0.2), 0 0 60px rgba(157, 78, 221, 0.1)',
            willChange: 'transform',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60 text-sm font-medium">Active Campaigns</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs">Live</span>
            </div>
          </div>
          <div className="space-y-3">
            {campaigns.map((campaign, i) => (
              <CampaignRow key={campaign.name} campaign={campaign} i={i} />
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
            <span className="text-[#9080a0] text-xs">Total Active</span>
            <span className="text-white text-sm font-medium">7 campaigns</span>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-[5] flex items-center"
      >
        <div className="w-full px-5 pt-24 pb-20 sm:px-6 md:pt-28 md:pb-24 md:pl-[12%] lg:pl-[14%]">
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(157,78,221,0.15)',
                border: '1px solid rgba(157,78,221,0.3)',
                backdropFilter: 'blur(10px)',
                willChange: 'transform, opacity',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#e0aaff] animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c77dff]"></span>
              </span>
              <span className="text-[#e0aaff] text-xs sm:text-sm">For companies spending $10k-$200k/month on ads</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
              style={{ willChange: 'transform, opacity' }}
            >
              Your ad spend works.{' '}
              <span
                className="bg-gradient-to-r from-[#e0aaff] via-[#c77dff] to-[#ff6b9d] bg-clip-text text-transparent animate-gradient-shift"
                style={{ backgroundSize: '200% 100%' }}
              >
                Your tracking doesn&apos;t.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[#b794c7] text-lg mt-6 max-w-xl leading-relaxed"
            >
              We&apos;ve been there — staring at dashboards that don&apos;t add up, burning budget on &ldquo;trust me, it&apos;s working.&rdquo; We build the systems that show you exactly what&apos;s driving revenue and what&apos;s draining it.
            </motion.p>

            {/* CTA Buttons — CSS hover instead of whileHover/whileTap */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Link href="/free-growth-audit" className="w-full sm:w-auto">
                <span
                  className="relative flex sm:inline-flex w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white rounded-xl overflow-hidden group transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 50%, #c77dff 100%)',
                    boxShadow: '0 4px 20px rgba(123,44,191,0.4)',
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Find What&apos;s Broken
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </span>
              </Link>
              <Link
                href="/results"
                className="px-8 py-4 text-lg font-medium text-white/80 rounded-xl transition-all duration-300 hover:text-white hover:bg-white/5 block sm:inline-block text-center"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
              >
                See Case Studies
              </Link>
            </motion.div>

            {/* Founder note */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[#9080a0] text-sm mt-8 italic max-w-lg"
            >
              &ldquo;Every audit starts with me or Anwaar personally reviewing your setup. No junior associate, no AI-only report. Real eyes on your real numbers.&rdquo;
              <span className="not-italic text-[#c77dff] ml-2">&mdash; Faizan, Co-Founder</span>
            </motion.p>

            {/* Trust Indicators — single animation group instead of per-item framer-motion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-wrap gap-x-6 gap-y-2 mt-8"
            >
              {trustChips.map((chip) => (
                <span
                  key={chip}
                  className="flex items-center gap-2 text-[#9090a0] text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c77dff]" />
                  {chip}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator — CSS animation instead of framer-motion infinite */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] animate-fade-in-delayed">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5 animate-bounce-slow">
          <div className="w-1.5 h-3 rounded-full bg-[#c77dff] animate-pulse" />
        </div>
      </div>

      {/* CSS animations to replace framer-motion infinite loops */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-slow-reverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes nebula-1 {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        @keyframes nebula-2 {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.25; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        @keyframes fade-in-delayed {
          0% { opacity: 0; }
          80% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes hero-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-slow-reverse { animation: float-slow-reverse 5s ease-in-out infinite 0.5s; }
        .animate-gradient-shift { animation: gradient-shift 5s linear infinite; }
        .animate-nebula-1 { animation: nebula-1 20s ease-in-out infinite 5s; }
        .animate-nebula-2 { animation: nebula-2 8s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-fade-in-delayed { animation: fade-in-delayed 2.5s ease forwards; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-fade-in { animation: hero-fade-in 0.8s ease forwards; }
      `}</style>
    </section>
  );
}
