import React, {useState} from 'react';
import LoginForm from "./LoginForm";
import mainPageStyle from './mainpage.module.css'
import loginFormStyle from "./loginform.module.css";
import Registration from "../registration/Registration";

const MainPage = () => {
  const [signUpBtn, setSignUpBtn] = useState(false)

  function signUpHandler() {
    setSignUpBtn(!signUpBtn)
  }

  return (
    <div className={mainPageStyle.wrapper}>
      <article className={mainPageStyle.container}>
        <div className={mainPageStyle.block}>
          <section className={`${mainPageStyle.block__item} ${mainPageStyle.block_item}`}>
            <h2 className={mainPageStyle.block_item__title}>У вас уже есть аккаунт?</h2>
            <button className={`${mainPageStyle.block_item__btn} ${mainPageStyle.signin_btn}`} onClick={signUpHandler}>Войти</button>
          </section>
          <section className={`${mainPageStyle.block__item} ${mainPageStyle.block_item}`}>
            <h2 className={mainPageStyle.block_item__title}>У вас нет аккаунта?</h2>
            <button className={`${mainPageStyle.block_item__btn} ${mainPageStyle.signup_btn}`} onClick={signUpHandler}>Создать аккаунт</button>
          </section>
        </div>
        <div className={signUpBtn ? `${loginFormStyle.form_box} ${loginFormStyle.active}` : loginFormStyle.form_box}>
          <LoginForm signUpBtn={signUpBtn}/>
          <Registration/>
        </div>
      </article>
    </div>

  );
};

export default MainPage;