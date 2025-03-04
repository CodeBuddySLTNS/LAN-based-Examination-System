import { useMainStore } from "./states/store";

import Layout from "./app/layout/page";
import Login from "./app/authentication/page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./app/dashboard/page";
import Accounts from "./app/accounts/page";
import { useEffect } from "react";

function App() {
  const isLoggedIn = useMainStore((state) => state.isLoggedIn);
  const isLoading = useMainStore((state) => state.isLoading);

  useEffect(() => {
    setTimeout(() => {
      useMainStore.getState().setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

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
