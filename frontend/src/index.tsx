import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeProviderWrapper from '@theme/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProviderWrapper>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
