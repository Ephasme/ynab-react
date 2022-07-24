import { Box } from "@mui/material";
import { MonthSelector } from "./MonthSelector";
import { VentilationView } from "./VentilationView";
import { useBudgetDetails } from "../hooks/useBudgetDetails";

export function Home() {
  const budgetDetails = useBudgetDetails();
  if (!budgetDetails) return null;

  return (
    <Box className="flex gap-4 m-4 flex-col">
      <Box className="flex">
        <Box className="text-2xl uppercase">{budgetDetails.name}</Box>
      </Box>
      <MonthSelector />
      <VentilationView />
    </Box>
  );
}
