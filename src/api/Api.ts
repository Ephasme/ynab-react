import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { tokenAtom } from "../tools/token";
import { getBudgetById } from "./getBudgetById";

export const Api = (token: () => string) => {
  return {
    useGetBudgetByIdQuery: (id: string) => {
      return useQuery(["budgets", id], () => getBudgetById(token, id));
    },
  };
};

export const useApi = () => {
  const token = useAtomValue(tokenAtom);
  if (!token) {
    throw new Error("No token");
  }
  const api = useMemo(() => Api(() => token), [token]);
  return api;
};
