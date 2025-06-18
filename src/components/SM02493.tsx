import type { DataResponse } from "@/4d";
import { currentDate } from "@/choices";
import Allergies from "./allergies";
import { Choice } from "./choice";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import Heading from "./heading";
import { Page } from "./page";
import { QuestionWithChoices } from "./question-with-choices";
import { QuestionWithInput } from "./question-with-input";
import Textarea from "./Textarea";
import TimePicker, { TimeField } from "./time-picker";

const title = "INHALOTHÉRAPIE EN ENDOSCOPIE PULMONAIRE";
const pages = 3;

const list = [
  { label: "AA", unit: "" },
  // { label: "Adrénaline", unit: "mcg" },
  { label: "Lunette Nasale", unit: "L/min" },
  { label: "Masque multi concentration", unit: "%" },
  { label: "Optiflow", unit: "%" },
  { label: "Ventilé mécaniquement", unit: "%" },
  { label: "Bipap", unit: "" },
];

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
        </div>
        <QuestionWithInput label="Raison de l'intervention :" />
        <Allergies />
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
            "Aiguille ",
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
        <Heading level={2}>Médicaments :</Heading>
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
          ].map(({ label, unit }, i) => (
            <div key={i} className="flex flex-wrap items-center gap-1">
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
        <Heading level={2}>Oxygénothérapie :</Heading>
        <QuestionWithInput
          label="À l'arrivée : SpO2 : "
          type="number"
          className="max-w-10"
        />
        <Truc index={1} list={list} />
        <Heading level={2}>Per intervention :</Heading>
        <Textarea
          lineLength={108}
          rows={5}
          name="Per intervention :"
          className="max-h-24"
        />
        <Heading level={2}>Post intervention</Heading>
        <QuestionWithInput label="SpO2 : " type="number" className="max-w-10" />
        <Truc index={2} list={list} />
        <Heading level={2}>Notes d'observations</Heading>
        <table>
          <thead>
            <tr>
              <th className="w-16">Heure</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }, (_, i) => (
              <tr key={i}>
                <td className="text-center">
                  <TimePicker initValue={form.data?.[""] ?? ""} name="" />
                </td>
                <td>
                  <QuestionWithInput />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Textarea lineLength={108} rows={9} className="h-72 max-h-full" /> */}
        <div className="gap-2 grid grid-cols-2">
          <QuestionWithInput label="Nom et prénom :" />
          <QuestionWithInput label="No de permis :" />
          <QuestionWithInput label="Titre d'emploi :" />
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
                  <Choice
                    label="Double identification faite"
                    name="Double identification faite notes"
                    type="checkbox"
                  />
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
      {/* <Page index={4} patient={patient} title={title} total={pages}>
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
      </Page> */}
    </Form>
  );
}

function Truc({
  list,
  index,
}: {
  index: number;
  list: { label: string; unit: string }[];
}) {
  return (
    <div className="gap-2 grid grid-cols-2">
      {list.map(({ label, unit }, i) => (
        <div key={i} className="flex flex-wrap items-center gap-1">
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
