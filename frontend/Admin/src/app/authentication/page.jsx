import React from "react";
import LoginForm from "@/components/authentication/login";
import SignupForm from "@/components/authentication/signup";

export default function Page() {
  const [isLoginForm, setIsLoginForm] = React.useState(true);
  return (
    <>
      {isLoginForm ? (
        <LoginForm setForm={setIsLoginForm} />
      ) : (
        <SignupForm setForm={setIsLoginForm} />
      )}
    </>
  );
}
