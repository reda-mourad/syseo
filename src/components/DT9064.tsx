import type { DataResponse } from "@/4d";
import { currentDate } from "@/choices";
import { Form } from "./form";
import { FormHeader } from "./form-header";
import { Page } from "./page";
import { QuestionWithChoices } from "./question-with-choices";
import { QuestionWithInput } from "./question-with-input";
import TimePicker from "./time-picker";

const title = "DT9064";
const pages = 1;

export default function DT9064({ patient, user }: DataResponse) {
  return (
    <Form>
      <Page index={1} patient={patient} title={title} total={pages}>
        <FormHeader code="DT9064" patient={patient} />
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
            {Array.from({ length: 10 }, (_, i) => (
              <tr key={i}>
                <td className="text-center">
                  <TimePicker initValue="" name={`time ${i}`} />
                </td>
                <td>
                  <textarea
                    name={`note ${i}`}
                    className="w-full min-h-[3.75rem] max-h-[3.75rem]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <QuestionWithInput name="signature" value={user?.signature} readOnly />
      </Page>
    </Form>
  );
}
