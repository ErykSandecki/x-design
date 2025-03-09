import { debounce } from 'lodash';
import { RefObject, useCallback, useRef, WheelEvent } from 'react';

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
  const onUpdateCoordinatesDelay = useCallback(
    debounce((coordinates: T3DCoordinates) => {
      onUpdateCoordinates(coordinates);
    }, 500),
    [],
  );

  const handleWheel = (event: WheelEvent): void => {
    handleScrollPage(
      coordinates,
      event,
      onUpdateCoordinatesDelay,
      setCoordinates,
    );
    handleZoom(
      coordinates,
      event,
      lastWheelTime,
      onUpdateCoordinatesDelay,
      setCoordinates,
      zoomBoxRef,
    );
  };

  return handleWheel;
};
