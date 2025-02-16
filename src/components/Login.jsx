import React from "react";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import LoginForm from "./LoginForm.jsx";

const Login = () => {
  return (
    <>
      <Header />
      <div className="main">
        <LoginForm />
      </div>
      <Footer />
    </>
  );
};

export default Login;
