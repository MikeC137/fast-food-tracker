export interface Expense {
  id: string;
  amount: number;
  date: Date;
  Restaurant: string;
  category:
    | "Burgers"
    | "Pizza"
    | "Chicken"
    | "Mexican"
    | "Sandwich"
    | "Snack"
    | "Other";
}
