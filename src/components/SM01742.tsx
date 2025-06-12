import type { DataResponse } from "../4d";
import { allergies, currentDate, nonOui } from "../choices";
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

export default function SM01742({ patient, form }: DataResponse) {
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
            choices={["", "Cystoscopie"]}
          />
          <QuestionWithChoices
            label="Type admission :"
            choices={["EXT.", "HOSP.", "URG."]}
            type="radio"
          />
          <QuestionWithChoices
            label="Anesthésie :"
            choices={["Locale", "Local neuro.", "Nil"]}
            type="radio"
          />
          <div className="flex items-center gap-2">
            Locale :
            <QuestionWithChoices
              label="Instillagel :"
              choices={["x1 dose", "x2 doses"]}
              type="radio"
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
          />
          <Choice label="Refus de traitement" type="checkbox" />
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
        <Heading level={2}>ENDOSCOPIE UROLOGIQUE</Heading>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            Début :
            <TimePicker name="Début" initValue={form.data?.["Début"] ?? ""} />
          </div>
          <div className="flex items-center gap-2">
            Fin :
            <TimePicker name="Fin" initValue={form.data?.["Fin"] ?? ""} />
          </div>
        </div>
        <div>
          <div>Intervention exécutée :</div>
          <div className="grid grid-cols-3">
            {[
              "Cystoscopie",
              "Cystométrie",
              "Débimétrie",
              "Circoncision",
              "Décaillotage",
              "Bilan urodynamique",
              "Toucher rectal",
              "Uréthrotomie interne",
              "Double J :",
              "Exérèse",
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
                {e === "Double J :" && (
                  <QuestionWithChoices
                    type="single"
                    choices={["", "Droit", "Gauche", "Bilatéral"]}
                  />
                )}
                {e === "Pyélo-rétrograde" && (
                  <QuestionWithInput
                    name="Pyélo-rétrograde details"
                    className="w-20"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <QuestionWithInput label="Diagnostic Préliminaire selon médecin :" />
        <QuestionWithChoices
          label="Biopsie(s) :"
          choices={["Vésicale", "Prostate", "Lésion génitale"]}
          type="multiple"
        />
        <table>
          <thead>
            <tr>
              <th colSpan={8}>Sonde(s)</th>
            </tr>
            <tr>
              <th>Type</th>
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
      </Page>
      <Page index={2} patient={patient} title={title} total={pages}>
        <QuestionWithInput label="Scope :" />
        <div className="flex justify-between items-center gap-3">
          <QuestionWithInput label="Électrocautère :" />
          <QuestionWithInput label="Degrés : coag :" />
          <QuestionWithInput label="cut. :" />
          <QuestionWithInput label="Par :" name="Par Électrocautère" />
        </div>
        <div className="flex justify-between items-center gap-3">
          <QuestionWithInput label="Badigeonnage : Solution :" />
          <QuestionWithInput label="Région" />
          <QuestionWithInput label="Par :" name="Par Badigeonnage" />
        </div>
        <QuestionWithInput label="Autres(s) spécimens(s) :" />
        <div className="flex justify-between items-center gap-3">
          <QuestionWithInput label="Soluté :" />
          <QuestionWithInput label="Site" />
          <QuestionWithInput label="Par :" name="Par Soluté" />
        </div>
        <Heading level={2}>Médicaments</Heading>
        <div className="gap-2 grid grid-cols-2">
          <QuestionWithChoices
            label="Chorexidina 2% sans alcool avant examen"
            choices={["x1", "x2"]}
            type="radio"
          />
          <QuestionWithChoices
            label="Instillagel avant examen"
            choices={["x1 dose", "x2 doses"]}
            type="radio"
          />
          <QuestionWithChoices
            label="Muko"
            choices={["x1 dose", "x2 doses"]}
            type="radio"
          />
          <QuestionWithInput
            label="Eau stérile intra vésicale (ml)"
            type="number"
            className="w-10 max-w-10"
          />
        </div>
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
                        "col vésicale",
                        "urètre",
                        "prostate - lobe droit",
                        "prostate - lobe gauche",
                        "lésion génitale",
                      ]}
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
        <Textarea lineLength={108} rows={15} style={{height:"250px"}} name="Notes d'observations" />
        {/* <table>
          <thead>
            <tr>
              <th colSpan={2}>Notes d'observations :</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }).map((_, i) => (
              <tr key={i}>
                <td>
                  <TimePicker
                    className="w-16"
                    name={`note time ${i}`}
                    initValue={form.data?.[`note time ${i}`] ?? ""}
                  />
                </td>
                <td className="space-y-1 w-full">
                  <Textarea lineLength={96} rows={2} name={`note text ${i}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <QuestionWithInput label="Signature de l'infirmière :" />
      </Page>
    </Form>
  );
}
