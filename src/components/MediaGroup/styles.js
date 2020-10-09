import styled from 'styled-components';
import { medias } from 'assets/styles';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto;

  > * {
    margin-bottom: 20px;
  }

  ${medias.greaterThan('lg')`
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
  `}
`;
