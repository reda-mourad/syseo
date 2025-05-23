import type { ComponentProps } from "react";

export interface ChoiceProps extends ComponentProps<"input"> {
  label: string;
  type: "radio" | "checkbox";
}

export function Choice({ label, ...props }: ChoiceProps) {
  const id = crypto.randomUUID();

  return (
    <div className="flex items-center gap-1">
      <input id={props.id || id} value={label} name={label} {...props} />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
}
