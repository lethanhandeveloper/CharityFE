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

function App() {
  const content = useRoutes(routers);

  return (
    <ThemeProviderWrapper>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <HelmetProvider>
          <JWTProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns as any}>
              <CssBaseline />
              {content}
            </LocalizationProvider>
          </JWTProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </ThemeProviderWrapper>
  );
}

export default App;
