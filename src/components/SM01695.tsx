import { useState } from "react";
import type { DataResponse } from "../4d";
import {
  currentDate,
  currentTime,
  examType,
  examTypeOther,
  nonOui,
} from "../choices";
import { Choice } from "./choice";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import Heading from "./heading";
import { Page } from "./page";
import { QuestionWithChoices } from "./question-with-choices";
import { QuestionWithInput } from "./question-with-input";
import Textarea from "./Textarea";
import TimePicker from "./time-picker";

const title =
  "SOINS INFIRMIERS AVANT UN EXAMEN ENDOSCOPIQUE (PARTIE INFIRMIÈRE) ";

export default function SM01695({ patient, form, extra, user }: DataResponse) {
  const [poids, setPoids] = useState(form.data?.["Poids (kg)"] ?? 0);
  const [taille, setTaille] = useState(form.data?.["Taille (cm)"] ?? 0);

  return (
    <Form>
      <Page index={1} total={2} title={title} patient={patient}>
        <FormHeader code="SM01695" patient={patient} />
        <Heading level={1}>{title}</Heading>
        <div className="flex flex-col gap-2">
          <Heading level={2}>INFORMATIONS GÉNÉRALES </Heading>
          <div className="w-80">
            <QuestionWithInput
              label="Médecin traitant :"
              readOnly
              initValue={extra?.medecin}
            />
          </div>
          <div className="flex gap-4">
            <QuestionWithChoices
              label="Provenance de l'usager :"
              choices={["Domicile", "Unité de soins", "Autre établissement"]}
              type="radio"
              defaultValue="Domicile"
            />
            <QuestionWithInput label="Autre :" name="autre1" />
          </div>
          <div className="flex gap-10">
            <QuestionWithChoices
              label="Mode d'arrivée :"
              choices={["Sur pieds", " Fauteuil roulant", "Civière"]}
              type="radio"
              defaultValue="Sur pieds"
            />
            <QuestionWithInput label="Autre :" name="autre2" />
          </div>
          <div />
          <div />
          <QuestionWithChoices
            type="radio"
            choices={nonOui}
            label="Double identification de l'usager :"
            defaultValue="Oui"
          />
          <QuestionWithChoices
            type="radio"
            choices={nonOui}
            label="Bracelet d'identifications mis :"
            defaultValue="Oui"
          />
          <QuestionWithChoices
            type="radio"
            choices={nonOui}
            label="Bracelet d'allergie mis :"
            defaultValue="Non"
          />
          <div />
          <div />
          <QuestionWithChoices
            type="radio"
            choices={nonOui}
            label="Liste des médicaments apportés ou FADM au dossier :"
            defaultValue="Oui"
          />
          <div />
          <span>
            Pour les usagers sous coumadin, vérifier s'il a été cessé et s'il a
            été remplacé par une HFPM
          </span>
          <div className="space-y-1">
            <div className="flex gap-10">
              <QuestionWithChoices
                type="radio"
                choices={nonOui}
                label="Coumadin cessé :"
              />
              <QuestionWithChoices
                type="radio"
                choices={[
                  "X1 jour",
                  "X2 jours",
                  "X3 jours",
                  "X4 jours",
                  "X5 jours",
                ]}
                label="Depuis :"
              />
            </div>
            <QuestionWithChoices
              choices={["Aucun", "Lovenox", "Innohep", "Fragmin"]}
              type="radio"
              label="Remplacé par :"
            />
          </div>
          <div />
          <div />
          <div className="flex gap-4">
            <QuestionWithChoices
              type="multiple"
              choices={examType}
              label="Examen :"
            />
          </div>
          <QuestionWithChoices
            label="Autre :"
            name="autre3"
            choices={examTypeOther}
            type="single"
          />
          <QuestionWithInput
            label="Nom et prénom de l'accompagnateur :"
            className="max-w-60"
            value={(extra?.accompagnateur as string) || undefined}
          />
          <QuestionWithChoices
            label="Accompagnateur :"
            choices={[
              "présent dans la salle d'attente",
              "arrive après examen",
              "absent",
            ]}
            type="single"
          />
          <Heading level={2}>ÉVALUATION CLINIQUE</Heading>
          <table>
            <thead>
              <tr>
                <th colSpan={3}>Signes vitaux</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-1/3">
                  <div className="flex justify-between items-center gap-2">
                    <span>TA :</span>
                    <QuestionWithInput
                      type="number"
                      name="ta_min"
                      className="w-20"
                    />
                    /
                    <QuestionWithInput
                      type="number"
                      name="ta_max"
                      className="w-20"
                    />
                  </div>
                </td>
                <td className="w-1/3">
                  <div className="flex justify-between items-center gap-2">
                    <span>Fréq. Card :</span>
                    <QuestionWithInput
                      type="number"
                      name="freq_card"
                      className="w-28"
                    />
                    / min
                  </div>
                </td>
                <td className="w-1/3">
                  <div className="flex justify-between items-center gap-2">
                    <span>Fréq. Resp :</span>
                    <QuestionWithInput
                      type="number"
                      name="freq_resp"
                      className="w-28"
                    />
                    <span>/ min</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="space-y-1">
                  <div className="flex items-center gap-1">
                    <span>Sat (O2):</span>
                    <QuestionWithInput
                      type="number"
                      name="sat"
                      className="w-20"
                    />
                    %
                  </div>
                  <div className="flex items-center gap-2">
                    <QuestionWithChoices
                      name="sat option"
                      choices={["AA", "LN"]}
                      type="radio"
                    />
                    <QuestionWithInput name="sat ln value" type="number" />
                    L/min
                  </div>
                </td>
                <td>
                  <div className="flex justify-between items-center gap-2">
                    <QuestionWithInput label="T (°C)" />
                  </div>
                </td>
                <td>
                  <div className="flex justify-between items-center gap-2">
                    <QuestionWithInput type="number" label="Glycémie cap :" />
                    mmol/l
                  </div>
                </td>
              </tr>
              <tr>
                <th colSpan={3}>Douleur</th>
              </tr>
              <tr>
                <td>
                  <QuestionWithChoices
                    label="Douleur positionnelle :"
                    type="radio"
                    choices={nonOui}
                    className="justify-between"
                  />
                </td>
                <td colSpan={2}>
                  <QuestionWithChoices
                    choices={[
                      "tête",
                      "abdomen",
                      "bras",
                      "jambes",
                      "cou",
                      "thorax",
                    ]}
                    label="Lieu de la douleur :"
                    type="multiple"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th colSpan={2}>INTERVENTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <QuestionWithChoices
                    choices={nonOui}
                    type="radio"
                    className="justify-between"
                    label="Présence de problèmes cardiovasculaires"
                    defaultValue="Non"
                  />
                </td>
                <td>
                  <QuestionWithChoices
                    choices={["", "Normale", "Anormale"]}
                    type="single"
                    label="Ausc. Card."
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <QuestionWithChoices
                    choices={nonOui}
                    type="radio"
                    className="justify-between"
                    label="Présence de problèmes respiratoires"
                    defaultValue="Non"
                  />
                </td>
                <td>
                  <QuestionWithChoices
                    choices={["", "Normale", "Anormale"]}
                    type="single"
                    label="Ausc. Pulm."
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <QuestionWithChoices
                    choices={nonOui}
                    type="radio"
                    label="Cathéter I.V"
                    className="justify-between"
                    defaultValue="Oui"
                  />
                </td>
                <td>
                  <div className="flex flex-wrap gap-4">
                    <QuestionWithChoices
                      label="Calibre # :"
                      choices={["", "18G", "20G", "22G", "24G"]}
                      type="single"
                    />
                    <QuestionWithChoices
                      choices={["", "BD", "BG", "MD", "MG"]}
                      type="single"
                      label="site"
                    />
                    <QuestionWithChoices
                      choices={nonOui}
                      type="radio"
                      label="Perméable"
                      defaultValue="Oui"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Page>
      <Page index={2} total={2} title={title} patient={patient}>
        <Heading level={2}>ÉVALUATION CLINIQUE (SUITE)</Heading>
        <table>
          <thead>
            <tr>
              <th className="w-[55%]">CONDITION DE SANTÉ DE L'USAGER</th>
              <th className="">AU BESOIN, PRÉCISEZ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <QuestionWithChoices
                  choices={nonOui}
                  type="radio"
                  label="Réactions indésirables sédation - Analgésie/anesthésie"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={[
                    "vomissements",
                    "nausées",
                    "céphalée",
                    "delirium",
                    "somnolence",
                    "choc",
                  ]}
                  type="multiple"
                  columns={3}
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  choices={nonOui}
                  type="radio"
                  label="Naïf aux opiacés"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  choices={nonOui}
                  type="radio"
                  label="Antécédent d'intubation difficile"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  choices={nonOui}
                  type="radio"
                  label="Cou court ou large"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <QuestionWithInput
                  label="cm :"
                  type="number"
                  className="max-w-20"
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  choices={nonOui}
                  type="radio"
                  label="Présence d'obésité"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td>
                <div className="flex gap-2 mt-2">
                  <QuestionWithInput
                    type="number"
                    label="Poids (kg)"
                    onChange={(e) => setPoids(Number(e.target.value))}
                    value={poids || ""}
                  />
                  <QuestionWithInput
                    type="number"
                    label="Taille (cm)"
                    onChange={(e) => setTaille(Number(e.target.value))}
                    value={taille || ""}
                  />
                  <div className="w-28">
                    IMC :{" "}
                    {taille > 0 &&
                      (poids / ((taille / 100) * (taille / 100))).toFixed(2)}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  choices={nonOui}
                  type="radio"
                  label="Orientation dans les 3 sphères"
                  className="justify-between"
                  defaultValue="Oui"
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  choices={nonOui}
                  type="radio"
                  label="Problème neurologique"
                  className="justify-between"
                  defaultValue="Non"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <QuestionWithInput label="Vérification des résultats de laboratoire, le cas échéant :" />
        <Heading level={2}>CONCLUSION DE L'ÉVALUATION CLINIQUE</Heading>
        <div className="flex flex-col gap-1">
          <Choice
            label="ASA 1 : Usager en bonne santé"
            type="radio"
            name="conclusion"
          />
          <Choice
            label="ASA 2 : Usager atteint d'une affection systémique légère"
            type="radio"
            name="conclusion"
          />
          <Choice
            label="ASA 3 : Usager atteint d'une affection systémique grave"
            type="radio"
            name="conclusion"
          />
          <Choice
            label="ASA 4 : Usager atteint d'une affection systémique grave qui représente une menace constante pour sa vie"
            type="radio"
            name="conclusion"
          />
          <Choice
            label="ASA 5 : Usager moribond qui ne survivra pas à moins d'une Intervention"
            type="radio"
            name="conclusion"
          />
          <Choice
            label="ASA 6 : Usager déclaré en état de mort cérébrale dont les organes ont été prélevés à des fins de don"
            type="radio"
            name="conclusion"
          />
        </div>
        <div className="flex flex-col gap-2">
          <QuestionWithChoices
            choices={["Cardiaque", "Capnographie"]}
            type="multiple"
            label="Monitoring nécessaire selon la condition de santé :"
          />
          <QuestionWithInput label="Enseignement prodigué en présence de :" />
        </div>
        <fieldset className="flex flex-col">
          <label htmlFor="notes">
            Notes de l'infirmière sur l'évaluation initiale
          </label>
          <Textarea
            lineLength={108}
            rows={9}
            name="notes"
            id="notes"
            className="min-h-40"
            defaultValue={`Évaluation infirmière complétée. Aucun enjeu clinique identifié à ce stade.
Informé du déroulement de l'examen et des consignes post-examen. Consentement signé.
Prêt pour l'intervention. L'équipe soignant avisé que l'usager est prêt à être transféré en salle.`}
          />
        </fieldset>
        <div className="gap-4 grid grid-cols-2">
          <QuestionWithInput label="Continuité des soins :" />
          <QuestionWithChoices
            choices={nonOui}
            type="radio"
            label="Avisé des constats ci-haut"
          />
          <div className="flex gap-2">
            <QuestionWithInput
              label="Date :"
              type="date"
              initValue={currentDate()}
            />
            <div>
              <label htmlFor="heure">Heure : </label>
              <TimePicker id="heure" initValue={currentTime()} name="Heure :" />
            </div>
          </div>
        </div>
        <QuestionWithInput name="signature" value={user.signature} readOnly />
      </Page>
    </Form>
  );
}
