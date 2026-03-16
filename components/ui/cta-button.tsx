import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  ariaLabel?: string;
};

type LinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "aria-label"> & {
    href: string;
  };

type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "aria-label"> & {
    href?: never;
  };

type CTAButtonProps = LinkProps | NativeButtonProps;

function isLinkProps(props: CTAButtonProps): props is LinkProps {
  return typeof (props as LinkProps).href === "string";
}

const variants = {
  primary:
    "border border-white/10 bg-[linear-gradient(135deg,#37185F_0%,#522A88_46%,#E45A92_100%)] text-white shadow-[0_20px_54px_rgba(62,30,104,0.3)] hover:shadow-[0_28px_74px_rgba(62,30,104,0.26)]",
  secondary:
    "border border-brand-primary/14 bg-white/88 text-brand-primary shadow-[0_18px_50px_rgba(62,30,104,0.08)] hover:border-brand-primary/20 hover:bg-white",
  ghost:
    "border border-white/20 bg-white/10 text-white shadow-[0_12px_34px_rgba(15,8,28,0.08)] backdrop-blur-md hover:border-white/30 hover:bg-white/14",
} as const;

const baseClassName =
  "group relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-full px-6 py-4 text-[15px] font-semibold leading-none tracking-[-0.018em] transition duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function CTAButton(props: CTAButtonProps) {
  const shine = (
    <span className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
      <span className="absolute -left-12 top-0 h-full w-10 -skew-x-12 bg-white/25 transition-transform duration-700 group-hover:translate-x-[250px]" />
    </span>
  );

  if (isLinkProps(props)) {
    const { children, variant = "primary", className, ariaLabel, href, ...linkProps } = props;
    const classes = cn(baseClassName, variants[variant], className);

    return (
      <a aria-label={ariaLabel} className={classes} href={href} {...linkProps}>
        {shine}
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  const { children, variant = "primary", className, ariaLabel, type = "button", ...buttonProps } = props;
  const classes = cn(baseClassName, variants[variant], className);

  return (
    <button aria-label={ariaLabel} className={classes} type={type} {...buttonProps}>
      {shine}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
