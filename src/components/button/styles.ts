import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { theme } from '../../global/style';

export const Container = styled(RectButton)`
  background-color: ${theme.colors.primary};
  padding: 16px 16px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  elevation: 2;
`;

export const ButtonText = styled.Text`
  margin-right: 8px;
  font-size: 20px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.background};
`;