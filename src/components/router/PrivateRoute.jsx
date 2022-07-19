import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import './account.css'
import SideBar from "../sideBar/SideBar";

const PrivateRoute = () => {
  return (localStorage.getItem('token') ?
    <div className='container'>
      <SideBar/>
      <Outlet/>
    </div>
    :
    <Navigate to='/'/>)
}

export default PrivateRoute