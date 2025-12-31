import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useChartPeriod } from "@/hooks/useChartPeriod";
import { PeriodSelector } from "./PeriodSelector";
import type { Expense } from "@/types/Expense";

function SpendingChart() {
  const {
    period,
    setPeriod,
    dateRange,
    expenses,
    hasAll12Months,
    getXAxisInterval,
  } = useChartPeriod();

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

  return (
    <div className="w-full border border-radius-1 py-4 rounded-xl border-zinc-700 px-4 max-w-md md:max-w-lg lg:max-w-2xl mx-auto md:mx-0">
      <div className="flex items-center pt-3 mb-4">
        <h3 className="text-zinc-300 text-lg font-semibold mx-4">
          Spending Over Time
        </h3>
        <PeriodSelector
          period={period}
          onPeriodChange={setPeriod}
          hasAll12Months={hasAll12Months}
        />
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={filledChartData}
          margin={{ top: 5, right: 25, bottom: 20, left: 5 }}
        >
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
