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
import StatusMaintenance from '@pages/Status/Maintenance';

import React from 'react';
import { buildAbilityFor } from '@services/casl/ability';
import { AbilityContext } from '@services/casl/can';
import AlertSnackbar from '@components/SnackBar';

function App() {
  const content = useRoutes(routers);
  const [ability, seAbility] = React.useState(buildAbilityFor('member'));
  const role = localStorage.getItem('role');
  React.useEffect(() => {
    seAbility(buildAbilityFor((role || '').toString()));
  }, [role]);
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
              <AlertSnackbar />
              <AbilityContext.Provider value={ability}>{content}</AbilityContext.Provider>
            </LocalizationProvider>
          </JWTProvider>
        </ErrorBoundary>
      </HelmetProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
