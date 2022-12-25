import { Alert, Card } from '@mui/material';
import { useLocation } from 'react-router-dom';
import * as Sentry from '@sentry/react';
const ErrorFallback = () => {
  return (
    <Card sx={{ p: 3 }}>
      <Alert severity="error">Something went wrong!</Alert>
    </Card>
  );
};

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundaryWrap = ({ children }: IErrorBoundaryProps) => {
  const { pathname } = useLocation();
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Sentry.ErrorBoundary fallback={ErrorFallback} key={pathname}>
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default ErrorBoundaryWrap;
