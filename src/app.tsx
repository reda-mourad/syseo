import { useEffect } from "react";
import type { DataResponse } from "./4d";
import DT9064 from "./components/DT9064";
import SM01693 from "./components/SM01693";
import SM01694 from "./components/SM01694";
import SM01695 from "./components/SM01695";
import SM01696 from "./components/SM01696";
import SM01741 from "./components/SM01741";
import SM01742 from "./components/SM01742";
import SM02493 from "./components/SM02493";

export function App({ initData }: { initData?: DataResponse }) {
  useEffect(() => {}, []);

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
          else e.value = value ?? "";
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
    document.querySelectorAll("input").forEach((e) => {
      if (e.type === "text") {
        const style = window.getComputedStyle(e);
        const pl = parseFloat(style.paddingLeft);
        const pr = parseFloat(style.paddingRight);
        const w = e.clientWidth - pl - pr;

        e.maxLength = w / 6.59;
      }
    });
    if (window.$4d && initData) {
      const formEl = document.querySelector("form");
      if (formEl) {
        setInterval(() => {
          const formData = new FormData(formEl);
          const data = Object.fromEntries(formData);
          window.$4d.form_save(initData.form.UUID, data);
        }, 5000);
      }
    }
  }, [initData]);

  if (initData) {
    const code = initData?.form?.code.trim();
    if (code === "SM01696") return <SM01696 {...initData} />;
    if (code === "SM01695") return <SM01695 {...initData} />;
    if (code === "SM01694") return <SM01694 {...initData} />;
    if (code === "SM01693") return <SM01693 {...initData} />;
    if (code === "SM01741") return <SM01741 {...initData} />;
    if (code === "SM01742") return <SM01742 {...initData} />;
    if (code === "SM02493") return <SM02493 {...initData} />;
    if (code === "DT9064") return <DT9064 {...initData} />;
  }
  return null;
}
