import React from 'react';
import { theme } from 'assets/styles';
import variants from './variants';
import * as Styles from './styles';

const DEFAULT_SIZE = 40;

const Icon = ({ variant, onClick, size, color, ...props }) => {
  if (!variants[variant]) {
    console.log('[ICON COMPONENT] Invalid variant prop.');
    return null;
  }

  const Variant = variants[variant];

  if (onClick) {
    return (
      <Styles.ButtonContainer onClick={onClick} {...props}>
        <Variant
          width={size || DEFAULT_SIZE}
          height={size || DEFAULT_SIZE}
          size={size || DEFAULT_SIZE}
          color={color || theme.gray}
        />
      </Styles.ButtonContainer>
    );
  }
  return (
    <Styles.Container {...props}>
      <Variant
        width={size || DEFAULT_SIZE}
        height={size || DEFAULT_SIZE}
        size={size || DEFAULT_SIZE}
        color={color || theme.gray}
      />
    </Styles.Container>
  );
};

export default Icon;
