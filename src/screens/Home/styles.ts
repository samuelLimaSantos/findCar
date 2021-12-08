import styled from 'styled-components/native';
import { theme } from '../../global/style';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  height: 100%;
`;

export const Title = styled.Text`
  margin: 24px 0 8px 16px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primary};
  font-size: 28px;
`;


export const Description = styled.Text`
  margin: 8px 16px 16px 16px; 
  font-family: ${theme.fonts.regular};
  font-size: 15px;
`;

export const MapContainer = styled.View`
  height: 80%;
`;

export const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  margin-bottom: 32px;
  width: 100%;
  align-items: center;
`;

export const DistanceText = styled.Text`
  margin-bottom: 16px;
  width: 200px;
  text-align: center;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primary};
  font-size: 14px;
`;



