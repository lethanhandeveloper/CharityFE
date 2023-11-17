import './App.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router';

import routers from './router';
import ThemeProviderWrapper from '@theme/ThemeProvider';

function App() {
  const content = useRoutes(routers);
  return (
    <ThemeProviderWrapper>
      <LocalizationProvider dateAdapter={AdapterDateFns as any}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
