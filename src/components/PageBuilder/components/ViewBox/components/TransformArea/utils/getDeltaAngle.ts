export const getDeltaAngle = (cursorBaseAngle: number, cursorCurrentAngle: number): number => {
  let deltaAngle = cursorCurrentAngle - cursorBaseAngle;

  if (deltaAngle > 180) {
    deltaAngle -= 360;
  }

  if (deltaAngle < -180) {
    deltaAngle += 360;
  }

  return deltaAngle;
};
