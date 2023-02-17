import React from 'react'
import { Outlet, Navigate } from 'react-router'

const Protectiveroutes = () => {
    const User = localStorage.getItem("User")
  return User ? <Outlet /> : <Navigate to="/" />
}
export default Protectiveroutes