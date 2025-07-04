import type { DataResponse } from "../4d";
import { currentDate, nonOui } from "../choices";
import { Choice } from "./choice";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import Heading from "./heading";
import { Page } from "./page";
import { QuestionWithChoices } from "./question-with-choices";
import { QuestionWithInput } from "./question-with-input";
import Textarea from "./Textarea";
import TimePicker from "./time-picker";

const title = "SOINS INFIRMIERS EN ENDOSCOPIE UROLOGIQUE";
const pages = 2;

export default function SM01742({ patient, form, user }: DataResponse) {
  return (
    <Form>
      <Page index={1} patient={patient} title={title} total={pages}>
        <FormHeader code="SM01742" patient={patient} />
        <Heading level={1}>{title}</Heading>
        <div className="gap-2 grid grid-cols-2">
          <QuestionWithInput
            label="Date :"
            type="date"
            className="max-w-40"
            initValue={currentDate()}
          />
          <QuestionWithInput label="Médecin  en charge :" />
          <QuestionWithChoices
            label="Salle :"
            type="single"
            choices={["", "Cystoscopie", "Bx prostate"]}
            defaultValue="Cystoscopie"
          />
          <QuestionWithChoices
            label="Type admission :"
            choices={["EXT.", "HOSP.", "URG."]}
            type="radio"
            defaultValue="EXT."
          />
          <QuestionWithChoices
            label="Anesthésie :"
            choices={["Locale", "Local neuro.", "Nil"]}
            type="radio"
            defaultValue="Locale"
          />
          <div className="flex items-center gap-2">
            <QuestionWithChoices
              label="Locale : Instillagel :"
              choices={[
                "x1 dose",
                "x2 doses",
                "Lidocaïne 2% 10 ml intra prostate injecté par médecin",
              ]}
              type="radio"
              columns={1}
              labelClassName="shrink-0"
            />
          </div>
          <div className="flex items-center gap-3">
            <span>Locale neuro :</span>
            <div className="flex gap-1">
              <QuestionWithInput
                label="Versed"
                className="w-10"
                type="number"
              />
              ml
            </div>
            <div className="flex gap-1">
              <QuestionWithInput
                label="Fentanyl"
                className="w-10"
                type="number"
              />
              ml
            </div>
          </div>
          <QuestionWithChoices
            label="Consentement signé :"
            choices={nonOui}
            type="radio"
            defaultValue="Oui"
          />
          <div />
          <Choice label="Refus de traitement" type="checkbox" />
        </div>
        <Heading level={2}>ENDOSCOPIE UROLOGIQUE</Heading>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            Début :
            <TimePicker name="Début" initValue={form.data?.["Début"] ?? ""} />
          </div>
        </div>
        <div>
          <div>Intervention exécutée :</div>
          <div className="grid grid-cols-3">
            {[
              "Bx de prostate",
              "Cystoscopie",
              "Cystométrie",
              "Débimétrie",
              "Circoncision",
              "Décaillotage",
              "Bilan urodynamique",
              "Toucher rectal",
              "Uréthrotomie interne",
              "Exérèse Double J :",
              // "Exérèse",
              "Installation",
              "Dilatation urétrale",
              "Fulguration",
              "Pyélo-rétrograde",
              "Cystographie",
              "Urétroscopie",
              "Vasectomie",
            ].map((e) => (
              <div key={e} className="flex gap-1">
                <Choice type="checkbox" label={e} />
                {e === "Exérèse Double J :" && (
                  <QuestionWithChoices
                    type="single"
                    choices={["", "Droit", "Gauche", "Bilatéral"]}
                  />
                )}
                {/* {e === "Pyélo-rétrograde" && (
                  <QuestionWithInput
                    name="Pyélo-rétrograde details"
                    className="w-20"
                  />
                )} */}
              </div>
            ))}
          </div>
        </div>
        {/* <QuestionWithInput label="Diagnostic Préliminaire selon médecin :" /> */}
        {/* <QuestionWithChoices
          label="Biopsie(s) :"
          choices={["Vésicale", "Prostate", "Lésion génitale"]}
          type="multiple"
        /> */}
        <table className="text-[.66rem]">
          <thead>
            <tr>
              <th colSpan={9}>Sonde(s)</th>
            </tr>
            <tr>
              <th>Type</th>
              <th>Procedure</th>
              <th>Grandeur</th>
              <th>MATIERE</th>
              <th>Voies</th>
              <th>Ballonet</th>
              <th>Sac collecteur</th>
              <th>Draine</th>
              <th>Urine</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 2 }, (_, i) => (
              <tr key={i}>
                <td>
                  <QuestionWithChoices
                    choices={["", "Foley", "Tiemann", "Supra pubienne"]}
                    type="single"
                    name={`type ${i}`}
                  />
                </td>
                <td>
                  <QuestionWithChoices
                    choices={["", "Retrait", "Insertion"]}
                    type="single"
                  />
                </td>
                <td>
                  <QuestionWithChoices
                    name={`grandeur ${i}`}
                    choices={[
                      "",
                      "#12",
                      "#14",
                      "#16",
                      "#18",
                      "#20",
                      "#22",
                      "#24",
                      "#26",
                    ]}
                    type="single"
                  />
                </td>
                <td>
                  <QuestionWithChoices
                    name={`latex ${i}`}
                    choices={["", "Avec latex", "Sans latex", "En silicon"]}
                    type="single"
                  />
                </td>
                <td>
                  <QuestionWithChoices
                    name={`voies ${i}`}
                    choices={["", "X2", "X3"]}
                    type="single"
                  />
                </td>
                <td>
                  <QuestionWithChoices
                    name={`BALLONET ${i}`}
                    choices={["", "5ml", "10ml", "15ml", "30ml"]}
                    type="single"
                  />
                </td>
                <td>
                  <QuestionWithChoices
                    name={`sac ${i}`}
                    choices={["", "500ml", "1000ml", "2000ml", "4000ml"]}
                    type="single"
                  />
                </td>
                <td>
                  <div className="flex gap-1">
                    <QuestionWithInput type="number" name={`draine ${i}`} />
                    ml
                  </div>
                </td>
                <td>
                  <QuestionWithChoices
                    name={`urine ${i}`}
                    choices={[
                      "",
                      "jaune claire",
                      "jaune foncé",
                      "ambrée",
                      "brune",
                      "trouble",
                      "avec sédiments",
                      "avec sang",
                    ]}
                    type="single"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <QuestionWithInput label="Scope :" className="max-w-40" />
        <div className="flex justify-between items-center gap-3">
          <QuestionWithChoices
            label="Badigeonnage :"
            choices={[
              "",
              "chlorhexidine 0.05%",
              "chlorhexidine 2%",
              "providone-iodine 10%",
            ]}
            type="single"
          />
          <QuestionWithInput label="Région" initValue="génitale" />
          <QuestionWithInput
            label="Par :"
            name="Par Badigeonnage"
            initValue="infirmière"
          />
        </div>
        <div className="flex justify-between items-center gap-3">
          <QuestionWithInput label="Électrocautère :" />
          <QuestionWithInput label="Degrés : coag :" />
          <QuestionWithInput label="cut. :" />
        </div>
        <Heading level={2}>Laser</Heading>
        <div className="flex justify-between items-center gap-3">
          <QuestionWithInput label="Puissance (J)" type="number" />
          <QuestionWithInput label="Fréquence (Hz)" type="number" />
          <QuestionWithInput label="Temps (s)" type="number" />
          <QuestionWithChoices
            choices={[
              "",
              "200 micron",
              "272 micron",
              "365 micron",
              "550 micron",
            ]}
            type="single"
            label="Fil laser"
          />
        </div>
        <Heading level={2}>Médicaments</Heading>
        <div className="gap-2 grid grid-cols-2">
          <QuestionWithChoices
            label="Muko"
            choices={["x1 dose", "x2 doses"]}
            type="radio"
            defaultValue="x1 dose"
          />
          <QuestionWithInput
            label="Eau stérile intra vésicale (ml)"
            type="number"
            className="w-10 max-w-10"
          />
        </div>
      </Page>
      <Page index={2} patient={patient} title={title} total={pages}>
        <table>
          <thead>
            <tr>
              <th colSpan={5}>Prélèvements</th>
            </tr>
            <tr>
              <th>Flacon</th>
              <th>Type</th>
              <th>Nombre</th>
              <th>Site</th>
            </tr>
          </thead>
          <tbody>
            {Array(8)
              .fill(null)
              .map((_, i, arr) => (
                <tr key={i}>
                  <td className="text-center">
                    <select name={`prelevement flacon ${i}`}>
                      <option value=""></option>
                      {arr
                        .map((_, i) => `Flacon ${i + 1}`)
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
                        "Analyse d'urine",
                        "Culture urine",
                        "Bx vessie urinaire",
                        "Cytologie urinaire",
                        "Bx prostate",
                        "Bx lésion génitale",
                        "Vésicules séminales",
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
                        "vessie",
                        "col vésical",
                        "urètre",
                        "prostate - lobe droit",
                        "prostate - lobe gauche",
                        "lésion génitale",
                        "D (vesic sem)",
                        "G (vesic sem)",
                        "Bilatérale (vesic sem)",
                        "miction libre",
                        "sac urinaire",
                        "cystoscopie",
                      ].sort()}
                      type="single"
                      name={`segment colo ${i}`}
                      className="justify-center"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Heading level={2}>Notes d'observations</Heading>
        <Textarea
          lineLength={108}
          rows={15}
          style={{ height: "250px" }}
          name="Notes d'observations"
          className="max-h-full"
          defaultValue={
            "Consultation pré examen réalisée par md, examen bien toléré, sans complication."
          }
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            Fin :
            <TimePicker name="Fin" initValue={form.data?.["Fin"] ?? ""} />
          </div>
          <div className="flex-1">
            <QuestionWithInput label="Signature de l'infirmière :" value={user.signature} />
          </div>
        </div>
      </Page>
    </Form>
  );
}
