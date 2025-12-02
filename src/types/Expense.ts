export interface Expense {
  id: string;
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
