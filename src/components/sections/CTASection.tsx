'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Linkedin } from 'lucide-react';
import { Section, Container, FadeUp } from '@/components/ui-dp/AnimatedElements';
import Link from 'next/link';

export function CTASection() {

  return (
    <Section className="relative overflow-hidden">
      {/* Cosmic gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e]" />

      {/* Glow */}
      <motion.div 
        animate={{
          opacity: [0.1, 0.25, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(ellipse, rgba(199, 125, 255, 0.4) 0%, transparent 70%)',
        }}
      />

      <Container className="relative z-10">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(157, 78, 221, 0.15)',
                border: '1px solid rgba(199, 125, 255, 0.3)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <motion.span 
                  className="absolute inline-flex h-full w-full rounded-full bg-[#ff6b9d]"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b9d]"></span>
              </span>
              <span className="text-[#e0aaff] text-sm">Free. No pitch. Just clarity.</span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Know exactly what&apos;s{' '}
              <span 
                className="bg-gradient-to-r from-[#e0aaff] via-[#c77dff] to-[#ff6b9d] bg-clip-text text-transparent"
              >
                blocking your growth
              </span>
              .
            </h2>

            {/* Description */}
            <p className="text-[#b794c7] text-lg mb-10 max-w-xl mx-auto">
              One call. We review your setup, tell you what&apos;s missing, and give you a clear path forward. Even if you never work with us.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/free-growth-audit">
                <motion.span
                  className="inline-flex px-8 py-4 text-lg font-semibold text-white rounded-xl overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 50%, #c77dff 100%)',
                    boxShadow: '0 4px 20px rgba(123, 44, 191, 0.4)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Get Your Growth Audit
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.span>
              </Link>
            </div>

            {/* What you get */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12">
              {[
                'Attribution gaps identified',
                'Reporting blindspots exposed',
                'Clear next steps',
              ].map((item) => (
                <span key={item} className="flex items-center gap-2 text-[#9080a0] text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c77dff]" />
                  {item}
                </span>
              ))}
            </div>

            {/* Contact info */}
            <div className="flex items-center justify-center gap-6">
              <a 
                href="mailto:info@digitalpointllc.com"
                className="flex items-center gap-2 text-[#c77dff] hover:text-[#e0aaff] transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                info@digitalpointllc.com
              </a>
              <a 
                href="https://linkedin.com/company/digitalpointllc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#c77dff] hover:text-[#e0aaff] transition-colors text-sm"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
