import { Box, Button, Container } from "@mui/material";
import { MonthSelector } from "./MonthSelector";
import { VentilationView } from "./VentilationView";
import { useBudgetDetails } from "../hooks/useBudgetDetails";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const budgetDetails = useBudgetDetails();
  if (!budgetDetails) return null;

  return (
    <Container fixed>
      <Box className="flex flex-col mt-4 gap-4">
        <Box className="flex items-center gap-4">
          <Box className="text-2xl uppercase">{budgetDetails.name}</Box>
          <Button variant="outlined" onClick={() => navigate("/settings")}>
            Settings
          </Button>
        </Box>
        <Box className="flex gap-4">
          <MonthSelector />
        </Box>
        <VentilationView />
      </Box>
    </Container>
  );
}
