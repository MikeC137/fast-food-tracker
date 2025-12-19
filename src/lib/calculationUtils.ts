// Calculate percentage change between two values
export function calculatePercentageChange(
  current: number,
  baseline: number
): number | null {
  if (baseline === 0) {
    return null;
  }
  return ((current - baseline) / baseline) * 100;
}

// Format percentage change as a string (e.g., "+12%", "-5%")
export function formatPercentageChange(percentage: number | null): string {
  if (percentage === null) {
    return "N/A";
  }
  const sign = percentage > 0 ? "+" : "";
  return `${sign}${percentage.toFixed(0)}%`;
}

// Generate a comparison note between two periods
export function generateComparisonNote(
  current: number,
  baseline: number,
  periodLabel: string = "last period"
): string {
  if (baseline === 0) {
    return current > 0 ? `No data from ${periodLabel}` : "No expenses yet";
  }

  const percentage = calculatePercentageChange(current, baseline);
  const formatted = formatPercentageChange(percentage);
  return `${formatted} from ${periodLabel}`;
}
