import type { ComponentProps } from "react";
import { v4 } from "uuid";
export interface ChoiceProps extends ComponentProps<"input"> {
  label: string;
  type: "radio" | "checkbox";
}

export function Choice({ label, ...props }: ChoiceProps) {
  const id = v4();

  return (
    <div className="flex items-center gap-0.5">
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
