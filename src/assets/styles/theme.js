import { darken, lighten } from 'polished';

const colors = {
  black: '#222222',
  white: '#ffffff',
  green: '#03C4A1',
  purple: '#843163',
  gray: '#C4C4C4'
};

const ALTERATION_POWER = 0.2;
Object.keys(colors).forEach(key => {
  colors[`${key}Darken`] = darken(ALTERATION_POWER, colors[key]);
  colors[`${key}Lighten`] = lighten(ALTERATION_POWER, colors[key]);
});

const typography = {
  fontPrimary: 'Dosis'
};

export const theme = {
  ...colors,
  ...typography
};
