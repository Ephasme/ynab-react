import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useAtom } from "jotai";
import { getBudgetById } from "../api/getBudgetById";
import { budgetDetailsAtom, tokenAtom } from "../atoms";

export const useBudgetDetails = () => {
  const token = useAtomValue(tokenAtom);
  const [budget, setBudget] = useAtom(budgetDetailsAtom);
  useQuery(
    ["budget"],
    () => getBudgetById(token!, import.meta.env.VITE_BUDGET_ID),
    { enabled: !!token, onSuccess: (data) => setBudget(data) }
  );
  return budget;
};
