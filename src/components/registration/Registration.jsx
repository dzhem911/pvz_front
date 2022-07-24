import React, {useState} from 'react';
import loginFormStyle from "../main/loginform.module.css";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import {loginUserAction} from "../../redux/userReducer";
import Loader from "../../loader/Loader";

const Registration = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [loader, setLoader] = useState(false)

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      await AuthService.registration(firstName, lastName, phoneNumber, email, companyName, password);
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      sessionStorage.setItem('user_email', response.data.user.email);
      sessionStorage.setItem('user_role', response.data.user.role);
      dispatch(loginUserAction(response.data.user))
      setLoader(false)
      navigate('/account')
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  return (
    loader ? <Loader/>
    : <form className={`${loginFormStyle.form} ${loginFormStyle.form_signup}`} onSubmit={registerUser}>
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
               onChange={e => setConfirmedPassword(e.target.value)}
               value={confirmedPassword}
               type='password'
               placeholder='Подтвердите пароль' />
        {password === confirmedPassword ? 'Все ок' : 'Пароли не сходятся'}
      </p>
      <p>
        <button className={`${loginFormStyle.form__btn} ${loginFormStyle.form__btn_signup}`}>Зарегистрироваться</button>
      </p>
    </form>
  );
};

export default Registration;