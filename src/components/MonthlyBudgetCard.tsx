import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "@/components/ui/progress";
import { useExpenses } from "@/contexts/ExpensesContext";
import { useBudget } from "@/contexts/BudgetContext";
import { formattedValue } from "@/lib/calculationUtils";

function MonthlyBudgetCard() {
  const { getTotalSpent } = useExpenses();
  const { budget, currency } = useBudget();
  const totalSpent = getTotalSpent();
  const percentageUsed = (totalSpent / budget) * 100;
  const budgetRemaining = budget - totalSpent;

  const getRemainingColor = () => {
    if (percentageUsed >= 100) {
      return "text-red-500";
    } else if (percentageUsed >= 70) {
      return "text-yellow-500";
    }
    return "text-green-300";
  };

  const now = new Date();
  const monthYear = now.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex justify-center">
      <Card className="bg-zinc-800 w-xs md:w-2xl lg:w-5xl border-2 border-zinc-700">
        <CardHeader className="pb-4">
          <div className="flex justify-between m:pl-6 m:pl-8">
            <div className="font-['Inter',sans-serif] text-base">
              <CardTitle className="text-zinc-300 pb-1 text-sm md:text-md lg:text-lg">
                Monthly Budget
              </CardTitle>
              <p className="text-zinc-500 text-xs md:text-sm lg:text-md">
                {monthYear}
              </p>
            </div>
            <div className="font-['Inter',sans-serif] px-1.5 text-xs h-8 flex items-center gap-1 rounded-lg bg-zinc-500">
              <TrendingUp className="w-4" />
              <span> {((totalSpent / budget) * 100).toFixed(2)}% Used</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="m:pl-6 m:pl-8">
              <p className="text-zinc-300 font-['Inter',sans-serif] text-md md:text-lg lg:text-xl text-base">
                {currency}
                {formattedValue(totalSpent)}
              </p>
              <p className="text-zinc-500 font-['Inter',sans-serif] text-sm md:text-md lg:text-lg text-base">
                {currency}
                {budget}
              </p>
            </div>
            <div>
              <p
                className={`${getRemainingColor()} font-['Inter',sans-serif] text-md md:text-lg lg:text-xl text-base`}
              >
                {currency}
                {budgetRemaining <= 0 ? 0 : budget}
              </p>
              <p className="text-zinc-500 font-['Inter',sans-serif] text-sm md:text-md lg:text-lg text-base">
                remaining
              </p>
            </div>
          </div>
          <div className="pt-4">
            <Progress
              value={percentageUsed >= 100 ? 100 : percentageUsed}
              color={percentageUsed >= 100 ? "red" : "blue"}
              className="bg-zinc-900"
            />
            <div className="flex justify-between text-xs md:text-sm lg:text-md pt-2 text-muted-foreground">
              <span>{currency}0</span>
              <span>
                {currency}
                {budget / 2}
              </span>
              <span>
                {currency}
                {budget}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MonthlyBudgetCard;
