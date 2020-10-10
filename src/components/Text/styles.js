import styled, { css } from 'styled-components';
import { compose, color, space, variant, typography } from 'styled-system';
import { theme as defaultTheme } from 'assets/styles';

const common = css`
  font-family: ${({ theme }) => theme.fontPrimary};
  ${({ onClick }) =>
    !!onClick &&
    css`
      text-decoration: underline;
      cursor: pointer;
    `};
`;

const size = {
  prop: 'size',
  variants: {
    'x-small': {
      fontSize: defaultTheme.fontSizeXSmall
    },
    small: {
      fontSize: defaultTheme.fontSizeSmall
    },
    normal: {
      fontSize: defaultTheme.fontSizeNormal
    },
    medium: {
      fontSize: defaultTheme.fontSizeMedium
    },
    large: {
      fontSize: defaultTheme.fontSizeLarge
    },
    'x-large': {
      fontSize: defaultTheme.fontSizeXLarge
    }
  }
};

const appearence = {
  prop: 'appearence',
  variants: {
    primary: {
      fontSize: 400
    },
    bold: {
      fontWeight: 700
    }
  }
};

export const Text = styled.p`
  ${common};
  color: ${({ theme }) => theme.white};
  ${compose(color, typography, space, variant(size), variant(appearence))};
`;
