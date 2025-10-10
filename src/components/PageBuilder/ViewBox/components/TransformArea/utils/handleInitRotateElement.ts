import { MouseEvent, RefObject } from 'react';

// types
import { TElement } from 'types';

// utils
import { getElementAngle } from './getElementAngle';

export const handleInitRotateElement = (
  angle: TElement['angle'],
  cursorBaseAngle: RefObject<number>,
  cursorOffsetAngle: RefObject<number>,
  elementRef: RefObject<HTMLDivElement>,
  event: MouseEvent,
): void => {
  const targetAngle = getElementAngle(elementRef, event);

  cursorBaseAngle.current = targetAngle;
  cursorOffsetAngle.current = angle - targetAngle;
};
