import { OAuthResult } from "./OAuthResult";
import { useLocation } from "react-router-dom";
import { useSetAtom } from "jotai";
import { tokenAtom } from "../atoms";

export function useExtractToken() {
  const location = useLocation();
  const setToken = useSetAtom(tokenAtom);

  const extractToken = () => {
    const resultRaw = location.hash
      .substring(1)
      .replace(/&/g, '","')
      .replace(/=/g, '":"');
    const { access_token } = OAuthResult.parse(
      JSON.parse('{"' + resultRaw + '"}')
    );
    setToken(access_token);
  };

  return extractToken;
}
