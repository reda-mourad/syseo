import type { ComponentProps } from "react";
import { cn } from "../lib/utils";

interface TextareaProps extends ComponentProps<"textarea"> {
  lineLength: number;
  rows: number;
}

export default function Textarea({
  lineLength,
  rows,
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
      onKeyDown={(e) => {
        if (e.key.length === 1) {
          const lines = e.currentTarget.value.split("\n");
          if (lines[lines.length - 1].length >= lineLength) {
            e.preventDefault();
            return;
          }
        }

        if (e.key === "Enter") {
          if (e.currentTarget.value.split("\n").length >= rows) {
            return e.preventDefault();
          }
        }
      }}
      className={cn("w-full", className)}
      {...props}
    />
  );
}
