import React, {useEffect, useState} from 'react';
import uploadStyle from './upload-data.module.css'
import * as XLSX from "xlsx";
import _ from 'lodash'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from '@mui/material/Paper';

function contractFinder(text) {
  const regExContract = /^(к договору)/gi;
  const myCell = text.M10.v || text.M11.v

  if(myCell && myCell.match(regExContract)) {
    const [contractNumber, agreementDate] = [myCell.split(' ')[2] + myCell.split(' ')[3], myCell.split(' ')[5]]
    return {contractNumber, agreementDate}
  }
}

function totalAmount(data) {
  let tempTotalAmount = _.findKey(data, function(o) {return o.__EMPTY_1 === 'Итого' && o.__EMPTY_7})
  return data[tempTotalAmount].__EMPTY_7
}

function tariffRatesFinder(datas) {
  let tempValueClient = _.findKey(datas, function(o) {return o.__EMPTY_4 === 'Возврат от субагента (клиентский возврат)' })
  let tempValueCashless = _.findKey(datas, function(o) {return o.__EMPTY_4 === 'За прием безналичной оплаты от Клиентов' })
  let tempValueRefundFull = _.findKey(datas, function(o) {return o.__EMPTY_4 === 'Возврат от субагента (полный возврат)' })
  let tempValueCash = _.findKey(datas, function(o) {return o.__EMPTY_4 === 'За прием наличной оплаты от Клиентов' })

  const [refundClient, cashless, refundFull, cash] = [datas[tempValueClient].__EMPTY_16,
    datas[tempValueCashless].__EMPTY_16,
    datas[tempValueRefundFull].__EMPTY_16,
    datas[tempValueCash].__EMPTY_16, ]

  return {refundClient, cashless, refundFull, cash}
}


