import styled, { css } from 'styled-components';
import { medias } from 'assets/styles';

export const Triangle = styled.div`
  width: 0;
  height: 0;
  border-top: 0rem solid ${({ theme }) => theme.purple};
  border-bottom: 40vw solid transparent;
  border-left: 40vw solid ${({ theme }) => theme.purple};
  position: fixed;
  top: 0;
  left: 0;

  ${({ position }) =>
    position === 'bottom' &&
    css`
      left: initial;
      top: initial;
      bottom: 0;
      right: 0;
      transform: rotate(180deg);
    `}

  ${medias.greaterThan('lg')`
    border-bottom: 25vw solid transparent;
    border-left: 25vw solid #843163;
  `}
`;

export const LoginButton = styled.a`
  padding: 0.7rem 1rem;
  transition: ${({ theme }) => theme.transition};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.green};

  &:hover {
    background-color: ${({ theme }) => theme.greenDarken};
  }
`;
