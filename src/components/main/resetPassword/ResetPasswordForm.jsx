import React, {useState} from 'react';
import loginFormStyle from "../loginform.module.css";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import resetPsw from './reset-password.module.css'
import {MyTextInput} from "../../registration/RegStepOne";
import AuthService from "../../../services/AuthService";
import registrationStyle from "../../registration/registration.module.css";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ResetPasswordForm = ({setPasResetModal, setSignInVisible}) => {

  const [secondStep, setSecondStep] = useState(false)

  const bethink = () => {
    setPasResetModal(false)
    setSignInVisible(true)
  }

  const refreshHandler = async (email) => {
    await AuthService.refreshPassword(email)
  }

  const closingModal = () => {
    setPasResetModal(false)
    setSecondStep(false)
  }

  return (
    <>  
      <div className={resetPsw.wrapper}>
        <article className={resetPsw.container}>
          { !secondStep ?
            <span className={loginFormStyle.block_item__title}>Сброс пароля</span>
            :
            <CheckCircleOutlineIcon sx={{color: '#28AC0A', fontSize: 70,  margin: '60px auto 35px', display: 'flex'}} />
          }
          <div className={loginFormStyle.block}>
            { !secondStep ?
            <>
              <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Укажите корректный адрес почты")
                  .required("Обязательное поле"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                await new Promise(r => setTimeout(r, 500));
                setSubmitting(false);
                await refreshHandler(values.email)
                setSecondStep(true)
              }}
            >
              <Form>
                <MyTextInput
                  label="Адрес почты"
                  name="email"
                  type="email"
                />
                <div className={registrationStyle.reserve_area}>&nbsp;</div>
                <button className={loginFormStyle.sign_in_btn} type='submit'>Отправить</button>
              </Form>
            </Formik>
            <div className={resetPsw.login_footer}>
              <p className={resetPsw.login_footer_quote}>
                Вспомнили пароль?&nbsp;
                <span className={resetPsw.link} onClick={bethink}>Войти</span>
              </p>
            </div>
            </>
              :
              <>
                <p className={resetPsw.send_msg}>
                  Отправили на вашу электронную
                  почту письмо со ссылкой
                  для восстановления пароля
                </p>
                <button className={resetPsw.goodBtn} onClick={closingModal}>Хорошо</button>
              </>
            }
          </div>
        </article>
      </div>
    </>
  );
};

export default ResetPasswordForm;