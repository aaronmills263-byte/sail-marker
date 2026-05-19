import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency: string = "EUR") {
  const symbols: Record<string, string> = {
    USD: "$",
    GBP: "\u00a3",
    EUR: "\u20ac",
    AUD: "A$",
    NZD: "NZ$",
    THB: "\u0e3f",
  };
  return `${symbols[currency] || currency + " "}${amount.toLocaleString()}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
