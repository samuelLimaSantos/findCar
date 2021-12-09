import React, { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Alert, Vibration } from 'react-native';
import { getPreciseDistance } from 'geolib';
import { MarkerContent } from '../../components/markerContent';
import carImage from '../../../assets/Logo.png';
import { Button } from '../../components/button';
import { buttonTexts, descriptionTexts, vibrationIntensity } from '../../utils/constants';
import { theme } from '../../global/style';
import { 
  Container, 
  Description, 
  MapContainer, 
  Title,
  ButtonContainer,
  DistanceText
} from './styles';

export const Home = () => {

  const [ position, setPosition ] = useState<[number, number]>([0, 0]);
  const [ carPosition, setCarPosition ] = useState<[number, number]>([0, 0]);
  const [ showButton, setShowButton ] = useState(true);
  const [ descriptionTextContent, setDescriptionTextContent ] = useState(descriptionTexts.SELECT_MAP);
  const [ buttonText, setButtonText ] = useState(buttonTexts.SELECT);
  const [ phase, setPhase ] = useState(1);
  const [ distance, setDistance ] = useState(0);


  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Ooooops...',
          'Precisamos de sua permissão para obter a localização'
        );

        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();

      setPosition([coords.latitude, coords.longitude]);
    }
      
      
      loadPosition();
    }, []);

    const getVibrationIntensity = useCallback((distance: number) => {
      if(distance >= 100) {
        return vibrationIntensity.ONE_SECOND;
      } else if (distance < 100 && distance >= 50) {
        return vibrationIntensity.TWO_SECONDS;
      } else {
        return vibrationIntensity.THREE_SECONDS;
      }
    }, [vibrationIntensity]);
  
  const handleInitialCarPosition = useCallback(() => {
    setCarPosition([position[0], position[1]]);
    setDescriptionTextContent(descriptionTexts.DRAG_AND_DROP);
    setButtonText(buttonTexts.GO);
    const distanceBetween = getPreciseDistance({
      latitude: position[0],
      longitude: position[1]
    }, {
      latitude: position[0],
      longitude: position[1]
    })

    setDistance(distanceBetween);

    setPhase(2);
  }, [position, phase, carPosition]);

  const handleGoToTheVehicle = useCallback(() => {
    const distanceBetween = getPreciseDistance({
      latitude: position[0],
      longitude: position[1]
    }, {
      latitude: carPosition[0],
      longitude: carPosition[1]
    })

    setDescriptionTextContent(descriptionTexts.RUN_TO_CAR);

    setDistance(distanceBetween);
    setPhase(3);
    setButtonText(buttonTexts.FINISHED);

  }, [buttonText, position, carPosition]);

  const handleFinishProcess = useCallback(() => {
    Vibration.cancel();
    setPhase(1);
    setButtonText(buttonTexts.SELECT);
    setDescriptionTextContent(descriptionTexts.SELECT_MAP);
    setCarPosition([0 , 0]);
  }, [])

  const getFunctionButton = useCallback(() => {
    switch(phase) {
      case 1:
        return handleInitialCarPosition;
      case 2: 
        return handleGoToTheVehicle;
      case 3:
        return handleFinishProcess
    } 
  }, [phase, handleInitialCarPosition, handleGoToTheVehicle, handleFinishProcess]);
    
  return (
    <Container>
      <Title>Bem vindo(a).</Title>
      <Description>
        {descriptionTextContent}
      </Description>

      <MapContainer>
        {position[0] !== 0 && (
          <MapView
            initialRegion={{
              latitude: position[0],
              longitude: position[1],
              latitudeDelta: 0.0010,
              longitudeDelta: 0.0010
            }}
            mapType="standard"
            style={{ width: '100%', height: '100%' }}
            zoomControlEnabled
            zoomTapEnabled
            followsUserLocation
            moveOnMarkerPress
            showsUserLocation
            showsBuildings
            userLocationCalloutEnabled
            onUserLocationChange={({nativeEvent}) => {
              setPosition([nativeEvent.coordinate.latitude, nativeEvent.coordinate.longitude]);
              if (phase === 3) {

                const distanceBetween = getPreciseDistance({
                  latitude: nativeEvent.coordinate.latitude,
                  longitude: nativeEvent.coordinate.longitude
                }, {
                  latitude: carPosition[0],
                  longitude: carPosition[1]
                })

                setDistance(distanceBetween);

                const intensity = getVibrationIntensity(distanceBetween);
                
                Vibration.vibrate(intensity, false);
              }
            }}
            userLocationPriority={'high'}
            loadingBackgroundColor={theme.colors.primary}
            focusable
            showsMyLocationButton={true}
            showsCompass={true}
            showsPointsOfInterest={false}
            userInterfaceStyle={'dark'}
          >
            {carPosition[0] !== 0 && (
              <Marker
                coordinate={{
                  latitude: carPosition[0],
                  longitude: carPosition[1]
                }}
                focusable
                draggable={phase === 1 || phase === 2}
                onDragStart={() => {
                  setShowButton(false);
                  setDescriptionTextContent(descriptionTexts.RELEASED);
                }}
                onDragEnd={({ nativeEvent }) => {
                  setCarPosition([nativeEvent.coordinate.latitude, nativeEvent.coordinate.longitude]);
                  setDescriptionTextContent(descriptionTexts.BEFORE_FIND);
                  setButtonText(buttonTexts.GO);
                  setShowButton(true);
                  setPhase(2);
                }}
              >
                <MarkerContent 
                  markerDescription="Seu veículo"
                  markerImage={carImage}
                />
              </Marker>
            )}

          </MapView>
        )}
      </MapContainer>
      

      {showButton && (
        <ButtonContainer>
          {phase === 3 && (
            <DistanceText>
              Você está a aproximadamente {distance} metros do seu veículo.
            </DistanceText>
          )}

          <Button 
            buttonText={buttonText}
            iconName="arrow-right-circle"
            onPress={getFunctionButton()}
          />
        </ButtonContainer>

      )}
    </Container>
  )
}