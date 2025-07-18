import type { DataResponse } from "../4d";
import { currentDate, currentTime, nonOui } from "../choices";
import Allergies from "./allergies";
import { Choice } from "./choice";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import Heading from "./heading";
import { Page } from "./page";
import { QuestionWithChoices } from "./question-with-choices";
import { QuestionWithInput } from "./question-with-input";

const title = "SOINS INFIRMIERS AVANT UN EXAMEN ENDOSCOPIQUE - PARTIE USAGER";

export default function SM01696({ patient }: DataResponse) {
  return (
    <Form>
      <Page index={1} total={2} title={title} patient={patient}>
        <FormHeader code="SM01696" patient={patient} />
        <Heading level={1}>{title}</Heading>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>À REMPLIR PAR L'USAGER OU SON ACCOMPAGNATEUR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-1/2">
                <QuestionWithInput
                  label="Date :"
                  type="date"
                  initValue={currentDate()}
                />
              </td>
              <td className="w-1/2">
                <QuestionWithInput
                  label="Heure:"
                  type="time"
                  initValue={currentTime()}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <QuestionWithInput label="Nom et prénom de l'accompagnateur :" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithInput label="Lien avec l'usager :" />
              </td>
              <td>
                <QuestionWithInput label="Téléphone :" type="tel" />
              </td>
            </tr>
            <tr>
              <td>
                **RAPPEL : L'accompagnateur doit être présent lors du congé **
              </td>
              <td>
                <QuestionWithChoices
                  label="Document complété par :"
                  choices={["Usager", "Accompagnateur", "Infirmière"]}
                  type="single"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-[40%]">Antécédents médicaux</th>
              <th className="w-[60%]">Précisez</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Problèmes cardiaques"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithInput name="Problèmes cardiaques_details" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Problèmes respiratoires"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithInput name="Problèmes respiratoires_details" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Problèmes digestifs"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithInput name="Problèmes digestifs_details" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Homme : problème de prostate"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithInput name="Homme : problème de prostate_details" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Pression artérielle élevée "
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithInput name="Pression artérielle élevée _details" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Maladie du foie "
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithInput name="Maladie du foie _details" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Problème rénal"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithInput name="Problème rénal_details" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Blessure récente à la tête"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <div className="flex gap-2">
                  <QuestionWithInput
                    name="Blessure récente à la tête date"
                    label="Date approximative :"
                    type="date"
                  />
                  <QuestionWithInput
                    name="Blessure récente à la tête details"
                    label="Details"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Glaucome"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithInput name="Glaucome_details" maxLength={64} />
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2">
                    <label>Diabète</label>
                    <QuestionWithChoices
                      choices={["", "Type 1", "Type 2"]}
                      type="single"
                      name="Diabète type"
                    />
                  </div>
                  <QuestionWithChoices
                    name="Diabète"
                    choices={nonOui}
                    type="radio"
                    className="justify-between"
                    defaultValue="Non"
                  />
                </div>
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <QuestionWithInput
                    name="Diabète_details"
                    label="Résultat de votre glycémie ce matin :"
                    type="number"
                  />
                  <span>mmol/L</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Autre"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithInput name="Autre_details" maxLength={64} />
              </td>
            </tr>
          </tbody>
        </table>
        <Allergies />
      </Page>
      <Page patient={patient} index={2} total={2} title={title}>
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-1/2">Autres</th>
              <th className="w-1/2">Précisez</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Avez-vous été opéré au ventre ?"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={["", "Abdomen supérieur", "Abdomen inférieur"]}
                  type="single"
                  name="Avez-vous été opéré au ventre ?_details"
                />
                {/* <QuestionWithInput name="Avez-vous été opéré au ventre ?_details" /> */}
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Prenez-vous de l'alcool ?"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <QuestionWithChoices
                    choices={["", "1", "2", "3", "4", "5"]}
                    type="single"
                    name="Prenez-vous de l'alcool ?_verre"
                  />
                  <span>verre(s)</span>
                  <QuestionWithChoices
                    choices={["", "par semaine", "occasionellement"]}
                    type="single"
                    name="Prenez-vous de l'alcool ?_par"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Prenez-vous de la drogue ?"
                  choices={[...nonOui, "Occasionellenent"]}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                  labelClassName="w-full"
                  listClassName="justify-end"
                />
              </td>
              <td>
                <QuestionWithInput name="Prenez-vous de la drogue ?_details" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Fumez-vous ?"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={[
                    "",
                    ...Array(15)
                      .fill(null)
                      .map((_, i) => i + 1 + ""),
                    "20",
                    "25",
                    "30",
                  ]}
                  type="single"
                  label="Nombre cigarette / jour :"
                  className="justify-start"
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Avez-vous une prothèse ou la présence de métal ?"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                  // labelClassName="w-full"
                  listClassName="shrink-0"
                />
              </td>
              <td className="space-y-2">
                <QuestionWithChoices
                  name="Avez-vous une prothèse ou la présence de métal ?_details"
                  choices={[
                    "Dentaire",
                    "Lunettes",
                    "Auditive",
                    "Lentilles",
                    "Valvule cardiaque",
                    "Stimulateur",
                    "Perçage",
                    "Prothèse genou",
                    "Prothèse hanche",
                    "Appareillage orthopédique",
                  ]}
                  type="multiple"
                  columns={2}
                />
                <QuestionWithInput
                  label="Autre :"
                  name="Avez-vous une prothèse ou la présence de métal ?_details"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="text-center">
                Femme seulement :
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Êtes-vous enceinte ?"
                  choices={[...nonOui, "Peut-être"]}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithInput
                  label="Nombre de semaines :"
                  type="numeric"
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Allaitez-vous ?"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th className="w-1/2">Préparation à l'examen</th>
              <th className="w-1/2"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Êtes-vous à jeun ?"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Oui"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={["", "5h", "6h", "12h", "24h", "48h", "72h"]}
                  type="single"
                  label="Depuis quand ?"
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Avez-vous respecté une diète liquide hier ?"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Oui"
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Avez-vous pris votre préparation intestinale au complet ?"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Oui"
                  listClassName="shrink-0"
                />
              </td>
              <td>
                <QuestionWithInput label="Sinon, raison :" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Votre préparation intestinale a-t-elle été efficace ?"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Oui"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={["selles claires", "jaunâtre", "brunes", "foncées"]}
                  type="multiple"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-1/2">Médication</th>
              <th className="w-1/2">Précisez</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Prenez-vous un médicament pour éclaircir le sang ?"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td className="space-y-1">
                <Choice
                  label="Acide acétylsalicylique (Aspirine)"
                  type="checkbox"
                />
                <QuestionWithChoices
                  choices={[
                    // "Acide acétylsalicylique (Aspirine)",
                    "Apixaban (Eliquis)",
                    "Clopidogrel (Plavix)",
                    "Dabigatran (Pradax)",
                    "Enoxaparine (Lenovox)",
                    "Héparine",
                    "Rivaroxaban (Xarelto)",
                    "Warfarine (Coumadin)",
                  ]}
                  other
                  type="radio"
                  columns={2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="L'avez-vous cessé ?"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={[
                    "",
                    "1 jour",
                    "2 jours",
                    "3 jours",
                    "4 jours",
                    "5 jours",
                  ]}
                  type="single"
                  label="Depuis :"
                  name="L'avez-vous cessé ?_date"
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Prenez-vous un supplément de fer ?"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="L'avez-vous cessé ?"
                  name="L'avez-vous cessé ?_2"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={[
                    "",
                    "1 jour",
                    "2 jours",
                    "3 jours",
                    "4 jours",
                    "5 jours",
                  ]}
                  type="single"
                  label="Depuis :"
                  name="L'avez-vous cessé ?_2_date"
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Usager diabétique : avez-vous pris votre médication pour le diabète ?"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  listClassName="shrink-0"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={["Antidiabétique oral", "Insuline"]}
                  type="multiple"
                  label="Si oui, lequel(s) ?"
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Avez-vous apporté votre liste de médicament ? "
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                />
              </td>
              <td>Si oui, S.V.P. la sortir</td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Avez-vous eu des changements dans votre médication dans le dernier mois ?"
                  choices={nonOui}
                  type="radio"
                  className="justify-between"
                  listClassName="shrink-0"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <textarea name="signature" className="w-full max-h-12" readOnly />
      </Page>
    </Form>
  );
}
