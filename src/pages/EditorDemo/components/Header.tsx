import { Box } from '@mui/material';
import React, { FC } from 'react';
import { VIEW_MODE } from '../EditorDemo';

interface HeaderProps {
  viewMode: VIEW_MODE;
}
export const HEADER_HEIGHT = 56;

const Header: FC<HeaderProps> = ({ viewMode }) => {
  return (
    <Box
      sx={{
        height: HEADER_HEIGHT,
        zIndex: 1000,
        paddingX: '24px',
        background: 'white',
        position: 'fixed',
        width: '100%',
        borderBottom: '1px solid #D5D8DF',
      }}
    ></Box>
  );
};

export default Header;
