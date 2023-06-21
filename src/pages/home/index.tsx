import React, { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import DesignTab from './DesignTab';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const DEFAULT_TAB = 'settings';

export const TABS = {
  [DEFAULT_TAB]: {
    title: 'Thiệp cưới',
    subtitle: 'Danh sách thiệp cưới bạn đã tạo. Bạn có thể tạo bao nhiêu thiệp tùy thích.',
    key: 'DESIGNS',
    icon: BrushRoundedIcon,
    element: DesignTab,
  },
};
const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(searchParams.get('tab') || DEFAULT_TAB);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const currentTab = TABS[tab] || TABS[DEFAULT_TAB];
  return (
    <>
      <Box mt={4} mb={{ xs: 2, sm: 5, lg: 6 }}>
        <Typography variant="h3">{currentTab.title}</Typography>
        <Typography variant="caption">{currentTab.subtitle}</Typography>
      </Box>

      <currentTab.element />
    </>
  );
};

export default Home;
