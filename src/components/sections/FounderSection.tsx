'use client';

import { motion } from '@/lib/framer-compat';
import { Linkedin } from 'lucide-react';
import { Section, Container, FadeUp, GlassCard } from '@/components/ui-dp/AnimatedElements';

export function FounderSection() {
  return (
    <Section className="relative overflow-hidden">
      {/* Cosmic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#141416] to-[#141416]" />
      
      {/* Glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(255, 168, 51, 0.5) 0%, transparent 70%)',
        }}
      />
      
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <GlassCard className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 136, 0, 0.4) 0%, rgba(255, 136, 0, 0.2) 100%)',
                      border: '2px solid rgba(255, 168, 51, 0.3)',
                    }}
                  >
                    {/* Founder Avatar - Initials */}
                    <div className="w-full h-full flex items-center justify-center">
                      <span 
                        className="text-4xl md:text-5xl font-display font-bold"
                        style={{
                          background: 'linear-gradient(135deg, #FFA833 0%, #FF8800 50%, #FF8800 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        DP
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center md:text-left flex-grow">
                  <div 
                    className="text-sm font-medium uppercase tracking-wider mb-2"
                    style={{
                      background: 'linear-gradient(90deg, #FFA833, #FF8800)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Co-Founder Led
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                    Every engagement starts with a co-founder review.
                  </h2>
                  
                  <p className="text-[color:var(--text-primary)] leading-relaxed mb-6">
                    No sales team. No account handoffs. You work directly with people who've built and scaled businesses, because the best execution comes from people who understand what's at stake.
                  </p>
                  
                  {/* Phase 18 N1 — mailto:info@digitalpointllc.com chip
                      removed per Phase 12 contact strategy (zero generic
                      email surfaces; Cosmo on-site chat + audit form are
                      the canonical routes). LinkedIn anchor preserved. */}
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <a
                      href="https://linkedin.com/company/digitalpointllc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[color:var(--accent-primary)] hover:text-[color:var(--accent-bright)] transition-colors text-sm"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}
