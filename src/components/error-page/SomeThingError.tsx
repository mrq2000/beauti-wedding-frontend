import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';

const SomeThingError: FC = () => {
  return (
    <Box display="flex" flex={1} flexDirection="column" alignItems="center" justifyContent="center">
      <Typography mt={5} color="error" fontSize={16}>
        Something Error
      </Typography>
    </Box>
  );
};

export default SomeThingError;
