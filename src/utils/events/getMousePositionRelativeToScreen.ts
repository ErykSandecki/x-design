// types
import { MousePosition } from 'types';

export const getMousePositionRelativeToScreen = (
  event: MouseEvent | WheelEvent | React.MouseEvent | React.WheelEvent,
): MousePosition => {
  const { clientX, clientY } = event;
  const { innerHeight, innerWidth } = window;
  const halfHeight = innerHeight / 2;
  const halfWidth = innerWidth / 2;

  switch (true) {
    case clientX <= halfWidth && clientY <= halfHeight:
      return MousePosition.northWest;
    case clientX <= halfWidth && clientY > halfHeight:
      return MousePosition.southWest;
    case clientX > halfWidth && clientY <= halfHeight:
      return MousePosition.northEast;
    default:
      return MousePosition.southEast;
  }
};
