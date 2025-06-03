import { useState, type ComponentProps } from "react";
import { v4 } from "uuid";
import { cn } from "../lib/utils";

export interface QuestionWithInputProps extends ComponentProps<"input"> {
  label?: string;
  initValue?: string;
}

export function QuestionWithInput({
  label,
  initValue,
  className,
  onChange,
  ...props
}: QuestionWithInputProps) {
  const id = v4();
  const [value, setValue] = useState(initValue ?? "");

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
        value={value}
        onChange={(ev) => {
          const el = ev.currentTarget;
          if (el.type === "number") {
            const min = Number(el.min);
            const max = Number(el.max);
            const value = Number(ev.target.value);
            if (value >= min && value <= max) setValue(value.toString());
            if (el.value === "") setValue("");
          } else setValue(el.value);
          onChange && onChange(ev);
        }}
        maxLength={50}
        min={0}
        max={999}
        {...props}
      />
    </fieldset>
  );
}
