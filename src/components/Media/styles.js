import styled from 'styled-components';
import { medias } from '../../assets/styles';

export const Container = styled.div`
  width: 95%;
  position: relative;
  background-color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.borderRadius};

  ${medias.greaterThan('lg')`
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
  border-radius: 0px 0px 5px 5px;
  padding: 10px;
`;

export const Preview = styled.audio`
  opacity: 0;
  visibility: hidden;
`;
