import type { DataResponse } from "../main";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import { Page } from "./page";
import { QuestionWithChoices } from "./question-with-choices";
import { QuestionWithInput } from "./question-with-input";

const title = "SOINS INFIRMIERS AVANT UN EXAMEN ENDOSCOPIQUE - PARTIE USAGER";
const ouiNon = ["Oui", "Non"];
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
      <Page index={1} total={2} title={title} dossier={patient.NoDossier}>
        <FormHeader code="SM01696" />
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
              <td colSpan={2}>
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
                    choices={ouiNon}
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
                    <QuestionWithInput name={`reaction_${i}`} />
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
                  choices={ouiNon}
                  type="single"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithInput name="Avez-vous été opéré au ventre ?_details" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Prenez-vous de l'alcool ?"
                  choices={ouiNon}
                  type="single"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithInput label="Nombre consommation/ jour :" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Prenez-vous de la drogue ?"
                  choices={ouiNon}
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
                  choices={ouiNon}
                  type="single"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithInput label="Nombre cigarette / jour :" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Avez-vous une prothèse ou la présence de métal ?"
                  choices={ouiNon}
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
                  choices={[...ouiNon, "Peut-être"]}
                  type="single"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithInput label="Nombre de semaines :" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Allaitez-vous ?"
                  choices={ouiNon}
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
                  choices={ouiNon}
                  type="single"
                />
              </td>
              <td>
                <QuestionWithInput
                  label="Depuis quand ?"
                  type="datetime-local"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <QuestionWithChoices
                  label="Avez- vous respecté une diète liquide hier?"
                  choices={ouiNon}
                  type="single"
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Avez-vous pris votre préparation intestinale au complet?"
                  choices={ouiNon}
                  type="single"
                />
              </td>
              <td>
                <QuestionWithInput label="Sinon, raison :" />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <QuestionWithChoices
                  label="Votre préparation intestinale a-t-elle été efficace?"
                  choices={ouiNon}
                  type="single"
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
                  choices={ouiNon}
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
                  choices={ouiNon}
                  type="single"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithInput
                  label="Date :"
                  name="L'avez-vous cessé ?_date"
                  type="date"
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Prenez-vous un supplément de fer? "
                  choices={ouiNon}
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
                  choices={ouiNon}
                  type="single"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithInput
                  label="Date :"
                  name="L'avez-vous cessé ?_2_date"
                  type="date"
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  label="Usager diabétique : avez-vous pris votre médication pour le diabète ?"
                  choices={ouiNon}
                  type="single"
                  className="justify-between"
                />
              </td>
              <td>
                <QuestionWithInput label="Si oui, quel(s) médicament(s) avez-vous pris ? " />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <QuestionWithChoices
                  label="Avez-vous apporté votre liste de médicament? "
                  choices={ouiNon}
                  type="single"
                  className="justify-between"
                />
                Si oui, S.V.P. la sortir
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <QuestionWithChoices
                  label="Avez-vous eu des changements dans votre médication dans le dernier mois?"
                  choices={ouiNon}
                  type="single"
                  className="justify-between"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <QuestionWithInput label="Document vérifié par :" />
      </Page>
    </Form>
  );
}
