import React from 'react';
import { MarkerDescription, MarkerImage, MapMarkerContainer } from './styles';

type MarkerContentProps = {
  markerImage: number;
  markerDescription: string;
};

export const MarkerContent = ({ markerDescription, markerImage }: MarkerContentProps) => {
  return (
    <MapMarkerContainer>
      <MarkerImage source={markerImage} resizeMode="contain"/>
      <MarkerDescription>{markerDescription}</MarkerDescription>
    </MapMarkerContainer>
  );
}