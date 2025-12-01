import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useExpenses } from "@/contexts/ExpensesContext";
import type { Expense } from "@/types/Expense";
import { useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function AddExpenseModal() {
  const { addExpense } = useExpenses();
  const [restaurant, setRestaurant] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState<Expense["category"]>("Other");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      restaurant: restaurant,
      amount: parseFloat(amount),
      date: new Date(date),
      category: category,
    };

    addExpense(newExpense);
    setRestaurant("");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setCategory("Other");
  }

  return (
    <Dialog>
      <DialogTrigger className="text-zinc-300 font-['Inter',sans-serif] font-bold p-2 rounded-lg bg-blue-600 text-sm sm:text-base">
        + Add Expense
      </DialogTrigger>
      <DialogContent className="text-zinc-300 font -['Inter',sans-serif] rounded-lg bg-zinc-800 p-3">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Track your fast food spending by adding a new expense.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <label htmlFor="amount">Amount</label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              className="rounded-lg bg-zinc-700 px-1.5"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="restaurant">Restaurant</label>
            <Input
              id="restaurant"
              placeholder="McDonald's, Burger King, etc."
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              className="rounded-lg bg-zinc-700 px-1.5"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="category">Category</label>
            <Select
              value={category}
              onValueChange={(value) =>
                setCategory(value as Expense["category"])
              }
            >
              <SelectTrigger
                id="category"
                className="rounded-lg bg-zinc-700 text-zinc-300 border-zinc-600 hover:bg-zinc-600"
              >
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-700 text-zinc-300 border-zinc-600">
                <SelectItem
                  value="Burgers"
                  className="text-zinc-300 focus:bg-zinc-600 focus:text-zinc-100"
                >
                  Burgers
                </SelectItem>
                <SelectItem
                  value="Pizza"
                  className="text-zinc-300 focus:bg-zinc-600 focus:text-zinc-100"
                >
                  Pizza
                </SelectItem>
                <SelectItem
                  value="Chicken"
                  className="text-zinc-300 focus:bg-zinc-600 focus:text-zinc-100"
                >
                  Chicken
                </SelectItem>
                <SelectItem
                  value="Mexican"
                  className="text-zinc-300 focus:bg-zinc-600 focus:text-zinc-100"
                >
                  Mexican
                </SelectItem>
                <SelectItem
                  value="Sandwich"
                  className="text-zinc-300 focus:bg-zinc-600 focus:text-zinc-100"
                >
                  Sandwich
                </SelectItem>
                <SelectItem
                  value="Snack"
                  className="text-zinc-300 focus:bg-zinc-600 focus:text-zinc-100"
                >
                  Snack
                </SelectItem>
                <SelectItem
                  value="Other"
                  className="text-zinc-300 focus:bg-zinc-600 focus:text-zinc-100"
                >
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between">
          <DialogClose className="bg-zinc-700 rounded-lg px-1.5">
            Cancel
          </DialogClose>
          <button className="bg-blue-600 rounded-lg px-1.5 py-1">
            Add Expense
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddExpenseModal;
