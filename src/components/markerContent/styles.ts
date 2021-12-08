import styled from 'styled-components/native';
import { theme } from '../../global/style';

export const MapMarkerContainer = styled.View`
  align-items: center;
  elevation: 4;
`;


export const MarkerImage = styled.Image`
  width: 50px;
  height: 50px;
`;

export const MarkerDescription = styled.Text`
  background-color: ${theme.colors.background};
  padding: 8px 16px;
  border-radius: 8px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primary};
`;