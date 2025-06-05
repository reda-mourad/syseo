export const nonOui = ["Non", "Oui"];

export const examType = [
  "Colonoscopie courte",
  "Colonoscopie totale",
  "Gastroscopie",
];

export const examTypeOther = [
  "",
  "Ligature hémorroïde(s)",
  "Installation PEG",
  "Anuscopie",
];

export const medications = [
  "",
  "Anexat (Flumazenil)",
  "Benadryl",
  "Buscopan",
  "Diazepuls",
  "Diazépam (Valium)",
  "Dimenhydrinate (Gravol)",
  "Epinephrine",
  "Fentanyl",
  "Flumazenil (Romazicon)",
  "Glucagon",
  "Glycopyrrolate (Robinul)",
  "Ketamine",
  "Lorazepam (Ativan)",
  "Meperidine (Demerol)",
  "Midazolam (Versed)",
  "Morphine",
  "NaCl (Soluté)",
  "Naloxone (Narcan)",
  "Propofol (Diprivan)",
  "Zofran",
];

export const units = ["", "cc", "gramme", "mcg", "mg", "ml"];

export function currentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return [
    year,
    month.toLocaleString(undefined, { minimumIntegerDigits: 2 }),
    day.toLocaleString(undefined, { minimumIntegerDigits: 2 }),
  ].join("-");
}

export function currentTime() {
  return new Date().toLocaleTimeString(undefined, {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}
