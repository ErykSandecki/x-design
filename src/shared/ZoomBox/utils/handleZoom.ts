import { isInteger } from 'lodash';
import { RefObject, WheelEvent } from 'react';

// types
import { T3DCoordinates } from 'types';

// utils
import { isControlPressed } from 'utils';

export const getZoomSpeed = (deltaY: number): number => {
  const isTouchPad = isInteger(deltaY);
  return isTouchPad ? 0.01 : 0.1;
};

export const limitZoom = (z: number): number => Math.min(Math.max(0.1, z), 3);

export const handleZoom = (
  coordinates: T3DCoordinates,
  event: WheelEvent,
  setCoordinates: (coordinates: T3DCoordinates) => void,
  zoomBoxRef: RefObject<HTMLDivElement>,
) => {
  if (isControlPressed(event)) {
    const { x, y, z } = coordinates;
    const { left, top } = zoomBoxRef.current.getBoundingClientRect();
    const cursorX = (event.clientX - left - x) / z;
    const cursorY = (event.clientY - top - y) / z;
    const zoomSpeed = getZoomSpeed(event.deltaY);
    const zoom = event.deltaY < 0 ? zoomSpeed : -zoomSpeed;
    const targetZ = limitZoom(z + zoom);

    setCoordinates({
      x: x - cursorX * (targetZ - z),
      y: y - cursorY * (targetZ - z),
      z: targetZ,
    });
  }
};
