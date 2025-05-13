import AuthWrapper from "@/components/AuthWrapper";
import Login from "@/forms/Login";
import Register from "@/forms/Register";
import React from "react";

const LoginPage = () => {
  return (
    <AuthWrapper
      title="Welcome Back"
      subtitle="Sign in to your account to continue shopping"
    >
      <Login />
    </AuthWrapper>
  );
};

export default LoginPage;
