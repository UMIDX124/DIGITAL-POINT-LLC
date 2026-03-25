'use client';

import { motion } from 'framer-motion';
import { FadeUp } from '@/components/ui-dp/AnimatedElements';
import { GooglePartnerBadge } from '@/components/GooglePartnerBadge';

const metrics = [
  { value: '8+', label: 'Years in Market' },
  { value: '$50M+', label: 'Ad Spend Managed' },
  { value: '200+', label: 'Audits Delivered' },
  { value: '4.2x', label: 'Avg Client ROAS' },
];

export function ProofBar() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(13,8,21,0) 0%, rgba(157,78,221,0.05) 50%, rgba(13,8,21,0) 100%)',
          borderTop: '1px solid rgba(199, 125, 255, 0.08)',
          borderBottom: '1px solid rgba(199, 125, 255, 0.08)',
        }}
      />

      <div className="container-wide relative z-10">
        <FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 items-center">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="font-display text-3xl md:text-4xl font-bold mb-1"
                  style={{
                    background: 'linear-gradient(90deg, #e0aaff, #c77dff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {metric.value}
                </div>
                <div className="text-[#9080a0] text-sm">{metric.label}</div>
              </motion.div>
            ))}

            {/* Google Partner Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center col-span-2 md:col-span-1"
            >
              <GooglePartnerBadge size="sm" />
              <div className="text-[#9080a0] text-sm mt-1">Certified Partner</div>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
