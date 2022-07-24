import { useAtomValue } from "jotai";
import { Navigate, Outlet } from "react-router-dom";
import { tokenAtom } from "../atoms";

export function AuthenticatedRoute() {
  const token = useAtomValue(tokenAtom);
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
}
