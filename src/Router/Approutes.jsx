import React from "react";
import  Bar  from "../Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Rigister from "../Pages/Rigister";
import   Biddies from "../Pages/Biddies";
import Conformbiddes from "../Pages/conformBiddes";
import Protactiveroutes from './Protectiveroutes'


const Approutes = () => {
  return (
    <>
      <Router>
        <Bar />
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Rigister />} out path="/Rigister" />
          <Route element={<Protactiveroutes />} >
          <Route element={<Home />} out path="/home" />
          <Route element={<Biddies />} out path="/biddies" />
          <Route element={<Conformbiddes />} out path="/Conformbiddes" />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default Approutes;
