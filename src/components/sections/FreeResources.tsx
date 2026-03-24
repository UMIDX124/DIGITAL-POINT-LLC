'use client';

import Link from 'next/link';
import { BarChart3, Target, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const resources = [
  {
    icon: BarChart3,
    title: 'The ROAS Optimization Framework',
    description: 'Our step-by-step playbook for improving return on ad spend',
    href: '/guides/roas-optimization-guide',
  },
  {
    icon: Target,
    title: 'Marketing Attribution Blueprint',
    description: 'How to build attribution that actually tracks revenue',
    href: '/guides/marketing-attribution-complete-guide',
  },
  {
    icon: TrendingDown,
    title: 'CAC Reduction Checklist',
    description: '30-day action plan to reduce customer acquisition costs',
    href: '/guides/cac-optimization-guide',
  },
] as const;

export function FreeResources() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-wide relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span
            className="text-sm font-medium uppercase tracking-wider mb-4 block"
            style={{
              background: 'linear-gradient(90deg, #e0aaff, #c77dff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Free Resources
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Guides &amp; Frameworks
          </h2>
          <p className="text-[#b794c7] text-lg mt-4 leading-relaxed">
            Actionable playbooks you can implement today — no email required
          </p>
        </div>

        {/* Resource cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {resources.map((resource, index) => {
            const Icon = resource.icon;

            return (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                <Link
                  href={resource.href}
                  className="group relative flex flex-col h-full rounded-2xl overflow-hidden p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(199, 125, 255, 0.06) 0%, transparent 60%)',
                    }}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: 'rgba(157, 78, 221, 0.15)',
                        border: '1px solid rgba(199, 125, 255, 0.2)',
                      }}
                    >
                      <Icon className="w-5 h-5 text-[#c77dff]" />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-semibold text-white mb-2 leading-snug group-hover:text-[#c77dff] transition-colors">
                      {resource.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#7c5a8a] text-sm leading-relaxed flex-1 mb-5">
                      {resource.description}
                    </p>

                    {/* CTA */}
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#c77dff] group-hover:text-[#e0aaff] transition-colors">
                      Read Free Guide
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
