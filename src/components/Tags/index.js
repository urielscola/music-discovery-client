import React, { memo } from 'react';
import { FlexDiv } from 'components';
import Skeleton from 'react-loading-skeleton';
import * as Styles from './styles';

const Tags = ({ items }) => (
  <FlexDiv
    margin="15px auto"
    justifyContent="center"
    maxWidth="200px"
    flexWrap="wrap"
  >
    {items.length === 0 &&
      new Array(5)
        .fill('')
        .map((_, i) => <Skeleton key={i} width={65} height={35} />)}
    {items.length > 0 &&
      items
        .slice(0, 5)
        .map(item => <Styles.Container key={item}>{item}</Styles.Container>)}
  </FlexDiv>
);
export default memo(Tags);
