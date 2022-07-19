import React from 'react';
import usersStyles from './users.module.css'
import loginFormStyle from "../main/loginform.module.css";
import {useState} from "react";
import AuthService from "../../services/AuthService";
import {loginUserAction} from "../../redux/userReducer";
import {useDispatch} from "react-redux";

const Users = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const companyName = 'bla'
  const password = 'bla'
  const role = 'staff'

  const addNewUser = async (e) => {
    e.preventDefault()
    try {
      const regis = await AuthService.registration(firstName, lastName, phoneNumber, email, companyName, password, role='staff');
      console.log(regis)
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user_email', response.data.user.email);
      localStorage.setItem('user_role', response.data.user.role);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  return (
    <div className={usersStyles.account}>
      <h4>Добавить сотрудника</h4>
      <form>
        <input className={loginFormStyle.form__input}
               onChange={e => setFirstName(e.target.value)}
               value={firstName}
               type='text'
               placeholder='Имя' />
        <input className={loginFormStyle.form__input}
               onChange={e => setLastName(e.target.value)}
               value={lastName}
               type='text'
               placeholder='Фамилия' />
        <input className={loginFormStyle.form__input}
               onChange={e => setPhoneNumber(e.target.value)}
               value={phoneNumber}
               type='tel'
               placeholder='Номер телефона' />
        <input className={loginFormStyle.form__input}
               onChange={e => setEmail(e.target.value)}
               value={email}
               type='email'
               placeholder='Электронная почта' />
        <button className={`${loginFormStyle.form__btn}`}>Добавить пользователя</button>
      </form>
      <hr/>
    </div>
  );
};

export default Users;