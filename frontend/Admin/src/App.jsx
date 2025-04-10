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
import { Axios, Axios2 } from "./lib/utils";
import AddAccount from "./app/accounts/add-account";
import Questions from "./app/questions/page";
import AddQuestion from "./app/questions/add-question";
import Subjects from "./app/subjects/page";
import AddSubject from "./app/subjects/add-subject";
import Exams from "./app/exams/page";
import AddExam from "./app/exams/add-exam";
import ExamHistory from "./app/exams/exam-history";
import ExamSessions from "./app/exams/exam-sessions";

function App() {
  const isLoggedIn = useMainStore((state) => state.isLoggedIn);
  const isLoading = useMainStore((state) => state.isLoading);

  const { data, isLoading: loading } = useQuery({
    queryKey: ["user"],
    queryFn: Axios2("/users/user/me", "GET"),
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
            <Route
              path="/subjects"
              element={
                <Layout>
                  <Subjects />
                </Layout>
              }
            />
            <Route
              path="/subjects/add"
              element={
                <Layout>
                  <AddSubject />
                </Layout>
              }
            />
            <Route
              path="/exams"
              element={
                <Layout>
                  <Exams />
                </Layout>
              }
            />
            <Route
              path="/exams/add"
              element={
                <Layout>
                  <AddExam />
                </Layout>
              }
            />
            <Route
              path="/exams/sessions"
              element={
                <Layout>
                  <ExamSessions />
                </Layout>
              }
            />
            <Route
              path="/exams/history"
              element={
                <Layout>
                  <ExamHistory />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <div className="w-full h-full p-6">404 Page</div>
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
