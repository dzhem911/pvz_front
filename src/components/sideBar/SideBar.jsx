import './sidebar.css';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HomeIcon from '@mui/icons-material/Home';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import GroupIcon from '@mui/icons-material/Group';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import SettingsIcon from '@mui/icons-material/Settings';
import {NavLink, useNavigate} from "react-router-dom";
import React from 'react'

const Sidebar = () => {

  const navigate = useNavigate()

  const myHandler = (path, e ) => {
    e.target.classList.add('active')
    navigate(path)
  }

  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <NavLink className="sidebarListItem active" to='/account'>
              <HomeIcon className="sidebarIcon" />
              Сводка
            </NavLink>
            <NavLink className="sidebarListItem" to='/account/data-upload'>
              <CloudUploadIcon className="sidebarIcon" />
              Загрузка данных
            </NavLink>
            <NavLink className="sidebarListItem" to='/account/pvz-list'>
              <ListAltIcon className="sidebarIcon" />
              Список ПВЗ
            </NavLink>
            <NavLink className="sidebarListItem" to='/account/pvz-revenue'>
              <TrendingUpIcon className="sidebarIcon" />
              Доходы ПВЗ
            </NavLink>
            <NavLink className="sidebarListItem" to='/account/expenses' >
              <TrendingDownIcon className="sidebarIcon" />
              Расходы
            </NavLink>
            <NavLink className="sidebarListItem" to='/account/accounting' >
              <CurrencyRubleIcon className="sidebarIcon" />
              Бухгалтерия
            </NavLink>
            {sessionStorage.getItem('user_role') === 'owner' ?
            <><NavLink className="sidebarListItem" to='/own/users' >
              <GroupIcon className="sidebarIcon" />
              Сотрудники
            </NavLink>
            <NavLink className="sidebarListItem" to='/own/store'>
              <LocalGroceryStoreIcon className="sidebarIcon" />
              Магазин
            </NavLink> </>: null }
            <NavLink className="sidebarListItem" to='/account/settings' >
              <SettingsIcon className="sidebarIcon" />
              Настройки Avis
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;