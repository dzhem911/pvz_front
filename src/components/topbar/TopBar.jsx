import React, {useEffect, useState} from 'react';
import topBarStyles from './topbar.module.css'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {useDispatch, useSelector} from "react-redux";
import {showingSignInModalAction} from "../../redux/modalsReducer";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TopBar = () => {

  const [userMail, setUsermail] = useState('')
  const wowMail = useSelector(state => state.setUser.user)
  const dispatch = useDispatch()


  useEffect(() => {
    setUsermail(sessionStorage.getItem('user_email'))
  }, [userMail])


  return (
    <header className={topBarStyles.topBar}>
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
            <AccountCircleIcon sx={{ fontSize: 40 }} color={'action'}/>
            </>
            :
            <button onClick={()=>dispatch(showingSignInModalAction())} className={topBarStyles.login_btn}>Войти</button>
          }
        </div>
      </div>
    </header>
  );
};

export default TopBar;