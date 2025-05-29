import { examType, examTypeOther, medications, units } from "../choices";
import type { DataResponse } from "../main";
import { Choice } from "./choice";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import Heading from "./heading";
import { Page } from "./page";
import { QuestionWithChoices } from "./question-with-choices";
import { QuestionWithInput } from "./question-with-input";

const title = "SOINS INFIRMIERS PENDANT UN EXAMEN ENDOSCOPIQUE";
const verticalCellStyle: React.CSSProperties = {
  textTransform: "uppercase",
  writingMode: "vertical-rl",
  transform: "rotate(180deg)",
};
const colArr = Array(9).fill(null);

const colonSite = [
  "",
  "Iléon",
  "Caecum",
  "Valvule I-C",
  "Colon ascendant",
  "Anglé hépatique",
  "Colon transverse",
  "Angle splénique",
  "Colon descendant",
  "Colon sigmoïde",
  "Rectum",
  "Anus",
];

interface SM01694Props {
  patient: DataResponse["patient"];
}

export default function SM01694({ patient }: SM01694Props) {
  return (
    <Form>
      <Page
        dossier={patient.dossier}
        title={title}
        index={1}
        total={3}
        className="gap-2"
      >
        <FormHeader code="SM01694" patient={patient} />
        <Heading level={1}>{title}</Heading>
        <div className="flex flex-wrap space-x-4 space-y-1">
          <QuestionWithInput label="Date :" type="date" />
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
              choices={["", "domicile", "unité de soins"]}
              type="single"
              label="Provenance :"
            />
            <QuestionWithInput label="Autre :" name="provenance_autre" />
          </div>
        </div>
        <div className="flex gap-4">
          <QuestionWithInput label="Heure d'entrée" type="time" />
          <QuestionWithInput label="Heure de début" type="time" />
          <QuestionWithInput label="Heure de fin" type="time" />
        </div>
        <table className="text-[.57rem]">
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
                  {/* <div className="flex justify-between gap-0.5">
                    <select
                      name={`time_${i}_hour`}
                      className="p-0 max-w-6 text-center appearance-none"
                    >
                      {Array(24)
                        .fill(null)
                        .map((_, i) => (
                          <option key={i} value={i}>
                            {new Intl.NumberFormat(navigator.language, {
                              minimumIntegerDigits: 2,
                            }).format(i)}
                          </option>
                        ))}
                    </select>
                    :
                    <select
                      name={`time_${i}_min`}
                      className="p-0 max-w-6 text-center appearance-none"
                    >
                      {Array(60)
                        .fill(null)
                        .map((_, i) => (
                          <option key={i} value={i}>
                            {new Intl.NumberFormat(navigator.language, {
                              minimumIntegerDigits: 2,
                            }).format(i)}
                          </option>
                        ))}
                    </select>
                  </div> */}
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
              <td className="w-80">Pression artérielle :</td>
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
      <Page
        dossier={patient.dossier}
        index={2}
        total={3}
        title={title}
        className="gap-2"
      >
        <div className="flex gap-2">
          <table className="w-full">
            <thead>
              <tr>
                <th colSpan={3}>MÉDICAMENT(S)</th>
              </tr>
              <tr>
                <th className="min-w-24">Heure</th>
                <th className="w-full">Rx (nom, dose voie d'adm.)</th>
                <th className="min-w-20">Initiales</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <QuestionWithInput
                    name="med_1_time"
                    type="time"
                    className="w-18"
                  />
                </td>
                <td>
                  <div className="flex gap-1">
                    <QuestionWithInput label="VERSED" className="w-10" />
                    Mg I.V.
                  </div>
                </td>
                <td>
                  <QuestionWithInput name="med_1_init" className="w-10" />
                </td>
              </tr>
              <tr>
                <td>
                  <QuestionWithInput
                    name="med_2_time"
                    type="time"
                    className="w-18"
                  />
                </td>
                <td>
                  <div className="flex gap-1">
                    <QuestionWithInput label="FENTANYL" className="w-10" />
                    mcg I.V.
                  </div>
                </td>
                <td>
                  <QuestionWithInput name="med_2_init" className="w-10" />
                </td>
              </tr>
              <tr>
                <td>
                  <QuestionWithInput
                    name="med_3_time"
                    type="time"
                    className="min-w-24"
                  />
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span>NaCI 0.9%</span>
                    <select name="nacl_dose">
                      {["", 10, 20, 500, 1000].map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                    <span>ml I.V.</span>
                  </div>
                </td>
                <td>
                  <QuestionWithInput name="med_3_init" className="w-10" />
                </td>
              </tr>
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <tr key={i}>
                    <td>
                      <QuestionWithInput
                        name={`med_${4 + i}_time`}
                        type="time"
                        className="w-18"
                      />
                    </td>
                    <td>
                      <div className="flex gap-3">
                        <QuestionWithChoices
                          choices={medications}
                          type="single"
                          name={`med_${4 + i}_name`}
                        />
                        <QuestionWithInput
                          name={`med_${4 + i}_dose`}
                          type="number"
                          className="max-w-16"
                        />
                        <QuestionWithChoices
                          choices={units}
                          type="single"
                          name={`med_${4 + i}_unit`}
                        />
                      </div>
                      {/* <QuestionWithInput name={`med_${4 + i}_details`} /> */}
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
        </div>
        <div className="flex gap-4">
          <QuestionWithChoices
            choices={["Muko", "1 dose de xylo gelé 2%", "Xylo spray"]}
            type="multiple"
            name="Muko"
          />
          <div className="flex items-center gap-2 w-40">
            Quantité de puff
            <select name="dose_puff">
              {Array(11)
                .fill(null)
                .map((_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <QuestionWithInput label="Scope #" />
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
                    "Cuisse D",
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
              <td>
                <QuestionWithInput label="Argon :" />
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
              <td className="w-1/3">
                <Choice label="Adrénaline 1ml/mg" type="checkbox" />
              </td>
              <td className="">
                <div className="flex items-center gap-1">
                  <QuestionWithInput name="adrenaleine details" type="number" />
                  ml
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <Choice label="NaCI 0.9% 100ml" type="checkbox" />
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
                  choices={["", "5ml", "6ml", "7ml", "8ml", "9ml", "10ml"]}
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
                <Choice label="Dilatation" type="checkbox" />
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
                    label="Ballon"
                    name="Exerèse corps étranger ballon"
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
                <Choice label="Ligature var. oes" type="checkbox" />
              </td>
              <td>
                <QuestionWithChoices
                  choices={[
                    "",
                    ...Array(5)
                      .fill(null)
                      .map((_, i) => `X${i + 1} élastique${i > 0 ? "s" : ""}`),
                  ]}
                  type="single"
                  name="Ligature var. oes details"
                />
              </td>
            </tr>
            <tr>
              <td>
                <QuestionWithChoices
                  choices={["", "#12", "#16", "#22"]}
                  type="single"
                  label="Pinces (clips)"
                />
              </td>
              <td>
                <QuestionWithChoices
                  choices={[
                    "",
                    ...Array(3)
                      .fill(null)
                      .map((_, i) => `X${i + 1}`),
                  ]}
                  type="single"
                  name="Pinces (clips) details"
                />
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
        <table>
          <thead>
            <tr>
              <th colSpan={4}>Prélèvements</th>
            </tr>
            <tr>
              <th>Flacon</th>
              <th>Type</th>
              <th>Segment (coloscopie)</th>
              <th>Segment (gastroscopie)</th>
            </tr>
          </thead>
          <tbody>
            {Array(8)
              .fill(null)
              .map((_, i, arr) => (
                <tr key={i}>
                  <td>
                    <QuestionWithChoices
                      choices={["", ...arr.map((_, i) => `Flacon ${i + 1}`)]}
                      type="single"
                      name={`prelevement flacon ${i}`}
                      className="justify-center"
                    />
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
      </Page>
      <Page dossier={patient.dossier} index={3} total={3} title={title}>
        <div className="space-y-1">
          <Heading level={3}>NOTES</Heading>
          <textarea
            name="notes"
            className="w-full max-h-16"
            defaultValue={
              "Consultation pré examen réalisée par md, examen bien toléré, sans complication."
            }
          />
        </div>

        <div className="flex gap-2">
          <QuestionWithInput label="Initiales" />
          <QuestionWithInput label="Signature" />
        </div>
      </Page>
    </Form>
  );
}
