import React from 'react';
import { FlexDiv, Text } from 'components';
import Skeleton from 'react-loading-skeleton';
import * as Styles from './styles';

const MainInfo = ({ image, title, subtitle }) => (
  <FlexDiv flexDirection="column" justifyContent="center" alignItems="center">
    {image ? (
      <Styles.Image src={image} alt={title} />
    ) : (
      <Skeleton circle height={100} width={100} />
    )}
    <Text appearence="bold" size="large" marginTop="10px">
      {title || <Skeleton width={200} height={30} />}
    </Text>
    {subtitle && (
      <Text color="#fff" marginTop="7px">
        from {subtitle}
      </Text>
    )}
  </FlexDiv>
);

export default MainInfo;
