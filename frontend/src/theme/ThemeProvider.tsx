import React, { ReactNode, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { StylesProvider } from '@mui/styles';
import { themeCreator } from './base';
import { ThemeContext } from '@emotion/react';

interface ThemeProviderProps {
  children: ReactNode;
}
const ThemeProviderWrapper = (props: ThemeProviderProps) => {
  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  const [themeName, setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};
export default ThemeProviderWrapper;
