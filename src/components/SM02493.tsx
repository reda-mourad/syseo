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

export default function SM02493({ patient, form, user }: DataResponse) {
  return (
    <Form>
      <Page index={1} patient={patient} title={title} total={pages}>
        <FormHeader code="SM02493" patient={patient} />
        <Heading level={1}>{title}</Heading>
        <div className="flex justify-between">
          <Choice label="Demande médicale" type="checkbox" defaultChecked />
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
            defaultValue="Salle 1"
          />
          <QuestionWithChoices
            choices={["Hospitalisé", "Externe"]}
            type="radio"
            label="Type admission :"
          />
          <QuestionWithInput label="Médecin en charge :" />
        </div>
        {/* <QuestionWithInput label="Raison de l'intervention :" /> */}
        <div className="flex gap-4">
          <QuestionWithChoices
            choices={[
              "",
              "Masse ou adénopathie pulmonaire",
              "Hémoptysie",
              "Pneumonie non résolutive / Atélectasie",
              "Toux chronique / Anomalie radiologique",
              "Corps étranger / Bouchon muqueux",
              "Sténose bronchique / Obstruction",
              "Maladie interstitielle diffuse",
              "Évaluation pré-opératoire lésion centrale",
              "Traumatisme ou brûlure inhalatoire",
              "Drainage sécrétions / Atélectasie ventilée",
            ]}
            type="single"
            label="Raison de l'intervention :"
          />
          <QuestionWithInput label="Autre :" name="autre raison" />
        </div>
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
          defaultValue="Bronchoscopie"
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
        <Truc index={1} />
        <Heading level={2}>Per intervention :</Heading>
        <Textarea
          lineLength={108}
          rows={5}
          name="Per intervention :"
          className="max-h-24"
        />
        <Heading level={2}>Post intervention</Heading>
        <QuestionWithInput label="SpO2 : " type="number" className="max-w-10" />
        <Truc index={2} />
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
        <QuestionWithInput label="Signature :" value={user.signature} />
        <div className="gap-2 grid grid-cols-2">
          {/* <QuestionWithInput label="Nom et prénom :" />
          <QuestionWithInput label="No de permis :" />
          <QuestionWithInput label="Titre d'emploi :" /> */}
          {/* <QuestionWithInput
            label="Date :"
            type="date"
            className="max-w-fit"
            name="signature date"
            initValue={form.data?.["signature date"] ?? currentDate()}
          /> */}
        </div>
      </Page>
      <Page index={3} patient={patient} title={title} total={pages}>
        <table>
          <thead>
            <tr>
              <th className="min-w-16">Heure</th>
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
            {Array.from({ length: 12 }, (_, i) => (
              <tr key={i}>
                <td className="text-center">
                  <TimePicker
                    name={`note ${i} heure`}
                    initValue={form.data?.[`note ${i} heure`] ?? ""}
                  />
                </td>
                <td>
                  <Textarea
                    lineLength={97}
                    rows={3}
                    name={`note ${i}`}
                    className="min-h-[58px]"
                  />
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
    <div className="gap-4 grid grid-cols-2">
      <div className="flex items-center gap-2">
        <Choice label="AA" type="checkbox" name={`oxy aa ${index}`} />
        <QuestionWithInput type="number" name={`oxy aa ${index}`} />
      </div>
      <div className="flex items-center gap-2">
        <Choice label="" type="checkbox" name={`oxy lunette ${index}`} />
        <QuestionWithChoices
          choices={[
            "Lunette nasale",
            "Lunette nasale avec Co2",
            "Lunette nasale haut débit",
          ]}
          type="single"
          name={`oxy lunette type ${index}`}
        />
        <QuestionWithInput type="number" name={`oxy aa ${index}`} />
        L/min
      </div>
      <div className="flex items-center gap-2">
        <Choice
          label="Masque multi-concentration"
          type="checkbox"
          name={`oxy masque ${index}`}
        />
        <QuestionWithChoices
          choices={["24%", "28%", "31%", "35%", "40%", "60%"]}
          type="single"
          name={`oxy masque value ${index}`}
        />
      </div>
      <div className="flex items-center gap-2">
        <Choice
          label="Optiflow"
          type="checkbox"
          name={`oxy Optiflow ${index}`}
        />
        <QuestionWithInput type="number" name={`oxy Optiflow val1 ${index}`} />%
        <QuestionWithInput type="number" name={`oxy Optiflow val2 ${index}`} />
        L/min
      </div>
      <Choice
        label="Masque 100%"
        type="checkbox"
        name={`oxy masque 100 ${index}`}
      />
      <div className="flex items-center gap-2">
        <Choice label="Bipap" type="checkbox" name={`oxy Bipap ${index}`} />
        <QuestionWithInput type="number" name={`oxy Bipap val1 ${index}`} />%
      </div>
      <div className="flex items-center gap-2">
        <Choice
          label="Ventilé mécaniquement"
          type="checkbox"
          name={`oxy Ventilé mécaniquement ${index}`}
        />
        <QuestionWithInput
          type="number"
          name={`oxy Ventilé mécaniquement val1 ${index}`}
        />
        %
      </div>
    </div>
  );
}
