import Barcode from "react-barcode";
import PatientTicket, { type Patient } from "./patient-ticket";

interface FormHeaderProps {
  code: string;
  patient: Patient;
}

export function FormHeader({ code, patient }: FormHeaderProps) {
  return (
    <div className="items-center grid grid-cols-2 h-40">
      <div className="flex flex-col gap-4">
        <div>
          <img src="/logo.png" className="h-20" />
        </div>
        <Barcode
          value={code}
          fontSize={60}
          format="CODE39"
          width={8}
          className="w-fit h-10"
        />
      </div>
      <PatientTicket {...patient} />
    </div>
  );
}
