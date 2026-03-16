import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  variant?: "wordmark" | "icon";
};

const logoVariants = {
  wordmark: {
    src: "/digitalpoint-logo.png",
    alt: "DigitalPoint LLC logo",
    width: 1503,
    height: 504,
  },
  icon: {
    src: "/digitalpoint-favicon.png",
    alt: "DigitalPoint LLC logo mark",
    width: 512,
    height: 512,
  },
} as const;

export function BrandLogo({
  className,
  imageClassName,
  priority = false,
  variant = "wordmark",
}: BrandLogoProps) {
  const asset = logoVariants[variant];

  return (
    <span className={cn("flex items-center", className)}>
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        priority={priority}
        className={cn("h-auto w-full object-contain", imageClassName)}
      />
    </span>
  );
}
