import styled from 'styled-components/native';
import { theme } from '../../global/style';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  justify-content: space-evenly;
`;

export const CarImage = styled.Image``;

export const TitleContainer = styled.View`
  padding: 0 40px;
`;

export const CircleRed = styled.Image`
  position: absolute;
`;

export const Title = styled.Text`
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.bold};
  font-size: 32px;
`;

export const BottomContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
`;

export const Logo = styled.Image`
  width: 60px;
  height: 60px;
`;