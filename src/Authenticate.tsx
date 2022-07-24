import { Button } from "@mui/material";
import { buildUrl } from "./tools/buildUrl";

export function Authenticate() {
  function handleLogin() {
    window.location.replace(buildUrl());
  }
  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
