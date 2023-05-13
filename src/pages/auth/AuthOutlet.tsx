import React from 'react';
import { Grid, CardContent, Card, Box, Fade } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { Outlet, useLocation } from 'react-router-dom';

import logo from '@/assets/logo.png';

const AuthOutlet = () => {
  const { pathname } = useLocation();

  return (
    <Grid container component="main" sx={{ height: '100vh', backgroundColor: '#333' }}>
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
      >
        Chào mừng bạn đến với thiepcuoi-online.com
      </Grid>

      <Grid
        item
        sm={12}
        md={5}
        flex={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ display: 'flex', height: '100vh' }}
      >
        <TransitionGroup sx={{ width: '80%' }}>
          <Fade
            key={`${pathname}`}
            timeout={{
              appear: 0,
              enter: 700,
              exit: 0,
            }}
          >
            <Card
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                pb: '20px',
                width: '100%',
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
                <Outlet />
              </CardContent>
            </Card>
          </Fade>
        </TransitionGroup>
      </Grid>
    </Grid>
  );
};

export default AuthOutlet;
