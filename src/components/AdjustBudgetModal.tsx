import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useBudget } from "@/contexts/BudgetContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CURRENCIES, type CurrencySymbol } from "@/types/Currency";

function AdjustBudgetModal() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const { updateBudget, budget, currency } = useBudget();
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencySymbol>(currency);

  useEffect(() => {
    if (open && budget != null) {
      setAmount(budget.toString());
      setSelectedCurrency(currency);
    } else if (!open) {
      setAmount("");
    }
  }, [open, budget]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const budgetValue = parseFloat(amount);

    if (!amount || isNaN(budgetValue) || budgetValue < 0) {
      return;
    }
    updateBudget(budgetValue, selectedCurrency);
    setAmount("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-zinc-300 font-['Inter',sans-serif] font-bold p-2 rounded-lg bg-blue-600 text-sm sm:text-base hover:bg-blue-700 transition-colors">
        Update Budget
      </DialogTrigger>
      <DialogContent className="text-zinc-300 font-['Inter',sans-serif] rounded-lg border-zinc-600 bg-zinc-800 p-6 w-sm max-w-sm">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold">
            Update Budget
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="budget"
              className="text-sm font-medium text-zinc-300"
            >
              Budget
            </label>
            <Input
              id="budget"
              type="number"
              placeholder={budget != null ? budget.toString() : "0.00"}
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || parseFloat(value) >= 0)
                  setAmount(e.target.value);
              }}
              step="0.01"
              min="0"
              className="rounded-lg max-w-sm bg-zinc-700 text-zinc-100 border-zinc-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm"
            />
            <label
              htmlFor="currency"
              className="text-sm font-medium text-zinc-300"
            >
              Currency
            </label>
            <Select
              value={selectedCurrency}
              onValueChange={(value) =>
                setSelectedCurrency(value as CurrencySymbol)
              }
            >
              <SelectTrigger
                id="currency"
                className="rounded-lg bg-zinc-700 text-zinc-100 border-zinc-600 hover:bg-zinc-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-700 text-zinc-100 border-zinc-600">
                {CURRENCIES.map((curr) => (
                  <SelectItem
                    key={curr.symbol}
                    value={curr.symbol}
                    className="text-zinc-300 focus:bg-zinc-600 focus:text-zinc-100"
                  >
                    {curr.symbol} {curr.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-cols-2 gap-4"></div>
          <DialogFooter className="flex sm:justify-start gap-3 pt-2">
            <DialogClose className="bg-zinc-700 text-zinc-300 rounded-lg px-4 py-2 hover:bg-zinc-600 transition-colors font-medium">
              Cancel
            </DialogClose>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors font-medium"
            >
              Update Budget
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AdjustBudgetModal;
