export const computeCounterRotation = (
  angles,
): { counterAngle: number; sumAngle: number } => {
  const arr = Array.isArray(angles) ? angles : [angles];
  const rawSum = arr.reduce((acc, v) => acc + Number(v || 0), 0);
  const mod360 = ((rawSum % 360) + 360) % 360;
  const sumAngle = mod360 > 180 ? mod360 - 360 : mod360;
  const counterAngle = -sumAngle;

  return { counterAngle, sumAngle };
};
