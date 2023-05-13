import { Routes, Route, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ThemeProvider from '@/theme';
// import useAppStore from '@/stores/useAppStore';
import MainLayout from '@/components/layout/MainLayout';
import { GlobalStyle } from '@/utils/GlobalStyle';

import Home from '@/pages/Home';
import Demo from '@/pages/menu-design/Demo';
import MenuDesignPage from '@/pages/menu-design/MenuDesignPage';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import AuthOutlet from '@/pages/auth/AuthOutlet';

import './App.css';

const LayoutOutlet = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

const Router = () => {
  return (
    <Routes>
      <Route path="" element={<LayoutOutlet />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="" element={<AuthOutlet />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      <Route path="/demo" element={<Demo />} />
      <Route path="/editor" element={<MenuDesignPage />} />
    </Routes>
  );
};

const App = () => {
  // const { isLightMode } = useAppStore();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
        keepPreviousData: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
          <ThemeProvider mode={'light'}>
            <GlobalStyle />
            <Router />
          </ThemeProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default App;
