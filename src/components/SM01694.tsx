import { examType } from "../choices";
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
const colArr = Array(6).fill(null);

export default function SM01694({
  patient,
}: {
  patient: DataResponse["patient"];
}) {
  return (
    <Form>
      <Page
        dossier={patient.NoDossier}
        title={title}
        index={1}
        total={1}
        className="gap-2"
      >
        <FormHeader code="SM01694" />
        <Heading level={1}>{title}</Heading>
        <div className="flex flex-wrap space-x-4 space-y-1">
          <QuestionWithInput label="Date :" type="date" />
          <QuestionWithChoices
            label="Examen :"
            choices={examType}
            type="single"
          />
          <QuestionWithInput label="Médecin :" />
          <QuestionWithChoices
            choices={["Salle 1", "Salle 2", "Salle 3"]}
            type="single"
            label="Salle d'examen :"
          />
          <div className="flex items-center gap-1">
            <QuestionWithChoices
              choices={["domicile", "unité de soins", "Autre"]}
              type="single"
              label="Provenance :"
            />
            <QuestionWithInput name="provenance_autre" />
          </div>
        </div>
        <div className="flex gap-4">
          <QuestionWithInput label="Heure d'entrée" type="time" />
          <QuestionWithInput label="Heure de début" type="time" />
          <QuestionWithInput label="Heure de fin" type="time" />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <table className="text-[.5rem]">
              <thead>
                <tr>
                  <th colSpan={8}>PARAMÈTRES ÉVALUÉS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colSpan={2} className="text-right">
                    Heure :
                  </th>
                  {colArr.map((_, i) => (
                    <th key={i} className="w-16">
                      <QuestionWithInput name={`time_${i}`} />
                    </th>
                  ))}
                </tr>
                <tr>
                  <th rowSpan={8} style={verticalCellStyle} className="w-10">
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
                    <b>P :</b> profonde <b>N :</b> normale <b>S :</b>{" "}
                    superficielle
                  </td>
                  {colArr.map((_, i) => (
                    <td key={i}>
                      <select name={`ampl_resp_${i}`}>
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
                      <select name={`ronflement_${i}`}>
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
                      <select name={`ronflement_${i}`}>
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
                        3 : s'éveille difficilement a l'appel et à la
                        stimulation manuelle
                      </li>
                    </ul>
                  </td>
                  {colArr.map((_, i) => (
                    <td key={i}>
                      <select name={`sedation_${i}`}>
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
                      <select name={`dlr_${i}`}>
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
                      <select name={`sueur_${i}`}>
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
            <Heading level={3}>NOTES</Heading>
            <textarea name="notes" className="w-full max-h-10" />
            <div className="flex gap-2">
              <QuestionWithInput label="Initiales" />
              <QuestionWithInput label="Signature" />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-60">
            <table className="w-full text-[.5rem]">
              <thead>
                <tr>
                  <th colSpan={3}>MÉDICAMENT(S)</th>
                </tr>
                <tr>
                  <th>Heure</th>
                  <th>Rx (nom, dose voie d'adm.)</th>
                  <th>INT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <QuestionWithInput
                      name="time_med_1"
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
                    <QuestionWithInput name="init_med_1" className="w-10" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <QuestionWithInput
                      name="time_med_2"
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
                    <QuestionWithInput name="init_med_2" className="w-10" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <QuestionWithInput
                      name="time_med_3"
                      type="time"
                      className="w-18"
                    />
                  </td>
                  <td>NaCI 0.9% I.V.</td>
                  <td>
                    <QuestionWithInput name="init_med_3" className="w-10" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <QuestionWithInput
                      name="time_med_4"
                      type="time"
                      className="w-18"
                    />
                  </td>
                  <td>
                    <QuestionWithInput name="med_4_details" />
                  </td>
                  <td>
                    <QuestionWithInput name="init_med_4" className="w-10" />
                  </td>
                </tr>
              </tbody>
            </table>
            <QuestionWithChoices
              choices={["Muko", " Xylo spray", " Xylo gelée 2%"]}
              type="multiple"
              name="Muko"
            />
            <QuestionWithInput label="Scope #" />
            <Heading level={3}>INTERVENTIONS ELECTROCAUTÈRE :</Heading>
            <QuestionWithInput label="Site de la plaque :" />
            <QuestionWithInput label="Degré coag. :" />
            <QuestionWithInput label="Cut :" />
            <QuestionWithInput label="Endocut :" />
            <QuestionWithInput label="Argon :" />
            <Heading level={3} className="uppercase">
              Procédure :
            </Heading>
            {[
              "Adrénaline",
              "NaCI 0.9%",
              "Encre de chine",
              "Polypectomie",
              "Dilatation",
              "Exerèse corps étranger",
              "Tube gastrostomie",
              "Ligature var. oes",
              "Autre",
            ].map((e) => (
              <div key={e} className="flex gap-1">
                <Choice label="" name={`check_${e}`} type="checkbox" />
                <div className="flex-1">
                  <QuestionWithInput label={e} />
                </div>
              </div>
            ))}
            <Heading level={3} className="uppercase">
              Prélèvements
            </Heading>
            <textarea name="Prélèvements" className="max-h-20" />
          </div>
        </div>
      </Page>
    </Form>
  );
}
