import React, { FC } from 'react';
import { Typography, Box } from '@mui/material';

import DesignTab from './DesignTab';

const Home: FC = () => {
  return (
    <>
      <Box mt={4} mb={{ xs: 2, sm: 5, lg: 6 }}>
        <Typography variant="h3">Thiệp cưới</Typography>
        <Typography variant="caption" fontSize={14}>
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
