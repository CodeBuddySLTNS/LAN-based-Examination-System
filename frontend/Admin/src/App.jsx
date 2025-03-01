import { useState } from "react";
import { useMainStore } from "./states/store";

import Layout from "./app/layout/page";
import Login from "./app/authentication/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./app/dashboard/page";
import Accounts from "./app/accounts/page";

function App() {
  const [count, setCount] = useState(0);
  const isLoggedIn = useMainStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useMainStore((state) => state.setIsLoggedIn);

  return (
    <div>
      {isLoggedIn ? (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/accounts"
              element={
                <Layout>
                  <Accounts />
                </Layout>
              }
            />
          </Routes>
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
