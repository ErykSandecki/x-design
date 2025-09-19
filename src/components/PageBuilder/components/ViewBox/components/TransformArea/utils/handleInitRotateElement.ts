import { MouseEvent, RefObject } from 'react';

// types
import { TElement } from 'types';

// utils
import { getElementAngle } from './getElementAngle';

export const handleInitRotateElement = (
  cursorBaseAngle: RefObject<number>,
  cursorOffsetAngle: RefObject<number>,
  elementRef: RefObject<HTMLDivElement>,
  event: MouseEvent,
  rotate: TElement['rotate'],
): void => {
  const angle = getElementAngle(elementRef, event);

  cursorBaseAngle.current = angle;
  cursorOffsetAngle.current = rotate - angle;
};
