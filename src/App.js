import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';
import { GlobalStyles, theme } from 'assets/styles';
import { AuthProvider, IntlProvider } from 'contexts';
import { ScrollToTop } from 'components';
import Routes from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div>
          <GlobalStyles />
          <AuthProvider>
            <IntlProvider>
              <SkeletonTheme color="#777" highlightColor="#999">
                <Routes />
              </SkeletonTheme>
            </IntlProvider>
          </AuthProvider>
          <ScrollToTop />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
