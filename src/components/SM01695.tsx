import { useState } from "react";
import { examType, ouiNon } from "../choices";
import type { DataResponse } from "../main";
import { Choice } from "./choice";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import Heading from "./heading";
import { Page } from "./page";
import { QuestionWithChoices } from "./question-with-choices";
import { QuestionWithInput } from "./question-with-input";

const title =
  "SOINS INFIRMIERS AVANT UN EXAMEN ENDOSCOPIQUE (PARTIE INFIRMIÈRE) ";

export default function SM01695({
  patient,
}: {
  patient: DataResponse["patient"];
}) {
  const [poids, setPoids] = useState(0);
  const [taille, setTaille] = useState(0);

  return (
    <Form>
      <Page index={1} total={2} title={title} dossier={patient.NoDossier}>
        <FormHeader code="SM01695" />
        <Heading level={1}>{title}</Heading>
        <div className="flex flex-col gap-2">
          <Heading level={2}>INFORMATIONS GÉNÉRALES </Heading>
          <div className="w-80">
            <QuestionWithInput label="Médecin traitant :" />
          </div>
          <div className="flex gap-4">
            <QuestionWithChoices
              label="Provenance de l'usager :"
              choices={["Domicile", "Unité de soins", "Autre établissement"]}
              type="single"
            />
            <QuestionWithInput label="Autre :" name="autre1" />
          </div>
          <div className="flex gap-10">
            <QuestionWithChoices
              label="Mode d'arrivée :"
              choices={["Sur pieds", " Fauteuil roulant", "Civière"]}
              type="single"
            />
            <QuestionWithInput label="Autre :" name="autre2" />
          </div>
          <QuestionWithChoices
            type="single"
            choices={ouiNon}
            label="Double identification de l'usager :"
          />
          <QuestionWithChoices
            type="single"
            choices={ouiNon}
            label="Bracelet d'identifications mis :"
          />
          <QuestionWithChoices
            type="single"
            choices={ouiNon}
            label="Bracelet d'allergie mis :"
          />
          <QuestionWithChoices
            type="single"
            choices={ouiNon}
            label="Liste des médicaments apportés ou FADM au dossier :"
          />
          <span>
            Pour les usagers sous coumadin, vérifier s'il a été cessé et s'il a
            été remplacé par une HFPM
          </span>
          <div className="flex gap-10">
            <QuestionWithChoices
              type="single"
              choices={ouiNon}
              label="Coumadin cessé :"
            />
            <QuestionWithChoices
              type="single"
              choices={["Aucun", "Lovenox", "Innohep", "Fragmin"]}
              label="Remplacé par :"
            />
          </div>
          <div className="flex gap-4">
            <QuestionWithChoices
              type="single"
              choices={examType}
              label="Examen :"
            />
            <QuestionWithInput label="Autre :" name="autre3" />
          </div>
          <QuestionWithInput label="Accompagnateur sera présent jusqu'à :" />
          <Heading level={2}>ÉVALUATION CLINIQUE</Heading>
          <Heading level={3}>SIGNES VITAUX ET DOLEUR</Heading>
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
                      name="freq_card_min"
                      className="w-14"
                    />
                    / min
                    <QuestionWithInput
                      type="number"
                      name="freq_card_max"
                      className="w-14"
                    />
                  </div>
                </td>
                <td className="w-1/3">
                  <div className="flex justify-between items-center gap-2">
                    <span>Fréq. Resp :</span>
                    <QuestionWithInput
                      type="number"
                      name="freq_resp_min"
                      className="w-14"
                    />
                    / min
                    <QuestionWithInput
                      type="number"
                      name="freq_resp_max"
                      className="w-14"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="flex justify-between items-center gap-2">
                    <span>Sat :</span>
                    <QuestionWithInput
                      type="number"
                      name="sat_min"
                      className="w-20"
                    />
                    %
                    <QuestionWithInput
                      type="number"
                      name="sat_max"
                      className="w-20"
                    />
                  </div>
                </td>
                <td>
                  <div className="flex justify-between items-center gap-2">
                    <QuestionWithInput label="O2 :" />
                    <QuestionWithInput label="°C" />
                  </div>
                </td>
                <td>
                  <div className="flex justify-between items-center gap-2">
                    <QuestionWithInput type="number" label="Glycémie cap :" />
                    mmol/l
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <QuestionWithInput label="Douleur :" />
          <Heading level={3}>INTERVENTIONS</Heading>
          <span>En présence de problèmes cardiovasculaires</span>
          <QuestionWithChoices
            choices={["Normale", "Anormale"]}
            type="single"
            label="Ausc. Card."
          />
          <span>
            En présence de problèmes respiratoires (MPOC, asthme, apnée du
            sommeil, ronflements nocturnes etc.)
          </span>
          <QuestionWithChoices
            choices={["Normale", "Anormale"]}
            type="single"
            label="Ausc. Pulm."
          />
          <div className="flex justify-between">
            <fieldset className="flex items-center gap-1">
              <input type="checkbox" id="Cathéter I.V" name="Cathéter I.V" />
              <label htmlFor="Cathéter I.V">Cathéter I.V</label>
            </fieldset>
            <div className="flex gap-4">
              <QuestionWithInput label="#" />
              <QuestionWithInput label="site" />
            </div>
            <QuestionWithChoices
              choices={ouiNon}
              type="single"
              label="Perméable"
            />
          </div>
        </div>
      </Page>
      <Page index={2} total={2} title={title} dossier={patient.NoDossier}>
        <Heading level={2}>ÉVALUATION CLINIQUE (SUITE)</Heading>

        <table>
          <thead>
            <tr>
              <th className="w-1/2">CONDITION DE SANTÉ DE L'USAGER</th>
              <th className="w-1/2">AU BESOIN, PRÉCISEZ</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Analgésie/anesthésie",
              "Naïf aux opiacés",
              "Antécédent d'intubation difficile",
              "Cou court ou large",
              "Présence d'obésité",
              "Orientation dans les 3 sphères",
              "Problème neurologique",
            ].map((e, i) => (
              <tr key={e}>
                <td>
                  {i === 0 && "Réactions indésirables sédation –"}
                  <QuestionWithChoices
                    choices={ouiNon}
                    type="single"
                    label={e}
                    className="justify-between"
                  />
                </td>
                <td>
                  <QuestionWithInput name={`${e}_details`} />
                  {e === "Présence d'obésité" && (
                    <div className="flex gap-2 mt-2">
                      <QuestionWithInput
                        type="number"
                        label="Poids (kg)"
                        onChange={(e) => setPoids(Number(e.target.value))}
                        value={poids}
                      />
                      <QuestionWithInput
                        type="number"
                        label="Taille (m)"
                        onChange={(e) => setTaille(Number(e.target.value))}
                        value={taille}
                      />
                      <div className="w-24">
                        IMC :{" "}
                        {taille > 0 && (poids / (taille * taille)).toFixed(2)}
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
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
          <span>Monitoring nécessaire selon la condition de santé :</span>
          <QuestionWithChoices
            choices={ouiNon}
            type="single"
            label="Cardiaque"
          />
          <QuestionWithChoices
            choices={ouiNon}
            type="single"
            label="Capnographie"
          />
        </div>
        <fieldset className="flex flex-col">
          <label htmlFor="notes">
            NOTES DE L'INFIRMIÈRE SUR L'ÉVALUATION INITIALE
          </label>
          <textarea name="notes" id="notes" className=""></textarea>
        </fieldset>
        <div className="gap-4 grid grid-cols-2">
          <QuestionWithInput label="Continuité des soins :" />
          <QuestionWithChoices
            choices={ouiNon}
            type="single"
            label=" Avisé des constats ci-haut"
          />
          <QuestionWithInput label="Signature :" />
          <QuestionWithInput label="Date :" type="date" />
        </div>
      </Page>
    </Form>
  );
}
