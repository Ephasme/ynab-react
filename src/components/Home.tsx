import { Box } from "@mui/material";
import { MonthSelector } from "./MonthSelector";
import { VentilationView } from "./VentilationView";
import { useBudgetDetails } from "../hooks/useBudgetDetails";
import { CategorySelector } from "./CategorySelector";
import { useAtom } from "jotai";
import { idleCategoryAtom } from "../atoms";
import { DefaultCategory } from "./DefaultCategory";

export function Home() {
  const [idleCategory, setIdleCategory] = useAtom(idleCategoryAtom);
  const budgetDetails = useBudgetDetails();
  if (!budgetDetails) return null;

  return (
    <Box className="flex gap-4 m-4 flex-col">
      <Box className="flex">
        <Box className="text-2xl uppercase">{budgetDetails.name}</Box>
      </Box>
      <Box className="flex gap-4">
        <MonthSelector />
      </Box>

      <DefaultCategory name="carole" />
      <DefaultCategory name="loup" />

      <Box className="flex justify-left gap-4 items-center">
        <Box className="flex-0">Idle category: </Box>
        <Box className="flex-1">
          <CategorySelector
            value={idleCategory}
            onChange={(id) => setIdleCategory(id)}
          />
        </Box>
      </Box>
      <VentilationView />
    </Box>
  );
}
