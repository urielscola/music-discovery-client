import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { medias } from 'assets/styles';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 1.2rem;

  ${medias.greaterThan('sm')`
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  `}
`;

export const MediaPlaceholder = styled(Skeleton)`
  width: 100%;
  height: 210px;

  ${medias.greaterThan('sm')`
    width: 150px;
  `}
`;
