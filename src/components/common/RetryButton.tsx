import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';

interface RetryButtonProps {
  onClick: () => void;
  errorMessage?: string;
  loading?: boolean;
}

const RetryButton: FC<RetryButtonProps> = ({ onClick, errorMessage, loading }) => {
  return (
    <Box width="100%" display="flex" p={2} flexDirection="column" justifyContent="center">
      <Typography color="error">{errorMessage || 'Something went wrong !'}</Typography>
      <LoadingButton loading={!!loading} onClick={() => onClick()} variant="contained">
        Retry
      </LoadingButton>
    </Box>
  );
};

export default RetryButton;
