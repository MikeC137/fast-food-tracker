import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useExpenses } from "@/contexts/ExpensesContext";
import { getLastNMonthsRange } from "@/lib/dateUtils";
import type { Expense } from "@/types/Expense";
type Period = "3" | "6" | "12";

function SpendingChart() {
  const [period, setPeriod] = useState<Period>("3");
  const { getExpensesInRange } = useExpenses();

  const dateRange = getLastNMonthsRange(parseInt(period));
  const expenses = getExpensesInRange(dateRange.start, dateRange.end) ?? [];

  const chartData = expenses.reduce((acc, expense: Expense) => {
    const date = new Date(expense.date);
    const monthKey = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    const existing = acc.find((item) => item.name === monthKey);
    if (existing) {
      existing.amount += expense.amount;
      existing.transactions += 1;
    } else {
      acc.push({
        name: monthKey,
        amount: expense.amount,
        transactions: 1,
      });
    }
    return acc;
  }, [] as { name: string; amount: number; transactions: number }[]);

  const filledChartData = [];
  const startDate = new Date(dateRange.start);
  const endDate = new Date(dateRange.end);
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const monthKey = currentDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    const existing = chartData.find((item) => item.name === monthKey);
    filledChartData.push({
      name: monthKey,
      amount: existing?.amount ?? 0,
      transactions: existing?.transactions ?? 0,
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

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

  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto md:mx-0">
      <div className="flex items-center mb-4">
        <h3 className="text-zinc-300 text-lg font-semibold mx-4">
          Spending Over Time
        </h3>
        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as Period)}
        >
          <SelectTrigger className="w-[140px] bg-zinc-700 text-zinc-100 border-zinc-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-700 text-zinc-100 border-zinc-600">
            <SelectItem value="3" className="text-zinc-300 focus:bg-zinc-600">
              3 Months
            </SelectItem>
            <SelectItem value="6" className="text-zinc-300 focus:bg-zinc-600">
              6 Months
            </SelectItem>
            {hasAll12Months && (
              <SelectItem
                value="12"
                className="text-zinc-300 focus:bg-zinc-600"
              >
                1 Year
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      <ResponsiveContainer width="80%" height={300}>
        <LineChart data={filledChartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
          <XAxis
            dataKey="name"
            stroke="#a1a1aa"
            interval={getXAxisInterval()}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis stroke="#a1a1aa" tickFormatter={(value) => `$${value}`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#27272a",
              border: "1px solid #3f3f46",
              borderRadius: "0.5rem",
              color: "#e4e4e7",
            }}
            formatter={(value) =>
              value != null ? `$${Number(value).toFixed(2)}` : "$0.00"
            }
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
