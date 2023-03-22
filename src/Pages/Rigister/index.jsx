import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Rigistercomponent from "../../Components/Rigister";
const Rigister = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>I-Auction app | Rigister</title>
        </Helmet>
        <Rigistercomponent />
      </HelmetProvider>
    </>
  );
};
export default Rigister;
