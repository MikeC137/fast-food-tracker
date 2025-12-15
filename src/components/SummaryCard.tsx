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
  icon: LucideIcon;
  currency?: string;
}

function SummaryCard({
  title,
  value,
  note,
  icon: Icon,
  currency,
}: SummaryCardProps) {
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
        <CardDescription className="text-lg">{note}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;
