import { OAuthResult } from "./OAuthResult";
import { useLocation } from "react-router-dom";

export function useExtractToken() {
  const location = useLocation();

  const resultRaw = location.hash
    .substring(1)
    .replace(/&/g, '","')
    .replace(/=/g, '":"');
  return OAuthResult.parse(JSON.parse('{"' + resultRaw + '"}'));
}
