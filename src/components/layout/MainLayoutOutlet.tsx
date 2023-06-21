import { FC } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import ErrorBoundaryWrap from '@/components/common/ErrorBoundary';
import Header, { HEADER_HEIGHT } from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayoutOutlet: FC = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Box display="flex" flex={1}>
          <Box
            display="flex"
            flex={1}
            flexDirection="column"
            sx={{
              width: '100%',
              backgroundColor: (theme) => theme.palette.background.default,
              overflow: 'hidden',
            }}
          >
            <Header />

            <Box
              component="main"
              flexGrow={1}
              pt={`${HEADER_HEIGHT}px`}
              display="flex"
              flex={1}
              pb={2}
              sx={{ overflowY: 'auto' }}
            >
              <Container maxWidth="xl">
                <ErrorBoundaryWrap>
                  <Outlet />
                </ErrorBoundaryWrap>
              </Container>
            </Box>

            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MainLayoutOutlet;
