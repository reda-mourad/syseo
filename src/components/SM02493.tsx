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

export default function SM02493({ patient, form, extra }: DataResponse) {
  return (
    <Form>
      <Page index={1} patient={patient} title={title} total={pages}>
        <FormHeader code="SM02493" patient={patient} />
        <Heading level={1}>{title}</Heading>
        <div className="flex justify-between">
          <Choice label="Demande médicale" type="checkbox" defaultChecked />
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
          <QuestionWithInput
            label="Médecin en charge :"
            initValue={extra?.medecin}
            readOnly
          />
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
        <table className="text-[.55rem]">
          <thead>
            <tr>
              <th colSpan={5}>Prélèvements</th>
            </tr>
            <tr>
              <th>Flacon</th>
              <th>Type</th>
              <th className="min-w-10">NBR / VOL</th>
              <th>Site</th>
              <th>Analyse</th>
            </tr>
          </thead>
          <tbody>
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <tr key={i}>
                  <td className="text-center">
                    <select
                      name={`prelevement flacon ${i}`}
                      defaultValue={`Flacon ${i + 1}`}
                    >
                      <option value=""></option>
                      {Array(8)
                        .fill(null)
                        .map((_, j) => `Flacon ${j + 1}`)
                        .map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td>
                    <QuestionWithChoices
                      choices={[
                        "",
                        "Lavage broncho-alvéolaire",
                        "lavage bronchique",
                        "Biopsie",
                        "Polypectomie",
                        "Mucosctomie",
                        "Aspiration bronchique",
                        "Brossage bronchique",
                        "Biopsie endobronchique",
                        "Biopsie transbronchique",
                        "Ponction transbronchique à l'aiguille (TBNA)",
                      ]}
                      type="single"
                      name={`prelevement type ${i}`}
                      className="justify-center"
                    />
                  </td>
                  <td>
                    <QuestionWithInput
                      name={`prelevement nombre ${i}`}
                      type="number"
                    />
                  </td>
                  <td>
                    <QuestionWithChoices
                      choices={[
                        "",
                        "Bronche droite",
                        "Bronche gauche",
                        "Lobe supérieur droit",
                        "Lobe moyen droit",
                        "Lobe inférieur droit",
                        "Lobe supérieur gauche",
                        "Lobe inférieur gauche",
                        "S6 LID",
                        "S6 LIG",
                        "Larynx",
                        "Cordes vocales",
                        "Trachée",
                        "Carène",
                        "Autre",
                      ]}
                      type="single"
                      name={`segment colo ${i}`}
                      className="justify-center"
                    />
                  </td>
                  <td>
                    <QuestionWithChoices
                      choices={[
                        "Pathologie",
                        "Cytologie",
                        "Bactériologie",
                        "Biochimie",
                        "Moléculaire",
                        "Microbiologique",
                      ]}
                      type="multiple"
                      columns={2}
                      name={`segement gastro ${i}`}
                      className="justify-center"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Page>
      <Page index={2} patient={patient} title={title} total={pages}>
        <table className="text-[.55rem]">
          <thead>
            <tr>
              <th colSpan={5}>Prélèvements (suite)</th>
            </tr>
            <tr>
              <th>Flacon</th>
              <th>Type</th>
              <th className="min-w-10">NBR / VOL</th>
              <th>Site</th>
              <th>Analyse</th>
            </tr>
          </thead>
          <tbody>
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <tr key={i}>
                  <td className="text-center">
                    <select
                      name={`prelevement flacon ${i + 4}`}
                      defaultValue={`Flacon ${i + 5}`}
                    >
                      <option value=""></option>
                      {Array(8)
                        .fill(null)
                        .map((_, j) => `Flacon ${j + 1}`)
                        .map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td>
                    <QuestionWithChoices
                      choices={[
                        "",
                        "Lavage broncho-alvéolaire",
                        "lavage bronchique",
                        "Biopsie",
                        "Polypectomie",
                        "Mucosctomie",
                        "Aspiration bronchique",
                        "Brossage bronchique",
                        "Biopsie endobronchique",
                        "Biopsie transbronchique",
                        "Ponction transbronchique à l'aiguille (TBNA)",
                      ]}
                      type="single"
                      name={`prelevement type ${i + 4}`}
                      className="justify-center"
                    />
                  </td>
                  <td>
                    <QuestionWithInput
                      name={`prelevement nombre ${i + 4}`}
                      type="number"
                    />
                  </td>
                  <td>
                    <QuestionWithChoices
                      choices={[
                        "",
                        "Bronche droite",
                        "Bronche gauche",
                        "Lobe supérieur droit",
                        "Lobe moyen droit",
                        "Lobe inférieur droit",
                        "Lobe supérieur gauche",
                        "Lobe inférieur gauche",
                        "S6 LID",
                        "S6 LIG",
                        "Larynx",
                        "Cordes vocales",
                        "Trachée",
                        "Carène",
                        "Autre",
                      ]}
                      type="single"
                      name={`segment colo ${i + 4}`}
                      className="justify-center"
                    />
                  </td>
                  <td>
                    <QuestionWithChoices
                      choices={[
                        "Pathologie",
                        "Cytologie",
                        "Bactériologie",
                        "Biochimie",
                        "Moléculaire",
                        "Microbiologique",
                      ]}
                      type="multiple"
                      columns={2}
                      name={`segement gastro ${i + 4}`}
                      className="justify-center"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="gap-4 grid grid-cols-2">
          <QuestionWithInput label="Scope # :" initValue={extra?.scope} />
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
        <Heading level={2}>
          Médicaments : i.b: intra-bronchique | OPh: oropharyngé | i.n: intra
          nasal | i.o: intra oral | i.g: intra glottique
        </Heading>
        <div className="gap-2 grid grid-cols-2">
          {[
            {
              label: "Lidocaïne spray OPh",
              unit: "mcg total",
              defaultValue: "12",
              extra: <QuestionWithInput label="Nombre de spray" />,
            },
            { label: "Adrénaline i.b", unit: "mcg total" },
            {
              label: "Lidocaïne liquide 2% OPh",
              unit: "ml total",
              choices: Array.from({ length: 31 }, (_, i) => i.toString()),
            },
            { label: "Adrénaline i.b", unit: "ml total" },
            {
              label: "Lidocaïne liquide 2% i.b",
              unit: "ml total",
              choices: Array.from({ length: 31 }, (_, i) => i.toString()),
            },
            { label: "NaCl 0.9% i.b", unit: "ml total" },
            {
              label: "Lidocaïne liquide i.o",
              unit: "ml total",
              choices: ["2%", "4%"],
              defaultChoice: "2%",
            },
            { label: "NaCl 0.9% froid i.b", unit: "ml total" },
            { label: "Lidocaïne visqueuse 2% i.n", unit: "mg" },
            { label: "Xylocaine en gelée 2% i.b", unit: "ml total" },
            { label: "Lidocaïne visqueuse 2% i.n", unit: "ml" },
            { label: "Cyclokapron i.b", unit: "mg total" },
            { label: "Lidocaïne total", unit: "mg" },
            { label: "Cyclokapron i.b", unit: "ml total" },
          ].map(
            (
              { label, unit, choices, defaultValue, defaultChoice, extra },
              i
            ) => (
              <div key={i} className="flex flex-wrap items-center gap-1">
                <Choice label={label} type="checkbox" name={`${i} ${label} `} />
                {choices ? (
                  <QuestionWithChoices
                    choices={choices}
                    type="single"
                    name={`${i} ${label} dose`}
                    defaultValue={defaultChoice}
                  />
                ) : (
                  <QuestionWithInput
                    initValue={defaultValue}
                    type="number"
                    name={`${i} ${label} dose`}
                  />
                )}
                {label === "Lidocaïne liquide i.o" && (
                  <QuestionWithInput
                    type="number"
                    name={`${i} ${label} extra`}
                  />
                )}
                {unit}
                {extra}
              </div>
            )
          )}
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
      </Page>

      <Page index={3} patient={patient} title={title} total={pages}>
        <Heading level={2}>Post intervention</Heading>
        <QuestionWithInput label="SpO2 : " type="number" className="max-w-10" />
        <Truc index={2} />
        <Heading level={2}>Notes d'observations</Heading>
        {/* <table>
          <thead>
            <tr>
              <th className="w-16">Heure</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }, (_, i) => (
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
        </table> */}
        <table>
          <thead>
            <tr>
              <th className="min-w-16">Heure</th>
              <th className="w-full">
                <div className="flex justify-around items-center">Note</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 9 }, (_, i) => (
              <tr key={i}>
                <td className="text-center">
                  <TimePicker
                    name={`note ${i} heure`}
                    initValue={form.data?.[`note ${i} heure`] ?? ""}
                  />
                </td>
                <td>
                  <textarea
                    rows={3}
                    name={`note ${i}`}
                    className="w-full max-h-[58px]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <textarea name="signature" className="w-full max-h-12" readOnly />
        <div className="gap-2 grid grid-cols-2"></div>
      </Page>
    </Form>
  );
}

function Truc({ index }: { index: number }) {
  return (
    <div className="gap-2 grid grid-cols-2">
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
