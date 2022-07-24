import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { eur, per } from "../tools/format";
import { useUserSums } from "../hooks/useUserSums";
import { UserRatio } from "../types";

export const VentilationView = () => {
  const sums = [
    useUserSums("👨", "⤵️ Loup", "Loup"),
    useUserSums("👩", "⤵️ Carole", "Carole"),
  ];

  const totalTransactions = sums.reduce(
    (acc, sum) => acc + sum.totalTransactions,
    0
  );
  const totalBudgeted = sums.reduce((acc, sum) => acc + sum.totalBudgeted, 0);
  const sumsWithRatios = sums.map((sum): UserRatio => {
    const ratio = sum.totalTransactions / totalTransactions;
    return { ...sum, ratio };
  });

  return (
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
        {sumsWithRatios.map((person) => (
          <TableRow>
            <TableCell>{person.name}</TableCell>
            <TableCell>{eur(totalTransactions)}</TableCell>
            <TableCell>({per(person.ratio)} %)</TableCell>
            <TableCell>{eur(totalBudgeted * person.ratio)} €</TableCell>
            <TableCell>{eur(person.totalBudgeted)} €</TableCell>
            <TableCell>
              {eur(totalBudgeted * person.ratio - person.totalBudgeted)} €
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
