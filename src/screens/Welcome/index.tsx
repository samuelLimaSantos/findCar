import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Title, CarImage, TitleContainer, BottomContainer, Logo } from './styles';
import { Button } from '../../components/button';
import carImage from '../../../assets/car.png';
import logoImage from '../../../assets/Logo.png';


export const WelcomeScreen = () => {

  const { navigate } = useNavigation();

  return (
    <Container>
      <CarImage source={carImage}/>

      <TitleContainer>
        <Title>
          Encontre{'\n'}
          seu veículo
        </Title>

      </TitleContainer>

      <BottomContainer>
        <Button 
          buttonText="Conheça" 
          iconName="corner-down-right"
          onPress={() => navigate('Home' as never)}
        />

        <Logo source={logoImage} />
      </BottomContainer>

    </Container>
  )
}