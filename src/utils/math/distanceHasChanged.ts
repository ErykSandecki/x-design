// types

export const distanceHasChanged = (basePosition: T2DCoordinates, distanceMinimum, event: MouseEvent): boolean => {
  const dx = event.clientX - basePosition.x;
  const dy = event.clientY - basePosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance > distanceMinimum;
};
