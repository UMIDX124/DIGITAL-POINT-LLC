import { AmbientOrbs } from "@/components/motion/ambient-orbs";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { CardGrid } from "@/components/ui/card-grid";
import { Section } from "@/components/ui/section";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeader } from "@/components/ui/section-header";
import { industries, stats } from "@/lib/content";

export function SocialProof() {
  return (
    <Section id="proof" labelledBy="proof-heading" className="overflow-hidden">
      <div className="absolute inset-x-0 bottom-10 top-10 bg-[linear-gradient(135deg,#22113F_0%,#301852_42%,#5D2F77_100%)]" />
      <AmbientOrbs variant="section" className="opacity-75" />
      <SectionContainer className="relative">
        <div className="section-frame bg-transparent px-8 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
          <SectionHeader
            id="proof-heading"
            eyebrow="Proof and momentum"
            title="Built around measurable progress, not vague activity."
            description="Every engagement is designed with operating cadence, KPI visibility, and delivery accountability so leaders can scale with more confidence and less guesswork."
            tone="light"
            className="mb-16"
          />

          <CardGrid columns="four">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.06}>
                <Card className="h-full rounded-[22px] border-white/10 bg-white/8 p-8 text-white backdrop-blur-md">
                  <div className="mb-6 h-px w-16 bg-[linear-gradient(90deg,rgba(132,219,255,0.95),rgba(228,90,146,0.88))]" />
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-[38px] font-semibold leading-[1.08] tracking-[-0.05em] text-white md:text-[40px]"
                  />
                  <h3 className="mt-4 text-[15px] font-semibold uppercase tracking-[0.08em] text-white/88">{stat.label}</h3>
                  <p className="mt-4 text-[14px] leading-[1.75] text-white/64">{stat.description}</p>
                </Card>
              </Reveal>
            ))}
          </CardGrid>

          <Reveal delay={0.2}>
            <div className="mt-14 border-t border-white/10 pt-9">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/52">Scaling teams across</p>
              <div className="mt-6 flex flex-wrap gap-3.5">
                {industries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[13px] font-medium text-white/76"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionContainer>
    </Section>
  );
}
