import type { DataResponse } from "@/4d";
import { currentDate } from "@/choices";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import { Page } from "./page";
import { QuestionWithChoices } from "./question-with-choices";
import { QuestionWithInput } from "./question-with-input";
import TimePicker from "./time-picker";

const title = "DT09064";
const pages = 1;

export default function DT09064({ patient, user }: DataResponse) {
  return (
    <Form>
      <Page index={1} patient={patient} title={title} total={pages}>
        <FormHeader code="DT09064" patient={patient} />
        <div className="flex justify-between">
          <QuestionWithInput
            label="Date :"
            type="date"
            className="max-w-fit"
            initValue={currentDate()}
          />
          <QuestionWithChoices
            choices={["", "urologie", "endoscopie digestive", "pneumologie"]}
            type="single"
            label="Service :"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th className="min-w-16">Heure</th>
              <th className="w-full">interventions / observations</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 23 }, (_, i) => (
              <tr key={i}>
                <td className="text-center">
                  <TimePicker initValue="" name={`time ${i}`} />
                </td>
                <td>
                  <QuestionWithInput name={`note ${i}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <QuestionWithInput label="Signature :" value={user.signature} />
      </Page>
    </Form>
  );
}
