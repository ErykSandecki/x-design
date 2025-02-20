import { WheelEvent } from 'react';

// types
import { T3DCoordinates } from 'types';

// utils
import { isControlPressed } from 'utils';

export const handleScrollPage = (
  coordinates: T3DCoordinates,
  event: WheelEvent,
  setCoordinates: (coordinates: T3DCoordinates) => void,
) => {
  const { buttons, deltaY, deltaX } = event;
  const x = coordinates.x - deltaX;
  const y = coordinates.y - deltaY;

  if (!isControlPressed(event) && buttons === 0) {
    setCoordinates({ x, y, z: coordinates.z });
  }
};
