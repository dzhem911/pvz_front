import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Error from "../error/Error";
import MainPage from "../main/MainPage";
import PrivateRoute from "./PrivateRoute";
import Home from "../home/Home";
import Users from "../users/Users";
import UploadData from "../upload-data/UploadData";
import ListPVZ from "../list-pvz/ListPVZ";
import RevenuePVZ from "../revenue-pvz/RevenuePVZ";
import Registration from "../registration/Registration";

const RouterApp = () => {
  return (
    <Routes>
      <Route path='/account' element={<PrivateRoute/>}>
        <Route path='' element={<Home/>} />
        <Route path='data-upload' element={<UploadData/>} />
        <Route path='pvz-list' element={<ListPVZ/>} />
        <Route path='pvz-revenue' element={<RevenuePVZ/>} />
        <Route path='users' element={<Users/>} />
      </Route>
      <Route path='/' element={<MainPage/>}/>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='/error-page' element={<Error/>}/>
      <Route path='*' element={<Navigate to='/error-page' replace />}/>
    </Routes>
  )
};

export default RouterApp;