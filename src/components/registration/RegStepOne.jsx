import React, {useState} from 'react';
import InputAdornments from "../main/muiInput";
import {Form, useField} from "formik";
import registrationStyle from './registration.module.css'
import {styled as styledX} from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";
import MuiToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import styled from "@emotion/styled";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <article className={registrationStyle.wrapper_center}>
      <p className={registrationStyle.input_label}>{label}</p>
      <input className={ meta.touched && meta.error ? registrationStyle.invalided_input : registrationStyle.contact_input}
             {...field} {...props} />
      <div className={registrationStyle.hint}>{ meta.touched && meta.error ? meta.error : null }</div>
    </article>
  );
};

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

const StyledSelect = styled.select`
  display: flex;
  width: 320px;
  padding: 8px 4px;
`;

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <article className={registrationStyle.wrapper_center}>
        <p className={registrationStyle.input_label}>{label}</p>
        <StyledSelect {...field} {...props} />
        {meta.touched && meta.error ? (
          <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ) : null}
      </article>
    </>
  );
};

export const RegStepOne = (props) => {

  const {
    values: { firstName, lastName, email, password },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched
  } = props;

  const [passwordx, setPassword] = useState('')

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <>
      <Form>
        <MyTextInput name='firstName'
                     label='Ваше имя'
                     value={firstName}
                     onChange={change.bind(null, "firstName")}
        />

        <MyTextInput name='lastName' label='Фамилия' value={lastName} onChange={change.bind(null, "lastName")} />
        <MyTextInput name='email' label='Адрес почты' value={email} onChange={change.bind(null, "email")} />
        <InputAdornments name='password' label='Пароль' setValuePassword={setPassword} />
        <button type='submit' className={registrationStyle.reg_btn}>Продолжить</button>
      </Form>

    </>
  );
};

export const RegStepTwo = (props) => {

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

  const {
    values: {  companyName, ITN, role },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const handleChangeToggle = (_, value) => {
    props.setCurrentToggle(value)
  }

  return (
    <>
      <Form>
        <article className={registrationStyle.wrapper_center}>
          <p className={registrationStyle.input_label}>
            Форма собственности вашей компании
          </p>
          <ToggleButtonGroupX className={registrationStyle.toggle_button_group}
                              color='primary'
                              exclusive
                              onChange={handleChangeToggle}
                              value={props.currentToggle}
          >
            <ToggleButtonx className={registrationStyle.toggle_button_group__item} value="ООО">ООО</ToggleButtonx>
            <ToggleButtonx className={registrationStyle.toggle_button_group__item} value="ИП">ИП</ToggleButtonx>
          </ToggleButtonGroupX>
        </article>
        <MyTextInput name={'companyName'}
                     label={props.currentToggle === 'ООО' ? 'Название компании без сокращений' : 'ФИО полностью'}
                     value={companyName}
                     onChange={change.bind(null, "companyName")}
        />

        <MyTextInput name='ITN' label='ИНН' value={ITN} onChange={change.bind(null, "ITN")} />
        <MySelect label="Ваша роль в компании" name="role">
          <option value="Управляющий сети ПВЗ">Управляющий сети ПВЗ</option>
          <option value="Руководитель">Руководитель</option>
        </MySelect>
        <button className={registrationStyle.reg_btn}  type='submit'>Зарегистрироваться</button>
      </Form>

    </>
  );
};

