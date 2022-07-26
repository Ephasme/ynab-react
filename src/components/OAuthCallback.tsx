import { useSetAtom } from "jotai";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { expirationAtom, tokenAtom } from "../atoms";
import { useExtractToken } from "../tools/token";

export function OAuthCallback() {
  const setToken = useSetAtom(tokenAtom);
  const setExpiration = useSetAtom(expirationAtom);
  const { access_token, expires_in } = useExtractToken();
  setToken(access_token);
  setExpiration(Date.now() + expires_in * 1000);
  return <Navigate to={"/"} />;
}
