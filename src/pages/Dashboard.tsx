import AddExpenseModal from "@/components/AddExpenseModal";
import AdjustBudgetModal from "@/components/AdjustBudgetModal";
import MonthlyBudgetCard from "@/components/MonthlyBudgetCard";
import PageNav from "@/components/PageNav";

function Dashboard() {
  return (
    <div className="min-h-screen">
      <PageNav />
      <div className="flex items-center justify-center gap-4 p-4 mt-12 mb-6 bg-zinc-900 rounded-lg">
        <AddExpenseModal />
        <AdjustBudgetModal />
      </div>
      <MonthlyBudgetCard />
    </div>
  );
}

export default Dashboard;
