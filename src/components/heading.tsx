import type { ComponentProps } from "react";
import { cn } from "../lib/utils";

export default function Heading({
  className,
  level,
  ...props
}: ComponentProps<"div"> & { level: number }) {
  return (
    <div
      className={cn(
        "font-semibold",
        level === 1 && "text-center text-2xl",
        level > 1 && "border-b text-xl",
        level > 2 && "border-b text-md border-none",
        className
      )}
      {...props}
    />
  );
}
