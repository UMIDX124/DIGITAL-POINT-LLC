'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

export function HeroSection() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const yPlanets = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section 
      ref={ref} 
      className="relative min-h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Base gradient — static on mobile, animated on desktop */}
      <div className="absolute inset-0">
        {isMobile ? (
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #0d0815 0%, #1a0a2e 25%, #2d1b4e 50%, #4a1942 75%, #2d1b4e 100%)',
            }}
          />
        ) : (
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(180deg, #0d0815 0%, #1a0a2e 25%, #2d1b4e 50%, #4a1942 75%, #2d1b4e 100%)',
                'linear-gradient(180deg, #0a0510 0%, #1d0f33 25%, #3d1a5e 50%, #5a1a4a 75%, #2d1b4e 100%)',
                'linear-gradient(180deg, #0d0815 0%, #1a0a2e 25%, #2d1b4e 50%, #4a1942 75%, #2d1b4e 100%)',
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* Nebula layers — static on mobile, animated on desktop */}
      {isMobile ? (
        <>
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
        </>
      ) : (
        <>
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.15, 1],
              x: [0, 20, 0],
              y: [0, -10, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(157,78,221,0.25) 0%, transparent 50%)',
            }}
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.25, 1],
              x: [0, -30, 0],
              y: [0, 15, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 80% 60%, rgba(123,44,191,0.2) 0%, transparent 50%)',
            }}
          />
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 100% 80% at 50% 80%, rgba(255,107,157,0.1) 0%, transparent 50%)',
            }}
          />
          <motion.div
            animate={{
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(199,125,255,0.15) 0%, transparent 50%)',
            }}
          />
        </>
      )}

      {/* Planets — static on mobile, animated on desktop */}
      <motion.div
        style={isMobile ? undefined : { y: yPlanets }}
        className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
      >
        {/* Large primary planet */}
        <div
          className="absolute top-[8%] -right-[15%] w-36 h-36 md:w-64 md:h-64 lg:w-80 lg:h-80 md:right-[5%] md:top-[15%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #9d4edd 0%, #7b2cbf 40%, #5a189a 70%, #3c096c 100%)',
            boxShadow: '0 0 100px rgba(157,78,221,0.6), 0 0 150px rgba(123,44,191,0.4), inset -20px -20px 60px rgba(60,9,108,0.8)',
          }}
        />

        {/* Secondary moon */}
        <div
          className="absolute top-[12%] right-[15%] w-12 h-12 md:w-28 md:h-28 md:top-[25%] md:right-[25%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #e0aaff 0%, #c77dff 50%, #9d4edd 100%)',
            boxShadow: '0 0 50px rgba(224,170,255,0.5), inset -8px -8px 20px rgba(157,78,221,0.6)',
          }}
        />

        {/* Small distant moon */}
        <div
          className="absolute top-[5%] right-[35%] w-6 h-6 md:w-14 md:h-14 md:top-[32%] md:right-[40%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 40% 40%, #f4d3ff 0%, #e0aaff 60%, #c77dff 100%)',
            boxShadow: '0 0 25px rgba(244,211,255,0.6)',
          }}
        />

        {/* Red planet */}
        <div
          className="absolute top-[12%] left-[12%] w-5 h-5 md:w-8 md:h-8 rounded-full"
          style={{
            background: 'radial-gradient(circle, #ff6b9d 0%, #c9184a 100%)',
            boxShadow: '0 0 20px rgba(255,107,157,0.7)',
            opacity: 0.6,
          }}
        />

        {/* Blue planet */}
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
        style={{
          background: 'linear-gradient(to top, #0d0815 0%, transparent 100%)',
        }}
      />

      {/* Terrain texture overlay */}
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

      {/* Hero logo removed — was causing performance issues with 2.8MB image + multiple blur animations */}

      {/* Floating Dashboard Cards - Right Side */}
      <div className="absolute right-[5%] lg:right-[8%] top-1/2 -translate-y-1/2 z-[5] hidden lg:flex flex-col gap-6">
        {/* Growth Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, -12, 0],
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.5 },
            x: { duration: 0.8, delay: 0.5 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="w-72 rounded-2xl p-5 backdrop-blur-xl"
          style={{
            background: 'rgba(157, 78, 221, 0.1)',
            border: '1px solid rgba(199, 125, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(157, 78, 221, 0.2), 0 0 60px rgba(157, 78, 221, 0.1)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60 text-sm font-medium">Growth Dashboard</span>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-6 h-6 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #c77dff, #ff6b9d, #c77dff)',
              }}
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
            
            {/* Mini Chart */}
            <div className="flex items-end gap-1 h-12 pt-2">
              {[40, 65, 45, 80, 55, 90, 70, 95, 85, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
                  className="flex-1 rounded-t"
                  style={{
                    background: `linear-gradient(to top, #7b2cbf, #c77dff)`,
                    opacity: 0.6 + (i * 0.04),
                  }}
                />
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-[#9080a0] pt-1">
              <span>Leads: 2,847</span>
              <span>CAC: $43.70</span>
            </div>
          </div>
        </motion.div>

        {/* Active Campaigns Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, 8, 0],
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.7 },
            x: { duration: 0.8, delay: 0.7 },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
          }}
          className="w-72 rounded-2xl p-5 backdrop-blur-xl"
          style={{
            background: 'rgba(157, 78, 221, 0.1)',
            border: '1px solid rgba(199, 125, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(157, 78, 221, 0.2), 0 0 60px rgba(157, 78, 221, 0.1)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60 text-sm font-medium">Active Campaigns</span>
            <div className="flex items-center gap-1">
              <motion.span 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-green-400"
              />
              <span className="text-green-400 text-xs">Live</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { name: 'Meta - Lookalike', roas: '4.2x', spend: '$12,400' },
              { name: 'Google - Brand', roas: '6.8x', spend: '$4,200' },
              { name: 'YouTube - Retarget', roas: '3.1x', spend: '$8,100' },
            ].map((campaign, i) => (
              <motion.div 
                key={campaign.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
                className="flex items-center justify-between p-2 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.03)' }}
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
              }}
            >
              <span className="relative flex h-2 w-2">
                <motion.span 
                  className="absolute inline-flex h-full w-full rounded-full bg-[#e0aaff]"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c77dff]"></span>
              </span>
              <span className="text-[#e0aaff] text-xs sm:text-sm">For companies spending $10k–$200k/month on ads</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Your ad spend works.{' '}
              <motion.span 
                className="bg-gradient-to-r from-[#e0aaff] via-[#c77dff] to-[#ff6b9d] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 100%' }}
              >
                Your tracking doesn&apos;t.
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[#b794c7] text-lg mt-6 max-w-xl leading-relaxed"
            >
              You know something&apos;s broken. You can&apos;t prove it. We build the systems that show exactly what&apos;s working, what isn&apos;t, and what to fix next.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Link href="/free-growth-audit">
                <motion.span
                  className="relative inline-flex px-8 py-4 text-lg font-semibold text-white rounded-xl overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 50%, #c77dff 100%)',
                    boxShadow: '0 4px 20px rgba(123,44,191,0.4)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Find What&apos;s Broken
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.span>
              </Link>
              <Link
                href="/results"
                className="px-8 py-4 text-lg font-medium text-white/80 rounded-xl transition-all duration-300 hover:text-white hover:bg-white/5 inline-block"
                style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                See Case Studies
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-wrap gap-x-6 gap-y-2 mt-12"
            >
              {[
                '8+ Years',
                'No sales call',
                'Co-Founder review',
                'Clear next steps',
              ].map((chip, idx) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + idx * 0.1 }}
                  className="flex items-center gap-2 text-[#9090a0] text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c77dff]" />
                  {chip}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5]"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <motion.div 
            className="w-1.5 h-3 rounded-full bg-[#c77dff]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
