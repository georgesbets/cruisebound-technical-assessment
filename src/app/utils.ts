export function getMonthAbbreviation(month: number): string | null {
  const monthAbbreviations: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  if (month < 1 || month > 12) {
    return null; // Return null if the month value is invalid
  }

  return monthAbbreviations[month];
}
