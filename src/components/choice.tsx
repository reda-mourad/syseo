import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { v4 } from "uuid";
export interface ChoiceProps extends ComponentProps<"input"> {
  label: string;
  type: "radio" | "checkbox";
}

export function Choice({ label, className, ...props }: ChoiceProps) {
  const id = v4();

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      <input
        id={props.id || id}
        value={label || props.name}
        name={label}
        {...props}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
}
