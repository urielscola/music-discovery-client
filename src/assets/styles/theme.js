import { darken, lighten } from 'polished';

const colors = {
  black: '#222222',
  white: '#ffffff',
  green: '#03C4A1',
  purple: '#843163',
  gray: '#C4C4C4'
};

const common = {
  borderRadius: '5px',
  transition: '250ms ease-in-out'
};

const ALTERATION_POWER = 0.2;
Object.keys(colors).forEach(key => {
  colors[`${key}Darken`] = darken(ALTERATION_POWER, colors[key]);
  colors[`${key}Lighten`] = lighten(ALTERATION_POWER, colors[key]);
});

const typography = {
  fontPrimary: '"Dosis", sans-serif',
  fontSizeXSmall: '0.5rem',
  fontSizeSmall: '0.75rem',
  fontSizeNormal: '1rem',
  fontSizeMedium: '1.25rem',
  fontSizeLarge: '1.5rem',
  fontSizeXLarge: '2rem'
};

export const theme = {
  ...common,
  ...colors,
  ...typography
};
