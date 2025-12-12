import { createContext, useContext, useState, type ReactNode } from "react";

interface BudgetContextType {
  budget: number;
  updateBudget: (newBudget: number) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

function BudgetProvider({ children }: { children: ReactNode }) {
  const [budget, setBudget] = useState(() => {
    const stored = localStorage.getItem("budget");
    return stored ? JSON.parse(stored) : 0;
  });

  function updateBudget(newBudget: number) {
    setBudget(newBudget);
    localStorage.setItem("budget", JSON.stringify(newBudget));
  }

  return (
    <BudgetContext.Provider value={{ budget, updateBudget }}>
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
