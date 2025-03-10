import { useMainStore } from "./states/store";

import Layout from "./app/layout/page";
import Login from "./app/authentication/page";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Dashboard from "./app/dashboard/page";
import Accounts from "./app/accounts/page";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "./lib/utils";
import AddAccount from "./app/accounts/add-account";
import Questions from "./app/questions/page";
import AddQuestion from "./app/questions/add-question";

function App() {
  const isLoggedIn = useMainStore((state) => state.isLoggedIn);
  const isLoading = useMainStore((state) => state.isLoading);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(`/users/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data, isLoading: loading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  useEffect(() => {
    setTimeout(() => {
      useMainStore.getState().setIsLoading(false);
    }, 800);
  }, [loading]);

  useEffect(() => {
    if (data) {
      useMainStore.getState().setUser(data.user);
      useMainStore.getState().setIsLoggedIn(true);
    }
  }, [data]);

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
              path="/questions"
              element={
                <Layout>
                  <Questions />
                </Layout>
              }
            />
            <Route
              path="/questions/add"
              element={
                <Layout>
                  <AddQuestion />
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
            <Route
              path="/accounts/add"
              element={
                <Layout>
                  <AddAccount />
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
