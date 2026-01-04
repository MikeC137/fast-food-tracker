import type { Currency } from "./Currency";

export interface Expense {
  id: string;
  currency: Currency;
  amount: number;
  date: Date;
  restaurant: string;
  category:
    | "Burgers"
    | "Pizza"
    | "Chicken"
    | "Mexican"
    | "Sandwich"
    | "Snack"
    | "Other";
}
