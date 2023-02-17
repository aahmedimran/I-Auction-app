import React from 'react'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.css";
import Actionproduct from './Actionproductcompnent'
import UpcommingAction from './UpcommingAction';
// import Addproduct from './addproduct';

const AtionerTabs = () => {
  return(
<div>
<Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example">
        <Tab eventKey="Actionproduct" title="Actionproduct">
          <Actionproduct />
        </Tab>
        <Tab eventKey="UpcommingAction" title="UpcommingAction">
          <UpcommingAction />
        </Tab>
      </Tabs>
    
    </div>
  )
}

export default AtionerTabs

