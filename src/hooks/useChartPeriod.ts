import { useState } from "react";
import { useExpenses } from "@/contexts/ExpensesContext";
import { getLastNMonthsRange } from "@/lib/dateUtils";

export type Period = "3" | "6" | "12";

export function useChartPeriod() {
  const [period, setPeriod] = useState<Period>("3");
  const { getExpensesInRange } = useExpenses();

  const dateRange = getLastNMonthsRange(parseInt(period));
  const expenses = getExpensesInRange(dateRange.start, dateRange.end) ?? [];

  const twelveMonthRange = getLastNMonthsRange(12);
  const allTwelveMonthsExpenses =
    getExpensesInRange(twelveMonthRange.start, twelveMonthRange.end) ?? [];

  const monthsWithData = new Set<string>();
  allTwelveMonthsExpenses.forEach((expense) => {
    const date = new Date(expense.date);
    const monthKey = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    monthsWithData.add(monthKey);
  });

  const last12Months = new Set<string>();
  const checkDate = new Date(twelveMonthRange.start);
  while (checkDate <= twelveMonthRange.end) {
    const monthKey = checkDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    last12Months.add(monthKey);
    checkDate.setMonth(checkDate.getMonth() + 1);
  }

  const hasAll12Months =
    last12Months.size === monthsWithData.size &&
    Array.from(last12Months).every((month) => monthsWithData.has(month));

  const getXAxisInterval = () => {
    if (period === "3") return 0;
    if (period === "6") return 1;
    if (period === "12") return 2;
    return 0;
  };

  return {
    period,
    setPeriod,
    dateRange,
    expenses,
    hasAll12Months,
    getXAxisInterval,
  };
}
