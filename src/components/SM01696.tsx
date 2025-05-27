import { nonOui } from "../choices";
import type { DataResponse } from "../main";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import { Page } from "./page";
import { QuestionWithChoices } from "./question-with-choices";
import { QuestionWithInput } from "./question-with-input";

const title = "SOINS INFIRMIERS AVANT UN EXAMEN ENDOSCOPIQUE - PARTIE USAGER";
const antecedents = [
  "Problèmes cardiaques",
  "Problèmes respiratoire",
  "Problèmes digestifs",
  "Homme : problème de prostate",
  "Pression artérielle élevée ",
  "Maladie du foie ",
  "Problème rénal",
  "Blessure récente à la tête",
  "Glaucome",
  "Diabète",
  "Autre",
];

export default function SM01696({
  patient,
}: {
  patient: DataResponse["patient"];
}) {
  return (
    <Form>
      <Page
        index={1}
        total={2}
        title={title}
        dossier={patient.dossier}
        className="gap-3"
      >
        <FormHeader code="SM01696" patient={patient} />
        <h1 className="font-semibold text-3xl text-center">{title}</h1>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>À REMPLIR PAR L'USAGER OU SON ACCOMPAGNATEUR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-1/2">
                <QuestionWithInput label="Date :" type="date" />
              </td>
              <td className="w-1/2">
                <QuestionWithInput label="Heure:" type="time" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithInput label="Accompagnateur :" />
              </td>
              <td>
                <QuestionWithInput label="Lien avec l'usager :" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithInput label="Téléphone :" type="tel" />
              </td>
              <td>
                **RAPPEL : L'accompagnateur doit être présent lors du congé **
              </td>
            </tr>
            <tr>
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
              <th>Antécédents médicaux</th>
              <th>Précisez</th>
            </tr>
          </thead>
          <tbody>
            {antecedents.map((e) => (
              <tr key={e}>
                <td>
                  <QuestionWithChoices
                    label={e}
                    choices={nonOui}
                    type="single"
                    className="justify-between"
                  />
                </td>
                <td>
                  <QuestionWithInput name={`${e}_details`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="w-full">
          <thead>
            <tr>
              <th>Allergie</th>
              <th>Type de réaction</th>
            </tr>
          </thead>
          <tbody>
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <tr key={i}>
                  <td>
                    <QuestionWithInput name={`allergie_${i}`} />
                  </td>
                  <td>
                    <div className="flex">
                      <QuestionWithChoices
                        name={`reaction_${i}`}
                        choices={[
                          "nausées",
                          "vomissements",
                          "délirium",
                          "urticaire",
                          "céphalée",
                          "arythmie",
                          "choc",
                          "rougeur faciale",
                        ]}
                        type="multiple"
                      />
                      <QuestionWithInput
                        label="Autre :"
                        name={`reaction_${i}_autre`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Page>
      <Page dossier="123456789" index={2} total={2} title={title}>
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
                  type="single"
                  className="justify-between"
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
                  type="single"
                  className="justify-between"
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
                    choices={["", "semapar semaineine", "occasionellement"]}
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
                  type="single"
                  className="justify-between"
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
                  type="single"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={[]}
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
                  type="single"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithChoices
                  name="Avez-vous une prothèse ou la présence de métal ?_details"
                  choices={[
                    "Dentaire",
                    "Lunette",
                    "Auditive",
                    "Lentilles",
                    "Valvule cardiaque",
                    "Stimulateur",
                    "Perçage",
                    "Appareillage Orthopédique",
                    "Prothèse hanche",
                    "Prothèse genou",
                  ]}
                  type="multiple"
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
                  type="single"
                  className="justify-between"
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
                  type="single"
                  className="justify-between"
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
                  type="single"
                  className="justify-between"
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
                  label="Avez- vous respecté une diète liquide hier?"
                  choices={nonOui}
                  type="single"
                  className="justify-between"
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Avez-vous pris votre préparation intestinale au complet?"
                  choices={nonOui}
                  type="single"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithInput label="Sinon, raison :" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Votre préparation intestinale a-t-elle été efficace?"
                  choices={nonOui}
                  type="single"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={["selle claires", "jaunâtre", "brunes", "foncées"]}
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
                  label="Prenez-vous un médicament pour éclaircir le sang?"
                  choices={nonOui}
                  type="single"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithChoices
                  name="Prenez-vous un médicament pour éclaircir le sang?_details"
                  choices={[
                    "Coumadin",
                    "Triaclid",
                    "Aspirin",
                    "Sintrom",
                    "Eliquis",
                    "Héparine",
                    "Pradax",
                    "Xarelto",
                    "Plavix",
                  ]}
                  type="multiple"
                />
                <QuestionWithInput
                  name="Prenez-vous un médicament pour éclaircir le sang?_other"
                  label="Autre :"
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="L'avez-vous cessé ?"
                  choices={nonOui}
                  type="single"
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
                  label="Prenez-vous un supplément de fer? "
                  choices={nonOui}
                  type="single"
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
                  type="single"
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
                  type="single"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={["ADO", "Insuline"]}
                  type="multiple"
                  label="Si oui, quel(s) médicament(s) avez-vous pris ? "
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Avez-vous apporté votre liste de médicament? "
                  choices={nonOui}
                  type="single"
                  className="justify-between"
                />
              </td>
              <td>Si oui, S.V.P. la sortir</td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Avez-vous eu des changements dans votre médication dans le dernier mois?"
                  choices={nonOui}
                  type="single"
                  className="justify-between"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <QuestionWithInput label="Document vérifié par :" />
      </Page>
    </Form>
  );
}
