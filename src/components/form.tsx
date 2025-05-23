import type { ComponentProps, ReactElement } from "react";
import type { Page } from "./page";

export interface FormProps extends ComponentProps<"form"> {
  children: ReactElement<typeof Page> | ReactElement<typeof Page>[];
}

export function Form({ children }: FormProps) {
  return (
    <form className="print:block flex flex-wrap justify-center items-center gap-4 bg-gray-500 p-10 print:p-0 min-h-dvh text-xs">
      {children}
    </form>
  );
}
