import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Grid, FlexDiv, Icon } from 'components';
import * as Styles from './styles';

const Header = () => {
  return (
    <Styles.Container>
      <Grid.Container>
        <FlexDiv>
          <Link to="/" title="Music">
            <Icon variant="music" size={45} color="#fff" />
          </Link>
        </FlexDiv>
      </Grid.Container>
    </Styles.Container>
  );
};

export default memo(Header);
