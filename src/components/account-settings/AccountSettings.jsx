import React from 'react';
import accountStyle from './accountsettings.module.css'

const AccountSettings = () => {
  return (
    <div className={accountStyle.account}>
        <p>
          Информация о юридическом лице:
        </p>
        <p>
          Личные данные:
        </p>
    </div>
  );
};

export default AccountSettings;