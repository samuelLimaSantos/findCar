import React, { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Alert, Vibration } from 'react-native';
import { getPreciseDistance } from 'geolib';
import { MarkerContent } from '../../components/markerContent';
import carImage from '../../../assets/Logo.png';
import { Button } from '../../components/button';
import { buttonTexts, descriptionTexts, vibrationIntensity } from '../../utils/constants';
import { 
  Container, 
  Description, 
  MapContainer, 
  Title,
  ButtonContainer
} from './styles';

export const Home = () => {

  const [ position, setPosition ] = useState<[number, number]>([0, 0]);
  const [ carPosition, setCarPosition ] = useState<[number, number]>([0, 0]);
  const [ showButton, setShowButton ] = useState(true);
  const [ descriptionTextContent, setDescriptionTextContent ] = useState(descriptionTexts.SELECT_MAP);
  const [ buttonText, setButtonText ] = useState(buttonTexts.SELECT);
  var removeFunction;

  


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


      const { remove } = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 3000
      }, (location) => {
        let { latitude, longitude } = location.coords;
        
          // console.log(location)

          // Retorna em metro
          // const distance = getPreciseDistance({
          //   latitude,
          //   longitude
          // }, {
          //   latitude: 37.4219464,
          //   longitude: -122.083854
          // });

          // const intensity = getVibrationIntensity(distance);

          // console.log('distance', distance)
          // Vibration.vibrate(intensity, false)
          
          if (latitude !== position[0] || longitude !== position[1]) 
            setPosition([latitude, longitude]);
        });
        
        removeFunction = remove;
      }
      
      
      loadPosition();
    }, []);

    const getVibrationIntensity = useCallback((distance: number) => {
      if(distance >= 100) {
        return vibrationIntensity.ONE_SECOND;
      } else if (distance < 100 && distance >= 30) {
        return vibrationIntensity.TWO_SECONDS;
      } else {
        return vibrationIntensity.THREE_SECONDS;
      }
    }, [vibrationIntensity]);
  
  const handleInitialCarPosition = useCallback(() => {
    setCarPosition([position[0], position[1]]);
    setShowButton(false);
    setDescriptionTextContent(descriptionTexts.DRAG_AND_DROP);
  }, [position])
    
  return (
    <Container>
      <Title>Bem vindo(a).</Title>
      <Description>
        {descriptionTextContent}
      </Description>

      <MapContainer>
        {position[0] !== 0 && (
          // menor mais zoom
          <MapView
            initialRegion={{
              latitude: position[0],
              longitude: position[1],
              latitudeDelta: 0.0009,
              longitudeDelta: 0.0009
            }}
            mapType="standard"
            style={{ width: '100%', height: '100%' }}
          >
            {carPosition[0] !== 0 && (
              <Marker
                coordinate={{
                  latitude: carPosition[0],
                  longitude: carPosition[1]
                }}
                draggable
                onDragStart={() => {
                  setShowButton(false);
                  setDescriptionTextContent(descriptionTexts.RELEASED);
                }}
                onDragEnd={({ nativeEvent }) => {
                  setCarPosition([nativeEvent.coordinate.latitude, nativeEvent.coordinate.longitude]);
                  setDescriptionTextContent(descriptionTexts.BEFORE_FIND);
                  setButtonText(buttonTexts.GO);
                  setShowButton(true);
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
          <Button 
            buttonText={buttonText}
            iconName="arrow-right-circle"
            onPress={handleInitialCarPosition}
          />
        </ButtonContainer>

      )}
    </Container>
  )
}