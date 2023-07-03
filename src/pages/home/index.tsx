import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';

import DesignTab from './DesignTab';

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
  return (
    <>
      <Box mt={4} mb={{ xs: 2, sm: 5, lg: 6 }}>
        <Typography variant="h3">Thiệp cưới</Typography>
        <Typography variant="caption">
          Danh sách thiệp cưới bạn đã tạo. Bạn có thể tạo bao nhiêu thiệp tùy thích.
        </Typography>
      </Box>

      <Box pb={2}>
        <DesignTab />
      </Box>
    </>
  );
};

export default Home;
