import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Bidertabscomponent from "../../Components/Biddies/Bidertabscomponent";

const Biddies = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>I-Auction app | Biddies</title>
        </Helmet>
        <Bidertabscomponent />
      </HelmetProvider>
    </>
  );
};

export default Biddies;
