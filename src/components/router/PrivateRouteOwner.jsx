import React from 'react';
import SideBar from "../sideBar/SideBar";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRouteOwner = () => {
  return (sessionStorage.getItem('user_role') === 'owner' ?
    <div className='container'>
      <SideBar/>
      <Outlet/>
    </div>
    :
    <Navigate to='/'/>
  );
};

export default PrivateRouteOwner;