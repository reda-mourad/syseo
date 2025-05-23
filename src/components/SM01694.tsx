import type { DataResponse } from "../main";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import { Page } from "./page";

const title = "SOINS INFIRMIERS PENDANT UN EXAMEN ENDOSCOPIQUE";

export default function SM01694({
  patient,
}: {
  patient: DataResponse["patient"];
}) {
  return (
    <Form>
      <Page index={1} total={2} title={title} dossier={patient.NoDossier}>
        <FormHeader code="SM01694" />
        <h1 className="font-semibold text-3xl text-center">{title}</h1>
        <table>
          <thead>
            <tr>
              <th colSpan={8}>PARAMÈTRES ÉVALUÉS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th></th>
              <td className="text-right">Heure :</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th rowSpan={8}>test</th>
              <td>Pression artérielle :</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Fréquence cardiaque/min. :</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                Fréquence respiratoire/min.
                <br />
                Noter si rythme irr. ou pause respiratoire :
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                Amplitude respiratoire <br />
                <b>P :</b> profonde <b>N :</b> normale S: superficielle
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </Page>
    </Form>
  );
}
