import React, {useState} from 'react';
import LoginForm from "./LoginForm";
import mainPageStyleX from './mainpagex.module.css'
import MyModal from "../UI/myModal/myModal";
import MuiToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled as styledX} from '@mui/material/styles'
import Registration from "../registration/Registration";
import ResetPasswordForm from "./resetPassword/ResetPasswordForm";
import {useDispatch, useSelector} from "react-redux";
import {showingRegModalAction, showingSignInModalAction} from "../../redux/modalsReducer";


const MainPage = () => {
  const [modal, setModal] = useState(false)
  const [signInModal, setSignInModal] = useState(false)
  const [pasResetModal, setPasResetModal] = useState(false)
  const [nextPage, setNextPage] = useState(false)
  const [currentToggle, setCurrentToggle] = useState('Регистрация')

  const dispatch = useDispatch()

  const ToggleButtonGroupX = styledX(MuiToggleButtonGroup)({
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    margin: "auto",
    boxShadow: 'inset 1px 0px 0px #007CDB, inset -2px 0px 0px #007CDB, inset 0px -2px 0px #007CDB, inset 0px 2px 0px #007CDB',
  });

  const ToggleButtonLeft = styledX(MuiToggleButton)({
    "&.Mui-selected": {
      color: "white",
      textTransform: 'none',
      fontSize: '16px',
      backgroundColor: '#007EE2',
    }
  });
  const ToggleButtonRight = styledX(MuiToggleButton)({
      textTransform: 'none',
      fontSize: '16px',
      color: '#007EE2'
  });

  const handleChange = (_, value) => {
    setCurrentToggle(value)
  }

  return (
    <>
    <div>
      <span className={mainPageStyleX.title}>Аналитический сервис<br/> для пунктов выдачи заказов</span>
      <span className={mainPageStyleX.description}>Статистика и контроль результатов<br/> вашего бизнеса</span>
      <ToggleButtonGroupX className={mainPageStyleX.toggle_button_group}
                         color='primary'
                         // onChange={handleChange}
                         value={currentToggle}
      >
        <ToggleButtonLeft className={mainPageStyleX.toggle_button_group__item}
                       value="Регистрация"
                       onClick={()=>dispatch(showingRegModalAction())}
                       // onClick={()=>setModal(true)}
                       selected={true}
        >
          Регистрация
        </ToggleButtonLeft>
        <ToggleButtonRight className={mainPageStyleX.toggle_button_group__item}
                       value="Войти"
                       onClick={()=>dispatch(showingSignInModalAction())}
                       // onClick={()=>setSignInModal(true)}
        >
          Войти
        </ToggleButtonRight>
      </ToggleButtonGroupX>
      <Registration/>
      <LoginForm />
      <ResetPasswordForm  />
      {/*<MyModal visible={modal} setVisible={setModal} step={nextPage} setStep={setNextPage}>
        <Registration/>
      </MyModal>
      <MyModal signInVisible={signInModal} setSignInVisible={setSignInModal}>
        <LoginForm setSignInVisible={setSignInModal} setVisible={setModal} setPasResetModal={setPasResetModal} />
      </MyModal>
      <MyModal pasResetModal={pasResetModal} setPasResetModal={setPasResetModal}>
        <ResetPasswordForm setSignInVisible={setSignInModal} setPasResetModal={setPasResetModal} />
      </MyModal>*/}
    </div>
    </>
  );
};

export default MainPage;