import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from './assets/styles';
import { IntlProvider } from './contexts/intl';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyles />
        <IntlProvider />
      </div>
    </ThemeProvider>
  );
};

export default App;
