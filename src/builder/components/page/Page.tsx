import React, { FC } from 'react';
import { Box, Button } from '@mui/material';

export const Page = ({ children }) => {
  return (
    <Box>
      child
      {children}
      child
      <Button >Click</Button>
    </Box>
  );
};

Page.defaultProps = {
  test: 1,
};

Page.settings = {
  displayName: 'Page',
  options: [],
};
