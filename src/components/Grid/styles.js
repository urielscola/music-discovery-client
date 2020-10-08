import styled from 'styled-components/macro';

export const Container = styled.div`
  max-width: 1070px;
  margin: auto;
  padding: 0 20px;

  @media (min-width: 1700px) {
    max-width: 1680px;
    padding: 0;
  }
`;
