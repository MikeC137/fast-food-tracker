import { createContext, useContext, useState, type ReactNode } from "react";
import { CURRENCIES, type Currency } from "@/types/Currency";

interface BudgetContextType {
  budget: number;
  currency: Currency;
  updateBudget: (newBudget: number, newCurrency: Currency) => Promise<void>;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

function BudgetProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => {
    const stored = localStorage.getItem("currency");
    return stored ? JSON.parse(stored) : CURRENCIES[0];
  });
  const [budget, setBudget] = useState(() => {
    const stored = localStorage.getItem("budget");
    return stored ? JSON.parse(stored) : 0;
  });

  async function updateBudget(newBudget: number, newCurrency: Currency) {
    let finalBudget = newBudget;

    setBudget(finalBudget);
    setCurrency(newCurrency);

    localStorage.setItem("budget", JSON.stringify(finalBudget));
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
