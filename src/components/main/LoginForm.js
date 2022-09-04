import React, {useState} from 'react';
import AuthService from "../../services/AuthService";
import {useDispatch, useSelector} from "react-redux";
import {loginUserAction} from "../../redux/userReducer";
import {useNavigate} from 'react-router-dom'
import loginFormStyle from './loginform.module.css'
import * as Yup from "yup";
import {Form, Formik} from "formik";
import InputAdornments from "./muiInput";
import {MyTextInput} from "../registration/RegStepOne";
import registrationStyle from "../registration/registration.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  hideRegModalAction,
  hideSignInModalAction,
  showingRegModalAction,
  showingResPasModalAction
} from "../../redux/modalsReducer";

const LoginForm = ({setSignInVisible, setVisible, setPasResetModal}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const initialValues = {
    email: '',
    password: '',
  }

  const schemaValidation = Yup.object({
    email: Yup.string()
      .email("Укажите корректный адрес почты")
      .required("Обязательное поле"),
    password: Yup.string()
      .required('Обязательное поле')
  })

  const loginUser = async (e, userEmail, userPassword) => {
      try {
        const response = await AuthService.login(userEmail, userPassword);
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

  const reg_link = () => {
    dispatch(hideSignInModalAction())
    dispatch(showingRegModalAction())
  }

  const forget_password = () => {
    dispatch(hideSignInModalAction())
    dispatch(showingResPasModalAction())
  }

  const rootClasses = [loginFormStyle.myModal]
  const signInModal = useSelector(state => state.modal.signInModal)

  if(signInModal) {
    rootClasses.push(loginFormStyle.active)
  }

  const clickHandler = () => {
    if(signInModal) {
      dispatch(hideSignInModalAction())
    }
  }

  return (
    <div className={rootClasses.join(' ')} onClick={clickHandler}>
      <CancelIcon className={loginFormStyle.closeIcon} sx={{color: '#EEE'}} />
      <div className={loginFormStyle.myModalContent} onClick={e => e.stopPropagation()}>
        <div className={loginFormStyle.wrapper}>
          <article className={loginFormStyle.container}>
            <span className={loginFormStyle.block_item__title}>Вход</span>
            <div className={loginFormStyle.block}>
              <Formik
                initialValues={initialValues}
                validationSchema={schemaValidation}
                onSubmit={async (values, { props, setSubmitting, setStatus }) => {
                  await new Promise(r => setTimeout(r, 500));
                  setSubmitting(false);
                  setEmail(values.email)
                  setPassword(values.password)
                  setStatus()
                  await loginUser('_', values.email, values.password)
                }}
              >
                <Form>
                  <MyTextInput
                    label="Адрес почты"
                    name="email"
                    type="email"
                  />
                  <InputAdornments name='password' label='Пароль' setValuePassword={setPassword} />
                  <div className={registrationStyle.reserve_area}>&nbsp;</div>
                  <button className={loginFormStyle.sign_in_btn} type='submit'>Войти</button>
                </Form>
              </Formik>
              <div className={loginFormStyle.login_footer}>
                <p className={loginFormStyle.login_footer_quote}>
                  Еще нет аккаунта?&nbsp;
                  <span className={loginFormStyle.link} onClick={reg_link}>Регистрация</span>
                </p>
                <p className={loginFormStyle.login_footer_quote}>
                  Забыли пароль?&nbsp;
                  <span className={loginFormStyle.link} onClick={forget_password}>Сброс пароля</span>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;