import { debounce } from 'lodash';
import { RefObject, useCallback, useRef, WheelEvent } from 'react';

// others
import { DEBOUNCE_TIME } from 'constant/constants';

// utils
import { handleScrollPage } from '../utils/handleScrollPage';
import { handleZoom } from '../utils/handleZoom';

export type TUseWheelEvent = (event: WheelEvent) => void;

export const useWheelEvent = (
  coordinates: T3DCoordinates,
  onUpdateCoordinates: TFunc<[T3DCoordinates]> | null,
  setCoordinates: TFunc<[T3DCoordinates]>,
  zoomBoxRef: RefObject<HTMLDivElement>,
): TUseWheelEvent => {
  const lastWheelTime = useRef(0);
  const onUpdateCoordinatesDelay = useCallback(
    debounce((coordinates: T3DCoordinates) => {
      onUpdateCoordinates(coordinates);
    }, DEBOUNCE_TIME),
    [],
  );

  const handleWheel = (event: WheelEvent): void => {
    handleScrollPage(coordinates, event, onUpdateCoordinatesDelay, setCoordinates);
    handleZoom(coordinates, event, lastWheelTime, onUpdateCoordinatesDelay, setCoordinates, zoomBoxRef);
  };

  return handleWheel;
};
