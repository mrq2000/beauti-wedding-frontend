import React, { FC } from 'react';
import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';

import ElementSetting from '../ElementSetting';
import InfoSetting from './InfoSetting';
import TemplateSetting from './TemplateSetting';
import Sidebar from '../Sidebar';
import Setting from './Setting';

const SIDEBAR_TABS = [
  {
    id: 'info',
    icon: <PermIdentityRoundedIcon />,
    tooltipTitle: 'Thông tin',
    element: <InfoSetting />,
  },
  {
    id: 'element',
    icon: <LibraryAddRoundedIcon />,
    tooltipTitle: 'Thành phần',
    element: <ElementSetting />,
  },
  {
    id: 'template',
    icon: <ViewSidebarRoundedIcon />,
    tooltipTitle: 'Templates',
    element: <TemplateSetting />,
    hasApi: true,
  },
  {
    id: 'setting',
    icon: <SettingsRoundedIcon />,
    tooltipTitle: 'Cài Đặt',
    element: <Setting />,
  },
];

const EditSidebar: FC = () => {
  return <Sidebar tabs={SIDEBAR_TABS} />;
};

export default EditSidebar;
