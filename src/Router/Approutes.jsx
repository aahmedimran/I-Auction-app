import React from "react";
import  Bar  from "../Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Rigister from "../Pages/Rigister";
import Addproduct from "../Components/Home/addproduct";
import Actionproductcompnent from "../Components/Home/Actionproductcompnent";
import UpcommingAction from "../Components/Home/UpcommingAction";

const Approutes = () => {
  return (
    <>
      <Router>
        <Bar />
        <Routes>
          <Route element={<Login />} path="/" />
          {/* <Route element={<Protactiveroutes />} > */}
          <Route element={<Rigister />} out path="/Rigister" />
          <Route element={<Home />} out path="/home" />
          <Route element={<Addproduct />} out path="/addProduct" />
          <Route element={<Addproduct />} out path="/addProduct" />
          <Route element={<Actionproductcompnent />} out path="/actionproductcompnent" />
          <Route element={<UpcommingAction />} out path="/upcommingAction" />
          {/* </Route> */}
        </Routes>
      </Router>
    </>
  );
};

export default Approutes;
