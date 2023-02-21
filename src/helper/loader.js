import React from "react";
import './loader.css'
import { HashLoader } from "react-spinners";

const Loader = ({ loading }) => {
  return (
    <div className="loader">
      <HashLoader
        color={"#13F513"}
        loading={loading}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
export default Loader;
