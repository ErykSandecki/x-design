import { RefObject, WheelEvent } from 'react';

// types
import { T3DCoordinates } from 'types';

// utils
import { isControlPressed } from 'utils';

export const getZoomSpeed = (lastTouchpadTime: number): number => {
  const isTouchPad = Date.now() - lastTouchpadTime < 50;
  return isTouchPad ? 0.02 : 0.1;
};

export const limitZoom = (z: number): number => Math.min(Math.max(0.1, z), 3);

export const handleZoom = (
  coordinates: T3DCoordinates,
  event: WheelEvent,
  lastTouchpadTime: number,
  setCoordinates: (coordinates: T3DCoordinates) => void,
  setLastTouchpadTime: (lastTouchpadTime: number) => void,
  zoomBoxRef: RefObject<HTMLDivElement>,
) => {
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
