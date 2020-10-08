import React from 'react';
import * as Styles from './styles';

const Text = ({
  appearence = 'primary',
  size = 'normal',
  children,
  ...props
}) => (
  <Styles.Text appearence={appearence} size={size} {...props}>
    {children}
  </Styles.Text>
);

export default Text;
