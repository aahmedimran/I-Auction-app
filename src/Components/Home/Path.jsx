import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const Path = () => {
  return (
    <>
      Home
      <div className="col-12">
        <Link to="">
          <Button variant="primary" className="col-4" >
            Auctioneer
          </Button>
        </Link>
        <Link to="">
          <Button variant="secondary" className="col-4" >
            Bidder
          </Button>
        </Link>



        {/* <div className={styles.btnContainer}>
        {filterTabs.map((tab,index) => {
            return(
                <button key={index} className={`${styles.filterbtn} ${tab == activeFilterTab && styles.filterActive}`} onClick={() => setActiveFilterTab(tab)}>{tab}</button>
             )
        })}
      </div> */}
      </div>
    </>
  );
};

export default Path;
