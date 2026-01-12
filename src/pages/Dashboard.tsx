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
import SpendingChart from "@/components/LineChart";
import CategoriesChart from "@/components/BarChart";

function Dashboard() {
  const { getTotalInRange, getAverageInRange, getCountInRange } = useExpenses();
  const { currency } = useBudget();

  // Date ranges
  const currentMonthRange = getCurrentMonthRange();
  const lastMonthRange = getLastMonthRange();

  const currentMonthTotal = getTotalInRange(currentMonthRange);
  const currentMonthTransactionCount = getCountInRange(currentMonthRange);
  const currentMonthAverage = getAverageInRange(currentMonthRange);
  const lastMonthTotal = getTotalInRange(lastMonthRange);
  const lastMonthTransactionCount = getCountInRange(lastMonthRange);
  const lastMonthAverage = getAverageInRange(lastMonthRange);

  return (
    <div className="min-h-screen">
      <PageNav />
      <div className="flex items-center justify-center gap-4 p-4 mt-12 mb-6 bg-zinc-900 rounded-lg">
        <AddExpenseModal />
        <AdjustBudgetModal />
      </div>
      <section className="container mx-auto px-4 max-w-4xl lg:max-w-6xl">
        <MonthlyBudgetCard />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-items-center mt-5">
          <SummaryCard
            title="Total Spent"
            value={currentMonthTotal}
            currency={currency.symbol}
            icon={DollarSign}
            note={generateComparisonNote(
              currentMonthTotal,
              lastMonthTotal,
              "last month"
            )}
            color={getComparisonColor(currentMonthTotal, lastMonthTotal)}
          />
          <SummaryCard
            title="Transactions"
            value={currentMonthTransactionCount}
            icon={Calendar}
            note={generateComparisonNote(
              currentMonthTransactionCount,
              lastMonthTransactionCount,
              "last month"
            )}
            color={getComparisonColor(
              currentMonthTransactionCount,
              lastMonthTransactionCount
            )}
          />
          <SummaryCard
            title="Avg. Per Visit"
            value={currentMonthAverage}
            currency={currency.symbol}
            icon={TrendingUp}
            note={generateComparisonNote(
              currentMonthAverage,
              lastMonthAverage,
              "last month"
            )}
            color={getComparisonColor(currentMonthAverage, lastMonthAverage)}
          />
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 justify-items-center mx-auto gap-6 px-4 max-w-4xl lg:max-w-6xl py-6">
        <SpendingChart />
        <CategoriesChart />
      </section>
    </div>
  );
}

export default Dashboard;
