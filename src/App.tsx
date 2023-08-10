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

import Home from '@/pages/home';
import Demo from '@/pages/invitation-design/Demo';
import InvitationDesignPage from '@/pages/invitation-design';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import AuthOutlet from '@/pages/auth/AuthOutlet';
import SettingDesign from '@/pages/setting-design';
import CreateDesignPage from '@/pages/create-design';
import LivePage from '@/pages/live';

import './App.css';
import PrivateOutlet from './PrivateOutlet';
import Page404 from '@/components/error-page/Page404';
import MainLayoutOutlet from '@/components/layout/MainLayoutOutlet';
import TemplatePreview from '@/pages/template-preview';
import BuyCoffee from '@/pages/coffee';
import SettingTab from '@/pages/home/SettingTab';

import DesignerAuthOutlet from '@/pages/designer/auth/DesignerAuthOutlet';
import DesignerSignIn from '@/pages/designer/auth/SignIn';
import PrivateDesignerOutlet from './PrivateDesignerOutlet';
import HomeDesigner from '@/pages/designer/Home';
import MainLayoutDesignerOutlet from '@/pages/designer/layout/MainLayoutOutlet';
import EditTemplate from './pages/designer/EditTemplate';

const Router = () => {
  return (
    <Routes>
      <Route path="" element={<PrivateOutlet />}>
        <Route path="" element={<MainLayoutOutlet showFooter={true} />}>
          <Route index element={<Home />} />
          <Route path="/setting" element={<SettingTab />} />
        </Route>

        <Route path="" element={<MainLayoutOutlet showFooter={false} />}>
          <Route path="/design-setting/:designId" element={<SettingDesign />} />
          <Route path="/get-started" element={<CreateDesignPage />} />
        </Route>

        <Route path="/designs/:designId" element={<InvitationDesignPage />} />
        <Route path="/demo" element={<Demo />} />
      </Route>

      <Route path="" element={<AuthOutlet />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>

      <Route path="" element={<DesignerAuthOutlet />}>
        <Route path="/designer/sign-in" element={<DesignerSignIn />} />
      </Route>
      <Route path="/designer/templates/:templateId" element={<EditTemplate />} />

      <Route path="" element={<PrivateDesignerOutlet />}>
        <Route path="" element={<MainLayoutDesignerOutlet showFooter={true} />}>
          <Route path="/designer" element={<HomeDesigner />} />
        </Route>
      </Route>

      <Route path="/templates/:templateId" element={<TemplatePreview />} />
      <Route path="/live/:designDomain/:receiverId" element={<LivePage />} />
      <Route path="/buy-coffee" element={<BuyCoffee />} />

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
