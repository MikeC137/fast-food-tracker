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

  const rounded = Math.round(percentage);
  if (rounded === 0 && percentage !== 0) {
    return `${sign}${percentage.toFixed(1)}%`;
  }

  return `${sign}${percentage.toFixed(0)}%`;
}

export function formattedValue(value: number) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2);
}

export function getComparisonColor(
  currentMonth: number,
  lastMonth: number
): string {
  if (!lastMonth || lastMonth === 0) {
    return "zinc-500";
  }

  const threshold = 0.01;
  const difference = Math.abs(currentMonth - lastMonth);

  if (difference <= threshold) {
    return "yellow-500";
  } else if (currentMonth < lastMonth) {
    return "green-500";
  } else {
    return "red-500";
  }
}

// Generate a comparison note between two periods
export function generateComparisonNote(
  current: number,
  baseline: number,
  periodLabel: string = "last period"
): string {
  if (baseline === 0) {
    return current > 0 ? `This Month` : "No expenses yet";
  }

  const threshold = 0.01;
  const difference = Math.abs(current - baseline);

  if (difference <= threshold) {
    return `Same as ${periodLabel}`;
  }

  const percentage = calculatePercentageChange(current, baseline);
  const formatted = formatPercentageChange(percentage);
  return `${formatted} from ${periodLabel}`;
}
