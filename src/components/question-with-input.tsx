import type { ComponentProps } from "react";
import { cn } from "../lib/utils";
import { v4 } from "uuid";

export interface QuestionWithInputProps extends ComponentProps<"input"> {
  label?: string;
}

export function QuestionWithInput({
  label,
  className,
  ...props
}: QuestionWithInputProps) {
  const id = v4();

  return (
    <fieldset className="flex items-center gap-1">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        name={label}
        className={cn(
          "focus:bg-violet-100  rounded border border-gray-400 flex-1 w-full px-1",
          className
        )}
        {...props}
      />
    </fieldset>
  );
}
