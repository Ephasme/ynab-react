import { Routes, Route } from "react-router-dom";
import { OAuthCallback } from "./components/OAuthCallback";
import { Authenticate } from "./components/Authenticate";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { format } from "date-fns";
import { Home } from "./components/Home";
import { Settings } from "./components/Settings";

function App() {
  return (
    <Routes>
      <Route path="/oauth/callback" element={<OAuthCallback />} />
      <Route path="/login" element={<Authenticate />} />

      <Route path="/settings" element={<Settings />} />

      <Route element={<AuthenticatedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
