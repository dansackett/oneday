export const getTodayDateRange = (): { start: Date; end: Date } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow (end of today)

  return {
    start: today,
    end: tomorrow,
  };
};
