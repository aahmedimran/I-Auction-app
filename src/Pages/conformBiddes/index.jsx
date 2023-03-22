import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Conformbiddescomponent from "../../Components/conformBiddes/Conformbiddescomponent";

const Conformbiddes = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>I-Auction app | Conformbiddes</title>
        </Helmet>
        <Conformbiddescomponent />
      </HelmetProvider>
    </>
  );
};

export default Conformbiddes;
