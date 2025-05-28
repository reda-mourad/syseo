import React, { Fragment, useState } from "react";
import { medications, units } from "../choices";
import type { DataResponse } from "../main";
import { Choice } from "./choice";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import Heading from "./heading";
import { Page } from "./page";
import { QuestionWithChoices } from "./question-with-choices";
import { QuestionWithInput } from "./question-with-input";

const title = "SOINS INFIRMIERS APRÈS UN EXAMEN ENDOSCOPIQUE";
const verticalCellStyle: React.CSSProperties = {
  textTransform: "uppercase",
  writingMode: "vertical-rl",
  transform: "rotate(180deg)",
};
const colArr = Array(9).fill(null);
const verifications = [
  "Critères de congé = 10/10 ou selon condition pré-examen",
  "Orientation dans les trois sphères revenue à son état initial",
  "Aucune douleur ou douleur identique à celle évaluée avant la procédure",
  "30 min minimalement post dernière dose sédation-analgésie",
  "2 h post dose d'antagoniste reçue, après visite médicale",
  "Cathéter I.V. retiré",
  "Rappel directives post examen et remise du dépliant lié à l'examen",
  "Formulaire arrêt de travail signé par le médecin",
  "Ordonnance médicale pour le congé de l'endoscopie, s'il y a lieu",
  "Formulaire «Certification présence» signé par l'infirmière",
  "Rendez-vous médical",
  "Cartes assurance-maladie et hôpital remises",
  "Lunette, dentiers ou autres effets personnels remis",
  "Client accompagné par :",
  "Client seul si examen sans sédation",
  "Si la liste de vérification a été complétée par une infirmière auxiliaire, l'évaluation de l'usager a été faite par une infirmière avant son départ",
];
const criteresConge = [
  {
    categorie: "Motricité",
    choices: ["Immobile", "2 membres mobiles", "4 membres mobiles *"],
  },
  {
    categorie: "Respiration",
    choices: [
      "Apnée",
      "Ventilation superficielle dyspnée",
      "Ventilation profonde toux efficace",
    ],
  },
  {
    categorie: "Δ TA syst",
    choices: ["≥ à 50 %", "De 20 à 50%", "≤ à 20 %"],
  },
  {
    categorie: "Conscience",
    choices: ["Aréactif", "Réactif à la demande", "Réveillé·e"],
  },
  {
    categorie: "Sa O2",
    choices: [
      "< 90 % malgré l'apport d'oxygène *",
      "> 90 % grâce à l'apport d'oxygène *",
      "> 92 % à l'air ambiant *",
    ],
  },
];

