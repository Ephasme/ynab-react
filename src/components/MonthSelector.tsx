import { Box, Button, Paper } from "@mui/material";
import { getMonth, getYear } from "date-fns";
import { useAtomValue, useSetAtom } from "jotai";
import {
  selectedMonthAtom,
  selectNextMonthAtom,
  selectPrevMonthAtom,
} from "../atoms";

export const MonthSelector = () => {
  const selectedMonth = useAtomValue(selectedMonthAtom);
  const selectNextMonth = useSetAtom(selectNextMonthAtom);
  const selectPrevMonth = useSetAtom(selectPrevMonthAtom);
  return (
    <Box className="flex gap-4 items-center">
      <Button size="small" variant="contained" onClick={selectPrevMonth}>
        -1
      </Button>
      <Paper className="p-1 pl-2 pr-2">
        {getMonth(selectedMonth) + 1} - {getYear(selectedMonth)}
      </Paper>
      <Button size="small" variant="contained" onClick={selectNextMonth}>
        +1
      </Button>
    </Box>
  );
};
