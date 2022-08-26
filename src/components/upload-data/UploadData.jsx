import React, {useState} from 'react';
import uploadStyle from './upload-data.module.css'
import * as XLSX from "xlsx";
import _ from 'lodash'

function contractFinder(text) {
  const regExContract = /^(к договору)/gi;
  const myCell = text.M10.v || text.M11.v

  if(myCell && myCell.match(regExContract)) {
    const [contractNumber, agreementDate] = [myCell.split(' ')[2] + myCell.split(' ')[3], myCell.split(' ')[5]]
    return {contractNumber, agreementDate}
  }
}

function totalAmount(datas) {
  let tempTotalAmount = _.findKey(datas, function(o) {return o.__EMPTY_1 === 'Итого' && o.__EMPTY_7})
  return datas[tempTotalAmount].__EMPTY_7
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

  const [fileName, setFileName] = useState(null)
  const [results, setResults] = useState({})
  const acceptableFileName = ['xlsx', 'xls']
  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split('.').pop().toLowerCase())
  }

  const onChange = (e) => {
    const file = e.target.files[0];
    if(!file) return
    if(!checkFileName(file.name)) {
      alert('Недопустимый формат загружаемого файла.')
    }
    setFileName(file.name)
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const datas = XLSX.utils.sheet_to_json(ws)
      // const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      const dataSheet1 = {
        entity: ws.M14.v,
        ...contractFinder(ws),
        startOfReport: ws.I29.v,
        endOfReport: ws.J29.v,
        totalAmount: totalAmount(datas),
        tariffRate: ws.L29.v,
        ...tariffRatesFinder(datas)
      }

      setResults({
        ...dataSheet1
      })

      // console.log(datas)
      console.log(dataSheet1)
      // console.log('totalAmount is -> ', totalAmount(datas))
    };
    reader.readAsBinaryString(file);
  }

  return (
    <section className={uploadStyle.account}>
      <h1 className={uploadStyle.h1}>Загрузка данных по работе ПВЗ</h1>
      <label id={uploadStyle.ozon} htmlFor={uploadStyle.upload_ozon}>
        <figure>
          <img className={uploadStyle.icons} src={'/images/yandex_logo.jpeg'} width={40} height={40} alt='ozon' />
          <figcaption>Файл Озон</figcaption>
        </figure>
      </label>
      <input type="file" onChange={onChange} accept='xlsx, xls' multiple={false} name="photo" id={uploadStyle.upload_ozon} />
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
    </section>
  );
};

export default UploadData;