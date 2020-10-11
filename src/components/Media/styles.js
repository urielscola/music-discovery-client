import styled from 'styled-components';
import { medias } from '../../assets/styles';

export const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.borderRadius};

  ${medias.greaterThan('sm')`
    width: 150px;
  `};
`;

export const Image = styled.img`
  border-radius: 50%;
  box-shadow: 0px 0px 5px ${({ theme }) => theme.black};
  width: 95px;
  height: 95px;
  object-fit: cover;
  object-position: center;

  ${medias.greaterThan('lg')`
    width: 115px;
    height: 115px;
  `};
`;

export const Footer = styled.div`
  background-color: ${({ theme }) => theme.gray};
  text-align: center;
  padding: 10px;

  ${medias.greaterThan('lg')`
    border-radius: 0px 0px 5px 5px;
  `};
`;

export const Preview = styled.audio`
  opacity: 0;
  visibility: hidden;
`;

export const MobileActions = styled.div`
  border-radius: 0px 0px 5px 5px;
  background-color: ${({ theme }) => theme.white};
  padding: 7px;

  ${medias.greaterThan('lg')`
    display: none;
  `};
`;
