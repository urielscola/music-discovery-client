import styled from 'styled-components';
// import { medias } from '../../assets/styles';

export const Container = styled.div`
  height: 75px;
  background-color: ${({ theme }) => theme.green};
  margin-bottom: 50px;
  display: flex;
  align-items: center;
`;
