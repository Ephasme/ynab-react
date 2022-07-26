import { useAtomValue } from "jotai";
import { Navigate, Outlet } from "react-router-dom";
import { expirationAtom, tokenAtom } from "../atoms";

export function AuthenticatedRoute() {
  const token = useAtomValue(tokenAtom);
  const expiration = useAtomValue(expirationAtom);
  if (!token || !expiration || expiration < Date.now()) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
}
