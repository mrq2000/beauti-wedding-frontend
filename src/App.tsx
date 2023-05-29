import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ThemeProvider from '@/theme';
// import useAppStore from '@/stores/useAppStore';
import { GlobalStyle } from '@/utils/GlobalStyle';

import Home from '@/pages/Home';
import Demo from '@/pages/invitation-design/Demo';
import InvitationDesignPage from '@/pages/invitation-design/InvitationDesignPage';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import AuthOutlet from '@/pages/auth/AuthOutlet';

import './App.css';
import PrivateOutlet from './PrivateOutlet';
import CreateDesignPage from './pages/create-design/CreateDesignPage';
import Page404 from './components/error-page/Page404';

const Router = () => {
  return (
    <Routes>
      <Route path="" element={<PrivateOutlet />}>
        <Route index element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/designs/:id" element={<InvitationDesignPage />} />
        <Route path="/get-started" element={<CreateDesignPage />} />
      </Route>

      <Route path="" element={<AuthOutlet />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>

      <Route path="*" element={<Page404 />} />
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
