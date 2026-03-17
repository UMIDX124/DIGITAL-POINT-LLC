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
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,450px)] lg:items-start">
            <Reveal>
              <Kicker tone="light" className="border-white/16 bg-white/8 px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-white/76">
                Final call to action
              </Kicker>
              <h2
                id="strategy-call-heading"
                className="mt-7 max-w-[680px] text-[33px] font-semibold leading-[1.12] tracking-[-0.045em] text-white md:text-[37px] lg:text-[42px]"
              >
                Ready to build a more scalable growth engine and a stronger execution layer?
              </h2>
              <p className="mt-6 max-w-[580px] text-[17px] leading-[1.82] text-white/70">
                Book a strategy call to map the biggest growth bottlenecks, where remote support can create leverage, and what your next 90
                days should look like.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button href={siteConfig.primaryCtaHref} className="sm:min-w-[220px]">
                  Book a Strategy Call
                </Button>
                <Button href="#case-studies" variant="ghost" className="sm:min-w-[190px]">
                  See Case Studies
                </Button>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {[
                  ["Focused intake", "Clear goals, blockers, and priorities in one discussion."],
                  ["Fast next step", "You leave with an obvious path instead of vague follow-up."],
                  ["High-fit onboarding", "We stay selective so delivery quality remains premium."],
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-[22px] border border-white/10 bg-white/6 px-5 py-5">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/86">{title}</p>
                    <p className="mt-3 text-[14px] leading-[1.75] text-white/62">{copy}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="space-y-6">
                <StrategyCallForm />
                <Card className="border-white/12 bg-white/8 p-8 text-white">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/54">What to expect</p>
                  <div className="mt-6 space-y-4">
                    {[
                      "A focused discussion around growth goals, bottlenecks, and execution capacity",
                      "A clear recommendation on the fastest path to better systems and stronger delivery",
                      "Next-step clarity without a generic agency pitch deck",
                    ].map((item) => (
                      <div key={item} className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4 text-[15px] leading-[1.75] text-white/74">
                        {item}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
}
