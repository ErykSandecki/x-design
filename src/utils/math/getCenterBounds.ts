// types
import { TRectArea } from 'components/PageBuilder/types';
import { T2DCoordinates } from 'types';

export const getCenterBounds = (rects: TRectArea): T2DCoordinates => {
  const cx = (rects.x1 + rects.x2) / 2;
  const cy = (rects.y1 + rects.y2) / 2;

  return { x: cx, y: cy };
};
