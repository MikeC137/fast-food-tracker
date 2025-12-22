import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validatePositiveNumber(
  value: string,
  allowZero: boolean = false
): string {
  if (value === "") {
    return "";
  }

  const numValue = parseFloat(value);

  if (isNaN(numValue)) {
    return "";
  }

  if (allowZero) {
    return numValue >= 0 ? value : "";
  } else {
    return numValue > 0 ? value : "";
  }
}
