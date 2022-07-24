import { Routes, Route, Navigate } from "react-router-dom";
import { OAuthCallback } from "./OAuthCallback";
import { Authenticate } from "./Authenticate";
import { useAtomValue } from "jotai";
import { tokenAtom } from "./tools/token";
import { AuthenticatedRoute } from "./tools/AuthenticatedRoute";
import { useApi } from "./api/Api";

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
  return <div>BudgetName: {data!.name}</div>;
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
