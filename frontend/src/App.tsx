import './App.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import routers from './router';
import ThemeProviderWrapper from '@theme/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import JWTProvider from '@layout/Jwt';
import StatusMaintenance from '@pages/error/Maintenance';

function App() {
  const content = useRoutes(routers);

  return (
    <ThemeProviderWrapper>
      <HelmetProvider>
        <ErrorBoundary
          fallback={
            <div>
              <StatusMaintenance />
            </div>
          }
        >
          <JWTProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns as any}>
              <CssBaseline />
              {content}
            </LocalizationProvider>
          </JWTProvider>
        </ErrorBoundary>
      </HelmetProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
