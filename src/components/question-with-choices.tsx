import { cn } from "../lib/utils";
import { Choice } from "./choice";

export interface QuestionWithChoicesProps {
  label?: string;
  name?: string;
  choices: string[];
  type: "single" | "multiple";
  className?: string;
}

export function QuestionWithChoices({
  label,
  name,
  choices,
  type,
  className,
}: QuestionWithChoicesProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label && <span>{label}</span>}
      <div className="flex flex-wrap items-center space-x-4">
        {choices.map((c) => (
          <Choice
            key={c}
            label={c}
            type={type === "multiple" ? "checkbox" : "radio"}
            name={type === "single" ? name || label : `${name || label}_${c}`}
          />
        ))}
      </div>
    </div>
  );
}
