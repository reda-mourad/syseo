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
        if (e.key === "Enter") {
          if (e.currentTarget.value.split("\n").length >= rows) {
            return e.preventDefault();
          } else {
            e.currentTarget.maxLength =
              e.currentTarget.value.split("\n")[0].length + lineLength + 1;
          }
        }
      }}
      maxLength={lineLength * rows}
      className={cn("w-full max-h-11", className)}
      {...props}
    />
  );
}
