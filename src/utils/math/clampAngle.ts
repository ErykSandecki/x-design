export const clampAngle = (angle: number): number => {
  switch (true) {
    case angle > 180:
      return 180;
    case angle < -180:
      return -180;
    default:
      return angle;
  }
};
