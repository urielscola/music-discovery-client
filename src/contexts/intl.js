import React, { createContext, useState, useCallback, useContext } from 'react';
import { IntlProvider as Provider } from 'react-intl';
import { languagesObject, defaultLanguage } from '../lang/languages';

const IntlContext = createContext({});
export const useIntlContext = () => useContext(IntlContext);

const getLanguage = () => {
  const browserLanguage = navigator.language.split(/[-_]/)[0];
  if (languagesObject[browserLanguage]) return languagesObject[browserLanguage];
  return defaultLanguage;
};

export const IntlProvider = ({ children }) => {
  const initialLanguage = getLanguage();
  const [locale, setLocale] = useState(initialLanguage.locale);
  const [messages, setMessages] = useState(initialLanguage.messages);

  const changeLocale = useCallback(language => {
    setLocale(languagesObject[language].locale);
    setMessages(languagesObject[language].messages);
  }, []);

  return (
    <Provider locale={locale} messages={messages} key={locale}>
      <IntlContext.Provider value={{ changeLocale }}>
        {children}
      </IntlContext.Provider>
    </Provider>
  );
};
