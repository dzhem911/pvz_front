import React from 'react';
import AuthService from "../../services/AuthService";
import {logoutUserAction} from "../../redux/userReducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const logoutUser = async () => {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      sessionStorage.removeItem('user_email')
      sessionStorage.removeItem('user_role')
      dispatch(logoutUserAction())
      navigate('/')
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  return (
    <button onClick={logoutUser}>
      Выйти
    </button>
  );
};

export default LogoutButton;