import React, {useState} from 'react';
import AuthService from "../../services/AuthService";
import {useDispatch} from "react-redux";
import {loginUserAction} from "../../redux/userReducer";
import {useNavigate} from 'react-router-dom'
import loginFormStyle from './loginform.module.css'

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault()
      try {
        const response = await AuthService.login(email, password);
        localStorage.setItem('token', response.data.accessToken);
        sessionStorage.setItem('user_email', response.data.user.email);
        sessionStorage.setItem('user_role', response.data.user.role)
        localStorage.setItem('refresh', response.data.refreshToken)
        navigate('/account')
        dispatch(loginUserAction(response.data.user))
      } catch (e) {
        console.log(e.response?.data?.message);
      }
  }

  return (
    <form className={`${loginFormStyle.form} ${loginFormStyle.form_signin}`} onSubmit={loginUser}>
      <h3 className={loginFormStyle.form__title}>Вход</h3>
      <p>
        <input className={loginFormStyle.form__input} onChange={e => setEmail(e.target.value)} value={email} type='text' placeholder='Email' />
      </p>
      <p>
        <input className={loginFormStyle.form__input} onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' />
      </p>
      <p>
        <button className={loginFormStyle.form__btn}>Войти</button>
      </p>
      <p>
        <span className={loginFormStyle.form_forgot} onClick={() => navigate('/refreshpassword')}>Восстановить пароль</span>
      </p>
    </form>
  );
};

export default LoginForm;