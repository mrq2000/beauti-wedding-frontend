import { PropsWithChildren, FC } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import ErrorBoundaryWrap from '@/components/common/ErrorBoundary';
import Header from './Header';
import Footer from './Footer';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
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

            <Box component="main" flexGrow={1} pb={12} pt={2.5} display="flex" flex={1}>
              <Container maxWidth="xl">
                <ErrorBoundaryWrap>{children}</ErrorBoundaryWrap>
              </Container>
            </Box>

            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
