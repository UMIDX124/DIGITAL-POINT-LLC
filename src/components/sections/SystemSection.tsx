'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Target, BarChart2, LineChart, Lightbulb, Users } from 'lucide-react';
import { Section, Container, SectionHeader, FadeUp, GlassCard } from '@/components/ui-dp/AnimatedElements';

const systemSteps = [
  {
    icon: Target,
    title: 'Acquisition',
    description: 'Ads run. Traffic lands on your site.',
  },
  {
    icon: BarChart2,
    title: 'Attribution',
    description: 'We track every touchpoint. Source, channel, campaign, creative.',
  },
  {
    icon: LineChart,
    title: 'Reporting',
    description: 'Numbers flow into dashboards you can actually read.',
  },
  {
    icon: Lightbulb,
    title: 'Decisions',
    description: 'You see what works. You know what to cut, what to scale.',
  },
  {
    icon: Users,
    title: 'Execution',
    description: 'We make the changes. Fast. With clear ownership.',
  },
];

export function SystemSection() {
  return (
    <Section className="relative overflow-hidden">
      {/* Cosmic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0815] via-[#13091e] to-[#1a0a2e]" />
      
      {/* Subtle glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] rounded-full blur-3xl opacity-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(199, 125, 255, 0.5) 0%, transparent 70%)',
        }}
      />

      <Container className="relative z-10">
        <SectionHeader
          eyebrow="The System"
          title="This is how growth actually works."
          description="Most companies have pieces. Few have the full loop connected."
          align="center"
        />

        <FadeUp>
          <div className="max-w-4xl mx-auto">
            {/* Flow diagram */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2">
              {systemSteps.map((step, index) => (
                <div key={step.title} className="flex items-center">
                  <GlassCard className="p-4 lg:p-5 text-center min-w-[160px] lg:min-w-[140px]">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{
                        background: 'rgba(157, 78, 221, 0.15)',
                        border: '1px solid rgba(199, 125, 255, 0.2)',
                      }}
                    >
                      <step.icon className="w-5 h-5 text-[#c77dff]" />
                    </div>
                    <h4 className="font-display font-bold text-white text-sm mb-1">{step.title}</h4>
                    <p className="text-[#9080a0] text-xs leading-relaxed">{step.description}</p>
                  </GlassCard>
                  
                  {/* Arrow */}
                  {index < systemSteps.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center px-2">
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ArrowRight className="w-4 h-4 text-[#c77dff] opacity-50" />
                      </motion.div>
                    </div>
                  )}
                  
                  {/* Mobile arrow */}
                  {index < systemSteps.length - 1 && (
                    <div className="lg:hidden flex items-center justify-center py-2">
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4 text-[#c77dff] opacity-50 rotate-90" />
                      </motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <div 
                className="inline-block p-6 rounded-2xl"
                style={{
                  background: 'rgba(157, 78, 221, 0.08)',
                  border: '1px solid rgba(199, 125, 255, 0.15)',
                }}
              >
                <p className="text-white/80 text-sm leading-relaxed max-w-xl">
                  When this loop is broken, you spend blind. When it&apos;s connected, every dollar has a clear path to revenue. We build the connection.
                </p>
              </div>
            </motion.div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
