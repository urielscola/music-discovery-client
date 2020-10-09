import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
  text-align: center;
  padding: 6px 10px;
  text-align: center;
  border: 2px solid ${({ theme }) => theme.white};
  border-radius: 5px;
  color: ${({ theme }) => theme.white};
  margin: 5px;
`;
