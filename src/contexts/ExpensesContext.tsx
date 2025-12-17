import { createContext, useContext, useState, type ReactNode } from "react";
import { type Expense } from "@/types/Expense";

interface ExpensesContextType {
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  getExpensesInRange: (startDate: Date, endDate: Date) => Expense[] | undefined;
  getTotalSpent: () => number;
  getTotalSpentInRange: (expense: Expense[]) => number;
  // updateExpense
  // getExpensesByCategory
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined
);

function ExpensesProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  function addExpense(expense: Expense) {
    setExpenses((prev) => {
      const next = [...prev, expense];
      localStorage.setItem("expenses", JSON.stringify(next));
      return next;
    });
  }

  function removeExpense(id: string) {
    setExpenses(() => {
      const next = expenses.filter((expense) => expense.id != id);
      localStorage.setItem("expenses", JSON.stringify(next));
      return next;
    });
  }

  function getTotalSpent() {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  }

  function getExpensesInRange(startDate: Date, endDate: Date) {
    if (expenses.length <= 0) {
      return;
    }

    const startTime = startDate.getTime();
    const endTime = endDate.getTime();

    return expenses.filter((expense) => {
      const time = expense.date.getTime();
      return time >= startTime && time <= endTime;
    });
  }

  function getTotalSpentInRange(expenses: Expense[]) {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  }

  return (
    <ExpensesContext.Provider
      value={{
        addExpense,
        removeExpense,
        getTotalSpent,
        getExpensesInRange,
        getTotalSpentInRange,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

function useExpenses() {
  const context = useContext(ExpensesContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }
  return context;
}

export { ExpensesProvider, useExpenses };
