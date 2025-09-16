import { MouseEvent, RefObject } from 'react';
import { getElementAngle } from './getElementAngle';

export const handleInitRotateElement = (
  cursorBaseAngle: RefObject<number>,
  elementRef: RefObject<HTMLDivElement>,
  event: MouseEvent,
): void => {
  cursorBaseAngle.current = getElementAngle(elementRef, event);
};
