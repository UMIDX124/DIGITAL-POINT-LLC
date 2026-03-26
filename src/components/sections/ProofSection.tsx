import { Section, Container, SectionHeader, FadeUp, GlassCard } from '@/components/ui-dp/AnimatedElements';

const caseStudies = [
  {
    company: 'B2B SaaS Company',
    situation: 'Spending $45k/month on ads. No idea which channels drove demos.',
    action: 'Built full attribution stack. Connected CRM to ad platforms. Created weekly reporting cadence.',
    result: '+127% MRR in 8 months. CAC cut by 34%.',
    metric: '+127%',
    metricLabel: 'MRR Growth',
  },
  {
    company: 'E-commerce Brand',
    situation: 'ROAS hovering at 1.2x. Founder managing all campaigns personally.',
    action: 'Took over media buying. Built creative testing system. Deployed remote ad ops team.',
    result: 'ROAS jumped to 3.1x. Founder hours freed up by 20/week.',
    metric: '3.1x',
    metricLabel: 'ROAS',
  },
  {
    company: 'Marketing Agency',
    situation: 'Client reporting took 15 hours/week. Numbers never matched across platforms.',
    action: 'Built unified dashboard. Automated data pulls. Created client-ready reports.',
    result: 'Reporting time cut to 2 hours. Zero client disputes on numbers.',
    metric: '-87%',
    metricLabel: 'Reporting Time',
  },
  {
    company: 'Coaching Business',
    situation: 'High ticket sales. Leads came in but no visibility on source or quality.',
    action: 'Implemented call tracking. Built lead scoring. Connected ads to actual enrollments.',
    result: 'Cut wasted spend by $12k/month. Doubled qualified lead volume.',
    metric: '2x',
    metricLabel: 'Qualified Leads',
  },
];

export function ProofSection() {
  return (
    <Section className="relative overflow-hidden">
      {/* Cosmic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#13091e] via-[#0d0815] to-[#0a0510]" />
      
      {/* Animated glow — CSS animation instead of framer-motion infinite */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl animate-glow-pulse"
        style={{
          background: 'radial-gradient(ellipse, rgba(157, 78, 221, 0.4) 0%, transparent 70%)',
        }}
      />

      <Container className="relative z-10">
        <SectionHeader
          eyebrow="Results"
          title="What happens when you can see clearly."
          description="Real problems. Real fixes. Measurable outcomes."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {caseStudies.map((study, index) => (
            <FadeUp key={study.company} delay={index * 0.1}>
              <GlassCard className="p-6 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-xs font-medium text-[#c77dff] px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(157, 78, 221, 0.15)',
                      border: '1px solid rgba(199, 125, 255, 0.2)',
                    }}
                  >
                    {study.company}
                  </div>
                  <div className="text-right">
                    <div 
                      className="font-display text-2xl font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #e0aaff 0%, #c77dff 50%, #ff6b9d 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {study.metric}
                    </div>
                    <div className="text-[#9080a0] text-xs">{study.metricLabel}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-[#9080a0] text-xs uppercase tracking-wide mb-1">Situation</div>
                    <p className="text-white/80 text-sm">{study.situation}</p>
                  </div>
                  <div>
                    <div className="text-[#9080a0] text-xs uppercase tracking-wide mb-1">What We Did</div>
                    <p className="text-white/80 text-sm">{study.action}</p>
                  </div>
                  <div>
                    <div className="text-[#9080a0] text-xs uppercase tracking-wide mb-1">Result</div>
                    <p className="text-[#c77dff] text-sm font-medium">{study.result}</p>
                  </div>
                </div>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}
