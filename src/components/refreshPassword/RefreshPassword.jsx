import React, {useState} from 'react';
import refreshStyle from './refreshpassword.module.css'
import AuthService from "../../services/AuthService";

const RefreshPassword = () => {

  const [email, setEmail] = useState('')

  const refreshHandler = async () => {
    await AuthService.refreshPassword(email)
    setEmail('')
  }

  return (
    <div className={refreshStyle.container}>
      <form onSubmit={refreshHandler}>
      <input placeholder='Ваш e-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
      <button type='submit'>Сбросить</button>
      </form>
    </div>
  );
};

export default RefreshPassword;