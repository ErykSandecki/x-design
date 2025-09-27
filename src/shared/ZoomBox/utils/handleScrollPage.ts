import { WheelEvent } from 'react';

// utils
import { isControlPressed } from 'utils';

export const handleScrollPage = (
  coordinates: T3DCoordinates,
  event: WheelEvent,
  onUpdateCoordinates: ((coordinates: T3DCoordinates) => void) | null,
  setCoordinates: (coordinates: T3DCoordinates) => void,
): void => {
  const { buttons, deltaY, deltaX } = event;
  const x = coordinates.x - deltaX;
  const y = coordinates.y - deltaY;

  if (!isControlPressed(event) && buttons === 0) {
    const targetCoordinates = { x, y, z: coordinates.z };

    onUpdateCoordinates(targetCoordinates);
    setCoordinates(targetCoordinates);
  }
};
