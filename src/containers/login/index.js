import React, { useEffect, memo } from 'react';
import { useIntl } from 'react-intl';
import { useAlert } from 'react-alert';
import { FlexDiv, Icon, Text } from 'components';
import { theme } from 'assets/styles';
import { LOGIN_ENDPOINT } from 'services';
import { useAuthContext } from 'contexts';
import { getQuery } from 'utils';
import * as Styles from './styles';

const Login = ({ history }) => {
  const intl = useIntl();
  const query = getQuery();
  const alert = useAlert();
  const { login } = useAuthContext();

  useEffect(() => {
    const { token, error } = query;
    if (token) {
      login({ jwt: token });
    }
    if (error) {
      alert.show(intl.formatMessage({ id: 'login.error' }), {
        timeout: 5000,
        type: 'danger'
      });
    }
  }, [intl, alert, query, login, history]);

  return (
    <>
      <Styles.Triangle position="top" />
      <Styles.Triangle position="bottom" />
      <FlexDiv alignItems="center" justifyContent="center" height="100vh">
        <FlexDiv flexDirection="column" alignItems="center">
          <Icon
            variant="music"
            color={theme.white}
            marginBottom="15px"
            size={70}
          />
          <Text size="large" marginBottom="20px">
            {intl.formatMessage({ id: 'login.display' })}
          </Text>
          <Styles.LoginButton
            href={LOGIN_ENDPOINT}
            title={intl.formatMessage({ id: 'login.button' })}
          >
            <FlexDiv alignItems="center" justifyContent="center">
              <Icon
                variant="spotify"
                color={theme.white}
                marginRight="10px"
                size={35}
              />
              <Text size="large" appearence="bold">
                {intl.formatMessage({ id: 'login.button' })}
              </Text>
            </FlexDiv>
          </Styles.LoginButton>
        </FlexDiv>
      </FlexDiv>
    </>
  );
};

export default memo(Login);
