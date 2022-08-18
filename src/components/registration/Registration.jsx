import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/AuthService";
import {loginUserAction} from "../../redux/userReducer";
import Loader from "../../loader/Loader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {Formik} from "formik";
import * as Yup from "yup";
import {RegStepOne, RegStepTwo} from "./RegStepOne";
import registrationStyle from './registration.module.css'


const Registration = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false)

  const [nextPage, setNextPage] = useState(false)
  const [nextPageX, setNextPageX] = useState(false)
  const [currentToggle, setCurrentToggle] = useState('ООО')
  const [ITN, setITN] = useState('')

  const valuesFirstStep = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  const valuesSecondStep = {
    currentToggle: '',
    companyName: '',
    ITN: '',
    role: '',
  }

  const schemaFirstStep = Yup.object({
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
     .min(6, 'Пароль должен содержать не менее 6 символов')
    .required('Обязательное поле')
  });

  const schemaSecondStep = Yup.object({
    companyName: Yup.string()
      .min(4, "Напишите фамилию, имя и отчество без сокращений")
      .required("Обязательное поле"),
    ITN: Yup.number()
      .min(10, "Введите корректный ИНН")
      .required("Обязательное поле"),
  })

  Yup.setLocale({
    string: {
      required: 'Обязательное поле!!!'
    },
    number: {

    }
  })


  const regUser = async () => {
    try {
      await AuthService.registration(firstName, lastName, email, companyName, password);
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

  const dispatch = useDispatch()
  let navigate = useNavigate()

  return (
    loader ? <Loader/>
    :
      <div className={registrationStyle.wrapper}>
        <article className={registrationStyle.container}>
          <h4 className={registrationStyle.block_item__title}>Регистрация</h4>
          <div className={registrationStyle.block_item_title__steps}>
            {!nextPage ?
              <>
                <span className={registrationStyle.step}>Шаг 1</span>
                <hr className={registrationStyle.hr_horizontal_gradient}/>
                <span className={registrationStyle.circled_step}>2</span>
              </>
              :
              null
            }
            {nextPageX ?
              <>
              <span className={registrationStyle.circled_second_step}>
                <CheckCircleIcon color="disabled"/>
              </span>
                <hr className={registrationStyle.hr_horizontal_gradient}/>
                <span className={registrationStyle.step}>Шаг 2</span>
              </>
              :
              null}
          </div>
          {!nextPage ?
            <div className={registrationStyle.block}>
              <Formik
                render={props => <RegStepOne {...props}/>}
                initialValues={valuesFirstStep}
                validationSchema={schemaFirstStep}
                onSubmit={async (values, { setSubmitting }) => {
                  await new Promise(r => setTimeout(r, 500));
                  setSubmitting(false);
                  setFirstName(values.firstName)
                  setLastName(values.lastName)
                  setEmail(values.email)
                  setPassword(values.password)
                  setNextPage(!nextPage)
                  setNextPageX(!nextPageX)
                }}
              />
            </div>
            :
            null
          }
          {nextPageX ?
            <div className={registrationStyle.block}>
              <Formik
                render={props => <RegStepTwo {...props} setCurrentToggle={setCurrentToggle} currentToggle={currentToggle} />}
                initialValues={valuesSecondStep}
                validationSchema={schemaSecondStep}
                onSubmit={async (values, { setSubmitting }) => {
                  await new Promise(r => setTimeout(r, 500));
                  setSubmitting(false);
                  setCompanyName(values.companyName)
                  setITN(values.ITN)
                  await regUser()
                }}
              />
            </div>
            :
            null}
        </article>
      </div>
  );
};

export default Registration;
