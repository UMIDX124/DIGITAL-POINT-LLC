'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section, Container, SectionHeader, FadeUp } from '@/components/ui-dp/AnimatedElements';
import { caseStudies } from '@/lib/case-studies';
import { ArrowRight } from 'lucide-react';

export function CaseStudiesPreview() {
  return (
    <Section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0815] via-[#13091e] to-[#0d0815]" />

      <Container className="relative z-10">
        <SectionHeader
          eyebrow="Proven Results"
          title="Client Case Studies"
          description="Real strategies, real outcomes. Here's how we help growth-stage businesses scale."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {caseStudies.map((study, idx) => (
            <FadeUp key={study.slug} delay={idx * 0.1}>
              <motion.div
                className="rounded-2xl p-6 h-full flex flex-col"
                style={{
                  background: 'rgba(13, 8, 21, 0.6)',
                  border: '1px solid rgba(157, 78, 221, 0.2)',
                }}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* Industry tag */}
                <p className="text-[#7c5a8a] text-xs uppercase tracking-wider mb-3">
                  {study.industry}
                </p>

                {/* Title */}
                <h3 className="font-display text-lg font-bold text-white mb-4">
                  {study.title}
                </h3>

                {/* Highlight metric */}
                <div
                  className="rounded-xl p-4 text-center mb-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.12) 0%, rgba(255, 107, 157, 0.08) 100%)',
                    border: '1px solid rgba(157, 78, 221, 0.15)',
                  }}
                >
                  <p
                    className="font-display text-3xl font-bold"
                    style={{ color: '#ff6b9d' }}
                  >
                    {study.highlightMetric}
                  </p>
                  <p className="text-[#7c5a8a] text-xs mt-1">
                    {study.highlightLabel}
                  </p>
                </div>

                {/* Key results */}
                <div className="space-y-2 flex-1">
                  {study.results.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-[#7c5a8a]">{r.label}</span>
                      <span className="font-medium text-[#c77dff]">
                        {r.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* CTA link */}
        <FadeUp delay={0.3}>
          <div className="text-center mt-10">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-[#c77dff] hover:text-[#e0aaff] font-medium transition-colors"
            >
              View All Case Studies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
