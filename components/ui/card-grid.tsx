import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardGridProps = {
  children: ReactNode;
  className?: string;
  columns?: "two" | "three" | "four";
};

const columnStyles = {
  two: "grid-cols-1 md:grid-cols-2",
  three: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  four: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
} as const;

export function CardGrid({ children, className, columns = "three" }: CardGridProps) {
  return <div className={cn("grid gap-6 md:gap-8 lg:gap-9 md:[grid-auto-rows:1fr]", columnStyles[columns], className)}>{children}</div>;
}
