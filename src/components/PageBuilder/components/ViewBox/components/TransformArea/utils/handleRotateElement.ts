import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { rotateElements } from 'store/pageBuilder/actions';

// utils
import { getElementAngle } from './getElementAngle';

export const handleRotateElement = (
  cursorOffsetAngle: RefObject<number>,
  dispatch: Dispatch,
  elementRef: RefObject<HTMLDivElement>,
  event: MouseEvent,
): void => {
  const cursorCurrentAngle = getElementAngle(elementRef, event);
  const angle = cursorCurrentAngle + cursorOffsetAngle.current;
  const targetAngle = ((((angle + 180) % 360) + 360) % 360) - 180;

  dispatch(rotateElements(targetAngle));
};
