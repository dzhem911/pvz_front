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
      console.log(response)
      localStorage.removeItem('token');
      localStorage.removeItem('user_email')
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