import { AmbientOrbs } from "@/components/motion/ambient-orbs";
import { ParallaxOrnament } from "@/components/motion/parallax-ornament";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { SectionContainer } from "@/components/ui/section-container";
import { StrategyCallForm } from "@/components/ui/strategy-call-form";
import { siteConfig } from "@/lib/content";

export function FinalCta() {
  return (
    <Section id="strategy-call" labelledBy="strategy-call-heading" className="overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#241243_0%,#331857_44%,#5D2F77_100%)]" />
      <AmbientOrbs variant="cta" className="opacity-90" />
      <ParallaxOrnament className="left-10 top-12 h-60 w-60 bg-brand-secondary/18" travel={28} />
      <SectionContainer className="relative">
        <div className="section-frame overflow-hidden border-white/10 bg-white/6 px-8 py-8 backdrop-blur-md md:px-10 md:py-10 lg:px-12 lg:py-14">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,430px)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,450px)]">
            <Reveal>
              <div className="relative pl-6 md:pl-8">
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.56),rgba(255,255,255,0.08))]"
                />
                <div aria-hidden="true" className="pointer-events-none absolute -left-4 top-0 h-24 w-24 rounded-full bg-white/8 blur-3xl" />
                <Kicker tone="light" className="relative border-white/16 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-[0.24em] text-white/78">
                  Free growth audit
                </Kicker>
                <div
                  aria-hidden="true"
                  className="relative mt-4 h-[2px] w-24 bg-[linear-gradient(90deg,rgba(255,255,255,0.8),rgba(255,255,255,0.3),transparent)]"
                />
                <h2
                  id="strategy-call-heading"
                  className="relative mt-6 max-w-[17ch] text-[38px] font-semibold leading-[1.06] tracking-[-0.055em] text-white md:text-[46px] lg:text-[52px]"
                >
                  If growth feels harder to manage than it should, request a direct audit of the gaps slowing it down.
                </h2>
                <p className="relative mt-6 max-w-[33rem] text-[15px] leading-[1.86] text-white/68 md:text-[17px]">
                  We will review where revenue gets stuck, where execution slows down, and what to fix first across systems, marketing, or delivery.
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Button
                  href={siteConfig.primaryCtaHref}
                  className="sm:min-w-[220px]"
                  trackingEventName="cta_click"
                  trackingParams={{ section: "final_cta", cta_label: "Request Free Growth Audit", cta_type: "primary" }}
                >
                  Request Free Growth Audit
                </Button>
                <Button href="#case-studies" variant="secondary" className="sm:min-w-[190px]">
                  See Case Studies
                </Button>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {[
                  ["Founder-led review", "Your audit is reviewed through the lens of systems, marketing, and delivery."],
                  ["Practical recommendations", "You leave with a clear recommendation, not a vague follow-up."],
                  ["No-pressure next step", "If there is a fit, we outline the right next move without forcing a sale."],
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-[22px] border border-white/12 bg-white/8 px-5 py-5">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/86">{title}</p>
                    <p className="mt-3 text-[14px] leading-[1.75] text-white/62">{copy}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="space-y-6">
                <StrategyCallForm />
                <Card className="border-white/12 bg-white/8 p-7 md:p-8 text-white">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/54">What to expect</p>
                  <div className="mt-6 space-y-4">
                    {[
                      "A focused review of goals, bottlenecks, and execution capacity",
                      "A clear recommendation on what to fix first across systems, marketing, or delivery",
                      "Next-step clarity without a long generic pitch deck",
                    ].map((item) => (
                      <div key={item} className="rounded-[22px] border border-white/12 bg-white/8 px-4 py-4 text-[15px] leading-[1.75] text-white/76">
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-[13px] leading-[1.7] text-white/54">
                    This works best for qualified B2B teams that want practical recommendations and a clear implementation path.
                  </p>
                </Card>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
}
