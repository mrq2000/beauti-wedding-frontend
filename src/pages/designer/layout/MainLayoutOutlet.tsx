import { FC } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

import ErrorBoundaryWrap from '@/components/common/ErrorBoundary';
import Header, { HEADER_HEIGHT } from './Header';
import Footer from './Footer';

interface MainLayoutOutlet {
  showFooter?: boolean;
}

const MainLayoutOutlet: FC<MainLayoutOutlet> = ({ showFooter }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Box display="flex" flex={1} height="100%">
          <Box
            display="flex"
            flex={1}
            flexDirection="column"
            sx={{
              width: '100%',
              backgroundColor: (theme) => theme.palette.background.default,
              overflow: 'hidden',
              height: '100%',
            }}
          >
            <Header />

            <Box
              component="main"
              flexGrow={1}
              mt={`${HEADER_HEIGHT}px`}
              display="flex"
              flex={1}
              sx={{ overflowY: 'auto' }}
            >
              <Container maxWidth="xl" sx={{ height: '100%' }}>
                <ErrorBoundaryWrap>
                  <Outlet />
                </ErrorBoundaryWrap>
              </Container>
            </Box>

            {showFooter && <Footer />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MainLayoutOutlet;
