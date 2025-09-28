import { RefObject } from 'react';

export const getElementCenter = (elementRef: RefObject<HTMLElement>): T2DCoordinates => {
  const rect = elementRef.current.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  return { x, y };
};

export const getElementAngle = (elementRef: RefObject<HTMLElement>, event: MouseEvent | React.MouseEvent): number => {
  const { x, y } = getElementCenter(elementRef);
  const { clientX, clientY } = event;

  return Math.atan2(clientY - y, clientX - x) * (180 / Math.PI);
};
