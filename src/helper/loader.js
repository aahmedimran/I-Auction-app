import React from "react";
import './loader.css'
import { HashLoader } from "react-spinners";

const Loader = ({ loading }) => {
  return (
    <div className="loader" >
      <HashLoader
        color={"#0D6EFD"}
        loading={loading}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      I-Auction App
    </div>
  );
};
export default Loader;
