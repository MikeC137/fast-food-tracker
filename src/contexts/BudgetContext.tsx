import { createContext, useContext, useState, type ReactNode } from "react";
import { type CurrencySymbol } from "@/types/Currency";

interface BudgetContextType {
  budget: number;
  currency: CurrencySymbol;
  updateBudget: (newBudget: number, newCurrency: CurrencySymbol) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

function BudgetProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencySymbol>(() => {
    const stored = localStorage.getItem("currency");
    return stored ? JSON.parse(stored) : "$";
  });
  const [budget, setBudget] = useState(() => {
    const stored = localStorage.getItem("budget");
    return stored ? JSON.parse(stored) : 0;
  });

  function updateBudget(newBudget: number, newCurrency: CurrencySymbol) {
    setBudget(newBudget);
    setCurrency(newCurrency);
    localStorage.setItem("budget", JSON.stringify(newBudget));
    localStorage.setItem("currency", JSON.stringify(newCurrency));
  }

  return (
    <BudgetContext.Provider value={{ budget, updateBudget, currency }}>
      {children}
    </BudgetContext.Provider>
  );
}

function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}

export { BudgetProvider, useBudget };
