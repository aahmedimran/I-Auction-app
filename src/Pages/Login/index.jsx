import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Logincomponent from "../../Components/Login";

const Login = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>I-Auction app | Login</title>
        </Helmet>
        <Logincomponent />
      </HelmetProvider>
    </>
  );
};
export default Login;
