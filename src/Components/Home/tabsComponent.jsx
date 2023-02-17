import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.css";
import Actionproduct from './Actionproductcompnent'
import UpcommingAction from './UpcommingAction';
import './tabsComponent.css'
const TabsComponent = ({ title }) => {
  return (
    <div className="">
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
       >
        <Tab eventKey="Auctiones" title="Auctiones" >
        <Actionproduct />
        </Tab>
        <Tab eventKey="Upcomming Auctiones" title="Upcomming Auctiones" >
        <UpcommingAction />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsComponent;
