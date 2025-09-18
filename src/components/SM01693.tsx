import React, { Fragment, useEffect, useState } from "react";
import type { DataResponse } from "../4d";
import { currentDate, medications, units } from "../choices";
import { Choice } from "./choice";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import Heading from "./heading";
import { Page } from "./page";
import { QuestionWithChoices } from "./question-with-choices";
import { QuestionWithInput } from "./question-with-input";
import TimePicker from "./time-picker";

const pages = 4;
const title = "SOINS INFIRMIERS APRÈS UN EXAMEN ENDOSCOPIQUE";
const verticalCellStyle: React.CSSProperties = {
  textTransform: "uppercase",
  writingMode: "vertical-rl",
  transform: "rotate(180deg)",
};
const colArr = Array(8).fill(null);
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
  "Lunettes, dentiers ou autres effets personnels remis",
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

export default function SM01693({ patient, form, user }: DataResponse) {
  const data = form.data;
  const [answers, setAnswers] = useState<Record<string, number>>({
    Motricité: Number(data?.Motricité ?? "2"),
    Respiration: Number(data?.Respiration ?? "2"),
    "Δ TA syst": Number(data?.["Δ TA syst"] ?? "2"),
    Conscience: Number(data?.Conscience ?? "2"),
    "Sa O2": Number(data?.["Sa O2"] ?? "2"),
  });
  const total = Object.values(answers).reduce(
    (previous, current) => previous + current,
    0
  );

  useEffect(() => {
    verifications.forEach((v) => {
      const check = document.querySelector<HTMLInputElement>(
        `input[name="${v}"]`
      );

      const init = document.querySelector<HTMLInputElement>(
        `input[name="${v}_init"]`
      );

      if (check && init) {
        check.onchange = (e) => {
          init.value = (e.target as HTMLInputElement).checked
            ? (user?.initiales ?? "")
            : "";
        };
      }
    });

    for (let i = 0; i < 8; i++) {
      const time = document.querySelector<HTMLInputElement>(
        `input[name="med_${i}_time"]`
      );
      const init = document.querySelector<HTMLInputElement>(
        `input[name="med_${i}_init"]`
      );
      if (time && init) {
        time.onchange = (e) => {
          init.value = (e.target as HTMLInputElement).value
            ? (user?.initiales ?? "")
            : "";
        };
      }
    }
  }, [user]);

  return (
    <Form>
      <Page patient={patient} title={title} index={1} total={pages}>
        <FormHeader code="SM01693" patient={patient} />
        <Heading level={1}>{title}</Heading>
        <div className="flex flex-wrap space-x-4 space-y-1">
          <QuestionWithInput
            label="Date :"
            type="date"
            initValue={currentDate()}
          />
        </div>
        <table className="text-[.55rem]">
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
                  <TimePicker
                    initValue={form.data?.[`time_${i}`] ?? ""}
                    name={`time_${i}`}
                    tabIndex={19 * i + 1}
                    // className="hide-time-btn"
                    onClick={() => {
                      const initEl = document.querySelector<HTMLInputElement>(
                        `input[name="initiales_${i}"]`
                      );
                      if (initEl) {
                        initEl.value = user?.initiales ?? "";
                      }
                    }}
                  />
                </th>
              ))}
            </tr>
            <tr>
              <td
                rowSpan={7}
                style={verticalCellStyle}
                className="max-w-9 font-bold text-center"
              >
                signes vitaux et état respiratoire
              </td>
              <td className="min-w-36">Pression artérielle :</td>
              {colArr.map((_, i) => (
                <td key={i} className="space-y-1">
                  <QuestionWithInput
                    name={`press_art_max_${i}`}
                    type="number"
                    tabIndex={19 * i + 2}
                  />
                  <QuestionWithInput
                    name={`press_art_min_${i}`}
                    type="number"
                    tabIndex={19 * i + 3}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>Fréquence cardiaque/min. :</td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput
                    name={`freq_card_${i}`}
                    type="number"
                    tabIndex={19 * i + 4}
                  />
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
                <td key={i} className="space-y-1">
                  <QuestionWithInput
                    name={`freq_resp numbder ${i}`}
                    type="number"
                    tabIndex={19 * i + 5}
                  />
                  <select
                    className="w-full"
                    name={`freq_resp_${i}`}
                    tabIndex={19 * i + 6}
                  >
                    {["", "IRR", "PR"].map((e) => (
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
                Amplitude respiratoire <br />
                <b>N :</b> normale <b>P :</b> profonde <b>S :</b> superficielle
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <select
                    name={`ampl_resp_${i}`}
                    className="w-full"
                    defaultValue={i < 4 ? "N" : ""}
                    tabIndex={19 * i + 7}
                  >
                    {["", "N", "P", "S"].map((e) => (
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
                  <select
                    name={`ronflement_${i}`}
                    className="w-full"
                    defaultValue={i < 4 ? "N" : ""}
                    tabIndex={19 * i + 8}
                  >
                    {["", "O", "N"].map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td>Saturation O2 (%) et Oxygène</td>
              {colArr.map((_, i) => (
                <td key={i} className="space-y-1">
                  <QuestionWithInput
                    name={`saturation_${i}`}
                    type="number"
                    tabIndex={19 * i + 9}
                  />
                  <select
                    name={`saturation option ${i}`}
                    className="w-full"
                    tabIndex={19 * i + 10}
                    defaultValue={i < 4 ? "AA" : ""}
                  >
                    <option value=""></option>
                    <option value="AA">AA</option>
                    <option value="LN">LN</option>
                    <option value="VMK">VMK</option>
                  </select>
                  <div className="flex items-center-safe gap-0.5">
                    <QuestionWithInput
                      type="number"
                      name={`sat l/min ${i}`}
                      tabIndex={19 * i + 11}
                    />
                    L/min
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td>EtCO2</td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput
                    name={`etco2_${i}`}
                    type="number"
                    tabIndex={19 * i + 12}
                  />
                </td>
              ))}
            </tr>
            {/* <tr>
              <td className="space-y-0.5">
                <Choice
                  label="O2 Lunette nasal (litres/min.) /"
                  type="checkbox"
                />
                <Choice label="Ventimasque (% O2)" type="checkbox" />
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput
                    name={`o2_${i}`}
                    type="number"
                    initValue={i < 4 ? "2" : ""}
                    tabIndex={19 * i + 13}
                  />
                </td>
              ))}
            </tr> */}
            <tr>
              <td
                style={verticalCellStyle}
                className="max-w-9 font-bold text-center"
              >
                monitoring
                <br /> cardiaque
              </td>
              <td className="space-y-1">
                <div className="col-span-3">1. Rythme sinusal</div>
                <div className="col-span-3">2 : Fibrilation auriculaire</div>
                <div className="col-span-3">3 : Flutter auriculaire</div>
                <div className="flex items-center">
                  <span className="w-28">4 : Bloc AV degré</span>
                  <QuestionWithInput name="4 : Bloc AV degré" />
                </div>
                <div className="flex items-center">
                  <span className="w-28">5 : ESV</span>
                  <QuestionWithInput name="5 : ESV" />
                </div>
                <div className="flex items-center">
                  <span className="w-28">6 : Autre</span>
                  <QuestionWithInput name="6 : Autre" />
                </div>
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <select
                    name={`monitoring_${i}`}
                    className="w-full"
                    // defaultValue={i < 4 ? "1" : ""}
                    tabIndex={19 * i + 14}
                  >
                    <option value=""></option>
                    {[
                      Array(6)
                        .fill(null)
                        .map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        )),
                    ]}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td
                style={verticalCellStyle}
                className="max-w-9 font-bold text-center"
              >
                sédation
              </td>
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
                  <select
                    name={`sedation_${i}`}
                    className="w-full"
                    defaultValue={i < 4 ? "0" : ""}
                    tabIndex={19 * i + 15}
                  >
                    {["", "S", "0", "1", "2", "3"].map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td
                style={verticalCellStyle}
                className="max-w-9 font-bold text-center"
              >
                DLR
              </td>
              <td>
                Intensité Échelle de 0 à 10
                <br />
                <QuestionWithInput label="Site :" />
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <select
                    name={`dlr_${i}`}
                    className="w-full"
                    defaultValue={i < 4 ? "0" : ""}
                    tabIndex={19 * i + 16}
                  >
                    <option value=""></option>
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
              <td
                rowSpan={3}
                style={verticalCellStyle}
                className="max-w-9 font-bold text-center"
              >
                autre
                <br /> PARAMÈTRES
              </td>
              <td>
                <div className="grid grid-cols-2">
                  <span>S : Sueurs</span>
                  <span>N : Nausée</span>
                  <span>V : Vomissement</span>
                  <span>Ø : aucun</span>
                </div>
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <select
                    name={`sueur_${i}`}
                    className="w-full"
                    defaultValue={i < 4 ? "Ø" : ""}
                    tabIndex={19 * i + 17}
                  >
                    {["", "S", "N", "V", "Ø"].map((e) => (
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
                <QuestionWithInput label="Autres Paramètres :" />
              </td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput
                    name={`other_${i}`}
                    tabIndex={19 * i + 18}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="text-right">Initiales :</td>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput
                    name={`initiales_${i}`}
                    tabIndex={19 * i + 19}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </Page>
      <Page patient={patient} index={2} total={pages} title={title}>
        {/* <table className="text-[.5rem]">
          <thead>
            <tr>
              <th colSpan={11}>MÉDICAMENT(S)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={2}>Heure</th>
              {colArr.map((_, i) => (
                <th key={i}>
                  <QuestionWithInput
                    name={`med time ${i}`}
                    type="time"
                    ref={
                      medTableRefs.current[i][0] as React.Ref<HTMLInputElement>
                    }
                    tabIndex={0}
                    onKeyDown={(e) => handleMedTableKeyDown(e, i, 0)}
                    onChange={() => {
                      const initEl = document.querySelector<HTMLInputElement>(
                        `input[name="med init ${i}"]`
                      );
                      if (initEl) {
                        initEl.value = user.initiales;
                      }
                    }}
                  />
                </th>
              ))}
            </tr>
            {Array.from({ length: 8 }, (_, j) => (
              <tr key={j}>
                {j === 0 && (
                  <th rowSpan={8} style={verticalCellStyle}>
                    Rx (nom, dose voie d'adm.)
                  </th>
                )}
                <th>
                  <div className="flex gap-3">
                    <QuestionWithChoices
                      choices={medications}
                      type="single"
                      name={`other med ${j} name `}
                    />
                    <QuestionWithChoices
                      choices={units}
                      type="single"
                      name={`other med ${j} unit `}
                    />
                  </div>
                </th>
                {colArr.map((_, i) => (
                  <td key={i}>
                    <QuestionWithInput
                      name={`other med ${j} value ${i}`}
                      type="number"
                      ref={
                        medTableRefs.current[i][
                          5 + j
                        ] as React.Ref<HTMLInputElement>
                      }
                      tabIndex={0}
                      onKeyDown={(e) => handleMedTableKeyDown(e, i, 5 + j)}
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th colSpan={2} className="text-right">
                Initiales
              </th>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput
                    name={`med init ${i}`}
                    ref={
                      medTableRefs.current[i][7] as React.Ref<HTMLInputElement>
                    }
                    tabIndex={0}
                    onKeyDown={(e) => handleMedTableKeyDown(e, i, 7)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table> */}
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
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <tr key={i}>
                  <td>
                    <TimePicker
                      initValue={form.data?.[`med_${i}_time`] ?? ""}
                      name={`med_${i}_time`}
                      className="min-w-24"
                      onClick={() => {
                        const initEl = document.querySelector<HTMLInputElement>(
                          `input[name="med_${i}_init"]`
                        );
                        if (initEl) {
                          initEl.value = user?.initiales ?? "";
                        }
                      }}
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
                        name={`med_${i}_unit`}
                      />
                      <QuestionWithChoices
                        choices={["", "I.V ", "I.M", "I/R", "s.c", "p.os"]}
                        type="single"
                        name={`med_${i}_voie`}
                      />
                    </div>
                  </td>
                  <td>
                    <QuestionWithInput
                      name={`med_${i}_init`}
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
                        defaultChecked={i === choices.length - 1}
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
      <Page patient={patient} index={3} total={pages} title={title}>
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
            {verifications.map((v, i) => {
              const defaults = [0, 1, 2, 3, 5, 6, 12];
              return (
                <tr key={v}>
                  <td>
                    <div className="flex items-center gap-2">
                      <Choice
                        label={v}
                        type="checkbox"
                        defaultChecked={defaults.includes(i)}
                      />
                      {v === "Client accompagné par :" && (
                        <input
                          name={`${v} details}`}
                          className="flex-1 flex-1focus:bg-violet-100 px-1 border border-gray-400 rounded w-full"
                          maxLength={50}
                        />
                      )}
                    </div>
                  </td>
                  <td>
                    <QuestionWithInput
                      name={`${v}_init`}
                      className="w-10"
                      value={defaults.includes(i) ? user?.initiales : ""}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <span>Heure de départ :</span>
            <TimePicker
              initValue={form.data?.["Heure de départ :"] ?? ""}
              name="Heure de départ :"
            />
          </div>
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
          <QuestionWithChoices
            choices={["Domicile", "Unité de soins", "Autre"]}
            type="single"
            label="Destination :"
          />
          <QuestionWithInput name="Destination_autre" />
        </div>
        <div className="flex gap-2"></div>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Notes</th>
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
                  <textarea
                    className="w-full h-20"
                    rows={2}
                    name={`note text ${i}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>
      <Page index={4} patient={patient} title={title} total={pages}>
        <table>
          <thead>
            <tr>
              <th>Initiales</th>
              <th className="w-full">Signatures</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }, (_, i) => (
              <tr key={i}>
                <td>
                  <QuestionWithInput name={`initiale ${i}`} />
                </td>
                <td>
                  <textarea
                    name={i === 0 ? `signature` : `signature ${i}`}
                    className="w-full h-11"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>
    </Form>
  );
}
