import React, { useEffect } from "react";
import type { DataResponse } from "../4d";
import {
  colonSite,
  currentTime,
  examType,
  examTypeOther,
  medications,
  units,
} from "../choices";
import { Choice } from "./choice";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import Heading from "./heading";
import { Page } from "./page";
import { QuestionWithChoices } from "./question-with-choices";
import { QuestionWithInput } from "./question-with-input";
import TimePicker from "./time-picker";
import Textarea from "./Textarea";

const title = "SOINS INFIRMIERS PENDANT UN EXAMEN ENDOSCOPIQUE";
const verticalCellStyle: React.CSSProperties = {
  textTransform: "uppercase",
  writingMode: "vertical-rl",
  transform: "rotate(180deg)",
};
const colArr = Array.from({ length: 8 });

export default function SM01694({ patient, user, form }: DataResponse) {
  useEffect(() => {
    document
      .querySelectorAll('select[name^="prelevement flacon"]')
      .forEach((el) => {
        (el as HTMLSelectElement).onchange = () => {
          // console.log("flacon `");
        };
      });
  }, []);

  return (
    <Form>
      <Page patient={patient} title={title} index={1} total={3}>
        <FormHeader code="SM01694" patient={patient} />
        <Heading level={1}>{title}</Heading>
        <div className="flex flex-wrap space-x-4 space-y-2">
          <QuestionWithInput
            label="Date :"
            type="date"
            initValue={new Date().toISOString().substring(0, 10)}
          />
          <QuestionWithInput label="Médecin :" />
          <QuestionWithChoices
            choices={["Salle 1", "Salle 2", "Salle 3", "Salle 4", "Salle 5"]}
            type="single"
            label="Salle d'examen :"
          />
          <QuestionWithChoices
            label="Examen :"
            choices={examType}
            type="multiple"
          />
          <QuestionWithChoices
            choices={examTypeOther}
            type="single"
            label="Autre"
            name="examen_autre"
          />
          <div className="flex items-center gap-1">
            <QuestionWithChoices
              choices={[
                "",
                "domicile",
                "unité de soins",
                "autre établissement",
              ]}
              type="single"
              label="Provenance :"
            />
            <QuestionWithInput label="Autre :" name="provenance_autre" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            Heure d'entrée
            <TimePicker
              name="Heure d'entrée"
              initValue={form.data?.["Heure d'entrée"] ?? currentTime()}
            />
          </div>
          <div className="flex items-center gap-2">
            Heure de début
            <TimePicker
              name="Heure de début"
              initValue={form.data?.["Heure de début"] ?? ""}
            />
          </div>
          <div className="flex items-center gap-2">
            Heure de fin
            <TimePicker
              name="Heure de fin"
              initValue={form.data?.["Heure de fin"] ?? ""}
            />
          </div>
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
                    tabIndex={19 * i + 1}
                    className="w-full"
                    name={`time_${i}`}
                    initValue={form.data?.[`time_${i}`] ?? ""}
                    onClick={() => {
                      const initEl = document.querySelector<HTMLInputElement>(
                        `input[name="initiales_${i}"]`
                      );
                      if (initEl) {
                        initEl.value = user.initiales ?? "";
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
                    defaultValue={i === 0 ? "AA" : i < 4 ? "LN" : ""}
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
                      initValue={i < 4 && i > 0 ? "2" : ""}
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
                    defaultValue={i === 0 ? "0" : i < 4 ? "S" : ""}
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
      <Page patient={patient} index={2} total={3} title={title}>
        <table className="text-[.5rem]">
          <thead>
            <tr>
              <th colSpan={10}>MÉDICAMENT(S)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Rx (nom, dose voie d'adm.)</th>
              <th>Heure</th>
              {colArr.map((_, i) => (
                <th key={i}>
                  <TimePicker
                    initValue={form.data?.[`med time ${i}`] ?? ""}
                    className="w-full"
                    tabIndex={500 + 8 * i + 1}
                    name={`med time ${i}`}
                    onClick={() => {
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
            <tr>
              <th colSpan={2}>VERSED (Mg I.V.)</th>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput
                    tabIndex={500 + 8 * i + 2}
                    name={`VERSED ${i}`}
                    type="number"
                    min={1}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <th colSpan={2}>FENTANYL (mcg I.V.)</th>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput
                    tabIndex={500 + 8 * i + 3}
                    name={`FENTANYL ${i}`}
                    type="number"
                    min={1}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <th colSpan={2}>NaCI 0.9% (ml I.V.)</th>
              {colArr.map((_, i) => (
                <td key={i}>
                  <QuestionWithInput
                    name={`NaCI ${i}`}
                    type="number"
                    min={1}
                    tabIndex={500 + 8 * i + 4}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <th colSpan={2}>XYLO SPRAY (Nb de puff)</th>
              {colArr.map((_, i) => (
                <td key={i}>
                  <select
                    name={`XYLO SPRAY ${i}`}
                    className="w-full"
                    tabIndex={500 + 8 * i + 5}
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
            {Array.from({ length: 2 }, (_, j) => (
              <tr key={j}>
                <th colSpan={2}>
                  <div className="flex gap-3">
                    <QuestionWithChoices
                      choices={medications}
                      type="single"
                      name={`other med name ${j}`}
                    />
                    <QuestionWithChoices
                      choices={units}
                      type="single"
                      name={`other med unit ${j}`}
                    />
                  </div>
                </th>
                {colArr.map((_, i) => (
                  <td key={i}>
                    <QuestionWithInput
                      tabIndex={500 + 8 * i + 6 + j}
                      name={`other med ${j} value ${i}`}
                      type="number"
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
                    tabIndex={500 + 8 * i + 7}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between">
          <QuestionWithChoices
            choices={["Muko", "1 dose de xylo gelé 2%"]}
            type="multiple"
            label="Utilisation de :"
            defaultValue="Muko"
          />
          <QuestionWithInput label="Scope #" />
        </div>
        <table>
          <thead>
            <tr>
              <th colSpan={5}>INTERVENTIONS ELECTROCAUTÈRE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <QuestionWithChoices
                  choices={[
                    "",
                    "cuisse D",
                    "cuisse G",
                    "abdomen",
                    "flanc D",
                    "flanc G",
                  ]}
                  type="single"
                  label="Site de la plaque :"
                />
              </td>
              <td>
                <QuestionWithInput label="Degré coag. :" />
              </td>
              <td>
                <QuestionWithInput label="Cut :" />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithInput label="Endocut :" />
              </td>
              <td colSpan={2} className="space-y-1 divide-y">
                <div className="flex gap-4">
                  <QuestionWithChoices
                    choices={["Utilisé", "Non-utilisé"]}
                    type="radio"
                    label="Argon :"
                  />
                  {/* <QuestionWithInput name="Argon details" /> */}
                </div>
                <QuestionWithChoices
                  label="Voies dig sup :"
                  name="Argon Voies dig sup :"
                  choices={["larynx", "oesophage", "estomac", "duodenum"]}
                  columns={2}
                  type="multiple"
                />
                <QuestionWithChoices
                  label="Voies dig sup :"
                  name="Argon Voies dig sup :"
                  choices={colonSite.slice(1)}
                  columns={2}
                  type="multiple"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Procédure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Choice label="Adrénaline 1ml/mg" type="checkbox" />
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <QuestionWithInput name="adrenaleine details" type="number" />
                  ml
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <Choice label="NaCI 0.9%" type="checkbox" />
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <QuestionWithInput type="number" name="nacl details" />
                  ml
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <Choice label="Encre de chine" type="checkbox" />
              </td>
              <td>
                <QuestionWithChoices
                  choices={[
                    "",
                    ...Array.from({ length: 9 }, (_, i) => `${i + 2}ml`),
                  ]}
                  type="single"
                  name="Encre de chine details"
                />
              </td>
            </tr>
            <tr>
              <td>
                <Choice label="Polypectomie" type="checkbox" />
              </td>
              <td>
                <QuestionWithChoices
                  choices={[
                    "",
                    ...Array(11)
                      .fill(null)
                      .map((_, i) => `X${i}`),
                  ]}
                  type="single"
                  name="Polypectomie details"
                />
              </td>
            </tr>
            <tr>
              <td>
                <Choice label="Dilatation : ballon" type="checkbox" />
              </td>
              <td>
                <div className="flex justify-between">
                  <QuestionWithChoices
                    choices={[
                      "",
                      "6-8",
                      "8-10",
                      "10-12",
                      "12-15",
                      "15-18",
                      "18-20",
                    ]}
                    type="single"
                    name="Dilatation : ballon1"
                  />
                  <QuestionWithChoices
                    choices={[
                      "",
                      "6-8",
                      "8-10",
                      "10-12",
                      "12-15",
                      "15-18",
                      "18-20",
                    ]}
                    type="single"
                    name="Dilatation : ballon2"
                  />
                  <QuestionWithChoices
                    choices={[
                      "",
                      "6-8",
                      "8-10",
                      "10-12",
                      "12-15",
                      "15-18",
                      "18-20",
                    ]}
                    type="single"
                    name="Dilatation : ballon3"
                  />
                  <QuestionWithChoices
                    choices={colonSite}
                    type="single"
                    label="Site"
                    name="Exerèse corps étranger site"
                    className="justify-between"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <Choice label="Exerèse corps étranger" type="checkbox" />
              </td>
              <td>
                <div className="flex justify-between">
                  <QuestionWithChoices
                    choices={["", "larynx", "oesophage", "estomac", "duodenum"]}
                    type="single"
                    label="Voies dig sup :"
                  />
                  <QuestionWithChoices
                    choices={colonSite}
                    type="single"
                    label="Voies dig inf :"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <Choice label="Tube gastrostomie" type="checkbox" />
              </td>
              <td>
                <QuestionWithChoices
                  choices={["", "X14", "X16", "X18", "X20", "X22", "X24"]}
                  type="single"
                  name="Tube gastrostomie details"
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  choices={[
                    "",
                    "varices œsophagiennes",
                    "varices gastriques",
                    "hémorroïdes",
                  ]}
                  type="single"
                  label="Ligature"
                />
              </td>
              <td>
                <div className="flex gap-2">
                  <QuestionWithChoices
                    choices={[
                      "",
                      ...Array(5)
                        .fill(null)
                        .map(
                          (_, i) => `X${i + 1} élastique${i > 0 ? "s" : ""}`
                        ),
                    ]}
                    type="single"
                    name="Ligature var. oes details"
                  />
                  <QuestionWithChoices
                    choices={["", "Injection de colle (sclérothérapie)"]}
                    type="single"
                    name="Ligature var. oes details 2"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex gap-4">
                  <span>Clips endoscopiques</span>
                </div>
              </td>
              <td>
                <div className="gap-0.5 grid grid-cols-3">
                  <QuestionWithChoices
                    choices={["", "#12", "#16", "#22"]}
                    type="single"
                    name="Pinces (clips) 1"
                  />
                  <QuestionWithChoices
                    choices={["", "#12", "#16", "#22"]}
                    type="single"
                    name="Pinces (clips) 2"
                  />
                  <QuestionWithChoices
                    choices={["", "#12", "#16", "#22"]}
                    type="single"
                    name="Pinces (clips) 3"
                  />
                  <QuestionWithChoices
                    choices={[
                      "",
                      ...Array(3)
                        .fill(null)
                        .map((_, i) => `X${i + 1}`),
                    ]}
                    type="single"
                    name="Pinces (clips) details 1"
                  />
                  <QuestionWithChoices
                    choices={[
                      "",
                      ...Array(3)
                        .fill(null)
                        .map((_, i) => `X${i + 1}`),
                    ]}
                    type="single"
                    name="Pinces (clips) details 2"
                  />
                  <QuestionWithChoices
                    choices={[
                      "",
                      ...Array(3)
                        .fill(null)
                        .map((_, i) => `X${i + 1}`),
                    ]}
                    type="single"
                    name="Pinces (clips) details 3"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <Choice label="Autre" type="checkbox" name="procedure autre" />
              </td>
              <td>
                <QuestionWithInput name="procedure autre details" />
              </td>
            </tr>
          </tbody>
        </table>
      </Page>
      <Page patient={patient} index={3} total={3} title={title}>
        <table>
          <thead>
            <tr>
              <th colSpan={5}>Prélèvements</th>
            </tr>
            <tr>
              <th>Flacon</th>
              <th>Type</th>
              <th>Nombre</th>
              <th>Segment (coloscopie)</th>
              <th>Segment (gastroscopie)</th>
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
                        "Biopsie",
                        "Polypectomie",
                        "Recherche parasites",
                        "Recherche C.Difficile",
                        "Brossage",
                        "Corps étranger",
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
                      choices={colonSite}
                      type="single"
                      name={`segment colo ${i}`}
                      className="justify-center"
                    />
                  </td>
                  <td>
                    <QuestionWithChoices
                      choices={[
                        "",
                        "Larynx",
                        "Oesophage",
                        "Jonction Oeso-gastrique",
                        "Fundus",
                        "Rétrovision Fundus",
                        "Corps",
                        "Antre",
                        "Pylore",
                        "Bulbe",
                        "Duodénum",
                        "Papille",
                      ]}
                      type="single"
                      name={`segement gastro ${i}`}
                      className="justify-center"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="space-y-1">
          <Heading level={3}>NOTES</Heading>
          <Textarea
            lineLength={108}
            rows={9}
            name="notes"
            className="w-full max-h-40"
            maxLength={750}
            defaultValue={
              "Consultation pré examen réalisée par md, examen bien toléré, sans complication."
            }
          />
        </div>

        <div className="flex gap-2">
          <QuestionWithInput label="Initiales" initValue={user.initiales} />
          <div className="flex-1">
            <QuestionWithInput label="Signature" />
          </div>
        </div>
      </Page>
    </Form>
  );
}
