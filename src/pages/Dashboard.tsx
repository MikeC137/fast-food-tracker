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
import { DollarSign, Calendar, TrendingUp } from "lucide-react";

function Dashboard() {
  const {
    getTotalSpent,
    getTotalSpentInRange,
    getExpensesInRange,
    getTotalTransactions,
    getAveragePerVisit,
  } = useExpenses();
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
  const currentMonthTotalSpent = getTotalSpentInRange(
    currentMonthExpenses ?? []
  );
  const currentMonthTransactions = getTotalTransactions(
    currentMonthExpenses ?? []
  );
  const currentMonthAverage = getAveragePerVisit(currentMonthExpenses ?? []);
  const lastMonthTotalSpent = getTotalSpentInRange(lastMonthExpenses ?? []);
  const lastMonthTransactions = getTotalTransactions(lastMonthExpenses ?? []);
  const lastMonthAverage = getAveragePerVisit(lastMonthExpenses ?? []);

  // Generate comparison note
  const totalSpentNote = generateComparisonNote(
    currentMonthTotalSpent,
    lastMonthTotalSpent,
    "last month"
  );
  const totalTransactionsNote = generateComparisonNote(
    currentMonthTransactions,
    lastMonthTransactions,
    "last month"
  );
  const averageNote = generateComparisonNote(
    currentMonthAverage,
    lastMonthAverage,
    "last month"
  );

  return (
    <div className="min-h-screen">
      <PageNav />
      <div className="flex items-center justify-center gap-4 p-4 mt-12 mb-6 bg-zinc-900 rounded-lg">
        <AddExpenseModal />
        <AdjustBudgetModal />
      </div>
      <section className="container mx-auto px-4 max-w-2xl lg:max-w-4xl">
        <MonthlyBudgetCard />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-items-center mt-5">
          <SummaryCard
            title="Total Spent"
            value={getTotalSpent()}
            currency={currency}
            icon={DollarSign}
            note={totalSpentNote}
            color={getComparisonColor(
              currentMonthTotalSpent,
              lastMonthTotalSpent
            )}
          />
          <SummaryCard
            title="Transactions"
            value={currentMonthTransactions}
            icon={Calendar}
            note={totalTransactionsNote}
            color={getComparisonColor(
              currentMonthTransactions,
              lastMonthTransactions
            )}
          />
          <SummaryCard
            title="Avg. Per Visit"
            value={currentMonthAverage}
            currency={currency}
            icon={TrendingUp}
            note={averageNote}
            color={getComparisonColor(currentMonthAverage, lastMonthAverage)}
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