export default function SM01693({ patient, form }: DataResponse) {
  const data = form.data;
  const [answers, setAnswers] = useState<Record<string, number>>({
    Motricité: Number(data?.Motricité ?? ""),
    Respiration: Number(data?.Respiration ?? ""),
    "Δ TA syst": Number(data?.["Δ TA syst"] ?? ""),
    Conscience: Number(data?.Conscience ?? ""),
    "Sa O2": Number(data?.["Sa O2"] ?? ""),
  });
  const total = Object.values(answers).reduce(
    (previous, current) => previous + current,
    0
  );

  return (
    <Form>
      <Page
        dossier={patient.dossier}
        title={title}
        index={1}
        total={3}
        className="gap-2"
      >
        <FormHeader code="SM01693" patient={patient} />
        <Heading level={1}>{title}</Heading>
        <div className="flex flex-wrap space-x-4 space-y-1">
          <QuestionWithInput label="Date :" type="date" />
        </div>
        <table className="text-[.61rem]">
          <thead>
            <tr>
              <th colSpan={2 + colArr.length}>PARAMÈTRES ÉVALUÉS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={2} className="text-right">
                Heure :
              </th>
              {colArr.map((_, i) => (
                <th key={i}>
                  <QuestionWithInput name={`time_${i}`} type="time" />
                </th>
              ))}
            </tr>
            <tr>
              <th
                rowSpan={8}
                style={verticalCellStyle}
                className="w-10 max-w-10"
              >
                signes vitaux et état respiratoire
              </th>
              <td className="w-40">Pression artérielle :</td>
              {colArr.map((_, i) => (
                <td key={i} className="space-y-1">
                  <QuestionWithInput name={`press_art_max_${i}`} />
                  <QuestionWithInput name={`press_art_min_${i}`} />
                </td>
              ))}
            </tr>
            <tr>
              <td>Fréquence cardiaque/min. :</td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput name={`freq_card_${i}`} />
                </td>
              ))}
            </tr>
            <tr>
              <td>
                Fréquence respiratoire/min.
                <br />
                Noter si rythme irr. ou pause respiratoire :
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput name={`freq_resp_${i}`} />
                </td>
              ))}
            </tr>
            <tr>
              <td>
                Amplitude respiratoire <br />
                <b>P :</b> profonde <b>N :</b> normale <b>S :</b> superficielle
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <select name={`ampl_resp_${i}`} className="w-full">
                    {["P", "N", "S"].map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td>
                Ronflements <b>O :</b> Oui <b>N :</b> Non
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <select name={`ronflement_${i}`} className="w-full">
                    {["O", "N"].map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td>Saturation O2 (%)</td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput name={`saturation_${i}`} />
                </td>
              ))}
            </tr>
            <tr>
              <td>EtCO2</td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput name={`etco2_${i}`} />
                </td>
              ))}
            </tr>
            <tr>
              <td>
                O2 Lunette nasal (litres/min.) /<br /> Ventimasque (% O2)
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput name={`o2_${i}`} />
                </td>
              ))}
            </tr>
            <tr>
              <th style={verticalCellStyle}>
                monitoring
                <br /> cardiaque
              </th>
              <td>
                <ul>
                  <li>1. Rythme sinusal</li>
                  <li>2 : Fibrilation auriculaire</li>
                  <li>3 : Flutter auriculaire</li>
                  <li>
                    <QuestionWithInput label="4 : Bloc AV degré" />
                  </li>
                  <li>
                    <QuestionWithInput label="5 : ESV" />
                  </li>
                  <li>
                    <QuestionWithInput label="6 : Autre" />
                  </li>
                </ul>
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <select name={`ronflement_${i}`} className="w-full">
                    {Array(6)
                      .fill(null)
                      .map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <th style={verticalCellStyle}>sédation</th>
              <td>
                <ul>
                  <li>S : sommeil normal, s'éveille facilement</li>
                  <li>0 : alerte</li>
                  <li>1 : parfois somnolent, s'éveille facilement</li>
                  <li>2 : fréquemment somnolent, s'éveille à l'appel</li>
                  <li>
                    3 : s'éveille difficilement a l'appel et à la stimulation
                    manuelle
                  </li>
                </ul>
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <select name={`sedation_${i}`} className="w-full">
                    {["S", "0", "1", "2", "3"].map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <th style={verticalCellStyle}>DLR</th>
              <td>
                Intensité Échelle de 0 à 10
                <br />
                <QuestionWithInput label="Site :" />
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <select name={`dlr_${i}`} className="w-full">
                    {Array(11)
                      .fill(null)
                      .map((_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <th rowSpan={3} style={verticalCellStyle}>
                autre
                <br /> PARAMÈTRES
              </th>
              <td>
                S : Sueurs N : Nausée
                <br />V : Vomissement Ø : aucun
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <select name={`sueur_${i}`} className="w-full">
                    {["S", "N", "V", "Ø"].map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <QuestionWithInput label="Autre :" />
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput name={`other_${i}`} />
                </td>
              ))}
            </tr>
            <tr>
              <td className="text-right">Initiales :</td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput name={`initiales_${i}`} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </Page>
      <Page dossier={patient.dossier} index={2} total={3} title={title}>
        <table>
          <thead>
            <tr>
              <th colSpan={3}>MÉDICAMENT(S)</th>
            </tr>
            <tr>
              <th>Heure</th>
              <th className="w-full">Rx (nom, dose voie d'adm.)</th>
              <th>Initiales</th>
            </tr>
          </thead>
          <tbody>
            {Array(8)
              .fill(null)
              .map((_, i) => (
                <tr key={i}>
                  <td>
                    <QuestionWithInput
                      name={`med_${i}_time`}
                      type="time"
                      className="min-w-24"
                    />
                  </td>
                  <td>
                    <div className="flex gap-3">
                      <QuestionWithChoices
                        choices={medications}
                        type="single"
                        name={`med_${i}_name`}
                      />
                      <QuestionWithInput
                        name={`med_${i}_dose`}
                        type="number"
                        className="max-w-16"
                      />
                      <QuestionWithChoices
                        choices={units}
                        type="single"
                        name={`med_${4 + i}_unit`}
                      />
                    </div>
                  </td>
                  <td>
                    <QuestionWithInput
                      name={`med_${4 + i}_init`}
                      className="w-10"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th colSpan={3}>Critères de congé</th>
            </tr>
          </thead>
          <tbody>
            {criteresConge.map(({ categorie, choices }) => (
              <Fragment key={categorie}>
                {choices.map((c, i) => (
                  <tr key={`${categorie}_${c}`}>
                    {!i && (
                      <td rowSpan={choices.length} className="w-20 text-center">
                        {categorie}
                      </td>
                    )}
                    <td>
                      <Choice
                        label={c}
                        type="radio"
                        name={categorie}
                        value={i}
                        onChange={() =>
                          setAnswers({ ...answers, [categorie]: i })
                        }
                      />
                    </td>
                    <td className="w-9 text-center">{i}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
            <tr>
              <td className="w-40">* ou condition pré-examen</td>
              <td className="font-semibold text-right">Total</td>
              <td className="w-20 text-center">{total} / 10</td>
            </tr>
          </tbody>
        </table>
      </Page>
      <Page dossier={patient.dossier} index={3} total={3} title={title}>
        <table className="w-full">
          <thead>
            <tr>
              <th colSpan={2}>
                Liste de vérification à faire avant le départ de l'usager
              </th>
            </tr>
            <tr>
              <th>Vérifications :</th>
              <th>Initiales</th>
            </tr>
          </thead>
          <tbody>
            {verifications.map((v) => (
              <tr key={v}>
                <td>{v}</td>
                <td>
                  <QuestionWithInput name={v} className="w-10" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2">
          <QuestionWithInput label="Heure de départ :" type="time" />
          <QuestionWithChoices
            choices={[
              "Sur pied",
              "En fauteuil roulant",
              "Sur civière",
              "Autre",
            ]}
            type="single"
            name="moyen_depart"
          />
          <QuestionWithInput name="depart_autre" />
        </div>
        <div className="flex gap-2">
          <QuestionWithChoices
            choices={["Domicile", "Unité de soins", "Autre"]}
            type="single"
            label="Destination :"
          />
          <QuestionWithInput name="Destination_autre" />
        </div>
        <div className="space-y-1">
          <Heading level={3}>Notes</Heading>
          <textarea
            className="w-full"
            name="notes"
            defaultValue={
              "Consultation pré examen réalisée par md, examen bien toléré, sans complication."
            }
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Initiales</th>
              <th>Signatures</th>
              <th>Initiales</th>
              <th>Signatures</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <QuestionWithInput name="Initiales1" />
              </td>
              <td>
                <QuestionWithInput name="Signatures1" />
              </td>
              <td>
                <QuestionWithInput name="Initiales2" />
              </td>
              <td>
                <QuestionWithInput name="Signatures2" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithInput name="Initiales3" />
              </td>
              <td>
                <QuestionWithInput name="Signatures3" />
              </td>
              <td>
                <QuestionWithInput name="Initiales4" />
              </td>
              <td>
                <QuestionWithInput name="Signatures4" />
              </td>
            </tr>
          </tbody>
        </table>
      </Page>
    </Form>
  );
}
