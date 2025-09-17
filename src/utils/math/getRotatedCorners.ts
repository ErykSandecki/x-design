import { T2DCoordinates } from 'types';

export const getRotatedCorners = (
  x: number,
  y: number,
  w: number,
  h: number,
  angleDeg: number,
): [T2DCoordinates, T2DCoordinates, T2DCoordinates, T2DCoordinates] => {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const angle = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const corners = [
    { px: x, py: y },
    { px: x + w, py: y },
    { px: x + w, py: y + h },
    { px: x, py: y + h },
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
