import React, {useCallback, useEffect} from 'react';
import usersStyles from './users.module.css'
import loginFormStyle from "../main/loginform.module.css";
import {useState} from "react";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const Users = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [founderEmail, setFounderEmail] = useState(sessionStorage.getItem('user_email'))
  const [users, setUsers] = useState([])
  const columns = ['firstName', 'lastName', 'email', 'phone_number']
  const titles = ['Имя', 'Фамилия', 'E-mail', 'Телефон']

  const memoSetUsers = useCallback(async () => {
    const response = await UserService.fetchCompanyUsers(founderEmail)
    setUsers(response.data)
  }, [setUsers])

  useEffect(() => (async () => {
    await memoSetUsers()
  })(), [memoSetUsers])

  const addNewUser = async (e) => {
    e.preventDefault()
    try {
      await AuthService.regUser(firstName, lastName, phoneNumber, email, founderEmail);
      await memoSetUsers()
      setFirstName('')
      setLastName('')
      setPhoneNumber('')
      setEmail('')
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  return (
    <div className={usersStyles.account}>
      <h4>Добавить сотрудника</h4>
      <form onSubmit={addNewUser}>
        <input className={loginFormStyle.form__input}
               onChange={e => setFirstName(e.target.value)}
               value={firstName}
               type='text'
               placeholder='Имя' />
        <input className={loginFormStyle.form__input}
               onChange={e => setLastName(e.target.value)}
               value={lastName}
               type='text'
               placeholder='Фамилия' />
        <input className={loginFormStyle.form__input}
               onChange={e => setPhoneNumber(e.target.value)}
               value={phoneNumber}
               type='tel'
               placeholder='Номер телефона' />
        <input className={loginFormStyle.form__input}
               onChange={e => setEmail(e.target.value)}
               value={email}
               type='email'
               placeholder='Электронная почта' />
        <button className={`${loginFormStyle.form__btn}`}>Добавить пользователя</button>
      </form>
      <hr/>

      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {titles.map(title =>
                  <TableCell align="center" colSpan={3} key={title}>
                    {title}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  {columns.map(column =>
                    <TableCell key={column} align="center" colSpan={3}>
                      {user[column]}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Paper>

    </div>
  );
};

export default Users;