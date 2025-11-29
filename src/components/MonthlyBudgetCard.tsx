import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "@/components/ui/progress";
import { useExpenses } from "@/contexts/ExpensesContext";

function MonthlyBudgetCard() {
  const { getTotalSpent } = useExpenses();
  const totalSpent = getTotalSpent();

  const now = new Date();
  const monthYear = now.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex justify-center">
      <Card className="bg-zinc-800 w-xs md:w-2xl lg:w-5xl">
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
              <span> 60% Used</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="m:pl-6 m:pl-8">
              <p className="text-zinc-300 font-['Inter',sans-serif] text-md md:text-lg lg:text-xl text-base">
                ${totalSpent}
              </p>
              <p className="text-zinc-500 font-['Inter',sans-serif] text-sm md:text-md lg:text-lg text-base">
                $500
              </p>
            </div>
            <div>
              <p className="text-green-300 font-['Inter',sans-serif] text-md md:text-lg lg:text-xl text-base">
                $ 199.38
              </p>
              <p className="text-zinc-500 font-['Inter',sans-serif] text-sm md:text-md lg:text-lg text-base">
                remaining
              </p>
            </div>
          </div>
          <div className="pt-4">
            <Progress value={60} color="blue" className="bg-zinc-900" />
            <div className="flex justify-between text-xs md:text-sm lg:text-md pt-2 text-muted-foreground">
              <span>$0</span>
              <span>$250</span>
              <span>$500</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MonthlyBudgetCard;
