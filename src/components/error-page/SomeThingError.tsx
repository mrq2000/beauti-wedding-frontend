import { getErrorMessage } from '@/helpers/error';
import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';

interface SomeThingError {
  error?: any;
}
const SomeThingError: FC<SomeThingError> = ({ error }) => {
  const message = getErrorMessage(error);
  return (
    <Box display="flex" flex={1} flexDirection="column" alignItems="center" justifyContent="center">
      <Typography mt={5} color="error" fontSize={16}>
        {message}
      </Typography>
    </Box>
  );
};

export default SomeThingError;
