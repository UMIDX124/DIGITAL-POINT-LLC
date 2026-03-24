'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section, Container, SectionHeader, FadeUp } from '@/components/ui-dp/AnimatedElements';
import { caseStudies } from '@/lib/case-studies';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 radial-glow" />
        <Container className="relative z-10 pt-28 pb-8">
          <FadeUp>
            <Breadcrumbs
              items={[
                { label: 'Case Studies', href: '/case-studies' },
              ]}
            />
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-6 max-w-4xl">
              Client Results That Speak for Themselves
            </h1>
            <p className="text-[#b794c7] text-lg mt-4 max-w-2xl">
              Real strategies. Measurable outcomes. See how we help growth-stage
              businesses turn ad spend into predictable revenue.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Case Studies */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {caseStudies.map((study, idx) => (
              <FadeUp key={study.slug} delay={idx * 0.1}>
                <motion.div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(13, 8, 21, 0.6)',
                    border: '1px solid rgba(157, 78, 221, 0.2)',
                  }}
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div
                    className="px-6 md:px-8 py-5 flex items-center justify-between"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(157, 78, 221, 0.1) 0%, rgba(13, 8, 21, 0.8) 100%)',
                      borderBottom: '1px solid rgba(157, 78, 221, 0.15)',
                    }}
                  >
                    <div>
                      <p className="text-[#7c5a8a] text-xs uppercase tracking-wider mb-1">
                        {study.industry}
                      </p>
                      <h2 className="font-display text-xl font-bold text-white">
                        {study.title}
                      </h2>
                    </div>
                    <div className="text-right">
                      <p
                        className="font-display text-2xl font-bold"
                        style={{ color: '#ff6b9d' }}
                      >
                        {study.highlightMetric}
                      </p>
                      <p className="text-[#7c5a8a] text-xs">
                        {study.highlightLabel}
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-6 md:px-8 py-6 space-y-6">
                    {/* Problem */}
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-[#9d4edd] font-semibold mb-2">
                        The Problem
                      </h3>
                      <p className="text-[#b794c7] text-sm leading-relaxed">
                        {study.problem}
                      </p>
                    </div>

                    {/* Strategy */}
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-[#c77dff] font-semibold mb-2">
                        Our Strategy
                      </h3>
                      <p className="text-[#b794c7] text-sm leading-relaxed">
                        {study.strategy}
                      </p>
                    </div>

                    {/* Results */}
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-[#ff6b9d] font-semibold mb-3">
                        Results
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {study.results.map((r) => (
                          <div
                            key={r.label}
                            className="rounded-xl p-4 text-center"
                            style={{
                              background: 'rgba(157, 78, 221, 0.08)',
                              border: '1px solid rgba(157, 78, 221, 0.12)',
                            }}
                          >
                            <p
                              className="font-display text-lg font-bold"
                              style={{ color: '#ff6b9d' }}
                            >
                              {r.value}
                            </p>
                            <p className="text-[#7c5a8a] text-xs mt-1">
                              {r.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          {/* CTA */}
          <FadeUp delay={0.3}>
            <div className="text-center mt-16">
              <p className="text-[#b794c7] text-lg mb-6">
                Ready to become the next success story?
              </p>
              <Link
                href="/growth-audit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #9d4edd 0%, #c77dff 100%)',
                }}
              >
                Get Your Free Growth Audit
              </Link>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
