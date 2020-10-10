import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Grid, FlexDiv, Icon, Text } from 'components';
import { useAuthContext } from 'contexts';
import * as Styles from './styles';

const Header = () => {
  const intl = useIntl();
  const { logout } = useAuthContext();

  return (
    <Styles.Container>
      <Grid.Container>
        <FlexDiv justifyContent="space-between" alignItems="center">
          <Link to="/" title="Music">
            <Icon variant="music" size={45} color="#fff" />
          </Link>
          <Text onClick={logout}>
            {intl.formatMessage({ id: 'header.logout' })}
          </Text>
        </FlexDiv>
      </Grid.Container>
    </Styles.Container>
  );
};

export default memo(Header);
