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
    <Reveal className={cn(isCentered ? "mx-auto max-w-[780px] text-center" : "max-w-[760px]", className)}>
      <Kicker
        tone={isLight ? "light" : "default"}
        className={cn(
          "px-4 py-2 text-[11px] font-semibold tracking-[0.22em]",
          isLight ? "border-white/16 bg-white/8 text-white/72" : "border-brand-primary/10 bg-white/66 text-brand-primary/70",
        )}
      >
        {eyebrow}
      </Kicker>
      <h2
        id={id}
        className={cn(
          "mt-7 text-[33px] font-semibold leading-[1.14] tracking-[-0.045em] md:text-[37px] lg:text-[42px]",
          isLight ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-5 text-[16px] leading-[1.8] md:text-[17px]",
          isCentered ? "mx-auto max-w-[680px]" : "max-w-[680px]",
          isLight ? "text-white/70" : "text-muted/95",
        )}
      >
        {description}
      </p>
    </Reveal>
  );
}
