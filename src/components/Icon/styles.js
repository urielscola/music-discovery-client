import styled from 'styled-components';
import { space, position } from 'styled-system';

export const Container = styled.div`
  ${space};
  ${position};
`;

export const ButtonContainer = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  ${space};
  ${position};
`;
