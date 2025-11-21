import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <Card className="bg-zinc-800 mt-5 w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg border-1 border-solid border-zinc-700">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Icon className="text-blue-500 w-6 h-6" />
          <CardTitle className="text-zinc-300 font-['Inter',sans-serif] font-bold">
            {title}
          </CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default FeatureCard;
