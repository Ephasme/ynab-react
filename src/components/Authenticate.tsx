import { Box, Button, Paper, Typography } from "@mui/material";
import { buildUrl } from "../tools/buildUrl";

export function Authenticate() {
  function handleLogin() {
    window.location.replace(buildUrl());
  }
  return (
    <Box className="w-screen h-screen justify-center items-center flex">
      <Box className="flex-0">
        <Paper className="p-4 flex flex-col justify-center">
          <Box className="mb-4">
            <Typography>Please login to your YNAB account.</Typography>
          </Box>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
