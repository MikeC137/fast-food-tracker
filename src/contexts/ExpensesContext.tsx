import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type Expense } from "@/types/Expense";
import { convertCurrency } from "@/lib/currencyConverterUtil";
import { BASE_CURRENCY } from "@/types/Currency";
import { useBudget } from "./BudgetContext";

type NormalizedExpense = Expense & {
  displayAmount: number;
};

interface ExpensesContextType {
  expenses: NormalizedExpense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined
);

function ExpensesProvider({ children }: { children: ReactNode }) {
  const { currency } = useBudget();

  const [rawExpenses, setRawExpenses] = useState<Expense[]>(() => {
    const stored = localStorage.getItem("expenses");
    if (!stored) return [];
    return JSON.parse(stored).map((e: Expense) => ({
      ...e,
      date: new Date(e.date),
    }));
  });

  const [expenses, setExpenses] = useState<NormalizedExpense[]>([]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(rawExpenses));
  }, [rawExpenses]);

  useEffect(() => {
    const normalize = async () => {
      const normalized = await Promise.all(
        rawExpenses.map(async (expense) => ({
          ...expense,
          displayAmount: await convertCurrency(
            expense.amount,
            BASE_CURRENCY,
            currency
          ),
        }))
      );

      setExpenses(normalized);
    };

    normalize();
  }, [rawExpenses, currency]);

  function addExpense(expense: Expense) {
    setRawExpenses((prev) => [...prev, expense]);
  }

  function removeExpense(id: string) {
    setRawExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  const value = useMemo(
    () => ({
      expenses,
      addExpense,
      removeExpense,
    }),
    [expenses]
  );

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses must be used within ExpensesProvider");
  }
  return context;
}

export { ExpensesProvider, useExpenses };
