import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { idleCategoryAtom } from "../atoms";
import { CategorySelector } from "./CategorySelector";
import { DefaultCategory } from "./DefaultCategory";

export const Settings = () => {
  const [idleCategory, setIdleCategory] = useAtom(idleCategoryAtom);
  const navigate = useNavigate();
  return (
    <Container fixed>
      <Box className="flex flex-col mt-4 gap-4">
        <Box className="flex items-center gap-4">
          <Box className="text-2xl uppercase">Settings</Box>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Home
          </Button>
        </Box>

        <Stack gap={2}>
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
        </Stack>
      </Box>
    </Container>
  );
};
