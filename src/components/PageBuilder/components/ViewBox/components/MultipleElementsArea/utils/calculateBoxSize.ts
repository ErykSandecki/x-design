// types
import { T2DCoordinates, TElement, TRectCoordinates } from 'types';

export const calculateBoxSize = (
  rectCoordinates: TRectCoordinates,
): {
  height: TElement['height'];
  width: TElement['height'];
} & T2DCoordinates => {
  const { x1, x2, y1, y2 } = rectCoordinates;
  const x = x1 < x2 ? x1 : x2;
  const y = y1 < y2 ? y1 : y2;

  return {
    height: Math.abs(y1 - y2),
    width: Math.abs(x1 - x2),
    x,
    y,
  };
};
