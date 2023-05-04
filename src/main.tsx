import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { BrowserTracing } from '@sentry/tracing';
// import * as Sentry from '@sentry/react';

import App from './App';
// import packageJson from '../package.json';

// if (import.meta.env.REACT_APP_ENV === 'mainnet') {
//   Sentry.init({
//     release: `${packageJson.version}`,
//     dsn: import.meta.env.REACT_APP_SENTRY_DSN, //paste copied DSN value here
//     integrations: [new BrowserTracing()],
//     tracesSampleRate: 1, //lower the value in production
//   });
// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
