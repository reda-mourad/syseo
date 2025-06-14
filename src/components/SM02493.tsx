import type { DataResponse } from "@/4d";
import { allergies, currentDate } from "@/choices";
import { Choice } from "./choice";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import Heading from "./heading";
import { Page } from "./page";
import { QuestionWithChoices } from "./question-with-choices";
import { QuestionWithInput } from "./question-with-input";
import Textarea from "./Textarea";
import { TimeField } from "./time-picker";

const title = "INHALOTHÉRAPIE EN ENDOSCOPIE PULMONAIRE";
const pages = 2;

export default function SM02493({ patient, form }: DataResponse) {
  return (
    <Form>
      <Page index={1} patient={patient} title={title} total={pages}>
        <FormHeader code="SM02493" patient={patient} />
        <Heading level={1}>{title}</Heading>
        <div className="flex justify-between">
          <Choice label="Demande médicale" type="checkbox" />
          <Choice label="Double identification faite" type="checkbox" />
        </div>
        <div className="gap-4 grid grid-cols-2">
          <QuestionWithInput
            label="Date :"
            type="date"
            initValue={form.data?.["Date :"] ?? currentDate()}
            className="max-w-fit"
          />
          <QuestionWithChoices
            choices={["", "Salle 1", "Salle 2"]}
            type="single"
            label="Salle :"
          />
          <QuestionWithChoices
            choices={["Hospitalisé", "Externe"]}
            type="radio"
            label="Type admission :"
          />
          <QuestionWithInput label="Médecin en charge :" />
          <QuestionWithInput label="Raison de l’intervention :" />
        </div>
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
                      maxLength={40}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="gap-4 grid grid-cols-2">
          <TimeField
            label="Heure de début :"
            initValue={form.data?.["Heure de début :"] ?? ""}
          />
          <TimeField
            label="Heure de fin :"
            initValue={form.data?.["Heure de fin :"] ?? ""}
          />
        </div>
        <QuestionWithChoices
          choices={["Bronchoscopie", "Ebus", "Talcage", "Ponction pleurale"]}
          type="multiple"
          label="Intervention exécutée :"
        />
        <QuestionWithInput label="Drain thoracique :" />
        <QuestionWithInput label="Autre :" />
        <Choice label="Biopsie(s)" type="checkbox" />
        <QuestionWithInput name="biopsie autre" />
        <div className="gap-4 grid grid-cols-2">
          <QuestionWithInput label="Scope # :" />
          <QuestionWithInput label="Scope Ebus # : " />
        </div>
        <QuestionWithChoices
          choices={[
            "Par voie nasale",
            "Par voie orale",
            "Par voie endotrachéale",
            "Par voie trachéale",
          ]}
          type="multiple"
        />
        <QuestionWithChoices
          choices={[
            "Pince à biopsie",
            "Aig'uille ",
            "Lasso",
            "Panier",
            "Ballon",
            "Brosse",
          ]}
          type="multiple"
          label="Instruments :"
        />
      </Page>
      <Page index={2} patient={patient} title={title} total={pages}>
        <div>Médicaments :</div>
        <div className="gap-2 grid grid-cols-2">
          {[
            { label: "Lidocaïne spray", unit: "mg total" },
            { label: "Adrénaline", unit: "mcg" },
            { label: "Lidocaïne liquide 2 % intra-bronch", unit: "mg total" },
            { label: "NaCl 0,9%", unit: "ml total" },
            { label: "Lidocaïne liquide 4% intra-bronch", unit: "mg total" },
            { label: "Nacl 0.9% froid", unit: "ml total" },
            { label: "Lidocaïne visqueuse 2%", unit: "mg" },
            { label: "Xylocaïne en gelée 2%", unit: "ml" },
            { label: "Lidocaïne total", unit: "mg" },
            { label: "Cyclokapron", unit: "mg" },
          ].map(({ label, unit }) => (
            <div className="flex flex-wrap items-center gap-1">
              <Choice label={label} type="checkbox" />
              <QuestionWithInput type="number" name={`${label} dose`} />
              {unit}
              {label === "Lidocaïne liquide 4% intra-bronch" && (
                <QuestionWithInput label="Site :" />
              )}
            </div>
          ))}
          <QuestionWithInput label="Autre :" name="Autre medicament" />
        </div>
        <div>Oxygénothérapie :</div>
        <QuestionWithInput
          label="À l’arrivée : SpO2 : "
          type="number"
          className="max-w-10"
        />
        <Truc index={1} />
        <div>Per intervention :</div>
        <Textarea
          lineLength={108}
          rows={5}
          name="Per intervention :"
          className="max-h-24"
        />
        <QuestionWithInput
          label="Post intervention : SpO2 : "
          type="number"
          className="max-w-10"
        />
        <Truc index={2} />
        <div>Note d’observations</div>
        <Textarea lineLength={108} rows={9} className="h-72 max-h-full" />
        <div className="gap-2 grid grid-cols-2">
          <QuestionWithInput label="Nom et prénom :" />
          <QuestionWithInput label="No de permis :" />
          <QuestionWithInput label="Titre d’emploi :" />
          <QuestionWithInput label="Signature :" />
          <QuestionWithInput
            label="Date :"
            type="date"
            className="max-w-fit"
            name="signature date"
            initValue={form.data?.["signature date"] ?? currentDate()}
          />
        </div>
      </Page>
      <Page index={3} patient={patient} title={title} total={pages}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th className="w-full">
                <div className="flex justify-around items-center">
                  Note
                  <Choice label="Double identification faite" name="Double identification faite notes" type="checkbox" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 33 }, (_, i) => (
              <tr key={i}>
                <td>
                  <QuestionWithInput
                    type="date"
                    name={`note ${i} date`}
                    className="max-w-fit"
                  />
                </td>
                <td>
                  <QuestionWithInput name={`note ${i}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>
      <Page index={4} patient={patient} title={title} total={pages}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th className="w-full">
                <div className="flex justify-around items-center">Note</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 33 }, (_, i) => (
              <tr key={i}>
                <td>
                  <QuestionWithInput
                    type="date"
                    name={`note ${i + 33} date`}
                    className="max-w-fit"
                  />
                </td>
                <td>
                  <QuestionWithInput name={`note ${i + 33}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>
    </Form>
  );
}

function Truc({ index }: { index: number }) {
  return (
    <div className="gap-2 grid grid-cols-2">
      {[
        { label: "AA", unit: "" },
        { label: "Adrénaline", unit: "mcg" },
        { label: "Lunette Nasale", unit: "L/min" },
        { label: "Masque multi concentration", unit: "%" },
        { label: "Optiflow", unit: "%" },
        { label: "Ventilé mécaniquement", unit: "%" },
        { label: "Bipap", unit: "" },
      ].map(({ label, unit }) => (
        <div className="flex flex-wrap items-center gap-1">
          <Choice label={label} type="checkbox" name={`${label} ${index}`} />
          <QuestionWithInput
            type={label === "Bipap" ? "text" : "number"}
            name={`${label} dose ${index}`}
          />
          {unit}
          {label === "Optiflow" && (
            <>
              <QuestionWithInput
                name={`Optiflow l/min ${index}`}
                type="number"
              />
              L/min
            </>
          )}
        </div>
      ))}
    </div>
  );
}
