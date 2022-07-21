import React, {useEffect, useState} from 'react';
import './topbar.css'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const TopBar = () => {

  const [userMail, setUsermail] = useState(sessionStorage.getItem('user_email'))

  useEffect(() => {
    setUsermail(() => userMail)
  }, [])

  return (
    <div className='topBar'>
      <div className="topBarWrapper">
        <div className="topLeft">
          <span className="logo-wrapper">
            <PowerSettingsNewIcon/>
          </span>
          <span className="logo">Avis analytics</span>

        </div>
        <div className="topRight">
          <div className="topBarIconContainer">
            {userMail}
          </div>
          <img className="topAvatar" src="https://i.pinimg.com/originals/38/bb/a8/38bba86077ca44eebf9faf9220f7466b.png" alt="ava"/>
        </div>
      </div>
    </div>
  );
};

export default TopBar;