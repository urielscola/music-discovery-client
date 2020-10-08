import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from './assets/styles';
import { AuthProvider, IntlProvider } from './contexts';
import Routes from './routes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyles />
        <AuthProvider>
          <IntlProvider>
            <Routes />
          </IntlProvider>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
