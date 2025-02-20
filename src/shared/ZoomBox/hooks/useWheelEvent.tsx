import { RefObject, useState, WheelEvent } from 'react';

// types
import { T3DCoordinates } from 'types';

// utils
import { getZoomSpeed, limitZoom } from '../utils/zoom';
import { isControlPressed } from 'utils';

export type TUseWheelEvent = (event: WheelEvent) => void;

export const useWheelEvent = (
  coordinates: T3DCoordinates,
  setCoordinates: (coordinates: T3DCoordinates) => void,
  zoomBoxRef: RefObject<HTMLDivElement>,
): TUseWheelEvent => {
  const [lastTouchpadTime, setLastTouchpadTime] = useState(0);

  const handleWheelEvent = (event: WheelEvent): void => {
    if (isControlPressed(event)) {
      const { x, y, z } = coordinates;
      const { left, top } = zoomBoxRef.current.getBoundingClientRect();
      const cursorX = (event.clientX - left - x) / z;
      const cursorY = (event.clientY - top - y) / z;
      const zoomSpeed = getZoomSpeed(lastTouchpadTime);
      const zoom = event.deltaY < 0 ? zoomSpeed : -zoomSpeed;
      const targetZ = limitZoom(z + zoom);

      setLastTouchpadTime(Date.now());
      setCoordinates({
        x: x - cursorX * (targetZ - z),
        y: y - cursorY * (targetZ - z),
        z: targetZ,
      });
    }
  };

  return handleWheelEvent;
};
