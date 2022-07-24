import { Routes, Route, Navigate } from "react-router-dom";
import { OAuthCallback } from "./OAuthCallback";
import { Authenticate } from "./Authenticate";
import { useAtomValue } from "jotai";
import { tokenAtom } from "./tools/token";
import { AuthenticatedRoute } from "./tools/AuthenticatedRoute";
import { useApi } from "./api/Api";
import { Box } from "@mui/material";
import { format, fromUnixTime, getMonth, getYear, parse } from "date-fns";

function Home() {
  const api = useApi();
  const token = useAtomValue(tokenAtom);
  if (!token) {
    return <Navigate to="/login" />;
  }

  const { data, isFetching } = api.useGetBudgetByIdQuery(
    import.meta.env.VITE_BUDGET_ID
  );

  if (isFetching) {
    return <div>Loading...</div>;
  }
  const now = fromUnixTime(Date.now() / 1000);
  console.log(getMonth(now));
  console.log(getYear(now));
  const budget = data!;

  budget.months?.forEach((month) => {
    console.log(getMonth(parse(month.month, "yyyy-MM-dd", new Date())));
  });

  return <Box>{budget.name}</Box>;
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
