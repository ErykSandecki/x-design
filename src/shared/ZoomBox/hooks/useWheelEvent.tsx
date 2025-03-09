import { RefObject, useRef, WheelEvent } from 'react';

// types
import { T3DCoordinates } from 'types';

// utils
import { handleScrollPage } from '../utils/handleScrollPage';
import { handleZoom } from '../utils/handleZoom';

export type TUseWheelEvent = (event: WheelEvent) => void;

export const useWheelEvent = (
  coordinates: T3DCoordinates,
  onUpdateCoordinates: ((coordinates: T3DCoordinates) => void) | null,
  setCoordinates: (coordinates: T3DCoordinates) => void,
  zoomBoxRef: RefObject<HTMLDivElement>,
): TUseWheelEvent => {
  const lastWheelTime = useRef(0);

  const handleWheel = (event: WheelEvent): void => {
    handleScrollPage(coordinates, event, onUpdateCoordinates, setCoordinates);
    handleZoom(
      coordinates,
      event,
      lastWheelTime,
      onUpdateCoordinates,
      setCoordinates,
      zoomBoxRef,
    );
  };

  return handleWheel;
};
