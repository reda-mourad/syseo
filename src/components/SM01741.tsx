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

const title = "QUESTIONNAIRE DE L'USAGER EN CLINIQUE D'UROLOGIE";

export default function SM01741({ patient }: DataResponse) {
  return (
    <Form>
      <Page index={1} total={2} title={title} patient={patient}>
        <FormHeader code="SM01741" patient={patient} />
        <Heading level={1}>{title}</Heading>

        {/* Consentement table */}
        <table>
          <tbody>
            <tr>
              <td colSpan={2}>
                <QuestionWithChoices
                  choices={[
                    "Usager",
                    "Représentant légal",
                    "Double identification faite",
                  ]}
                  type="multiple"
                  label="Consentement :"
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithInput label="Médecin traitant :" />
              </td>
              <td>
                <QuestionWithInput
                  label="Date de l'intervention :"
                  type="date"
                  initValue={currentDate()}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* INFORMATIONS À COMPLÉTER */}
        <table>
          <thead>
            <tr>
              <th colSpan={2}>INFORMATIONS À COMPLÉTER</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2}>
                <QuestionWithChoices
                  choices={[
                    "Biopsie de la prostate",
                    "Cystoscopie",
                    "Injection de Botox",
                    "Vasectomie",
                    "Bilan urodynamique",
                    "Extraction double J",
                    "Installation sonde sus-pubienne",
                  ]}
                  other
                  type="multiple"
                  label="Raison de la consultation :"
                  columns={2}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <QuestionWithChoices
                  choices={["Domicile", "Unité de soins"]}
                  type="radio"
                  label="Provenance :"
                  other
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <QuestionWithChoices
                  choices={["Sur pieds", "Fauteuil", "Civière"]}
                  defaultValue="Sur pieds"
                  type="radio"
                  other
                  label="Déplacement :"
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* PRÉPARATION À L'EXAMEN */}
        <table>
          <thead>
            <tr>
              <th colSpan={2}>PRÉPARATION À L'EXAMEN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-left">Avez-vous:</th>
              <th className="text-left">Si oui, précisez:</th>
            </tr>
            {[
              "Des problèmes cardiaques ?",
              "Des problèmes respiratoires ?",
              "Une pression artérielle élevée ?",
              "Un problème au niveau de vos reins ?",
              "Une ou des allergie(s) ?",
              "Du diabète ?",
              "D'autres problèmes de santé ?",
            ].map((label) => (
              <tr key={label}>
                <td className="w-1/2">
                  <QuestionWithChoices
                    choices={nonOui}
                    type="radio"
                    label={label}
                    className="justify-between justify"
                    defaultValue="Non"
                  />
                </td>
                <td>
                  <QuestionWithInput name={`${label} details`} />
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <QuestionWithChoices
                  choices={nonOui}
                  type="radio"
                  label="Une présence ou une prothèse de métal ?"
                  className="justify-between justify"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={[
                    "Bijoux",
                    "Valve cardiaque",
                    "Pacemaker",
                    "Prothèse de genou ou de la hanche",
                  ]}
                  defaultValue="Non"
                  type="multiple"
                  other
                  columns={2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  choices={[...nonOui, "N/A"]}
                  type="radio"
                  label="Êtes-vous enceinte ?"
                  className="justify-between justify"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={nonOui}
                  type="radio"
                  label="Allaitez-vous ?"
                  defaultValue="Non"
                  className="justify-between justify"
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ANTICOAGULANT */}
        <table>
          <thead>
            <tr>
              <th colSpan={2}>ANTICOAGULANT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <QuestionWithChoices
                  choices={nonOui}
                  type="radio"
                  label="Prenez-vous des médicaments pour éclaicir le sang ?"
                  className="justify-between justify"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={[
                    "Acide acétylsalicylique (Aspirine)",
                    "Apixaban (Eliquis)",
                    "Clopidogrel (Plavix)",
                    "Dabigatran (Pradax)",
                    "Enoxaparine (Lenovox)",
                    "Héparine",
                    "Rivaroxaban (Xarelto)",
                    "Warfarine (Coumadin)",
                  ]}
                  other
                  type="multiple"
                  columns={2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  choices={nonOui}
                  type="radio"
                  label="L'avez-vous cessé?"
                  className="justify-between justify"
                />
              </td>
              <td>
                <QuestionWithInput label="Si oui, depuis quand:" type="date" />
              </td>
            </tr>
          </tbody>
        </table>
      </Page>
      <Page patient={patient} index={2} total={2} title={title}>
        {/* PARTIE RÉSERVÉE AU PERSONNEL INFIRMIER */}
        <table>
          <thead>
            <tr>
              <th>PARTIE RÉSERVÉE AU PERSONNEL INFIRMIER</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Bracelet d'identification et double identification de l'usager",
              "Bracelet d'allergie si applicable",
              "Consentement d'examen signé",
              "Résultats des analyses de laboratoire au dossier",
              "Enseignement sur le déroulement de l'examen",
              "Directives post-examen données",
              "Si biopsie de la prostate, antibiotique en prophylaxie",
            ].map((e, i) => (
              <tr key={e}>
                <td>
                  <div className="flex justify-between">
                    <Choice label={e} type="checkbox" />
                    {i === 6 && (
                      <QuestionWithChoices
                        choices={[...nonOui, "N/A"]}
                        type="radio"
                        name={`${e} details`}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="space-y-2">
          <Heading level={3}>NOTES COMPLÉMENTAIRES</Heading>
          <Textarea name="NOTES COMPLÉMENTAIRES" lineLength={108} rows={9} className="max-h-full" />
        </div>
        <div className="gap-4 grid grid-cols-2">
          <QuestionWithInput label="Nom :" />
          <QuestionWithInput label="Signature :" />
          <QuestionWithInput label="Titre d'emploi :" />
          <QuestionWithInput label="Date et heure :" type="datetime-local" />
        </div>
      </Page>
    </Form>
  );
}
