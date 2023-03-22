import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Actionproductcompnent from "../../Components/Home/Actionproductcompnent";
const Home = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>I-Auction app | Home</title>
        </Helmet>
        <Actionproductcompnent />
      </HelmetProvider>
    </>
  );
};

export default Home;
