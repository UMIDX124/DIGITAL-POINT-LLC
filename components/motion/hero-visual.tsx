"use client";

import type { PointerEvent as ReactPointerEvent } from "react";

import { m, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

import { MOTION_EASE } from "@/lib/motion";

import { useMotionProfile } from "./use-motion-profile";

const dashboardBars = [34, 58, 44, 72, 86, 64, 104];
const revenueRows = [
  ["Pipeline visibility", "Live"],
  ["Forecasting", "Weekly"],
  ["Reporting", "Aligned"],
] as const;
const automationRows = [
  ["Campaign workflows", "Active"],
  ["Lead routing", "Connected"],
  ["CRM sync", "Stable"],
] as const;
const executionRows = [
  ["Remote team execution", "In motion"],
  ["Operational support", "Structured"],
  ["Delivery rhythm", "Weekly"],
] as const;

function MobilePanel({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle: string;
  rows: readonly (readonly [string, string])[];
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(27,20,44,0.92),rgba(31,22,51,0.84))] p-4 shadow-[0_20px_48px_rgba(10,6,22,0.18)]">
      <p className="text-[20px] font-semibold leading-[1.14] tracking-[-0.04em] text-white">{title}</p>
      <p className="mt-2 text-[14px] leading-[1.7] text-white/64">{subtitle}</p>
      <div className="mt-4 space-y-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/7 px-3 py-3"
          >
            <span className="text-sm text-white/68">{label}</span>
            <span className="text-sm font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="relative xl:hidden">
      <div className="absolute inset-x-[8%] top-3 h-32 rounded-full bg-[radial-gradient(circle,rgba(84,185,255,0.18),transparent_66%)] blur-3xl" />

      <div className="hero-dashboard relative overflow-hidden rounded-[26px] border border-white/14 bg-[linear-gradient(180deg,rgba(22,16,37,0.9),rgba(31,20,51,0.82))] p-4 shadow-[0_30px_100px_rgba(12,6,24,0.32)] backdrop-blur-2xl sm:rounded-[30px] sm:p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_34%),linear-gradient(160deg,rgba(76,42,132,0.32),transparent_52%)]" />
        <div className="absolute inset-0 grid-accent opacity-15" />

        <div className="relative space-y-4">
          <MobilePanel
            title="Revenue Dashboard"
            subtitle="Pipeline visibility, forecasting, reporting"
            rows={revenueRows}
          />
          <MobilePanel
            title="Marketing Automation"
            subtitle="Campaign workflows, lead routing, CRM sync"
            rows={automationRows}
          />
          <MobilePanel
            title="Execution Layer"
            subtitle="Remote team execution and operational support"
            rows={executionRows}
          />
        </div>
      </div>
    </div>
  );
}

