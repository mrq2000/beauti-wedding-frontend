import { Routes, Route, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ThemeProvider from '@/theme';
// import useAppStore from '@/stores/useAppStore';
import MainLayout from '@/components/layout/MainLayout';
import Home from '@/pages/Home';
import Demo from '@/pages/EditorDemo/Demo';
import EditorDemo from './pages/EditorDemo/EditorDemo';
import { GlobalStyle } from './utils/GlobalStyle';

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
      <Route path="/demo" element={<Demo />} />
      <Route path="/editor" element={<EditorDemo />} />
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
      <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
        <ThemeProvider mode={'light'}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default App;
