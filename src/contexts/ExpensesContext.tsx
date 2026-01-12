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
import { type DateRange } from "@/types/Date";

type NormalizedExpense = Expense & {
  displayAmount: number;
};

interface ExpensesContextType {
  expenses: NormalizedExpense[];
  isNormalizing: boolean;

  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  getExpensesInRange: (range: DateRange) => NormalizedExpense[];
  getTotalInRange: (range: DateRange) => number;
  getAverageInRange: (range: DateRange) => number;
  getCountInRange: (range: DateRange) => number;
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
  const [isNormalizing, setIsNormalizing] = useState(false);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(rawExpenses));
  }, [rawExpenses]);

  useEffect(() => {
    let cancelled = false;

    const normalize = async () => {
      setIsNormalizing(true);
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

      if (!cancelled) {
        setExpenses(normalized);
        setIsNormalizing(false);
      }
    };

    normalize();

    return () => {
      cancelled = true;
    };
  }, [rawExpenses, currency]);

  function addExpense(expense: Expense) {
    setRawExpenses((prev) => [...prev, expense]);
  }

  function removeExpense(id: string) {
    setRawExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  const getExpensesInRange = (range: DateRange) => {
    const start = range.start.getTime();
    const end = range.end.getTime();

    return expenses.filter((e) => {
      const time = e.date.getTime();
      return time >= start && time <= end;
    });
  };

  const getTotalInRange = (range: DateRange) =>
    getExpensesInRange(range).reduce((sum, e) => sum + e.displayAmount, 0);

  const getCountInRange = (range: DateRange) =>
    getExpensesInRange(range).length;

  const getAverageInRange = (range: DateRange) => {
    const count = getCountInRange(range);
    if (count === 0) return 0;
    return getTotalInRange(range) / count;
  };

  const value = useMemo(
    () => ({
      expenses,
      isNormalizing,
      addExpense,
      removeExpense,
      getExpensesInRange,
      getTotalInRange,
      getAverageInRange,
      getCountInRange,
    }),
    [expenses, isNormalizing]
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
