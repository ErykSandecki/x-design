export const normalizeAngle = (angle: number): number =>
  ((((angle + 180) % 360) + 360) % 360) - 180;
