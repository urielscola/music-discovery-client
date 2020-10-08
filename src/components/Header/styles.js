import styled from 'styled-components';
import { medias } from '../../assets/styles';

export const Container = styled.div`
  font-size: 20px;
  padding: 20px 0;
  font-weight: 500;
  color: ${({ theme }) => theme.white};

  ${medias.greaterThan('md')`
    font-size: 30px;
    padding: 30px 0;
  `};
`;
