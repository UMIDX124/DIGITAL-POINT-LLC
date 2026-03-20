'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { Section, Container, FadeUp, GlassCard } from '@/components/ui-dp/AnimatedElements';

export function FounderSection() {
  return (
    <Section className="relative overflow-hidden">
      {/* Cosmic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0815] via-[#1a0a2e] to-[#13091e]" />
      
      {/* Glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(199, 125, 255, 0.5) 0%, transparent 70%)',
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
                      background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.4) 0%, rgba(123, 44, 191, 0.2) 100%)',
                      border: '2px solid rgba(199, 125, 255, 0.3)',
                    }}
                  >
                    {/* Founder Avatar - Initials */}
                    <div className="w-full h-full flex items-center justify-center">
                      <span 
                        className="text-4xl md:text-5xl font-display font-bold"
                        style={{
                          background: 'linear-gradient(135deg, #e0aaff 0%, #c77dff 50%, #ff6b9d 100%)',
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
                      background: 'linear-gradient(90deg, #e0aaff, #c77dff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Founder-Led
                  </div>
                  
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                    Every engagement starts with a founder review.
                  </h2>
                  
                  <p className="text-[#b794c7] leading-relaxed mb-6">
                    No sales team. No account handoffs. You work directly with people who've built and scaled businesses — because the best execution comes from people who understand what's at stake.
                  </p>
                  
                  <div className="flex items-center justify-center md:justify-start gap-4">
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
              </div>
            </GlassCard>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}
