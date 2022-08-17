import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import {loginUserAction} from "../../redux/userReducer";
import Loader from "../../loader/Loader";
import mainPageStyle from "../main/mainpage.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {Form, Formik, useField} from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import {styled as styledX} from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";
import InputAdornments from "../main/muiInput";
import MuiToggleButtonGroup from "@mui/material/ToggleButtonGroup";


const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <article className={mainPageStyle.wrapper_center}>
      <p className={mainPageStyle.input_label}>{label}</p>
      <input className={ meta.touched && meta.error ? mainPageStyle.invalided_input : mainPageStyle.contact_input}
             {...field}
             {...props}
        title={'what is it'}
      />
      {meta.touched && meta.error ? (
        <div className={mainPageStyle.hint}>{meta.error}</div>
      ) : null}
    </article>
  );
};

const PasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <article className={mainPageStyle.wrapper_center}>
      <p className={mainPageStyle.input_label}>{label}</p>
      <InputAdornments className={ meta.touched && meta.error ? mainPageStyle.invalided_input : mainPageStyle.contact_input}
                     {...field}
                     {...props}

      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </article>
  );
};

const StyledSelect = styled.select`
  display: flex;
  width: 320px;
  padding: 8px 4px;
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;


const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <article className={mainPageStyle.wrapper_center}>
        <p className={mainPageStyle.input_label}>{label}</p>
        <StyledSelect {...field} {...props} />
        {meta.touched && meta.error ? (
          <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ) : null}
      </article>
    </>
  );
};

const Registration = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false)

  const [nextPage, setNextPage] = useState(false)
  const [nextPageX, setNextPageX] = useState(false)
  const [currentToggle, setCurrentToggle] = useState('ООО')
  const [ITN, setITN] = useState('')

  Yup.setLocale({
    string: {
      required: 'Обязательное поле!!!'
    },
    number: {

    }
  })

  let schema = Yup.object().shape({
    firstName: Yup.string().required(),
  });


  const ToggleButtonx = styledX(MuiToggleButton)({
    "&.Mui-selected": {
      color: "white",
      backgroundColor: '#007EE2'
    }
  });

  const ToggleButtonGroupX = styledX(MuiToggleButtonGroup)({
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    margin: "0 auto",
  });

  const handleChange = (_, value) => {
    setCurrentToggle(value)
  }

  const regUser = async () => {
    try {
      await AuthService.registration(firstName, lastName, email, companyName, password);
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

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      await AuthService.registration(firstName, lastName, phoneNumber, email, companyName, password);
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      sessionStorage.setItem('user_email', response.data.user.email);
      sessionStorage.setItem('user_role', response.data.user.role);
      dispatch(loginUserAction(response.data.user))
      setLoader(false)
      navigate('/account')
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  return (
    loader ? <Loader/>
    :
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
              null
            }
            {nextPageX ?
              <>
              <span className={mainPageStyle.circled_second_step}>
                <CheckCircleIcon color="disabled"/>
              </span>
                <hr className={mainPageStyle.hr_horizontal_gradient}/>
                <span className={mainPageStyle.step}>Шаг 2</span>
              </>
              :
              null}
          </div>
          {!nextPage ?
            <div className={mainPageStyle.block}>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                }}
                validationSchema={Yup.object({
                  firstName: Yup.string()
                    .min(2, "Напишите ваше имя")
                    .required("Обязательное поле"),
                  lastName: Yup.string()
                    .min(2, "Напишите вашу фамилию")
                    .required("Обязательное поле"),
                  email: Yup.string()
                    .email("Укажите действующий адрес почты для связи")
                    .required("Обязательное поле"),
                  password: Yup.string()
                    // .min(6, 'Пароль должен содержать не менее 6 символов')
                    // .required('Обязательное поле')
                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  await new Promise(r => setTimeout(r, 500));
                  setSubmitting(false);
                  setFirstName(values.firstName)
                  setLastName(values.lastName)
                  setEmail(values.email)
                  setPassword(values.password)
                  console.log('name ==> ', values.firstName)
                  console.log('password ==> ',values.password)
                  resetForm()
                  console.log('password ==> ',values.password)
                  setNextPage(!nextPage)
                  setNextPageX(!nextPageX)
                }}
              >
                <Form>
                  <MyTextInput
                    label="Ваше имя"
                    name="firstName"
                    type="text"
                  />
                  <MyTextInput
                    label="Фамилия"
                    name="lastName"
                    type="text"
                  />
                  <MyTextInput
                    label="Адрес почты"
                    name="email"
                    type="email"
                  />
                  <PasswordInput
                    label="Пароль"
                    name="password"
                  />
                  {/*<div>{errors ? 'Заполните все поля' : null}</div>*/}
                  <button type='submit' className={mainPageStyle.reg_btn}>Продолжить</button>
                </Form>
              </Formik>
            </div>
            :
            null
          }
          {nextPageX ?
            <div className={mainPageStyle.block}>
              <Formik
                initialValues={{
                  companyName: "",
                  ITN: "",
                }}
                validationSchema={Yup.object().shape({
                  companyName: Yup.string()
                    .min(4, "Напишите фамилию, имя и отчество без сокращений")
                    .required("Обязательное поле"),
                  ITN: Yup.number()
                    .min(10, "Введите корректный ИНН")
                    .required("Обязательное поле"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  await new Promise(r => setTimeout(r, 500));
                  setSubmitting(false);
                  setCompanyName(values.companyName)
                  setITN(values.ITN)

                }}
              >
                <Form className={mainPageStyle.form}>
                  <article className={mainPageStyle.wrapper_center}>
                    <p className={mainPageStyle.input_label}>
                      Форма собственности вашей компании?
                    </p>
                    <ToggleButtonGroupX className={mainPageStyle.toggle_button_group}
                                        color='primary'
                                        exclusive
                                        onChange={handleChange}
                                        value={currentToggle}
                    >
                      <ToggleButtonx className={mainPageStyle.toggle_button_group__item} value="ООО">ООО</ToggleButtonx>
                      <ToggleButtonx className={mainPageStyle.toggle_button_group__item} value="ИП">ИП</ToggleButtonx>
                    </ToggleButtonGroupX>
                  </article>
                  <MyTextInput
                    label={currentToggle === 'ООО' ? 'Название компании без сокращений' : 'ФИО полностью'}
                    name="companyName"
                    type="text"
                  />
                  <MyTextInput
                    label="ИНН"
                    name="ITN"
                    type="text"
                  />
                  <MySelect label="Ваша роль в компании" name="role">
                    <option value="Управляющий сети ПВЗ">Управляющий сети ПВЗ</option>
                    <option value="Руководитель">Руководитель</option>
                  </MySelect>
                  {/*<div>{errors ? 'Заполните все поля' : null}</div>*/}
                  <button className={mainPageStyle.reg_btn}  type='submit' onClick={regUser}>Зарегистрироваться</button>
                </Form>
              </Formik>
            </div>
            :
            null}
        </article>
      </div>
  );
};

export default Registration;
