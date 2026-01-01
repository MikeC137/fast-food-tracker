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
import { validatePositiveNumber } from "@/lib/utils";

function AddExpenseModal() {
  const { addExpense } = useExpenses();
  const [restaurant, setRestaurant] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState<Expense["category"]>("Other");
  const [open, setOpen] = useState(false);

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const validatedValue = validatePositiveNumber(e.target.value, false);
    setAmount(validatedValue);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const amountValue = parseFloat(amount);

    if (!amount || isNaN(amountValue) || amountValue <= 0) {
      return;
    }

    if (!restaurant) {
      return;
    }

    const [year, month, day] = date.split("-").map(Number);
    const expenseDate = new Date(year, month - 1, day);

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      restaurant: restaurant,
      amount: parseFloat(amount),
      date: expenseDate,
      category: category,
    };

    addExpense(newExpense);
    setRestaurant("");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setCategory("Other");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-zinc-300 font-['Inter',sans-serif] font-bold px-3 py-2 sm:px-6 sm:py-3 rounded-lg bg-blue-600 sm:text-lg text-base hover:bg-blue-700 transition-colors">
        + Add Expense
      </DialogTrigger>
      <DialogContent className="text-zinc-300 font-['Inter',sans-serif] rounded-lg border-zinc-600 bg-zinc-800 p-6 w-xs md:w-sm">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold">
            Add New Expense
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-sm">
            Track your fast food spending by adding a new expense.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="restaurant"
              className="text-sm font-medium text-zinc-300"
            >
              Restaurant
            </label>
            <Input
              id="restaurant"
              placeholder="McDonald's, Burger King, etc."
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              className="rounded-lg max-w-sm bg-zinc-700 text-zinc-100 border-zinc-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm"
            />
          </div>
          <div className="flex flex-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="text-sm font-medium text-zinc-300"
              >
                Amount
              </label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
                step="0.01"
                className="rounded-lg bg-zinc-700 text-zinc-100 border-zinc-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-zinc-300"
              >
                Category
              </label>
              <Select
                value={category}
                onValueChange={(value) =>
                  setCategory(value as Expense["category"])
                }
              >
                <SelectTrigger
                  id="category"
                  className="rounded-lg bg-zinc-700 text-zinc-100 border-zinc-600 hover:bg-zinc-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-700 text-zinc-100 border-zinc-600">
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
          <DialogFooter className="flex sm:justify-start gap-3 pt-4">
            <DialogClose className="bg-zinc-700 text-zinc-300 rounded-lg px-4 py-2 hover:bg-zinc-600 transition-colors font-medium">
              Cancel
            </DialogClose>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors font-medium"
            >
              Add Expense
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddExpenseModal;
