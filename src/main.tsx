import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./index.css";

export interface DataResponse {
  form: { UUID: string; data: Record<string, never> | null; code: string };
  patient: Record<string, never>;
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

function init(initData?: DataResponse) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App initData={initData} />
    </StrictMode>
  );
}

const formId = new URLSearchParams(window.location.search).get("id") ?? "";

if (window.$4d) {
  window.$4d.form_get(formId, (res) => {
    init(res);
  });
} else {
  init();
}
