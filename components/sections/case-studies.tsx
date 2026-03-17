import { Reveal } from "@/components/motion/reveal";
import { CardGrid } from "@/components/ui/card-grid";
import { FeatureCard } from "@/components/ui/feature-card";
import { Section } from "@/components/ui/section";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeader } from "@/components/ui/section-header";
import { caseStudies } from "@/lib/content";

export function CaseStudies() {
  return (
    <Section id="case-studies" labelledBy="case-studies-heading">
      <SectionContainer>
        <SectionHeader
          id="case-studies-heading"
          eyebrow="Case studies"
          title="Anonymized outcomes that show what cleaner execution looks like in practice."
          description="The strongest gains usually come from fixing the system around growth, not just one isolated channel."
          className="mb-16"
        />

        <CardGrid columns="three">
          {caseStudies.map((study, index) => (
            <Reveal key={study.title} delay={index * 0.08}>
              <FeatureCard
                eyebrow={study.category}
                title={study.title}
                description={study.summary}
                className="transition duration-300 hover:-translate-y-2 hover:border-brand-primary/18"
                headerSlot={<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted/70">Snapshot 0{index + 1}</span>}
              >
                <div className="space-y-4 border-t border-brand-primary/10 pt-6">
                  {study.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-3.5 text-[15px] leading-[1.8] text-ink/78">
                      <span className="mt-[11px] h-1.5 w-1.5 rounded-full bg-[linear-gradient(135deg,#3E1E68_0%,#E45A92_100%)]" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </FeatureCard>
            </Reveal>
          ))}
        </CardGrid>
      </SectionContainer>
    </Section>
  );
}
