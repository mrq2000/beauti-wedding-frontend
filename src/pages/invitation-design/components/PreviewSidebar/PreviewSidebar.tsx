import React, { FC } from 'react';
import AutoAwesomeMotionRoundedIcon from '@mui/icons-material/AutoAwesomeMotionRounded';
import WallpaperRoundedIcon from '@mui/icons-material/WallpaperRounded';

import AnimationSetting from './AnimationSetting';
import Sidebar from '../Sidebar';
import BackgroundSetting from './BackgroundSetting';

const SIDEBAR_TABS = [
  {
    id: 'animation',
    icon: <AutoAwesomeMotionRoundedIcon />,
    tooltipTitle: 'Hoạt ảnh chuyển trang',
    element: <AnimationSetting />,
  },
  {
    id: 'background',
    icon: <WallpaperRoundedIcon />,
    tooltipTitle: 'Ảnh nền',
    element: <BackgroundSetting />,
    hasApi: true,
  },
];

const PreviewSidebar: FC = () => {
  return <Sidebar tabs={SIDEBAR_TABS} />;
};

export default PreviewSidebar;