function DesktopPanel({
  title,
  subtitle,
  rows,
  className = "",
}: {
  title: string;
  subtitle: string;
  rows: readonly (readonly [string, string])[];
  className?: string;
}) {
  return (
    <div
      className={`rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(23,17,37,0.94),rgba(29,20,49,0.88))] p-5 shadow-[0_22px_56px_rgba(10,6,22,0.16)] backdrop-blur-lg ${className}`}
    >
      <h3 className="text-[22px] font-semibold leading-[1.16] tracking-[-0.04em] text-white">{title}</h3>
      <p className="mt-2 max-w-[21rem] text-[14px] leading-[1.7] text-white/64">{subtitle}</p>
      <div className="mt-5 space-y-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/7 px-4 py-3"
          >
            <span className="text-[13px] text-white/66">{label}</span>
            <span className="shrink-0 text-[13px] font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { allowPointerParallax, allowScrollParallax, lowMotion } = useMotionProfile();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 18, mass: 0.85 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 18, mass: 0.85 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const depthScale = allowScrollParallax ? 1 : 0;
  const panelOneY = useTransform(scrollYProgress, [0, 1], [14 * depthScale, -12 * depthScale]);
  const panelTwoY = useTransform(scrollYProgress, [0, 1], [16 * depthScale, -12 * depthScale]);
  const panelThreeY = useTransform(scrollYProgress, [0, 1], [16 * depthScale, -12 * depthScale]);

  const panelOneX = useTransform(() => (allowPointerParallax ? smoothX.get() * 8 : 0));
  const panelTwoX = useTransform(() => (allowPointerParallax ? smoothX.get() * 10 : 0));
  const panelThreeX = useTransform(() => (allowPointerParallax ? smoothX.get() * 10 : 0));

  const panelOneOffsetY = useTransform(() => (allowPointerParallax ? smoothY.get() * 6 : 0) + panelOneY.get());
  const panelTwoOffsetY = useTransform(() => (allowPointerParallax ? smoothY.get() * 6 : 0) + panelTwoY.get());
  const panelThreeOffsetY = useTransform(() => (allowPointerParallax ? smoothY.get() * 6 : 0) + panelThreeY.get());

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!ref.current || !allowPointerParallax) {
      return;
    }

    const bounds = ref.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    pointerX.set(x);
    pointerY.set(y);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div ref={ref} onPointerMove={handlePointerMove} onPointerLeave={resetPointer} className="relative">
      <MobileVisual />

      <div aria-hidden="true" className="relative hidden h-[540px] xl:block xl:h-[590px]" style={{ perspective: 1500 }}>
        <div className="hero-backplate absolute left-[12%] top-[11%] h-[76%] w-[76%] rounded-[40px]" />

        <m.div
          className="absolute left-1/2 top-[4%] w-[74%] -translate-x-1/2"
          style={lowMotion ? undefined : { x: panelOneX, y: panelOneOffsetY, willChange: "transform" }}
          animate={lowMotion ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 9.2, repeat: Number.POSITIVE_INFINITY, ease: MOTION_EASE }}
        >
          <div className="overflow-hidden rounded-[34px] border border-white/14 bg-[linear-gradient(180deg,rgba(22,16,37,0.95),rgba(29,19,49,0.88))] p-6 shadow-[0_28px_72px_rgba(10,6,22,0.18)] backdrop-blur-lg">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%),linear-gradient(150deg,rgba(76,42,132,0.16),transparent_52%)]" />
            <div className="absolute inset-0 grid-accent opacity-12" />
            <div className="absolute inset-x-[18%] top-6 h-10 rounded-full bg-[radial-gradient(circle,rgba(84,185,255,0.14),transparent_70%)] blur-2xl" />

            <div className="relative">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.045em] text-white">
                    Revenue Dashboard
                  </h3>
                  <p className="mt-2 max-w-[22rem] text-[14px] leading-[1.7] text-white/64">
                    Pipeline visibility, forecasting, reporting
                  </p>
                </div>
                <div className="rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
                  Live
                </div>
              </div>

              <div className="mt-6 rounded-[28px] border border-white/12 bg-black/18 p-5">
                <div className="flex items-end gap-2">
                  {dashboardBars.map((bar, index) => (
                    <m.span
                      key={bar}
                      className="w-full rounded-t-full bg-[linear-gradient(180deg,rgba(132,219,255,0.95),rgba(36,118,255,0.72)_58%,rgba(110,63,255,0.28)_100%)]"
                      style={{ height: bar }}
                      animate={lowMotion ? undefined : { opacity: [0.9, 1, 0.92] }}
                      transition={{
                        duration: 1.9,
                        delay: index * 0.04,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "mirror",
                        ease: MOTION_EASE,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {revenueRows.map(([label, value]) => (
                  <div key={label} className="rounded-[22px] border border-white/10 bg-white/8 px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/46">{label}</p>
                    <p className="mt-2 text-[15px] font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </m.div>

        <m.div
          className="absolute bottom-[7%] left-[4%] w-[45%]"
          style={lowMotion ? undefined : { x: panelTwoX, y: panelTwoOffsetY, willChange: "transform" }}
          animate={lowMotion ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 8.8, repeat: Number.POSITIVE_INFINITY, ease: MOTION_EASE }}
        >
          <DesktopPanel
            title="Marketing Automation"
            subtitle="Campaign workflows, lead routing, CRM sync"
            rows={automationRows}
            className="min-h-[276px]"
          />
        </m.div>

        <m.div
          className="absolute bottom-[7%] right-[4%] w-[45%]"
          style={lowMotion ? undefined : { x: panelThreeX, y: panelThreeOffsetY, willChange: "transform" }}
          animate={lowMotion ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: MOTION_EASE }}
        >
          <DesktopPanel
            title="Execution Layer"
            subtitle="Remote team execution and operational support"
            rows={executionRows}
            className="min-h-[276px]"
          />
        </m.div>
      </div>
    </div>
  );
}
