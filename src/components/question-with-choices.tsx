import { useState } from "react";
import { cn } from "../lib/utils";
import { Choice } from "./choice";
import { QuestionWithInput } from "./question-with-input";

export interface QuestionWithChoicesProps {
  label?: string;
  name?: string;
  choices: string[];
  type: "single" | "multiple" | "radio";
  className?: string;
  defaultValue?: string;
  other?: boolean;
  otherLabel?: string;
  columns?: number;
  onSelect?: (value: string) => void;
}

export function QuestionWithChoices({
  label,
  name,
  choices,
  type,
  className,
  defaultValue,
  other,
  otherLabel,
  columns,
  onSelect,
}: QuestionWithChoicesProps) {
  const [selected, setSelected] = useState<string>(defaultValue ?? "");

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label && <span className="">{label}</span>}
      {type === "multiple" && (
        <div
          className={cn(
            columns
              ? `grid grid-cols-${columns} gap-1 w-full`
              : "flex flex-wrap items-center space-x-2"
          )}
        >
          {choices.map((c) => (
            <Choice
              key={c}
              label={c}
              type={type === "multiple" ? "checkbox" : "radio"}
              name={`${name || label}_${c}`}
            />
          ))}
          {other && (
            <QuestionWithInput
              label={otherLabel || "Autre"}
              name={`${label || name} other`}
            />
          )}
        </div>
      )}
      {type === "radio" && (
        <div className="flex flex-wrap items-center space-x-2">
          {choices.map((c) => (
            <Choice
              key={c}
              label={c}
              value={c}
              type="radio"
              name={`${name || label}`}
              defaultChecked={defaultValue === c}
            />
          ))}

          {other && (
            <>
              <Choice
                label={otherLabel || "Autre"}
                value={otherLabel || "Autre"}
                type="radio"
                name={`${name || label}`}
              />
              <QuestionWithInput name={`${label || name} other`} />
            </>
          )}
        </div>
      )}
      {type === "single" && (
        <select
          name={name || label}
          value={selected}
          onChange={(e) => {
            if (onSelect) {
              onSelect(e.currentTarget.value);
            }
            setSelected(e.target.value);
          }}
        >
          {choices.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
