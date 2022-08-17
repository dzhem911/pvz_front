import React, {useState} from 'react';
import LoginForm from "./LoginForm";
import mainPageStyleX from './mainpagex.module.css'
import MyModal from "../ui/myModal/myModal";
import MuiToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled as styledX} from '@mui/material/styles'
import Registration from "../registration/Registration";

const MainPage = () => {
  const [modal, setModal] = useState(false)
  const [signInModal, setSignInModal] = useState(false)
  const [nextPage, setNextPage] = useState(false)
  const [currentToggle, setCurrentToggle] = useState('Регистрация')

  const ToggleButtonGroupX = styledX(MuiToggleButtonGroup)({
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    margin: "auto",
  });

  const ToggleButtonx = styledX(MuiToggleButton)({
    "&.Mui-selected": {
      color: "white",
      backgroundColor: '#007EE2'
    }
  });

  const handleChange = (_, value) => {
    setCurrentToggle(value)
  }

  return (
    <>
    <div>
      <span className={mainPageStyleX.title}>Аналитический сервис для пунктов выдачи заказов</span>
      <span className={mainPageStyleX.description}>Статистика и контроль результатов вашего бизнеса</span>
      <ToggleButtonGroupX className={mainPageStyleX.toggle_button_group}
                         color='primary'
                         exclusive
                         onChange={handleChange}
                         value={currentToggle}
      >
        <ToggleButtonx className={mainPageStyleX.toggle_button_group__item}
                       value="Регистрация"
                       onClick={()=>setModal(true)}
        >
          Регистрация
        </ToggleButtonx>
        <ToggleButtonx className={mainPageStyleX.toggle_button_group__item}
                       value="Войти"
                       onClick={()=>setSignInModal(true)}
        >
          Войти
        </ToggleButtonx>
      </ToggleButtonGroupX>
      <MyModal visible={modal} setVisible={setModal} step={nextPage} setStep={setNextPage}>
        <Registration/>
      </MyModal>
      <MyModal signInVisible={signInModal} setSignInVisible={setSignInModal}>
        <LoginForm/>
      </MyModal>
    </div>
    </>
  );
};

export default MainPage;