import React from 'react'
import {Navigate, Outlet, useNavigate} from 'react-router-dom'
import './account.css'
import SideBar from "../sideBar/SideBar";
import axios from "axios";
import {API_URL} from "../../https";
import {logoutUserAction} from "../../redux/userReducer";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import AuthService from "../../services/AuthService";

const PrivateRoute = () => {

  const dispatch = useDispatch()

  async function checkAuth() {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true })
      localStorage.setItem('token', response.data.accessToken);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  let navigate = useNavigate()

  const logoutUser = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      sessionStorage.removeItem('user_email')
      sessionStorage.removeItem('user_role')
      sessionStorage.removeItem('refresh')
      dispatch(logoutUserAction())
      navigate('/')
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  useEffect(() => (async ()=> {
    if((JSON.parse(atob(localStorage.getItem("refresh").split(".")[1])).exp * 1000) < Date.now()) {
      logoutUser()
    }
    if(localStorage.getItem('token')) {
      await checkAuth()
    }
  })(), [])

  return (localStorage.getItem('token') ?
    <div className='container'>
      <SideBar/>
      <Outlet/>
    </div>
    :
    <Navigate to='/'/>)
}

export default PrivateRoute