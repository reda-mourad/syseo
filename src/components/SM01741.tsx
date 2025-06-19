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
import Textarea from "./Textarea";
import TimePicker from "./time-picker";

const title = "QUESTIONNAIRE DE L'USAGER EN CLINIQUE D'UROLOGIE";
const pages = 3;
export default function SM01741({ patient }: DataResponse) {
  return (
    <Form>
      <Page index={1} total={pages} title={title} patient={patient}>
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
                  defaultValues={["Usager", "Double identification faite"]}
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithInput label="Médecin traitant :" />
              </td>
              {/* <td>
                <QuestionWithInput
                  label="Date de l'intervention :"
                  type="date"
                  initValue={currentDate()}
                />
              </td> */}
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
                  defaultValue="Domicile"
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
              // "Une ou des allergie(s) ?",
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
                  defaultValue="Non"
                  type="radio"
                  label="Prenez-vous des médicaments pour éclaicir le sang ?"
                  className="justify-between justify"
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
                  choices={nonOui}
                  type="radio"
                  label="L'avez-vous cessé?"
                  className="justify-between justify"
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
                    "6 jours",
                    "7 jours",
                  ]}
                  type="single"
                  label="Depuis :"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Page>
      <Page index={2} total={pages} title={title} patient={patient}>
        <Allergies />
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
            {Array.from({ length: 1 }, (_, i) => (
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
                <td className="space-y-1">
                  <div className="flex justify-between">
                    <Choice
                      label={e}
                      type="checkbox"
                      defaultChecked={[0, 2, 4, 5].includes(i)}
                    />
                    {i === 6 && (
                      <QuestionWithChoices
                        choices={[...nonOui, "N/A"]}
                        type="radio"
                        name={`${e} details`}
                      />
                    )}
                  </div>
                  {i === 6 && (
                    <div className="flex justify-end">
                      <QuestionWithChoices
                        choices={[
                          "",
                          "Ciprofloxacine 500 mg BID 1 jour avant examen",
                          "Ciprofloxacine 500 mg BID pendant 72h avant examen",
                          "Ciprofloxacine 500 mg 1h avant examen",
                          "Monurol 3g DIE 24h avant examen",
                          "Monurol 3g 1h avant examen",
                        ]}
                        type="single"
                        name="biopsue antibiotique"
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      </Page>
      <Page index={3} total={pages} title={title} patient={patient}>
        <Heading level={3}>NOTES COMPLÉMENTAIRES</Heading>
        <Textarea
          name="NOTES COMPLÉMENTAIRES"
          lineLength={108}
          rows={9}
          className="max-h-full"
          defaultValue={`Évaluation infirmière complétée.
Aucun enjeu clinique identifié à ce stade.
Informé du déroulement de l'examen et des consignes post-examen.
Consentement signé.
Prêt pour l'intervention.
L'équipe soignante avisée que l'usager est prêt à être transféré en salle.`}
        />
        <div className="flex items-center gap-4">
          <QuestionWithInput
            label="Date :"
            type="date"
            className="max-w-fit"
            initValue={currentDate()}
          />
          <div className="flex items-center gap-2">
            Heure :
            <TimePicker initValue={currentTime()} name="heure :" />
          </div>
          <div className="flex-1">
            <QuestionWithInput label="Signature :" />
          </div>
        </div>
      </Page>
    </Form>
  );
}
