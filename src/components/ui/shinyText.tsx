import { CSSProperties, FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
  shimmerColor?: string;
}

const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  shimmerColor = "white",
}) => {
  return (
    <div className="relative inline-block">
      <div // Changed from p to div
        style={{
          "--shimmer-width": `${shimmerWidth}px`,
          "--shimmer-color": shimmerColor,
        } as CSSProperties}
        className={cn(
          "animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%]",
          "bg-gradient-to-r from-transparent via-[var(--shimmer-color)]/80 via-50% to-transparent",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default AnimatedShinyText;
