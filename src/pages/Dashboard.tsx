import AddExpenseModal from "@/components/AddExpenseModal";
import AdjustBudgetModal from "@/components/AdjustBudgetModal";
import MonthlyBudgetCard from "@/components/MonthlyBudgetCard";
import PageNav from "@/components/PageNav";
import SummaryCard from "@/components/SummaryCard";
import { useBudget } from "@/contexts/BudgetContext";
import { useExpenses } from "@/contexts/ExpensesContext";
import { getCurrentMonthRange, getLastMonthRange } from "@/lib/dateUtils";
import {
  generateComparisonNote,
  getComparisonColor,
} from "@/lib/calculationUtils";
import { DollarSign } from "lucide-react";

function Dashboard() {
  const { getTotalSpent, getTotalSpentInRange, getExpensesInRange } =
    useExpenses();
  const { currency } = useBudget();

  // Date ranges
  const currentMonthRange = getCurrentMonthRange();
  const lastMonthRange = getLastMonthRange();

  // Get expenses
  const currentMonthExpenses = getExpensesInRange(
    currentMonthRange.start,
    currentMonthRange.end
  );
  const lastMonthExpenses = getExpensesInRange(
    lastMonthRange.start,
    lastMonthRange.end
  );

  // Calculate totals
  const currentMonthTotal = getTotalSpentInRange(currentMonthExpenses ?? []);
  const lastMonthTotal = getTotalSpentInRange(lastMonthExpenses ?? []);

  // Generate comparison note
  const note = generateComparisonNote(
    currentMonthTotal,
    lastMonthTotal,
    "last month"
  );

  return (
    <div className="min-h-screen">
      <PageNav />
      <div className="flex items-center justify-center gap-4 p-4 mt-12 mb-6 bg-zinc-900 rounded-lg">
        <AddExpenseModal />
        <AdjustBudgetModal />
      </div>
      <MonthlyBudgetCard />
      <section className="container flex-1 mx-auto px-4 py-15">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center max-w-5xl mx-auto">
          <SummaryCard
            title="Total Spent"
            value={getTotalSpent()}
            currency={currency}
            icon={DollarSign}
            note={note}
            color={getComparisonColor(currentMonthTotal, lastMonthTotal)}
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
