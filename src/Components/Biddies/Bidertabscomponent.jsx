import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.css";
import Userbid from "./Userbid";
import Yourbid from "./Yourbid";
const Bidertabscomponent = () => {
  return (
    <div className="">
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
       >
        <Tab eventKey="Your bid" title="Your bid" >
        <Yourbid />
        </Tab>
        <Tab eventKey="User bid" title="User bid" >
        <Userbid />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Bidertabscomponent;
