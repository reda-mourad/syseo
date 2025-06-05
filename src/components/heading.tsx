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
        "font-bold",
        level === 1 && "text-center text-lg",
        level > 1 && "border-b text-md",
        level > 2 && "border-b text-sm",
        className
      )}
      {...props}
    />
  );
}
