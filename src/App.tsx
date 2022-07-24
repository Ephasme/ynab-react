import { Routes, Route, useNavigate } from "react-router-dom";
import { OAuthCallback } from "./OAuthCallback";
import { Authenticate } from "./Authenticate";
import { useAtomValue } from "jotai";
import { tokenAtom } from "./tools/token";
import { AuthenticatedRoute } from "./tools/AuthenticatedRoute";
import * as YNAB from "ynab";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const token = useAtomValue(tokenAtom);

  const { data, isFetching } = useQuery(["budget"], async () => {
    return await fetch(
      `https://api.youneedabudget.com/v1/budgets/${
        import.meta.env.VITE_BUDGET_ID
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  });

  return !isFetching && <div>BudgetName: {JSON.stringify(data)}</div>;
}

function App() {
  return (
    <Routes>
      <Route path="/oauth/callback" element={<OAuthCallback />} />
      <Route path="/login" element={<Authenticate />} />

      <Route element={<AuthenticatedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
