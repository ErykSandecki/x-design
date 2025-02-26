import { RefObject, useState, WheelEvent } from 'react';

// types
import { T3DCoordinates } from 'types';

// utils
import { handleScrollPage } from '../utils/handleScrollPage';
import { handleZoom } from '../utils/handleZoom';

export type TUseWheelEvent = (event: WheelEvent) => void;

export const useWheelEvent = (
  coordinates: T3DCoordinates,
  setCoordinates: (coordinates: T3DCoordinates) => void,
  zoomBoxRef: RefObject<HTMLDivElement>,
): TUseWheelEvent => {
  const handleWheel = (event: WheelEvent): void => {
    handleScrollPage(coordinates, event, setCoordinates);
    handleZoom(coordinates, event, setCoordinates, zoomBoxRef);
  };

  return handleWheel;
};
