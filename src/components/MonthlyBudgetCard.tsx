import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "@/components/ui/progress";
import { useExpenses } from "@/contexts/ExpensesContext";
import { useBudget } from "@/contexts/BudgetContext";
import { formattedValue } from "@/lib/calculationUtils";
import { getCurrentMonthRange } from "@/lib/dateUtils";
import { convertCurrency } from "@/lib/currencyConverterUtil";
import { BASE_CURRENCY } from "@/types/Currency";
import { useEffect, useState } from "react";
import { useRef } from "react";

function MonthlyBudgetCard() {
  const { getTotalSpentInRange, getExpensesInRange } = useExpenses();
  const { budget, currency } = useBudget();
  const [displayTotal, setDisplayTotal] = useState(0);

  const currentMonthRange = getCurrentMonthRange();
  const currentMonthExpenses =
    getExpensesInRange(currentMonthRange.start, currentMonthRange.end) ?? [];
  const totalSpentUSD = getTotalSpentInRange(currentMonthExpenses);
  const percentageUsed = budget === 0 ? 0 : (totalSpentUSD / budget) * 100;
  const budgetRemaining = budget - totalSpentUSD;

  const prevCurrencyRef = useRef(currency);
  const prevBudgetRef = useRef(budget);

  useEffect(() => {
    let cancelled = false;

    const currencyChanged = prevCurrencyRef.current.iso !== currency.iso;

    async function convert() {
      if (currencyChanged) {
        const spent = await convertCurrency(
          totalSpentUSD,
          BASE_CURRENCY,
          currency
        );

        if (!cancelled) {
          setDisplayTotal(spent);
        }
      } else {
        setDisplayTotal(totalSpentUSD);
      }

      prevCurrencyRef.current = currency;
      prevBudgetRef.current = budget;
    }

    convert();

    return () => {
      cancelled = true;
    };
  }, [currency, budget, totalSpentUSD]);

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
      <Card className="bg-zinc-800 w-full max-w-sm md:max-w-4xl lg:max-w-6xl border-1 border-zinc-700">
        <CardHeader className="pb-4">
          <div className="flex justify-between m:pl-6 m:pl-8">
            <div className="font-['Inter',sans-serif] text-base">
              <CardTitle className="text-zinc-300 pb-1 text-md md:text-lg lg:text-xl">
                Monthly Budget
              </CardTitle>
              <p className="text-zinc-500 text-xs md:text-sm lg:text-md">
                {monthYear}
              </p>
            </div>
            <div className="font-['Inter',sans-serif] px-1.5 text-xs h-8 flex items-center gap-1 rounded-lg bg-zinc-500">
              <TrendingUp className="w-4" />
              <span> {percentageUsed.toFixed(2)}% Used</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="m:pl-6 m:pl-8">
              <p className="text-zinc-300 font-['Inter',sans-serif] text-md md:text-lg lg:text-xl text-base">
                {currency.symbol}
                {formattedValue(displayTotal)}
              </p>
              <p className="text-zinc-500 font-['Inter',sans-serif] text-sm md:text-md lg:text-lg text-base">
                {currency.symbol}
                {budget.toFixed(2)}
              </p>
            </div>
            <div>
              <p
                className={`${getRemainingColor()} font-['Inter',sans-serif] text-md md:text-lg lg:text-xl text-base`}
              >
                {currency.symbol}
                {budgetRemaining <= 0 ? 0 : formattedValue(budgetRemaining)}
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
              <span>{currency.symbol}0</span>
              <span>
                {currency.symbol}
                {(budget / 2).toFixed(2)}
              </span>
              <span>
                {currency.symbol}
                {budget.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MonthlyBudgetCard;
