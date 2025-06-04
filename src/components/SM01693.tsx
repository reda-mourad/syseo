import React, { Fragment, useEffect, useRef, useState } from "react";
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

  const numCols = colArr.length;
  const tableRows = [
    "time",
    "press_art",
    "freq_card",
    "freq_resp",
    "ampl_resp",
    "ronflement",
    "saturation",
    "etco2",
    "o2",
    "monitoring",
    "sedation",
    "dlr",
    "sueur",
    "autre",
    "initiales",
  ];

  const tableRefs = useRef(
    Array.from({ length: numCols }, () =>
      Array.from({ length: 15 }, () =>
        React.createRef<HTMLInputElement | HTMLSelectElement>()
      )
    )
  );

  function focusCell(col: number, row: number) {
    const ref = tableRefs.current[col]?.[row];
    if (ref && ref.current) {
      ref.current.focus();
    }
  }

  function handleTableKeyDown(
    e: React.KeyboardEvent,
    col: number,
    row: number
  ) {
    if (e.key === "Tab") {
      e.preventDefault();
      let nextCol = col;
      let nextRow = row + (e.shiftKey ? -1 : 1);
      if (nextRow >= tableRows.length) {
        nextRow = 0;
        nextCol = col + 1;
      }
      if (nextRow < 0) {
        nextCol = col - 1;
        nextRow = tableRows.length - 1;
      }
      if (nextCol >= numCols) {
        return;
      }
      if (nextCol < 0) {
        return;
      }
      focusCell(nextCol, nextRow);
    }
  }

  /* const medNumCols = colArr.length;
  const medTableRows = [
    "time",
    "versed",
    "fentanyl",
    "naci",
    "xylo",
    "other1",
    "other2",
    "init",
  ];
  const medTableRefs = useRef(
    Array.from({ length: medNumCols }, () =>
      Array.from({ length: medTableRows.length }, () =>
        React.createRef<HTMLInputElement | HTMLSelectElement>()
      )
    )
  );

  function focusMedCell(col: number, row: number) {
    const ref = medTableRefs.current[col]?.[row];
    if (ref && ref.current) {
      ref.current.focus();
    }
  }

  function handleMedTableKeyDown(
    e: React.KeyboardEvent,
    col: number,
    row: number
  ) {
    if (e.key === "Tab") {
      e.preventDefault();
      let nextCol = col;
      let nextRow = row + (e.shiftKey ? -1 : 1);
      if (nextRow >= medTableRows.length) {
        nextRow = 0;
        nextCol = col + 1;
      }
      if (nextRow < 0) {
        nextCol = col - 1;
        nextRow = medTableRows.length - 1;
      }
      if (nextCol >= medNumCols || nextCol < 0) {
        return;
      }
      focusMedCell(nextCol, nextRow);
    }
  }*/

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
            ? user.initiales
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
            ? user.initiales
            : "";
        };
      }
    }
  }, [user]);

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
        <table className="text-[.55rem]">
          <thead>
            <tr>
              <th colSpan={2 + colArr.length}>PARAMÈTRES ÉVALUÉS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={2} className="min-w-48 max-w-48 text-right">
                Heure :
              </th>
              {colArr.map((_, i) => (
                <th key={i}>
                  <QuestionWithInput
                    name={`time_${i}`}
                    type="time"
                    // className="hide-time-btn"
                    ref={tableRefs.current[i][0] as React.Ref<HTMLInputElement>}
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 0)}
                    onChange={() => {
                      const initEl = document.querySelector<HTMLInputElement>(
                        `input[name="initiales_${i}"]`
                      );
                      if (initEl) {
                        initEl.value = user.initiales;
                      }
                    }}
                  />
                </th>
              ))}
            </tr>
            <tr>
              <th rowSpan={8} style={verticalCellStyle}>
                signes vitaux et état respiratoire
              </th>
              <td>Pression artérielle :</td>
              {colArr.map((_, i) => (
                <td key={i} className="space-y-1">
                  <QuestionWithInput
                    name={`press_art_max_${i}`}
                    type="number"
                    ref={tableRefs.current[i][1] as React.Ref<HTMLInputElement>}
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 1)}
                  />
                  <QuestionWithInput
                    name={`press_art_min_${i}`}
                    type="number"
                    ref={tableRefs.current[i][2] as React.Ref<HTMLInputElement>}
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 2)}
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
                    ref={tableRefs.current[i][3] as React.Ref<HTMLInputElement>}
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 3)}
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
                  />
                  <select
                    className="w-full"
                    name={`freq_resp_${i}`}
                    ref={
                      tableRefs.current[i][4] as React.Ref<HTMLSelectElement>
                    }
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 4)}
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
                    ref={
                      tableRefs.current[i][5] as React.Ref<HTMLSelectElement>
                    }
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 5)}
                    defaultValue={i < 4 ? "N" : ""}
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
                    ref={
                      tableRefs.current[i][6] as React.Ref<HTMLSelectElement>
                    }
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 6)}
                    defaultValue={i < 4 ? "N" : ""}
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
              <td>Saturation O2 (%)</td>
              {colArr.map((_, i) => (
                <td key={i} className="space-y-1">
                  <QuestionWithInput
                    name={`saturation_${i}`}
                    type="number"
                    ref={tableRefs.current[i][7] as React.Ref<HTMLInputElement>}
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 7)}
                  />
                  <select name={`saturation option ${i}`} className="w-full">
                    <option value=""></option>
                    <option value="AA">AA</option>
                    <option value="LN">LN</option>
                    <option value="VMK">VMK</option>
                  </select>
                  <div className="flex items-center-safe gap-0.5">
                    <QuestionWithInput type="number" name="sat l/min" />
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
                    ref={tableRefs.current[i][8] as React.Ref<HTMLInputElement>}
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 8)}
                  />
                </td>
              ))}
            </tr>
            <tr>
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
                    ref={tableRefs.current[i][9] as React.Ref<HTMLInputElement>}
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 9)}
                    initValue={i < 4 ? "2" : ""}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <th style={verticalCellStyle}>
                monitoring
                <br /> cardiaque
              </th>
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
                    ref={
                      tableRefs.current[i][10] as React.Ref<HTMLSelectElement>
                    }
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 10)}
                    defaultValue={i < 4 ? "1" : ""}
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
                  <select
                    name={`sedation_${i}`}
                    className="w-full"
                    ref={
                      tableRefs.current[i][11] as React.Ref<HTMLSelectElement>
                    }
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 11)}
                    defaultValue={i === 0 ? "0" : i < 4 ? "S" : ""}
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
              <th style={verticalCellStyle}>DLR</th>
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
                    ref={
                      tableRefs.current[i][12] as React.Ref<HTMLSelectElement>
                    }
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 12)}
                    defaultValue={i < 4 ? "0" : ""}
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
              <th rowSpan={3} style={verticalCellStyle}>
                autre
                <br /> PARAMÈTRES
              </th>
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
                    ref={
                      tableRefs.current[i][13] as React.Ref<HTMLSelectElement>
                    }
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 13)}
                    defaultValue={i < 4 ? "Ø" : ""}
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
                    ref={
                      tableRefs.current[i][14] as React.Ref<HTMLInputElement>
                    }
                    tabIndex={0}
                    onKeyDown={(e) => handleTableKeyDown(e, i, 14)}
                  />
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
            {Array(8)
              .fill(null)
              .map((_, i) => (
                <tr key={i}>
                  <td>
                    <QuestionWithInput
                      name={`med_${i}_time`}
                      type="time"
                      className="min-w-24"
                      onChange={(e) => {
                        const initEl = document.querySelector<HTMLInputElement>(
                          `input[name="med_${i}_init"]`
                        );
                        const time = e.currentTarget.value;
                        if (initEl) {
                          initEl.value = time ? user.initiales : "";
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
                <td>
                  <Choice
                    label={v}
                    type="checkbox"
                    defaultChecked={
                      v ===
                      "2 h post dose d'antagoniste reçue, après visite médicale"
                    }
                  />
                </td>
                <td>
                  <QuestionWithInput
                    name={`${v}_init`}
                    className="w-10"
                    value={
                      v ===
                      "2 h post dose d'antagoniste reçue, après visite médicale"
                        ? user.initiales
                        : ""
                    }
                  />
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
            defaultValue={`Revenu en salle de réveil post-procédure, état stable. Aucun incident à signaler. Site du cathéter IV propre et sec au congé.
              
Consignes post-endoscopie données verbalement et par écrit : repos, reprise alimentaire progressive, surveillance des signes d’alerte (ex. : saignement, douleur abdominale sévère, fièvre).
            `}
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
