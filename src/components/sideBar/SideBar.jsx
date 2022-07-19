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

  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <li className="sidebarListItem active" onClick={() => navigate('')}>
              <HomeIcon className="sidebarIcon" />
              Сводка
            </li>
            <li className="sidebarListItem" onClick={() => navigate('data-upload')}>
              <CloudUploadIcon className="sidebarIcon" />
              Загрузка данных
            </li>
            <li className="sidebarListItem" onClick={() => navigate('pvz-list')}>
              <ListAltIcon className="sidebarIcon" />
              Список ПВЗ
            </li>
            <li className="sidebarListItem" onClick={() => navigate('pvz-revenue')}>
              <TrendingUpIcon className="sidebarIcon" />
              Доходы ПВЗ
            </li>
            <li className="sidebarListItem" onClick={() => navigate('pvz-revenue')}>
              <TrendingDownIcon className="sidebarIcon" />
              Расходы
            </li>
            <li className="sidebarListItem" onClick={() => navigate('pvz-revenue')}>
              <CurrencyRubleIcon className="sidebarIcon" />
              Бухгалтерия
            </li>
            <li className="sidebarListItem" onClick={() => navigate('users')}>
              <GroupIcon className="sidebarIcon" />
              Сотрудники
            </li>
            <li className="sidebarListItem" onClick={() => navigate('pvz-revenue')}>
              <LocalGroceryStoreIcon className="sidebarIcon" />
              Магазин
            </li>
            <li className="sidebarListItem" onClick={() => navigate('pvz-revenue')}>
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