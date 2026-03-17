import { Reveal } from "@/components/motion/reveal";
import { Kicker } from "@/components/ui/kicker";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  id?: string;
  align?: "left" | "center";
  tone?: "default" | "light";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  tone = "default",
  className,
}: SectionHeaderProps) {
  const isCentered = align === "center";
  const isLight = tone === "light";

  return (
    <Reveal className={cn(isCentered ? "mx-auto max-w-[860px] text-center" : "max-w-[820px]", className)}>
      <div className={cn("relative", !isCentered && "pl-6 md:pl-8")}>
        {!isCentered ? (
          <div
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-[linear-gradient(180deg,rgba(62,30,104,0.14),rgba(228,90,146,0.42),rgba(62,30,104,0.06))]",
              isLight && "bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.56),rgba(255,255,255,0.1))]",
            )}
          />
        ) : null}

        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -left-4 top-0 h-24 w-24 rounded-full blur-3xl",
            isCentered ? "left-1/2 -translate-x-1/2 bg-brand-secondary/8" : "bg-brand-secondary/8",
            isLight && "bg-white/8",
          )}
        />

        <Kicker
          tone={isLight ? "light" : "default"}
          className={cn(
            "relative px-4 py-2 text-[11px] font-semibold tracking-[0.24em]",
            isLight ? "border-white/16 bg-white/10 text-white/78" : "border-brand-primary/10 bg-white/76 text-brand-primary/76",
          )}
        >
          {eyebrow}
        </Kicker>
        <div
          aria-hidden="true"
          className={cn(
            "relative mt-4 h-[2px] w-24 bg-[linear-gradient(90deg,rgba(62,30,104,0.65),rgba(228,90,146,0.42),transparent)]",
            isCentered && "mx-auto",
            isLight && "bg-[linear-gradient(90deg,rgba(255,255,255,0.8),rgba(255,255,255,0.3),transparent)]",
          )}
        />
        <h2
          id={id}
          className={cn(
            "relative mt-6 max-w-[18ch] text-[38px] font-semibold leading-[1.06] tracking-[-0.055em] md:text-[46px] lg:text-[52px]",
            isCentered && "mx-auto",
            isLight ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "relative mt-6 text-[15px] leading-[1.86] md:text-[17px]",
            isCentered ? "mx-auto max-w-[660px]" : "max-w-[610px]",
            isLight ? "text-white/68" : "text-muted/92",
          )}
        >
          {description}
        </p>
      </div>
    </Reveal>
  );
}
