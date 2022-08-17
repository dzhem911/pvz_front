import React, {useState} from 'react';
import AuthService from "../../services/AuthService";
import {useDispatch} from "react-redux";
import {loginUserAction} from "../../redux/userReducer";
import {useNavigate} from 'react-router-dom'
import loginFormStyle from './loginform.module.css'
import mainPageStyle from "./mainpage.module.css";
import * as Yup from "yup";
import {Form, Formik, useField} from "formik";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <article>
      <p className={mainPageStyle.input_label}>{label}</p>
      <input className={ meta.touched && meta.error ? mainPageStyle.invalided_input : mainPageStyle.contact_input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </article>
  );
};

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
    <div className={loginFormStyle.wrapper}>
      <article className={loginFormStyle.container}>
        <h4 className={loginFormStyle.block_item__title}>Вход</h4>
        <div className={loginFormStyle.block}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Укажите корректный адрес почты")
                .required("Обязательное поле"),
              password: Yup.string()
                .required('Обязательное поле')
            })}
            onSubmit={async (values, { setSubmitting }) => {
              await new Promise(r => setTimeout(r, 500));
              setSubmitting(false);
            }}
          >
            <Form>
              <MyTextInput
                label="Адрес почты"
                name="email"
                type="email"
              />
              <MyTextInput
                label="Пароль"
                name="password"
                type="password"
              />
            </Form>
          </Formik>
          <p>Заполните все поля</p>
          <button className={loginFormStyle.sign_in_btn}>Войти</button>
          <p>Еще нет аккаунта? Регистрация</p>
          <p>Забыли пароль? Сброс пароля</p>
        </div>
      </article>
    </div>
    // <form onSubmit={loginUser}>
    //   <h3 className={loginFormStyle.form__title}>Вход</h3>
    //   <p>
    //     <input className={loginFormStyle.form__input} onChange={e => setEmail(e.target.value)} value={email} type='text' placeholder='Email' />
    //   </p>
    //   <p>
    //     <input className={loginFormStyle.form__input} onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' />
    //   </p>
    //   <p>
    //     <button className={loginFormStyle.form__btn}>Войти</button>
    //   </p>
    //   <p>
    //     <span className={loginFormStyle.form_forgot} onClick={() => navigate('/refreshpassword')}>Восстановить пароль</span>
    //   </p>
    // </form>
  );
};

export default LoginForm;