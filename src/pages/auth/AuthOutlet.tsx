import React from 'react';
import { Grid, CardContent, Card, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import logo from '@/assets/logo.png';

const BACKGROUND_IMG = 'https://taothiepcuoi.s3.ap-southeast-1.amazonaws.com/taothiepcuoi/background_v1.jpg';
const AuthOutlet = () => {
  return (
    <Grid container component="main">
      <Box
        sx={{
          height: '100vh',
          backgroundImage: `url('${BACKGROUND_IMG}')`,
          backgroundSize: 'cover',
          width: '100vw',
          position: 'fixed',
          filter: 'contrast(0.9)',
        }}
      />
      <Grid
        item
        md={7}
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          display: { xs: 'none', md: 'flex' },
          height: '100vh',
          textAlign: 'center',
          p: 2,
          fontSize: '60px',
        }}
        className="deepshadow-text"
      ></Grid>

      <Grid
        item
        sm={12}
        md={5}
        flex={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="scrollbar-hide"
        sx={{ display: 'flex', height: '100vh', overflow: 'auto' }}
      >
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
            <Box sx={{ textAlign: 'center', fontSize: 14, color: (theme) => theme.palette.grey[700] }} mb={2.5}>
              Chào mừng bạn đến với taothiepcuoi.com
            </Box>

            <Box>
              <Outlet />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AuthOutlet;
