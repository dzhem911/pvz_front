import React, {useEffect, useState} from 'react';
import topBarStyles from './topbar.module.css'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {useDispatch, useSelector} from "react-redux";
import {showingSignInModalAction} from "../../redux/modalsReducer";
import LoginForm from "../main/LoginForm";
import MyModal from "../UI/myModal/myModal";

const TopBar = () => {

  const [userMail, setUsermail] = useState('')
  const wowMail = useSelector(state => state.setUser.user)
  const [modal, setModal] = useState(false)
  const [signInModal, setSignInModal] = useState(false)
  const [pasResetModal, setPasResetModal] = useState(false)

  const dispatch = useDispatch()


  useEffect(() => {
    setUsermail(sessionStorage.getItem('user_email'))
  }, [userMail])


  return (
    <div className={topBarStyles.topBar}>
      <div className={topBarStyles.topBarWrapper}>
        <div className={topBarStyles.topLeft}>
          <span className={topBarStyles.logo_wrapper}>
            <PowerSettingsNewIcon/>
          </span>
          <span className={topBarStyles.logo}>Avis analytics</span>
        </div>
        <div className={topBarStyles.topRight}>
          {
            wowMail.email || userMail ?
            <>
            <div className={topBarStyles.topBarIconContainer}>
              {wowMail.email || userMail}
            </div>
            <img className={topBarStyles.topAvatar} src="https://i.pinimg.com/originals/38/bb/a8/38bba86077ca44eebf9faf9220f7466b.png" alt="ava"/>
            </>
            :
            <button onClick={()=>setSignInModal(true)} className={topBarStyles.login_btn}>Войти</button>
          }
          <MyModal signInVisible={signInModal} setSignInVisible={setSignInModal}>
            <LoginForm setSignInVisible={setSignInModal} setVisible={setModal} setPasResetModal={setPasResetModal} />
          </MyModal>
        </div>
      </div>
    </div>
  );
};

export default TopBar;