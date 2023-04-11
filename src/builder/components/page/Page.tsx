import React, { FC } from 'react';
import { BuilderComponent } from '@/builder/interface';
import { Box } from '@mui/material';

export const Page: BuilderComponent = ({ children, id }) => {
  return (
    <Box>
      child {children} {id}
    </Box>
  );
};

Page.defaultProps = {};

Page.settings = {
  displayName: 'Page',
  options: [],
};
