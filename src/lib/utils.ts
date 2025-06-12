import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface User {
  id: string;
}

interface Auth {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const auth: Auth = {
  setUser: (user) => (auth.user = user),
  user: null,
};
