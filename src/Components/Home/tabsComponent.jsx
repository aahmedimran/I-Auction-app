import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.css";
import ActionerComponent from "./ActionerComponent";
import Biddercomponent from "./Biddercomponent";
import './tabsComponent.css'
const TabsComponent = () => {
  return (
    <div className="">
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
       >
        <Tab eventKey="Actioneer" title="Actioneer" >
          <ActionerComponent />
        </Tab>
        <Tab eventKey="Bidder" title="Bidder" >
          <Biddercomponent />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsComponent;
