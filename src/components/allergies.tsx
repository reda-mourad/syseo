import { allergies } from "@/choices";
import { QuestionWithChoices } from "./question-with-choices";
import { Choice } from "./choice";
import { QuestionWithInput } from "./question-with-input";

export default function Allergies() {
  return (
    <table>
      <thead>
        <tr>
          <th>Allergie</th>
          <th>Type de reaction</th>
        </tr>
      </thead>
      <tbody>
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <tr key={i}>
              <td>
                <QuestionWithChoices
                  choices={allergies}
                  type="single"
                  name={`allergie_${i}`}
                />
              </td>
              <td>
                <div className="grid grid-cols-3">
                  {[
                    "nausées",
                    "vomissements",
                    "délirium",
                    "urticaire",
                    "céphalée",
                    "arythmie",
                    "choc",
                    "rougeur faciale",
                  ].map((e) => (
                    <Choice
                      key={e}
                      label={e}
                      type="checkbox"
                      name={`${e} ${i}`}
                    />
                  ))}
                </div>
                <QuestionWithInput
                  label="Autre :"
                  name={`reaction_${i}_autre`}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
