import React, { memo } from 'react';
import { FlexDiv, Text } from 'components';
// import Skeleton from 'react-loading-skeleton';
import { theme } from 'assets/styles';
// import * as Styles from './styles';

const Statistics = ({ items }) => (
  <FlexDiv
    margin="15px auto"
    justifyContent="center"
    maxWidth="350px"
    flexWrap="wrap"
  >
    {items.map(item => (
      <FlexDiv
        key={item.label}
        flexDirection="column"
        alignItems="center"
        margin="0 20px"
      >
        <Text marginBottom="7px" color={theme.green} appearence="bold">
          {item.count}
        </Text>
        <Text>{item.label}</Text>
      </FlexDiv>
    ))}
  </FlexDiv>
);
export default memo(Statistics);
