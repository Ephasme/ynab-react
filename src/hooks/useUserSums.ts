import { useAtomValue } from "jotai";
import { currentMonthDetailsAtom, currentTransactionsAtom } from "../atoms";
import { UserSum } from "../types";

export const useUserSums = (
  tag: string,
  input: string,
  person: string
): UserSum => {
  const monthDetails = useAtomValue(currentMonthDetailsAtom);
  const transactions = useAtomValue(currentTransactionsAtom);
  const categories = monthDetails?.categories?.filter(({ name }) =>
    name.includes(tag)
  );
  const totalBudgeted =
    categories?.reduce((acc, cat) => acc + cat.budgeted, 0) ?? 0;
  const selfTransactions = (transactions ?? []).filter((t) =>
    t.memo?.includes(input)
  );
  const totalTransactions = selfTransactions.reduce(
    (acc, tr) => acc + tr.amount,
    0
  );
  return {
    totalBudgeted,
    totalTransactions,
    name: person,
  };
};
