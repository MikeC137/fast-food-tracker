import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: number;
  note: string;
  color: string;
  icon: LucideIcon;
  currency?: string;
}

function SummaryCard({
  title,
  value,
  note,
  color,
  icon: Icon,
  currency,
}: SummaryCardProps) {
  const colorMap: Record<string, string> = {
    "green-500": "text-green-500",
    "yellow-500": "text-yellow-500",
    "red-500": "text-red-500",
  };

  return (
    <Card className="bg-zinc-800 mt-5 w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg border-1 border-solid border-zinc-700">
      <CardHeader>
        <div className="flex justify-between gap-3 mb-2">
          <CardTitle className="text-zinc-300 text-xl font-['Inter',sans-serif] font-bold">
            {title}
          </CardTitle>
          <Icon className="text-blue-500 w-6 h-6" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-zinc-300 text-3xl">
          {currency}
          {value}
        </div>
        <CardDescription className={`text-lg ${colorMap[color] || ""}`}>
          {note}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;
