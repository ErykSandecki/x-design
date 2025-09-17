// types
import { T2DCoordinates, TRectCoordinates } from 'types';

export const getFourCorners = (
  angleDeg: number,
  height: number,
  width: number,
  x: number,
  y: number,
): [T2DCoordinates, T2DCoordinates, T2DCoordinates, T2DCoordinates] => {
  const cx = x + width / 2;
  const cy = y + height / 2;
  const angle = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const corners = [
    { px: x, py: y },
    { px: x + width, py: y },
    { px: x + width, py: y + height },
    { px: x, py: y + height },
  ];

  return corners.map(({ px, py }) => {
    const dx = px - cx;
    const dy = py - cy;

    return {
      x: cx + dx * cos - dy * sin,
      y: cy + dx * sin + dy * cos,
    };
  }) as [T2DCoordinates, T2DCoordinates, T2DCoordinates, T2DCoordinates];
};

export const getCornerBounds = (
  angleDeg: number,
  height: number,
  width: number,
  x: number,
  y: number,
): TRectCoordinates => {
  const points = getFourCorners(angleDeg, height, width, x, y);
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return { x1: minX, x2: maxX, y1: minY, y2: maxY };
};
