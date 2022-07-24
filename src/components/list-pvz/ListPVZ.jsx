import './listpvz.css'
import React, {useCallback, useState, useEffect} from "react";
import CompanyService from "../../services/CompanyService";
import UserService from "../../services/UserService";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const ListPvz = () => {

  const [founderEmail, setFounderEmail] = useState(sessionStorage.getItem('user_email'))
  const [users, setUsers] = useState([])
  const [companyName, setCompanyName] = useState('')
  const [staff, setStaff] = useState('')
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(false)
  const titles = ['Наименование ПВЗ', 'Адрес', 'Тип ПВЗ', 'Ответственный', 'Телефон']
  const columns = ['name', 'address', 'typePVZ']
  const [companies, setCompanies] = useState([])
  const [address, setAddress] = useState('')
  const [typePVZ, setTypePVZ] = useState('')
  const typePVZs = ['Яндекс.Маркет', 'Ozon', 'Wildberries'] // ToDo - разхаркодить и внести в админку для владельцев

  const memoSetUsers = useCallback(async () => {
    const response = await UserService.fetchCompanyUsers(founderEmail)
    setUsers(response.data)
    const companiesResponse = await CompanyService.getPVZs(founderEmail)
    setCompanies(companiesResponse.data)
  }, [setUsers, setCompanies])

  useEffect(() => (async () => {
    await memoSetUsers()
  })(), [])
  console.log(companies)

  const addPVZ = async (e) => {
    e.preventDefault()
    if(staff!=='Выбрать' && staff && typePVZ && typePVZ !== 'Выбрать') {
      try {
        setLoader(true)
        await CompanyService.createPVZ(companyName, staff, address, typePVZ);
        await memoSetUsers()
        setCompanyName('')
        setError(false)
        setLoader(false)
      } catch (e) {
        console.log(e.response?.data?.message);
      }
    } else {
      setError(true)
    }
  }

  return (
    <div className='account'>
      { error ? 'Необходимо выбрать тип ПВЗ и ответственного за него.' : null }
      <form onSubmit={addPVZ}>
        <h4>Список ПВЗ</h4>
        <p>
          <input value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder='Наименование ПВЗ'/>
        </p>
        <p>
          Закрепленный сотрудник:
          <select required value={staff} onChange={e => setStaff(e.target.value)}>
            <option value="Выбрать">Выбрать</option>
            {users.map(user =>
              <option key={user.id}
                      value={`${user.firstName} ${user.lastName}`}>{user.firstName} {user.lastName}</option>
            )}
          </select>
        </p>
        <p>
          <input placeholder='Адрес ПВЗ' value={address} onChange={e => setAddress(e.target.value)} />
        </p>
        <p>
          Тип ПВЗ
          <select required value={typePVZ} onChange={e => setTypePVZ(e.target.value)}>
            <option>Выбрать</option>
            {typePVZs.map(pvz =>
              <option key={pvz} value={pvz}>{pvz}</option>
            )}
          </select>
          <button type='submit'>Добавить ПВЗ</button>
        </p>
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
              {companies.map((company) => (
                <TableRow key={company.id}>
                  {columns.map(column =>
                    <TableCell key={column} align="center" colSpan={3}>
                      {company[column]}
                    </TableCell>
                  )}
                  <TableCell align="center" colSpan={3}>
                    {
                      company.Users.map(user =>
                      `${user.firstName}  ${user.lastName}`
                    )}
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    {
                      company.Users.map(user => user.phone_number)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ListPvz;