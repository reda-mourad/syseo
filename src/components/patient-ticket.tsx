import type { ComponentProps } from "react";
import { cn } from "../lib/utils";

export interface Patient {
  episode: string;
  dossier: string;
  nom: string;
  nom_mere: string;
  date_naissance: string;
  age: string;
  sexe: string;
  assurence: string;
  expiration: string;
  adresse: string;
  code_postal: string;
  ville: string;
  tel: string;
}

export default function PatientTicket(p: Patient) {
  return (
    <div className="flex flex-col flex-1 justify-evenly border rounded divide-y divide-dashed max-h-40 text-[.66rem]">
      <div className="flex justify-between">
        <Field label="No d'épisode" value={p.episode} className="flex-1" />
        <div className="border-r border-dashed" />
        <Field label="N° de dossier" value={p.dossier} className="flex-1" />
      </div>
      <div className="flex justify-between">
        <Field label="Nom et prénom" value={p.nom} className="flex-1" />
        <div className="border-r border-dashed" />
        <Field
          label="Nom et prénom de la mère"
          value={p.nom_mere}
          className="flex-1"
        />
      </div>
      <div className="flex justify-between">
        <Field
          label="Date de naissance"
          value={p.date_naissance}
          className="flex-1"
        />
        <div className="border-r border-dashed" />
        <Field label="Age" value={p.age} className="w-10" />
        <div className="border-r border-dashed" />
        <Field label="Sexe" value={p.sexe} className="w-10" />
        <div className="border-r border-dashed" />
        <Field label="N° assurance" value={p.assurence} className="flex-1" />
        <div className="border-r border-dashed" />
        <Field label="Expiration" value={p.expiration} className="w-16" />
      </div>
      <div className="flex justify-between">
        <Field label="Adresse" value={p.adresse} className="flex-1" />
        <div className="border-r border-dashed" />
        <Field label="Code postal" value={p.code_postal} />
      </div>
      <div className="flex justify-between">
        <Field label="Ville" value={p.ville} className="flex-1" />
        <div className="border-r border-dashed" />
        <Field label="Numéro de téléphone" value={p.tel} className="flex-1" />
      </div>
    </div>
  );
}

interface FieldProps extends ComponentProps<"div"> {
  label: string;
  value: string;
}

function Field({ label, value, className, children, ...props }: FieldProps) {
  return (
    <div
      className={cn("flex flex-col px-1 justify-around", className)}
      {...props}
    >
      <span className="text-[.5rem] text-gray-600">{label}</span>
      <span className="font-bold">{value}</span>
      {children}
    </div>
  );
}
