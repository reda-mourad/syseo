import type { ComponentProps } from "react";
import { cn } from "../lib/utils";

export interface PageProps extends ComponentProps<"div"> {
  index: number;
  total: number;
  title: string;
  dossier: string;
}

export function Page({
  dossier,
  index,
  title,
  total,
  className,
  children,
  ...props
}: PageProps) {
  return (
    <div
      className={cn(
        "bg-white p-10 w-[8.5in] h-[11in] printable flex flex-col gap-6 relative",
        className
      )}
      {...props}
    >
      {children}
      <div className="bottom-0 absolute inset-x-0 flex justify-between items-center px-10 h-16 text-xs">
        <span>Page {`${index} / ${total}`}</span>
        <span>{title}</span>
        <span>Dossier: {dossier}</span>
      </div>
    </div>
  );
}
