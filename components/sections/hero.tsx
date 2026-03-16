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
      className="relative scroll-mt-28 overflow-hidden px-2 pb-[72px] pt-4 md:scroll-mt-32 md:pb-24 md:pt-6 lg:pb-[120px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[820px] bg-[radial-gradient(circle_at_14%_22%,rgba(84,185,255,0.16),transparent_22%),radial-gradient(circle_at_84%_18%,rgba(228,90,146,0.18),transparent_28%),radial-gradient(circle_at_50%_2%,rgba(115,78,255,0.12),transparent_24%)]"
      />
      <SectionContainer>
        <div className="hero-stage relative isolate min-h-[90svh] overflow-hidden rounded-[38px] border border-white/12 px-6 py-10 shadow-[0_48px_160px_rgba(19,8,38,0.32)] md:px-10 md:py-12 lg:px-14 lg:py-16">
          <div className="hero-stage__video" aria-hidden="true" />
          <div className="hero-stage__aura" aria-hidden="true" />
          <div className="hero-stage__vignette" aria-hidden="true" />
          <div className="hero-stage__grid" aria-hidden="true" />
          <AmbientOrbs variant="hero" className="opacity-95" />

          <div className="relative z-10 flex min-h-full flex-col">
            <div className="mx-auto grid w-full max-w-[1180px] flex-1 gap-14 lg:min-h-[38rem] lg:grid-cols-[minmax(0,680px)_minmax(420px,1fr)] lg:items-center lg:justify-between lg:gap-16">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <Reveal delay={0.03}>
                  <Kicker
                    tone="light"
                    className="border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.06))] px-5 py-2.5 text-[12px] font-semibold tracking-[0.24em] text-white/86 shadow-[0_18px_40px_rgba(10,6,24,0.16)]"
                  >
                    Digital growth + remote workforce infrastructure
                  </Kicker>
                </Reveal>

                <Reveal delay={0.12} className="mt-8 max-w-[680px]">
                  <h1
                    id="hero-heading"
                    className="text-[36px] font-[650] leading-[1.02] tracking-[-0.055em] text-white md:text-[46px] lg:text-[56px] xl:text-[60px]"
                  >
                    Build a <span className="hero-text-glow">cinematic growth engine</span> with smarter systems, remote
                    execution, and marketing that compounds.
                  </h1>
                </Reveal>

                <Reveal delay={0.22} className="mt-6 max-w-[660px]">
                  <p className="text-[17px] leading-[1.78] text-white/78 lg:text-[18px]">
                    DigitalPoint LLC helps founders and operators scale through layered systems, expert remote workforce
                    support, and performance-driven execution that feels coordinated from strategy to delivery.
                  </p>
                </Reveal>

                <Reveal delay={0.3} className="mt-8">
                  <div className="flex w-full flex-col items-center gap-4 sm:flex-row lg:items-start">
                    <Button href={siteConfig.primaryCtaHref} className="w-full sm:w-auto">
                      Book a Strategy Call
                    </Button>
                    <Button href="#services" variant="ghost" className="w-full sm:w-auto">
                      Explore Services
                    </Button>
                  </div>
                </Reveal>
              </div>

              <div className="relative mx-auto w-full max-w-[620px] lg:justify-self-end">
                <Reveal delay={0.4}>
                  <HeroVisual />
                </Reveal>
              </div>
            </div>

            <CardGrid columns="three" className="mt-14 w-full max-w-[1180px] self-center">
              {heroSignals.map((signal, index) => (
                <Reveal key={signal.title} delay={0.45 + index * 0.06}>
                  <div className="hero-signal-card group relative h-full overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,rgba(24,17,39,0.86),rgba(21,15,34,0.72))] p-7 shadow-[0_28px_82px_rgba(7,4,16,0.24)] backdrop-blur-2xl">
                    <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.48),transparent)]" />
                    <div className="absolute inset-x-7 top-0 h-1 rounded-full bg-[linear-gradient(90deg,#84DBFF_0%,#8B6DFF_48%,#E45A92_100%)] opacity-85" />

                    <div className="relative flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/48">
                          Layer 0{index + 1}
                        </span>
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-secondary/78 shadow-[0_0_18px_rgba(228,90,146,0.35)]" />
                      </div>
                      <h3 className="mt-6 text-[24px] font-semibold leading-[1.2] tracking-[-0.04em] text-white">
                        {signal.title}
                      </h3>
                      <p className="mt-4 text-[15px] leading-[1.75] text-white/66">{signal.description}</p>
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
