import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import type { Patient } from "./components/patient-ticket";

export interface DataResponse {
  form: { UUID: string; data: Record<string, never> | null; code: string };
  patient: Patient;
  user: { initiales: string };
}

declare global {
  interface Window {
    saveForm: () => void;
    $4d: {
      form_save: (id: string, data: Record<string, unknown>) => void;
      form_get: (id: string, result: (res?: DataResponse) => void) => void;
    };
  }
}

export async function main_4d() {
  const params = new URLSearchParams(window.location.search);
  const formId = params.get("id") ?? "";
  const secret = params.get("secret") ?? "";

  if (!window.$4d) {
    window.$4d = {
      form_get: (id: string, result: (res?: DataResponse) => void) => {
        fetch(`${location.origin}/4DACTION/form_get/?id=${id}`, {
          headers: { secret },
        })
          .then((res) => res.json())
          .then((json) => result(json));
      },
      form_save() {},
    };
  }

  const data = await new Promise<DataResponse | undefined>((resolve) => {
    window.$4d.form_get(formId, (res) => {
      resolve(res);
    });
  });

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App initData={data} />
    </StrictMode>
  );
}
