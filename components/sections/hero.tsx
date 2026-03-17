import { AmbientOrbs } from "@/components/motion/ambient-orbs";
import { HeroVisual } from "@/components/motion/hero-visual";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CardGrid } from "@/components/ui/card-grid";
import { Kicker } from "@/components/ui/kicker";
import { SectionContainer } from "@/components/ui/section-container";
import { heroSignals, siteConfig } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative scroll-mt-28 overflow-hidden px-2 pb-[72px] pt-4 md:scroll-mt-32 md:pb-24 md:pt-5 lg:pb-[120px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[880px] bg-[radial-gradient(circle_at_16%_22%,rgba(84,185,255,0.15),transparent_22%),radial-gradient(circle_at_84%_18%,rgba(228,90,146,0.16),transparent_28%),radial-gradient(circle_at_50%_2%,rgba(115,78,255,0.11),transparent_24%)]"
      />
      <SectionContainer>
        <div className="hero-stage relative isolate min-h-[90svh] overflow-hidden rounded-[30px] border border-white/12 px-5 py-8 shadow-[0_48px_160px_rgba(19,8,38,0.32)] sm:px-6 sm:py-10 md:rounded-[38px] md:px-10 md:py-12 lg:px-12 lg:py-14 xl:rounded-[42px] xl:px-14 xl:py-[4.5rem]">
          <div className="hero-stage__video" aria-hidden="true" />
          <div className="hero-stage__aura" aria-hidden="true" />
          <div className="hero-stage__vignette" aria-hidden="true" />
          <div className="hero-stage__grid" aria-hidden="true" />
          <AmbientOrbs variant="hero" className="opacity-95" />

          <div className="relative z-10 flex min-h-full flex-col">
            <div className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col items-center gap-12 lg:min-h-[35rem] xl:min-h-[38rem]">
              <div className="flex w-full max-w-[760px] flex-col items-center text-center">
                <Reveal delay={0.03}>
                  <Kicker
                    tone="light"
                    className="border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.06))] px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-white/80 shadow-[0_18px_40px_rgba(10,6,24,0.16)] sm:px-5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.22em]"
                  >
                    Growth systems and automation agency
                  </Kicker>
                </Reveal>

                <Reveal delay={0.12} className="mt-9 max-w-[560px] xl:mt-10 xl:max-w-[570px]">
                  <h1
                    id="hero-heading"
                    className="text-[31px] font-semibold leading-[1.04] tracking-[-0.052em] text-white sm:text-[35px] md:text-[39px] lg:text-[40px] xl:text-[44px]"
                  >
                    Build a <span className="hero-text-glow">clearer revenue system</span> with stronger marketing,
                    better reporting, and execution your team can actually sustain.
                  </h1>
                </Reveal>

                <Reveal delay={0.22} className="mt-8 max-w-[33rem] xl:max-w-[34rem]">
                  <p className="text-[15px] leading-[1.84] text-white/72 sm:text-[16px] md:text-[17px] xl:text-[17px]">
                    DigitalPoint helps B2B companies improve growth systems, marketing automation, revenue operations,
                    and execution support so pipeline is easier to see, manage, and scale.
                  </p>
                </Reveal>

                <Reveal delay={0.3} className="mt-9 xl:mt-10">
                  <div className="flex w-full flex-col items-center gap-4 sm:flex-row lg:items-start">
                    <Button
                      href={siteConfig.primaryCtaHref}
                      className="w-full sm:min-w-[220px] sm:w-auto"
                      trackingEventName="cta_click"
                      trackingParams={{ section: "hero", cta_label: "Request Free Growth Audit", cta_type: "primary" }}
                    >
                      Request Free Growth Audit
                    </Button>
                    <Button
                      href="#services"
                      variant="secondary"
                      className="w-full sm:min-w-[190px] sm:w-auto"
                      trackingEventName="cta_click"
                      trackingParams={{ section: "hero", cta_label: "See How We Work", cta_type: "secondary" }}
                    >
                      See How We Work
                    </Button>
                  </div>
                </Reveal>

                <Reveal delay={0.36} className="mt-10 max-w-[34rem]">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      "Founder-led review",
                      "Practical recommendations",
                      "Clear next steps",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[18px] border border-white/10 bg-white/7 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.15em] text-white/68"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <div aria-hidden="true" className="relative mx-auto w-full max-w-[410px] md:max-w-[460px] xl:max-w-[500px]">
                <Reveal delay={0.4}>
                  <HeroVisual />
                </Reveal>
              </div>
            </div>

            <CardGrid columns="three" className="mt-14 w-full max-w-[1080px] self-center md:mt-16 xl:mt-[4.5rem]">
              {heroSignals.map((signal, index) => (
                <Reveal key={signal.title} delay={0.45 + index * 0.06}>
                  <div className="hero-signal-card group relative h-full overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,rgba(24,17,39,0.92),rgba(21,15,34,0.82))] p-6 shadow-[0_28px_82px_rgba(7,4,16,0.24)] backdrop-blur-2xl sm:rounded-[26px] sm:p-7 md:p-8">
                    <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.48),transparent)]" />
                    <div className="absolute inset-x-8 top-0 h-1 rounded-full bg-[linear-gradient(90deg,#84DBFF_0%,#8B6DFF_48%,#E45A92_100%)] opacity-85" />

                    <div className="relative flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/46">
                          Layer 0{index + 1}
                        </span>
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-secondary/78 shadow-[0_0_18px_rgba(228,90,146,0.35)]" />
                      </div>
                      <h3 className="mt-7 text-[22px] font-semibold leading-[1.24] tracking-[-0.04em] text-white md:text-[24px]">
                        {signal.title}
                      </h3>
                      <p className="mt-5 max-w-[30ch] text-[15px] leading-[1.76] text-white/64">{signal.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </CardGrid>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
