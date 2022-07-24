import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useExtractToken } from "../tools/token";

export function OAuthCallback() {
  const extractToken = useExtractToken();
  extractToken();
  return <Navigate to={"/"} />;
}
