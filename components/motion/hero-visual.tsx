"use client";

import type { PointerEvent as ReactPointerEvent } from "react";

import { m, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

import { MOTION_EASE } from "@/lib/motion";

import { useMotionProfile } from "./use-motion-profile";

const chartBars = [34, 58, 44, 72, 86, 64, 104];
const pipelineRows = [
  ["Inbound flow", "+34%"],
  ["SQL velocity", "2.1x"],
  ["Ops capacity", "Live"],
] as const;
const laneRows = [
  ["Campaigns", "Optimizing"],
  ["Remote pod", "Active"],
  ["Automation", "Syncing"],
] as const;
const scoreRows = [
  ["Acquisition", 84],
  ["Execution", 91],
  ["Visibility", 88],
] as const;

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-white/54">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,rgba(255,172,172,0.95)_0%,rgba(228,90,146,0.95)_100%)]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="relative lg:hidden">
      <div className="absolute inset-x-[8%] top-3 h-32 rounded-full bg-[radial-gradient(circle,rgba(84,185,255,0.18),transparent_66%)] blur-3xl" />

      <div className="hero-dashboard relative overflow-hidden rounded-[30px] border border-white/14 bg-[linear-gradient(180deg,rgba(22,16,37,0.9),rgba(31,20,51,0.82))] p-5 shadow-[0_30px_100px_rgba(12,6,24,0.32)] backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_34%),linear-gradient(160deg,rgba(76,42,132,0.32),transparent_52%)]" />
        <div className="absolute inset-0 grid-accent opacity-15" />

        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">Growth cockpit</p>
              <p className="mt-2 text-[26px] font-semibold leading-[1.15] tracking-[-0.045em] text-white">
                One system. Better execution.
              </p>
            </div>
            <div className="rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
              Live
            </div>
          </div>

          <div className="mt-5 rounded-[24px] border border-white/12 bg-black/18 p-4">
            <div className="flex items-end gap-2">
              {chartBars.map((bar) => (
                <span
                  key={bar}
                  className="w-full rounded-t-full bg-[linear-gradient(180deg,rgba(132,219,255,0.94),rgba(36,118,255,0.68)_58%,rgba(110,63,255,0.28)_100%)]"
                  style={{ height: bar * 0.58 }}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/46">Pipeline visibility</p>
              <div className="mt-4 space-y-3">
                {pipelineRows.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-3 py-3">
                    <span className="text-sm text-white/68">{label}</span>
                    <span className="text-sm font-semibold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/46">Execution layer</p>
              <div className="mt-4 space-y-3">
                {laneRows.map(([label, value], index) => (
                  <div
                    key={label}
                    className={`rounded-2xl border border-white/10 px-4 py-3 ${
                      index === 1
                        ? "bg-[linear-gradient(135deg,rgba(84,185,255,0.14),rgba(228,90,146,0.12))]"
                        : "bg-white/6"
                    }`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/46">{label}</p>
                    <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
  const backY = useTransform(scrollYProgress, [0, 1], [12 * depthScale, -12 * depthScale]);
  const mainY = useTransform(scrollYProgress, [0, 1], [22 * depthScale, -18 * depthScale]);
  const supportY = useTransform(scrollYProgress, [0, 1], [18 * depthScale, -16 * depthScale]);

  const mainX = useTransform(() => (allowPointerParallax ? smoothX.get() * 10 : 0));
  const mainOffsetY = useTransform(() => (allowPointerParallax ? smoothY.get() * 10 : 0) + mainY.get());
  const supportX = useTransform(() => (allowPointerParallax ? smoothX.get() * 18 : 0));
  const supportOffsetY = useTransform(() => (allowPointerParallax ? smoothY.get() * 8 : 0) + supportY.get());
  const backX = useTransform(() => (allowPointerParallax ? smoothX.get() * -8 : 0));
  const backOffsetY = useTransform(() => (allowPointerParallax ? smoothY.get() * 6 : 0) + backY.get());
  const mainRotateX = useTransform(() => (allowPointerParallax ? smoothY.get() * -1.7 : 0));
  const mainRotateY = useTransform(() => (allowPointerParallax ? smoothX.get() * 2.8 : 0));
  const supportRotate = useTransform(() => (allowPointerParallax ? smoothX.get() * 2.2 : 2));

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

      <div aria-hidden="true" className="relative hidden h-[540px] lg:block xl:h-[600px]" style={{ perspective: 1500 }}>
        <m.div
          className="hero-backplate absolute left-[10%] top-[12%] h-[72%] w-[74%] rounded-[40px]"
          style={lowMotion ? undefined : { x: backX, y: backOffsetY, willChange: "transform" }}
        />

        <m.div
          className="absolute right-[4%] top-[8%] rounded-[22px] border border-emerald-400/18 bg-[linear-gradient(180deg,rgba(22,19,36,0.88),rgba(26,20,42,0.76))] px-4 py-3 shadow-[0_24px_72px_rgba(10,6,22,0.18)] backdrop-blur-2xl"
          style={
            lowMotion
              ? undefined
              : { x: supportX, y: supportOffsetY, rotate: supportRotate, transformPerspective: 1200, willChange: "transform" }
          }
          animate={lowMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 8.4, repeat: Number.POSITIVE_INFINITY, ease: MOTION_EASE }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/44">Remote pod</p>
          <p className="mt-2 text-[16px] font-semibold text-white">Active</p>
        </m.div>

        <m.div
          className="hero-dashboard absolute left-[6%] top-[14%] w-[82%] overflow-hidden rounded-[34px] border border-white/14 bg-[linear-gradient(180deg,rgba(22,16,37,0.9),rgba(29,19,49,0.82))] p-6 shadow-[0_42px_120px_rgba(10,6,22,0.34)] backdrop-blur-2xl"
          style={
            lowMotion
              ? undefined
              : {
                  x: mainX,
                  y: mainOffsetY,
                  rotateX: mainRotateX,
                  rotateY: mainRotateY,
                  transformPerspective: 1600,
                  willChange: "transform",
                }
          }
          animate={lowMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: MOTION_EASE }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_34%),linear-gradient(150deg,rgba(76,42,132,0.3),transparent_52%)]" />
          <div className="absolute inset-0 grid-accent opacity-20" />
          <div className="absolute inset-x-[10%] top-5 h-16 rounded-full bg-[radial-gradient(circle,rgba(84,185,255,0.22),transparent_70%)] blur-3xl" />

          <div className="relative">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">Growth cockpit</p>
                <h3 className="mt-3 max-w-[18rem] text-[30px] font-semibold leading-[1.12] tracking-[-0.045em] text-white">
                  Strategic visibility across the growth engine
                </h3>
              </div>
              <div className="rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
                Systems live
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-[28px] border border-white/12 bg-black/18 p-5">
                <div className="flex items-end gap-2">
                  {chartBars.map((bar, index) => (
                    <m.span
                      key={bar}
                      className="w-full rounded-t-full bg-[linear-gradient(180deg,rgba(132,219,255,0.95),rgba(36,118,255,0.72)_58%,rgba(110,63,255,0.28)_100%)]"
                      style={{ height: bar }}
                      animate={lowMotion ? undefined : { opacity: [0.8, 1, 0.86] }}
                      transition={{
                        duration: 2.4,
                        delay: index * 0.06,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "mirror",
                        ease: MOTION_EASE,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/12 bg-white/8 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/46">Execution score</p>
                <div className="mt-4 space-y-4">
                  {scoreRows.map(([label, value]) => (
                    <ScoreRow key={label} label={label} value={value} />
                  ))}
                </div>
              </div>

              <div className="grid gap-3">
                {pipelineRows.map(([label, value]) => (
                  <div key={label} className="rounded-[22px] border border-white/10 bg-white/8 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/46">{label}</p>
                      <p className="text-[15px] font-semibold text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </m.div>

        <m.div
          className="absolute bottom-[6%] right-[4%] w-[66%] rounded-[28px] border border-white/14 bg-[linear-gradient(180deg,rgba(23,17,37,0.92),rgba(30,20,49,0.84))] p-5 shadow-[0_30px_90px_rgba(10,6,22,0.28)] backdrop-blur-2xl"
          style={
            lowMotion
              ? undefined
              : { x: supportX, y: supportOffsetY, rotate: supportRotate, transformPerspective: 1200, willChange: "transform" }
          }
          animate={lowMotion ? undefined : { y: [0, 9, 0] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: MOTION_EASE }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/48">Execution layer</p>
              <p className="mt-3 max-w-[16rem] text-[14px] leading-[1.7] text-white/64">
                Remote delivery, automation, and reporting brought under one calmer operating layer.
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-medium text-white/72">
              Coordinated
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {laneRows.map(([label, value], index) => (
              <div
                key={label}
                className={`rounded-2xl border border-white/10 px-4 py-3 ${
                  index === 1
                    ? "bg-[linear-gradient(135deg,rgba(84,185,255,0.14),rgba(228,90,146,0.12))]"
                    : "bg-white/6"
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/44">{label}</p>
                <p className="mt-2 text-[15px] font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </div>
  );
}
