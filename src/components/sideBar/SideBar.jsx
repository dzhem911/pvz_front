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
import {useNavigate} from "react-router-dom";

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
            <li className="sidebarListItem active" onClick={navigate('/account')}>
              <HomeIcon className="sidebarIcon" />
              Сводка
            </li>
            <li className="sidebarListItem" onClick={(e) => myHandler('/account/data-upload', e)}>
              <CloudUploadIcon className="sidebarIcon" />
              Загрузка данных
            </li>
            <li className="sidebarListItem" onClick={() => navigate('/account/pvz-list')}>
              <ListAltIcon className="sidebarIcon" />
              Список ПВЗ
            </li>
            <li className="sidebarListItem" onClick={() => navigate('/account/pvz-revenue')}>
              <TrendingUpIcon className="sidebarIcon" />
              Доходы ПВЗ
            </li>
            <li className="sidebarListItem">
              <TrendingDownIcon className="sidebarIcon" />
              Расходы
            </li>
            <li className="sidebarListItem">
              <CurrencyRubleIcon className="sidebarIcon" />
              Бухгалтерия
            </li>
            {sessionStorage.getItem('user_role') === 'owner' ?
            <li className="sidebarListItem" onClick={() => navigate('/own/users')}>
              <GroupIcon className="sidebarIcon" />
              Сотрудники
            </li> : null }
            <li className="sidebarListItem">
              <LocalGroceryStoreIcon className="sidebarIcon" />
              Магазин
            </li>
            <li className="sidebarListItem" onClick={() => navigate('/account/settings')}>
              <SettingsIcon className="sidebarIcon" />
              Настройки Avis
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;