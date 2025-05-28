import { useEffect } from "react";
import SM01693 from "./components/SM01693";
import SM01694 from "./components/SM01694";
import SM01695 from "./components/SM01695";
import SM01696 from "./components/SM01696";
import type { DataResponse } from "./main";

export function App({ initData }: { initData?: DataResponse }) {
  useEffect(() => {
    if (initData) {
      const {
        form: { data },
      } = initData;
      const formEl = document.querySelector("form");
      if (formEl && data) {
        document.querySelectorAll("input").forEach((e) => {
          const value = data[e.name] ?? "";
          if (e.type === "radio" || e.type === "checkbox")
            e.checked = e.value === value;
          else e.value = value || "";
        });
        document.querySelectorAll("textarea").forEach((e) => {
          const value = data[e.name] ?? "";
          e.value = value || "";
        });
        document.querySelectorAll("select").forEach((e) => {
          e.value = data[e.name];
        });
      }
    }
    window.saveForm = () => {
      const formEl = document.querySelector("form");
      if (formEl) {
        const formData = new FormData(formEl);
        const json = Object.fromEntries(formData.entries());
        // window.$4d.form_save(initData?.form?.UUID ?? "", json);
        return json;
      }
    };
  }, [initData]);

  // const p: Patient = {
  //   episode: "EP123456",
  //   dossier: "DOS789",
  //   nom: "Jean Dupont",
  //   nom_mere: "Marie Dupont",
  //   date_naissance: "01/01/1990",
  //   age: "33",
  //   sexe: "M",
  //   assurence: "ASS123456",
  //   expiration: "12/25",
  //   adresse: "123 Rue de Paris",
  //   code_postal: "75001",
  //   ville: "Paris",
  //   tel: "0123456789",
  // };

  if (initData?.form?.code === "SM01696") return <SM01696 {...initData} />;
  if (initData?.form?.code === "SM01695") return <SM01695 {...initData} />;
  if (initData?.form?.code === "SM01694") return <SM01694 {...initData} />;
  if (initData?.form?.code === "SM01693") return <SM01693 {...initData} />;
  return null;
}
