import { addMonths, subMonths } from "date-fns";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { BudgetDetail } from "ynab";
import { dateMatches } from "./tools/dateMatches";

export const tokenAtom = atomWithStorage<string | null>("token", null);
export const expirationAtom = atomWithStorage<number | null>(
  "expiration",
  null
);

export type DefaultCategories = {
  [key: string]: string;
};
export const defaultCategoriesAtom = atomWithStorage<DefaultCategories>(
  "defaultCategories",
  {}
);
export const idleCategoryAtom = atomWithStorage<string>("idleCategory", "");

export const budgetDetailsAtom = atom<BudgetDetail | null>(null);

export const selectedMonthAtom = atom<Date>(new Date());
export const selectNextMonthAtom = atom(null, (_get, set) => {
  set(selectedMonthAtom, (prev) => addMonths(prev, 1));
});
export const selectPrevMonthAtom = atom(null, (_get, set) => {
  set(selectedMonthAtom, (prev) => subMonths(prev, 1));
});

export const currentMonthDetailsAtom = atom((get) => {
  const budgetDetails = get(budgetDetailsAtom);
  const selectedMonth = get(selectedMonthAtom);
  return budgetDetails?.months?.find(({ month }) =>
    dateMatches(selectedMonth, month)
  );
});

export const currentTransactionsAtom = atom((get) => {
  const budgetDetails = get(budgetDetailsAtom);
  const selectedMonth = get(selectedMonthAtom);
  return budgetDetails?.transactions?.filter(({ date }) =>
    dateMatches(selectedMonth, date)
  );
});
