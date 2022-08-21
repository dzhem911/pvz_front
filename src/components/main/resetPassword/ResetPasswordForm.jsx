import React from 'react';
import loginFormStyle from "../loginform.module.css";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import resetPsw from './reset-password.module.css'
import {MyTextInput} from "../../registration/RegStepOne";
import AuthService from "../../../services/AuthService";
import registrationStyle from "../../registration/registration.module.css";

const ResetPasswordForm = ({setPasResetModal, setSignInVisible}) => {

  const bethink = () => {
    setPasResetModal(false)
    setSignInVisible(true)
  }

  const refreshHandler = async (email) => {
    await AuthService.refreshPassword(email)
    setPasResetModal(false)
  }

  return (
    <>  
      <div className={resetPsw.wrapper}>
        <article className={resetPsw.container}>
          <span className={loginFormStyle.block_item__title}>Сброс пароля</span>
          <div className={loginFormStyle.block}>
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
            <div className={loginFormStyle.login_footer}>
              <p className={loginFormStyle.login_footer_quote}>
                Вспомнили пароль?&nbsp;
                <span className={resetPsw.link} onClick={bethink}>Войти</span>
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default ResetPasswordForm;