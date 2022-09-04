import sidebarStyle from './sidebar.module.css'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HomeIcon from '@mui/icons-material/Home';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import GroupIcon from '@mui/icons-material/Group';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import SettingsIcon from '@mui/icons-material/Settings';
import {NavLink} from "react-router-dom";
import React from 'react'

const Sidebar = () => {

  return (
    <div className={sidebarStyle.sidebar}>
      <div className={sidebarStyle.sidebarWrapper}>
        <nav className={sidebarStyle.sidebarMenu}>
          <menu className={sidebarStyle.sidebarList}>
            <li>
              <NavLink className={sidebarStyle.sidebarListItem} to='/account'>
                <HomeIcon className={sidebarStyle.sidebarIcon} />
                Сводка
              </NavLink>
            </li>
            <li>
              <NavLink className={(navData) => (navData.isActive ? `${sidebarStyle.sidebarListItem} ${sidebarStyle.active}` : `${sidebarStyle.sidebarListItem}`)} to='/account/data-upload'>
                <CloudUploadIcon className={sidebarStyle.sidebarIcon} />
                Загрузка данных
              </NavLink>
            </li>
            <li>
              <NavLink className={(navData) => (navData.isActive ? `${sidebarStyle.sidebarListItem} ${sidebarStyle.active}` : `${sidebarStyle.sidebarListItem}`)} to='/account/pvz-list'>
                <ListAltIcon className={sidebarStyle.sidebarIcon} />
                Список ПВЗ
              </NavLink>
            </li>
            <li>
              <NavLink className={(navData) => (navData.isActive ? `${sidebarStyle.sidebarListItem} ${sidebarStyle.active}` : `${sidebarStyle.sidebarListItem}`)} to='/account/pvz-revenue'>
                <TrendingUpIcon className={sidebarStyle.sidebarIcon} />
                Доходы ПВЗ
              </NavLink>
            </li>
            <li className={sidebarStyle.disabled}>
              <NavLink className={(navData) => (navData.isActive ? `${sidebarStyle.sidebarListItem} ${sidebarStyle.active}` : `${sidebarStyle.sidebarListItem}`)} to='/account/expenses' >
                <TrendingDownIcon className={sidebarStyle.sidebarIcon} />
                Расходы
              </NavLink>
            </li>
            <li className={sidebarStyle.disabled}>
              <NavLink className={(navData) => (navData.isActive ? `${sidebarStyle.sidebarListItem} ${sidebarStyle.active}` : `${sidebarStyle.sidebarListItem}`)} to='/account/accounting' >
                <CurrencyRubleIcon className={sidebarStyle.sidebarIcon} />
                Бухгалтерия
              </NavLink>
            </li>
            {sessionStorage.getItem('user_role') === 'owner' ?
            <>
              <li className={sidebarStyle.disabled}>
                <NavLink className={(navData) => (navData.isActive ? `${sidebarStyle.sidebarListItem} ${sidebarStyle.active}` : `${sidebarStyle.sidebarListItem}`)} to='/own/users' >
                <GroupIcon className={sidebarStyle.sidebarIcon} />
                Сотрудники
                </NavLink>
              </li>
              <li className={sidebarStyle.disabled}>
                <NavLink className={(navData) => (navData.isActive ? `${sidebarStyle.sidebarListItem} ${sidebarStyle.active}` : `${sidebarStyle.sidebarListItem}`)} to='/own/store'>
                <LocalGroceryStoreIcon className={sidebarStyle.sidebarIcon} />
                Магазин
                </NavLink>
              </li>
            </>: null }
            <li className={sidebarStyle.disabled}>
              <NavLink className={(navData) => (navData.isActive ? `${sidebarStyle.sidebarListItem} ${sidebarStyle.active}` : `${sidebarStyle.sidebarListItem}`)} to='/account/settings' >
                <SettingsIcon className={sidebarStyle.sidebarIcon} />
                Настройки Avis
              </NavLink>
            </li>
          </menu>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;