import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from './Header';
import ErrorBoundaryWrap from '../common/ErrorBoundary';

const MainLayout = ({ children }: any) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: { xs: 'calc(100vh - 56px)', md: 'calc(100vh - 72px)' },
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

            <Box component="main" flexGrow={1} pb={12} pt={2.5}>
              <Container maxWidth="xl">
                <ErrorBoundaryWrap>{children}</ErrorBoundaryWrap>
              </Container>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
