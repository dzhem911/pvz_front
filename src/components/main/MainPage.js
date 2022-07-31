import React, {useState} from 'react';
import LoginForm from "./LoginForm";
import mainPageStyle from './mainpage.module.css'
import loginFormStyle from "./loginform.module.css";
import Registration from "../registration/Registration";
import MyModal from "../ui/myModal/myModal";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {ToggleButtonGroup} from "@mui/material";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from '@mui/material/styles'
import AuthService from "../../services/AuthService";
import {loginUserAction} from "../../redux/userReducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";



const MainPage = () => {
  const [modal, setModal] = useState(false)
  const [nextPage, setNextPage] = useState(false)
  const [currentToggle, setCurrentToggle] = useState('ООО')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [ITN, setITN] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const ToggleButtonx = styled(MuiToggleButton)({
    "&.Mui-selected": {
      color: "white",
      backgroundColor: '#064EE8'
    }
  });

  const handleChange = (_, value) => {
    setCurrentToggle(value)
  }

  const regUser = async () => {
    try {
      await AuthService.registration(firstName, lastName, phoneNumber, email, companyName, password);
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      sessionStorage.setItem('user_email', response.data.user.email);
      sessionStorage.setItem('user_role', response.data.user.role);
      dispatch(loginUserAction(response.data.user))
      navigate('/account')
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  return (
    <>
    <div>
      <span className={mainPageStyle.reg_span} onClick={()=>setModal(true)}>Регистрация</span>

      <MyModal visible={modal} setVisible={setModal} setStep={setNextPage}>
        <div className={mainPageStyle.wrapper}>
          <article className={mainPageStyle.container}>
            <h4 className={mainPageStyle.block_item__title}>Регистрация</h4>
            <div className={mainPageStyle.block_item_title__steps}>
              {!nextPage ?
                <>
                  <span className={mainPageStyle.step}>Шаг 1</span>
                  <hr className={mainPageStyle.hr_horizontal_gradient}/>
                  <span className={mainPageStyle.circled_step}>2</span>
                </>
                :
                <>
                  <span className={mainPageStyle.circled_second_step}>
                  <CheckCircleIcon color="disabled"/>
                  </span>
                  <hr className={mainPageStyle.hr_horizontal_gradient}/>
                  <span className={mainPageStyle.step}>Шаг 2</span>
                </>
              }
            </div>
            {!nextPage ?
              <div className={mainPageStyle.block}>
                <article className={mainPageStyle.article}>
                  <p className={mainPageStyle.input_label}>Ваше имя</p>
                  <input value={firstName} onChange={e=>setFirstName(e.target.value)} className={mainPageStyle.contact_input} type='text'/>
                </article>
                <article className={mainPageStyle.article}>
                  <p className={mainPageStyle.input_label}>Фамилия</p>
                  <input value={lastName} onChange={e=>setLastName(e.target.value)} className={mainPageStyle.contact_input} type='text'/>
                </article>
                <article className={mainPageStyle.article}>
                  <p className={mainPageStyle.input_label}>Адрес почты</p>
                  <input className={mainPageStyle.contact_input} type='email' value={email} onChange={e=>setEmail(e.target.value)}/>
                </article>
                <article className={mainPageStyle.article}>
                  <p className={mainPageStyle.input_label}>Контактный телефон</p>
                  <input className={mainPageStyle.contact_input} type='tel' value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)}/>
                </article>
                <button className={mainPageStyle.reg_btn}  onClick={() => setNextPage(!nextPage)}>Продолжить</button>
              </div>
              :
              <div className={mainPageStyle.block}>
                <article className={mainPageStyle.article}>
                  <p className={mainPageStyle.input_label}>
                    Какая форма собственности у вашей компании?
                  </p>
                    <ToggleButtonGroup className={mainPageStyle.toggle_button_group}
                      color='primary'
                      exclusive
                      onChange={handleChange}
                      value={currentToggle}
                    >
                      <ToggleButtonx className={mainPageStyle.toggle_button_group__item} value="ООО">ООО</ToggleButtonx>
                      <ToggleButtonx className={mainPageStyle.toggle_button_group__item} value="ИП">ИП</ToggleButtonx>
                    </ToggleButtonGroup>
                </article>
                <article className={mainPageStyle.article}>
                  <p className={mainPageStyle.input_label}>{currentToggle === 'ИП' ? "ФИО полностью" : "Название компании без сокращений" }</p>
                  <input className={mainPageStyle.contact_input} type='text' value={companyName} onChange={e=>setCompanyName(e.target.value)}/>
                </article>
                <article className={mainPageStyle.article}>
                  <p className={mainPageStyle.input_label}>ИНН</p>
                  <input className={mainPageStyle.contact_input} type='text' value={ITN} onChange={e=>setITN(e.target.value)}/>
                </article>
                <article className={mainPageStyle.article}>
                  <p className={mainPageStyle.input_label}>Пароль</p>
                  <input className={mainPageStyle.contact_input} type='password' value={password} onChange={e=>setPassword(e.target.value)}/>
                </article>
                <button className={mainPageStyle.reg_btn}  onClick={regUser}>Зарегистрироваться</button>
              </div>
            }
          </article>
        </div>
      </MyModal>
      <LoginForm/>
    </div>
    </>
  );
};

export default MainPage;