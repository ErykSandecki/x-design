// types
import { T2DCoordinates, T3DCoordinates } from 'types';

export const mousePositionRelative = (
  { x, y, z }: T3DCoordinates,
  event: DragEvent | React.DragEvent<any> | MouseEvent | React.MouseEvent<any>,
): T2DCoordinates => {
  const clientX = event.clientX - x;
  const clientY = event.clientY - y;

  return {
    x: clientX / z,
    y: clientY / z,
  };
};
