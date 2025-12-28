import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Period } from "@/hooks/useChartPeriod";

interface PeriodSelectorProps {
  period: Period;
  onPeriodChange: (value: Period) => void;
  hasAll12Months: boolean;
}

export function PeriodSelector({
  period,
  onPeriodChange,
  hasAll12Months,
}: PeriodSelectorProps) {
  return (
    <Select
      value={period}
      onValueChange={(value) => onPeriodChange(value as Period)}
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
          <SelectItem value="12" className="text-zinc-300 focus:bg-zinc-600">
            1 Year
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
