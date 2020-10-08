import React from 'react';
import * as Styles from './styles';

const FlexDiv = ({ children, ...props }) => (
  <Styles.Container display="flex" {...props}>
    {children}
  </Styles.Container>
);

export default FlexDiv;
