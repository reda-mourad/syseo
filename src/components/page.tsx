import type { ComponentProps } from "react";
import type { DataResponse } from "../4d";
import { cn } from "../lib/utils";

export interface PageProps extends ComponentProps<"div"> {
  index: number;
  total: number;
  title: string;
  patient: DataResponse["patient"];
}

export function Page({
  patient,
  index,
  // title,
  total,
  className,
  children,
  ...props
}: PageProps) {
  return (
    <div
      className={cn(
        "bg-white p-10 max-w-[8.5in] min-w-[8.5in] w-[8.5in] h-[11in] max-h-[11in] printable flex flex-col gap-2 relative",
        index > 1 && "pt-16",
        className
      )}
      {...props}
    >
      {index > 1 && (
        <div className="top-0 absolute inset-x-0 flex justify-between items-center px-10 h-16 text-[.6rem]">
          <div className="space-y-1">
            {/* <div className="font-bold">{title}</div> */}
            <div>
              Page : <b>{`${index} / ${total}`}</b>
            </div>
          </div>
          <div>
            Patient : <b>{patient.nom}</b>
          </div>
          <div className="space-y-1 text-right">
            <div>
              Dossier : <b>{patient.dossier}</b>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
