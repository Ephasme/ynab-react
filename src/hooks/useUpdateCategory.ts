import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useAtomValue } from "jotai";
import { updateCategoryById } from "../api/updateCategoryById";
import { selectedMonthAtom, tokenAtom } from "../atoms";
import { useBudgetDetails } from "./useBudgetDetails";

export const useUpdateCategory = () => {
  const budgetDetails = useBudgetDetails();
  const selectedMonth = useAtomValue(selectedMonthAtom);
  const token = useAtomValue(tokenAtom);
  const client = useQueryClient();

  return useMutation(
    ({
      categoryId,
      budgetedAmount,
    }: {
      categoryId: string;
      budgetedAmount: number;
    }) => {
      if (!token || !budgetDetails) {
        throw new Error("Could not update category");
      }
      return updateCategoryById(
        token,
        {
          month: format(selectedMonth, "yyyy-MM-dd"),
          budgetId: budgetDetails.id,
          categoryId,
        },
        budgetedAmount
      );
    },
    {
      onSuccess: () => {
        client.invalidateQueries();
      },
    }
  );
};
