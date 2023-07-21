import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const HomeLabel: FC = () => {
  return (
    <Link to="https://www.taothiepcuoi.com/" target="_blank" style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          padding: { xs: '8px 12px', md: '12px 16px' },
          borderRadius: '50px',
          bgcolor: '#1f306e',
          boxShadow: '-4px 4px 8px #00000020',
          animation: 'HomeLabel 1s',
          display: 'flex',
          alignItems: 'center',
          color: '#fff',
        }}
      >
        <Typography sx={{ fontSize: { xs: 12, md: 16 }, lineHeight: 1, fontWeight: 600 }}>Powered By&nbsp;</Typography>
        <Typography sx={{ fontSize: { xs: 12, md: 16 }, textDecoration: 'underline', lineHeight: 1 }}>
          taothiepcuoi.com
        </Typography>
      </Box>
    </Link>
  );
};

export default HomeLabel;
