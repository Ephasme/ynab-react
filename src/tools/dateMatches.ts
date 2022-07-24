import { getMonth, getYear } from "date-fns";
import { parseDate } from "./parseDate";

export function dateMatches(selectedMonth: Date, expDate: string) {
  const date = parseDate(expDate);
  const month = getMonth(date);
  const year = getYear(date);
  if (month === getMonth(selectedMonth) && year === getYear(selectedMonth)) {
    return true;
  }
}
