import { OAuthResult } from "./OAuthResult";
import { atomWithStorage } from "jotai/utils";
import { useLocation } from "react-router-dom";
import { useSetAtom } from "jotai";

export const tokenAtom = atomWithStorage<string | null>("token", null);

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

    console.log(access_token);
    setToken(access_token);
  };

  return extractToken;
}