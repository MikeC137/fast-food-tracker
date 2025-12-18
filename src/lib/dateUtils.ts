// Get the start of a given month
export function getStartOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1);
}

// Get the end of a given month (last day at 23:59:59.999)
export function getEndOfMonth(year: number, month: number): Date {
  return new Date(year, month + 1, 0, 23, 59, 59, 999);
}

// Get the start and end dates for the current month
export function getCurrentMonthRange(): { start: Date; end: Date } {
  const now = new Date();
  return {
    start: getStartOfMonth(now.getFullYear(), now.getMonth()),
    end: now,
  };
}

// Get the start and end dates for last month
export function getLastMonthRange(): { start: Date; end: Date } {
  const now = new Date();
  const lastMonth = now.getMonth() - 1;
  const year = lastMonth < 0 ? now.getFullYear() - 1 : now.getFullYear();
  const month = lastMonth < 0 ? 11 : lastMonth;

  return {
    start: getStartOfMonth(year, month),
    end: getEndOfMonth(year, month),
  };
}

// Get date range for N months ago
export function getMonthRange(monthsAgo: number): { start: Date; end: Date } {
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);

  return {
    start: getStartOfMonth(targetDate.getFullYear(), targetDate.getMonth()),
    end: getEndOfMonth(targetDate.getFullYear(), targetDate.getMonth()),
  };
}

// Get date range for the last N months (inclusive of current month)
export function getLastNMonthsRange(months: number): {
  start: Date;
  end: Date;
} {
  const now = new Date();
  const startDate = new Date(
    now.getFullYear(),
    now.getMonth() - (months - 1),
    1
  );

  return {
    start: startDate,
    end: now,
  };
}
