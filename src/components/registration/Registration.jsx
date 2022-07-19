import React, {useState} from 'react';
import loginFormStyle from "../main/loginform.module.css";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import {loginUserAction} from "../../redux/userReducer";

const Registration = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault()
    try {
      const regis = await AuthService.registration(firstName, lastName, phoneNumber, email, companyName, password);
      console.log(regis)
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user_email', response.data.user.email);
      localStorage.setItem('user_role', response.data.user.role);
      dispatch(loginUserAction(response.data.user))
      navigate('/account')
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  return (
    <form className={`${loginFormStyle.form} ${loginFormStyle.form_signup}`} onSubmit={registerUser}>
      <h3 className={loginFormStyle.form__title}>Регистрация</h3>
      <p>
        <input className={loginFormStyle.form__input}
               onChange={e => setFirstName(e.target.value)}
               value={firstName}
               type='text'
               placeholder='Имя' />
      </p>
      <p>
        <input className={loginFormStyle.form__input}
                onChange={e => setLastName(e.target.value)}
                value={lastName}
                type='text'
                placeholder='Фамилия' />
      </p>
      <p>
        <input className={loginFormStyle.form__input}
               onChange={e => setPhoneNumber(e.target.value)}
               value={phoneNumber}
               type='tel'
               pattern="[+]{1}[0-9]{11,14}"
               placeholder='Номер телефона' />
      </p>
      <p>
        <input className={loginFormStyle.form__input}
               onChange={e => setEmail(e.target.value)}
               value={email}
               type='email'
               placeholder='Email' />
      </p>
      <p>
        <input className={loginFormStyle.form__input}
               onChange={e => setCompanyName(e.target.value)}
               value={companyName}
               type='text'
               placeholder='Наименование компании' />
      </p>
      <p>
        <input className={loginFormStyle.form__input}
               onChange={e => setPassword(e.target.value)}
               value={password}
               type='password'
               placeholder='Пароль' />
      </p>
      <p>
        <input className={loginFormStyle.form__input}
               onChange={e => setPassword(e.target.value)}
               value={password}
               type='password'
               placeholder='Подтвердите пароль' />
      </p>
      <p>
        <button className={`${loginFormStyle.form__btn} ${loginFormStyle.form__btn_signup}`}>Зарегистрироваться</button>
      </p>
    </form>
  );
};

export default Registration;