import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ExpensesProvider } from "./contexts/ExpensesContext.tsx";
import { BudgetProvider } from "./contexts/BudgetContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ExpensesProvider>
        <BudgetProvider>
          <App />
        </BudgetProvider>
      </ExpensesProvider>
    </BrowserRouter>
  </StrictMode>
);
