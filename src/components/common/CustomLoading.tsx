import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';

const CustomLoading: FC = () => {
  return (
    <Box display="flex" flex={1} flexDirection="column" alignItems="center" justifyContent="center">
      <Box display="flex" gap={5}>
        <div className="loading-1" />
        <div className="loading-2" />
        <div className="loading-3" />
      </Box>
      <Typography mt={5} variant="caption" fontSize={16}>
        Loading...
      </Typography>
    </Box>
  );
};

export default CustomLoading;
