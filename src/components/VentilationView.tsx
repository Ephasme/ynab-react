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
  const INPUT_SYMBOL = "⤵️";

  const userInfo = [
    useUserSums("👨", `${INPUT_SYMBOL} Loup`, "Loup"),
    useUserSums("👩", `${INPUT_SYMBOL} Carole`, "Carole"),
  ];

  const totalTransactions = userInfo.reduce(
    (acc, sum) => acc + sum.totalTransactions,
    0
  );
  const totalBudgeted = userInfo.reduce(
    (acc, sum) => acc + sum.totalBudgeted,
    0
  );
  const userInfoWithRatio = userInfo.map((sum): UserRatio => {
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
        {userInfoWithRatio.map((user) => (
          <TableRow key={user.name}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{eur(user.totalTransactions)}</TableCell>
            <TableCell>{per(user.ratio)}</TableCell>
            <TableCell>{eur(totalBudgeted * user.ratio)}</TableCell>
            <TableCell>{eur(user.totalBudgeted)}</TableCell>
            <TableCell>
              {eur(totalBudgeted * user.ratio - user.totalBudgeted)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
