import MonthlyBudgetCard from "@/components/MonthlyBudgetCard";
import PageNav from "@/components/PageNav";

function Dashboard() {
  return (
    <div className="min-h-screen">
      <PageNav />
      <div className="flex items-center justify-center gap-4 p-4 mt-12 mb-6 bg-zinc-900 rounded-lg">
        <button className="text-zinc-300 font-['Inter',sans-serif] font-bold p-2 rounded-lg bg-blue-600 text-sm sm:text-base">
          + Add Expense
        </button>
        <button className="text-zinc-300 font-['Inter',sans-serif] font-bold p-2 rounded-lg bg-blue-600 text-sm sm:text-base">
          Adjust Budget
        </button>
      </div>
      <MonthlyBudgetCard />
    </div>
  );
}

export default Dashboard;
