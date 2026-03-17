import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { SectionContainer } from "@/components/ui/section-container";
import { founderProfile, siteConfig } from "@/lib/content";

export function Founder() {
  return (
    <Section id="founder" labelledBy="founder-heading" className="overflow-hidden bg-white/[0.12]">
      <SectionContainer>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
          <Reveal>
            <Card className="rounded-[28px] p-8 md:p-10">
              <div className="relative pl-6 md:pl-8">
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-[linear-gradient(180deg,rgba(62,30,104,0.14),rgba(228,90,146,0.42),rgba(62,30,104,0.06))]"
                />
                <div aria-hidden="true" className="pointer-events-none absolute -left-4 top-0 h-24 w-24 rounded-full bg-brand-secondary/8 blur-3xl" />
                <Kicker className="relative px-4 py-2 text-[11px] font-semibold tracking-[0.24em]">{founderProfile.eyebrow}</Kicker>
                <div
                  aria-hidden="true"
                  className="relative mt-4 h-[2px] w-24 bg-[linear-gradient(90deg,rgba(62,30,104,0.65),rgba(228,90,146,0.42),transparent)]"
                />
                <h2
                  id="founder-heading"
                  className="relative mt-6 max-w-[18ch] text-[38px] font-semibold leading-[1.06] tracking-[-0.055em] text-ink md:text-[46px] lg:text-[52px]"
                >
                  {founderProfile.title}
                </h2>
                <p className="relative mt-6 max-w-[52ch] text-[15px] leading-[1.86] text-muted md:text-[16px]">
                  {founderProfile.description}
                </p>
              </div>
              <div className="mt-7 rounded-[22px] border border-brand-primary/10 bg-brand-primary/[0.03] px-5 py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-primary/54">Why this matters</p>
                <div className="mt-4 space-y-3">
                  {founderProfile.proofPoints.map((point) => (
                    <div key={point} className="flex items-start gap-3 text-[14px] leading-[1.72] text-ink/76">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[linear-gradient(135deg,#3E1E68_0%,#E45A92_100%)]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Button
                  href={siteConfig.primaryCtaHref}
                  className="sm:min-w-[220px]"
                  trackingEventName="cta_click"
                  trackingParams={{ section: "founder", cta_label: "Request Free Growth Audit", cta_type: "primary" }}
                >
                  Request Free Growth Audit
                </Button>
                <Button href="#case-studies" variant="secondary">
                  See Case Studies
                </Button>
              </div>
              <p className="mt-4 text-[13px] leading-[1.7] text-muted">
                Best for teams that want a direct review of their systems, revenue operations, and execution bottlenecks before committing to a larger engagement.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-4">
              {founderProfile.highlights.map((item, index) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-brand-primary/10 bg-white/88 px-6 py-6 shadow-[0_18px_42px_rgba(62,30,104,0.08)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#3E1E68_0%,#E45A92_100%)] text-[13px] font-semibold text-white">
                      0{index + 1}
                    </span>
                    <div className="pt-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-primary/48">Credibility signal</p>
                      <p className="mt-2 text-[16px] font-medium leading-[1.75] text-ink/84">{item}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </SectionContainer>
    </Section>
  );
}
