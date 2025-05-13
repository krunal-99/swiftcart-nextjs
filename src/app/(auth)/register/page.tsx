import AuthWrapper from "@/components/AuthWrapper";
import Register from "@/forms/Register";
import React from "react";

const RegisterPage = () => {
  return (
    <AuthWrapper
      title="Create an Account"
      subtitle="Join Swiftcart to start shopping with ease"
    >
      <Register />
    </AuthWrapper>
  );
};

export default RegisterPage;
