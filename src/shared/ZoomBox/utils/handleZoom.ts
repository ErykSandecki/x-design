import { RefObject, WheelEvent } from 'react';

// utils
import { isControlPressed } from 'utils';

export const getZoomSpeed = (deltaY: number, lastWheelTime: number, now: number): number => {
  if (now - lastWheelTime < 100) {
    return Math.abs(deltaY) < 20 ? 0.035 : 0.1;
  }

  return 0;
};

export const limitZoom = (z: number): number => Math.min(Math.max(0.1, z), 3);

export const handleZoom = (
  coordinates: T3DCoordinates,
  event: WheelEvent,
  lastWheelTime: RefObject<number>,
  onUpdateCoordinates: TFunc<[T3DCoordinates]> | null,
  setCoordinates: TFunc<[T3DCoordinates]>,
  zoomBoxRef: RefObject<HTMLDivElement>,
): void => {
  if (isControlPressed(event)) {
    const { x, y, z } = coordinates;
    const { left, top } = zoomBoxRef.current.getBoundingClientRect();
    const cursorX = (event.clientX - left - x) / z;
    const cursorY = (event.clientY - top - y) / z;
    const now = Date.now();
    const zoomSpeed = getZoomSpeed(event.deltaY, lastWheelTime.current, now);
    const zoom = event.deltaY < 0 ? zoomSpeed : -zoomSpeed;
    const targetZ = limitZoom(z + zoom);
    const targetCoordinates = {
      x: x - cursorX * (targetZ - z),
      y: y - cursorY * (targetZ - z),
      z: targetZ,
    };

    lastWheelTime.current = now;
    onUpdateCoordinates(targetCoordinates);
    setCoordinates(targetCoordinates);
  }
};
