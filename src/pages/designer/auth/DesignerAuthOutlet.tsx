import React from 'react';
import { CardContent, Card, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import logo from '@/assets/logo.png';

const BACKGROUND_IMG = 'https://taothiepcuoi.s3.ap-southeast-1.amazonaws.com/taothiepcuoi/background_v1.jpg';

const DesignerAuthOutlet = () => {
  return (
    <Box display="flex" height="100%" flex={1} alignItems="center" justifyContent="center">
      <Box
        sx={{
          backgroundImage: `url('${BACKGROUND_IMG}')`,
          backgroundSize: 'cover',
          height: '100vh',
          width: '100vw',
          position: 'fixed',
          filter: 'contrast(0.9)',
        }}
      />
      <Card
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          pb: '20px',
          maxWidth: '400px',
          boxShadow: '-11px 11px 8px #00000020',
        }}
      >
        <CardContent sx={{ px: 4, pt: 0 }}>
          <Box
            component="img"
            src={logo}
            alt="logo"
            sx={{
              width: '100%',
              padding: 3,
              py: 0,
            }}
          />
          <Box
            sx={{ textAlign: 'center', fontSize: 14, color: (theme) => theme.palette.grey[700], fontWeight: 'bold' }}
            mb={2.5}
          >
            DESIGNER MODE
          </Box>

          <Box>
            <Outlet />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DesignerAuthOutlet;
