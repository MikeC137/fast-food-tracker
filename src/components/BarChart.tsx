import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useChartPeriod } from "@/hooks/useChartPeriod";
import { PeriodSelector } from "./PeriodSelector";

function CategoriesChart() {
  const {
    period,
    setPeriod,
    dateRange,
    expenses,
    hasAll12Months,
    getXAxisInterval,
  } = useChartPeriod();

  const categories = Array.from(new Set(expenses.map((e) => e.category)));

  const months = [];
  const startDate = new Date(dateRange.start);
  const endDate = new Date(dateRange.end);
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    months.push(
      currentDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    );
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  const chartData = months.map((month) => {
    const monthData: { name: string; [key: string]: string | number } = {
      name: month,
    };

    categories.forEach((category) => {
      monthData[category] = 0;
    });

    expenses.forEach((expense) => {
      const expenseMonth = new Date(expense.date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      if (expenseMonth === month) {
        monthData[expense.category] =
          (monthData[expense.category] as number) + expense.amount;
      }
    });

    return monthData;
  });

  const categoryColors: Record<string, string> = {
    Burgers: "#3b82f6",
    Pizza: "#ef4444",
    Chicken: "#10b981",
    Mexican: "#f59e0b",
    Sandwich: "#8b5cf6",
    Snack: "#ec4899",
    Other: "#06b6d4",
  };
  return (
    <div className="w-full border border-radius-1 py-4 rounded-xl border-zinc-700 px-4 max-w-md md:max-w-lg lg:max-w-2xl mx-auto md:mx-0">
      <div className="flex items-center pt-3 mb-4">
        <h3 className="text-zinc-300 text-lg font-semibold mx-4">
          Spending By Categories
        </h3>
        <PeriodSelector
          period={period}
          onPeriodChange={setPeriod}
          hasAll12Months={hasAll12Months}
        />
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          margin={{ top: 5, right: 25, bottom: 20, left: 5 }}
          data={chartData}
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
          {categories.map((category) => (
            <Bar
              key={category}
              dataKey={category}
              stackId="a"
              fill={categoryColors[category]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoriesChart;
