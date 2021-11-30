import React from 'react';
import { Container, Title, CarImage, CircleRed, TitleContainer, BottomContainer, Logo } from './styles';
import { Button } from '../../components/button';
import carImage from '../../../assets/car.png';
import logoImage from '../../../assets/Logo.png';

export const WelcomeScreen = () => {
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
        />

        <Logo source={logoImage} />
      </BottomContainer>

    </Container>
  )
}