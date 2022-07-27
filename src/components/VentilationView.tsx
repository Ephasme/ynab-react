import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { eur, per } from "../tools/format";
import { useUserSums } from "../hooks/useUserSums";
import { UserRatio } from "../types";
import _ from "lodash";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import { useAtomValue } from "jotai";
import { defaultCategoriesAtom } from "../atoms";
import { useBudgetDetails } from "../hooks/useBudgetDetails";

export const VentilationView = () => {
  const INPUT_SYMBOL = "⤵️";

  const budgetDetails = useBudgetDetails();
  const updateCategory = useUpdateCategory();
  const defaultCategories = useAtomValue(defaultCategoriesAtom);
  const userInfo = [
    useUserSums("👨", `${INPUT_SYMBOL} Loup`, "Loup"),
    useUserSums("👩", `${INPUT_SYMBOL} Carole`, "Carole"),
  ];

  const totalTransactions = _.sumBy(userInfo, (x) => x.totalTransactions);
  const totalBudgeted = _.sumBy(userInfo, (x) => x.totalBudgeted);

  const userInfoWithRatio = userInfo.map((sum): UserRatio => {
    const ratio = sum.totalTransactions / totalTransactions;
    return { ...sum, ratio };
  });

  const expectedBudget = (user: UserRatio) =>
    _.round(totalBudgeted * user.ratio);
  const diff = (user: UserRatio) =>
    _.round(totalBudgeted * user.ratio - user.totalBudgeted, 0);

  const hasDiff = () => {
    const user = _.first(userInfoWithRatio);
    if (user) {
      return _.round(diff(user) / 1000) !== 0;
    }
    return false;
  };

  const fix = () => {
    for (const user of userInfoWithRatio) {
      const categoryId = defaultCategories[_.lowerCase(user.name)];
      const category = budgetDetails?.categories?.find(
        (x) => x.id === categoryId
      );
      if (!category) {
        throw new Error(`Category ${categoryId} not found`);
      }
      updateCategory.mutate({
        categoryId,
        budgetedAmount: category.budgeted + diff(user),
      });
    }
  };

  return (
    <Box className="flex flex-col gap-4">
      <Table size="small" className="flex flex-col">
        <TableHead>
          <TableRow>
            <TableCell>Person</TableCell>
            <TableCell>Input</TableCell>
            <TableCell>Ratio</TableCell>
            <TableCell>Expected budget</TableCell>
            <TableCell>Real budget</TableCell>
            <TableCell>Diff</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userInfoWithRatio.map((user) => (
            <TableRow key={user.name}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{eur(user.totalTransactions)}</TableCell>
              <TableCell>{per(user.ratio)}</TableCell>
              <TableCell>{eur(expectedBudget(user))}</TableCell>
              <TableCell>{eur(user.totalBudgeted)}</TableCell>
              <TableCell>{hasDiff() ? eur(diff(user)) : "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box className="flex justify-end">
        <Button disabled={!hasDiff()} variant="contained" onClick={fix}>
          Ventilate
        </Button>
      </Box>
    </Box>
  );
};