const UploadData = () => {

  const [yandexFileName, setYandexFileName] = useState(null)
  const [droppoffFileName, setDroppoffFileName] = useState(null)
  const [ozonFileName, setOzonFileName] = useState(null)
  const [results, setResults] = useState({})
  const acceptableFileName = ['xlsx', 'xls']
  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split('.').pop().toLowerCase())
  }

  const [yandexPvzName, setYandexPvzName] = useState([])
  const [yandexHeaders, setYandexHeaders] = useState(['Номер заказа', 'Тип заказа', 'Пункт выдачи', 'Срок хранения', 'Статус', 'Дата поступления', 'Дата выдачи', 'Тип оплаты', 'Сумма заказа', 'Число мест', 'Места'])
  const [droppoffHeaders, setDroppoffHeaders] = useState(['Номер заказа', 'Дата приёмки', 'Время приёмки', 'Дата отгрузки', 'Время отгрузки', 'Номер ячейки', 'Курьер', 'Статус', 'Склад', 'Кладовщик', 'Количество посылок'])
  const [yandexValues, setYandexValues] = useState([])
  const [droppoffValues, setDroppoffValues] = useState([])
  const [tableHeaders, setTableHeaders] = useState([])
  const [mainValuesOfSecondSheet, setMainValuesOfSecondSheet] = useState([])


  const onChangeYandex = (e) => {
    const file = e.target.files[0];
    if(!file) return
    if(!checkFileName(file.name)) {
      alert('Недопустимый формат загружаемого файла.')
    }
    setYandexFileName(file.name)
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws)

      let myArr = []
      for(let i = 1; i < data.length; i++) {
        myArr.push(data[i])
      }
      setYandexPvzName(Array.from(new Set (myArr.map(el => el['Пункт выдачи']))))
      setYandexValues(myArr)
    };
    reader.readAsBinaryString(file);
  }

  const onChangeDroppoff = (e) => {
    const file = e.target.files[0];
    if(!file) return
    if(!checkFileName(file.name)) {
      alert('Недопустимый формат загружаемого файла.')
    }
    setDroppoffFileName(file.name)
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws)

      let myArr = []
      for(let i = 1; i < data.length; i++) {
        myArr.push(data[i])
      }
      setDroppoffValues(myArr)
    };
    reader.readAsBinaryString(file);
  }

  const onChangeOzon = (e) => {
    const file = e.target.files[0];
    if(!file) return
    if(!checkFileName(file.name)) {
      alert('Недопустимый формат загружаемого файла.')
    }
    setOzonFileName(file.name)
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const [sheet1, sheet2, sheet3] = [wb.SheetNames[0], wb.SheetNames[1], wb.SheetNames[2]];
      const [ws1, ws2, ws3] = [wb.Sheets[sheet1], wb.Sheets[sheet2], wb.Sheets[sheet3]];
      const [data_list_1, data_list_2, data_list_3] = [XLSX.utils.sheet_to_json(ws1), XLSX.utils.sheet_to_json(ws2), XLSX.utils.sheet_to_json(ws3)]

      const dataSheet1 = {
        entity: ws1.M14.v,
        ...contractFinder(ws1),
        startOfReport: ws1.I29.v,
        endOfReport: ws1.J29.v,
        totalAmount: totalAmount(data_list_1),
        tariffRate: ws1.L29.v,
        ...tariffRatesFinder(data_list_1)
      }

      setResults({
        ...dataSheet1
      })

      // Название полей
      setTableHeaders(Object.values(data_list_2[2]))
      // остальные поля
      let myArr = []
      for (let i = 5; i < data_list_2.length; i++) {
        if(data_list_2[i].__EMPTY_3 && data_list_2[i].__EMPTY_5 && data_list_2[i].__EMPTY_20 && data_list_2[i].__EMPTY_60) myArr.push(data_list_2[i])
      }
      setMainValuesOfSecondSheet(myArr)

      // Все данные
      // console.log(data_list_2)
    };
    reader.readAsBinaryString(file);
  }

  return (
    <section className={uploadStyle.account}>
      <h1 className={uploadStyle.h1}>Загрузка данных по работе ПВЗ</h1>
      <div className={uploadStyle.main}>
        <article>
          <label className={uploadStyle.yandex_btns} htmlFor={uploadStyle.upload_yandex}>
            <figure>
              <img className={uploadStyle.icons} src={'/images/yandex_logo.jpeg'} width={40} height={40} alt='ya_total' />
              <figcaption>Файл заказов Яндекс.Маркет</figcaption>
            </figure>
          </label>
          <input id={uploadStyle.upload_yandex} type="file" onChange={onChangeYandex} accept='xlsx, xls' multiple={false} name="ya_total" />
        </article>
        <article>
          <label className={uploadStyle.yandex_btns} htmlFor={uploadStyle.upload_ya_droppoff}>
            <figure>
              <img className={uploadStyle.icons} src={'/images/yandex_logo.jpeg'} width={40} height={40} alt='ya_droppoff' />
              <figcaption>Файл дропофф Яндекс.Маркет</figcaption>
            </figure>
          </label>
          <input id={uploadStyle.upload_ya_droppoff} type="file" onChange={onChangeDroppoff} accept='xlsx, xls' multiple={false} name="ya_droppoff" />
        </article>
        <article>
          <label id={uploadStyle.ozon} htmlFor={uploadStyle.upload_ozon}>
            <figure>
              <img className={uploadStyle.icons} src={'/images/ozon_logo.png'} width={40} height={40} alt='ozon' />
              <figcaption>Файл Озон</figcaption>
            </figure>
          </label>
          <input type="file" onChange={onChangeOzon} accept='xlsx, xls' multiple={false} name="photo" id={uploadStyle.upload_ozon}  />
        </article>
      </div>

      <hr/>
      <h3>Yandex:</h3>
      <article>
        <h4>
          <u>Название документа</u> - {yandexFileName}
        </h4>
        <p>Список ПВЗ:</p>
        {
          yandexPvzName && yandexPvzName.length > 0 ?
              yandexPvzName.map(name => (
              <li key={name}>{name}</li>
              ))
          :
          null
        }

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {yandexHeaders.map(el => (
                  <TableCell key={el}>{el}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {yandexValues.map(row => (
                <TableRow
                  key={row[yandexHeaders[0]]}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row[yandexHeaders[0]]}</TableCell>
                  <TableCell>{row[yandexHeaders[1]]}</TableCell>
                  <TableCell>{row[yandexHeaders[2]]}</TableCell>
                  <TableCell>{row[yandexHeaders[3]]}</TableCell>
                  <TableCell>{row[yandexHeaders[4]]}</TableCell>
                  <TableCell>{row[yandexHeaders[5]]}</TableCell>
                  <TableCell>{row[yandexHeaders[6]]}</TableCell>
                  <TableCell>{row[yandexHeaders[7]]}</TableCell>
                  <TableCell>{row[yandexHeaders[8]]}</TableCell>
                  <TableCell>{row[yandexHeaders[9]]}</TableCell>
                  <TableCell>{row[yandexHeaders[10]]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </article>

      <hr/>
      <h3>Яндекс дропофф заказы</h3>
      <article>
        <h4><u>Название документа</u> - {droppoffFileName}</h4>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {droppoffHeaders.map(el => (
                  <TableCell key={el}>{el}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {droppoffValues.map(row => (
                <TableRow
                  key={row[droppoffHeaders[0]]}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row[droppoffHeaders[0]]}</TableCell>
                  <TableCell>{row[droppoffHeaders[1]]}</TableCell>
                  <TableCell>{row[droppoffHeaders[2]]}</TableCell>
                  <TableCell>{row[droppoffHeaders[3]]}</TableCell>
                  <TableCell>{row[droppoffHeaders[4]]}</TableCell>
                  <TableCell>{row[droppoffHeaders[5]]}</TableCell>
                  <TableCell>{row[droppoffHeaders[6]]}</TableCell>
                  <TableCell>{row[droppoffHeaders[7]]}</TableCell>
                  <TableCell>{row[droppoffHeaders[8]]}</TableCell>
                  <TableCell>{row[droppoffHeaders[9]]}</TableCell>
                  <TableCell>{row[droppoffHeaders[10]]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </article>

      <hr/>
      <h3>Ozon:</h3>
      <article>
        <h4><u>Название документа</u> - {ozonFileName}</h4>
        <h4>Страница 1</h4>
        <p>
          Юр.лицо - {results.entity}<br/>
          Номер договора - {results.contractNumber}<br/>
          Дата заключения договора - {results.agreementDate}<br/>
          Период отчета С - {results.startOfReport}<br/>
          Период отчета ДО - {results.endOfReport}<br/>
          Общая сумма вознаграждения - {results.totalAmount}<br/>
          Тарифная ставка - {results.tariffRate} <br/>
          Возврат от субагента (клиентский возврат) - {results.refundClient} <br/>
          Возврат от субагента (полный возврат) - {results.refundFull} <br/>
          За прием безналичной оплаты от Клиентов - {results.cashless} <br/>
          За прием наличной оплаты от Клиентов - {results.cash} <br/>
        </p>
      </article>
      <article>
        <h4>Страница 2</h4>
        <h5>ПВЗ - </h5>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeaders.map(el => (
                  <TableCell key={el}>{el}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {mainValuesOfSecondSheet.map(row => (
                <TableRow
                  key={row.__EMPTY_3}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.__EMPTY_3}</TableCell>
                  <TableCell>{row.__EMPTY_5}</TableCell>
                  <TableCell>{row.__EMPTY_7}</TableCell>
                  <TableCell>{row.__EMPTY_10}</TableCell>
                  <TableCell>{row.__EMPTY_14}</TableCell>
                  <TableCell>{row.__EMPTY_16}</TableCell>
                  <TableCell>{row.__EMPTY_20}</TableCell>
                  <TableCell>{row.__EMPTY_23}</TableCell>
                  <TableCell>{row.__EMPTY_27}</TableCell>
                  <TableCell>{row.__EMPTY_31}</TableCell>
                  <TableCell>{row.__EMPTY_37}</TableCell>
                  <TableCell>{row.__EMPTY_41}</TableCell>
                  <TableCell>{row.__EMPTY_45}</TableCell>
                  <TableCell>{row.__EMPTY_49}</TableCell>
                  <TableCell>{row.__EMPTY_53}</TableCell>
                  <TableCell>{row.__EMPTY_57}</TableCell>
                  <TableCell>{row.__EMPTY_60}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </article>
    </section>
  );
};

export default UploadData;
