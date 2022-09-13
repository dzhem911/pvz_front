import React, {useCallback, useEffect} from 'react';
import usersStyles from './users.module.css'
import {useState} from "react";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Loader from "../UI/loader/Loader";

const Users = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [deletingEmail, setDeletingEmail] = useState('')
  const [founderEmail, setFounderEmail] = useState(sessionStorage.getItem('user_email'))
  const [users, setUsers] = useState([])
  const columns = ['firstName', 'lastName', 'email', 'phone_number']
  const titles = ['Имя', 'Фамилия', 'E-mail', 'Телефон']
  const [loader, setLoader] = useState(false)
  const [loaderDeleting, setLoaderDeleting] = useState(false)

  const memoSetUsers = useCallback(async () => {
    const response = await UserService.fetchCompanyUsers(founderEmail)
    const filterResponse = response.data.filter(soul => soul.email !== founderEmail)
    setUsers(filterResponse)
  }, [setUsers])

  useEffect(() => {
    async function letsgo () {
    await memoSetUsers()
  }
  letsgo()
  }, [memoSetUsers])

  const addNewUser = async (e) => {
    e.preventDefault()
    try {
      setLoader(true)
      await AuthService.regUser(firstName, lastName, phoneNumber, email, founderEmail);
      await memoSetUsers()
      setFirstName('')
      setLastName('')
      setPhoneNumber('')
      setEmail('')
      setLoader(false)
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  const deleteUser = async (e) => {
    e.preventDefault()
    setLoaderDeleting(true)
    try {
      await AuthService.deleteUser(deletingEmail)
      await memoSetUsers()
      setDeletingEmail('')
      setLoaderDeleting(false)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  return (
    <div className={usersStyles.account}>
      <div className={usersStyles.header_wrapper}>
        <div className={usersStyles.add_user}>
          { loader ?
              <Loader/>
            :
            <form onSubmit={addNewUser} className={usersStyles.form}>
              <span className={usersStyles.form__title}>Добавить пользователя</span>
              <input className={usersStyles.form__input}
                     onChange={e => setFirstName(e.target.value)}
                     value={firstName}
                     type='text'
                     placeholder='Имя'/>
              <input className={usersStyles.form__input}
                     onChange={e => setLastName(e.target.value)}
                     value={lastName}
                     type='text'
                     placeholder='Фамилия'/>
              <input className={usersStyles.form__input}
                     onChange={e => setPhoneNumber(e.target.value)}
                     value={phoneNumber}
                     type='tel'
                     placeholder='Номер телефона'/>
              <input className={usersStyles.form__input}
                     onChange={e => setEmail(e.target.value)}
                     value={email}
                     type='email'
                     placeholder='Электронная почта'/>
              <button className={`${usersStyles.form__btn}`}>Добавить пользователя</button>
            </form>
          }
        </div>
        <div className={usersStyles.delete_user}>
          {loaderDeleting ? <Loader/> :
          <form onSubmit={deleteUser}>
            <span className={usersStyles.form__title}>Удалить пользователя</span>
            <input className={usersStyles.form__input}
                   onChange={e => setDeletingEmail(e.target.value)}
                   value={deletingEmail}
                   type='email'
                   placeholder='Электронная почта' />
            <button className={`${usersStyles.form__dlt__btn}`}>Удалить пользователя</button>
          </form>
          }
        </div>
      </div>
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