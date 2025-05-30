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
  defaultValue?: "";
  other?: boolean;
  otherLabel?: string;
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
}: QuestionWithChoicesProps) {
  const [selected, setSelected] = useState<string>(defaultValue ?? "");
  if (defaultValue) console.log(defaultValue);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label && <span className="">{label}</span>}
      {type === "multiple" && (
        <div className="flex flex-wrap items-center space-x-2">
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
          onChange={(e) => setSelected(e.target.value)}
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
