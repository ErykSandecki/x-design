import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { rotateElements } from 'store/pageBuilder/actions';

// utils
import { getElementAngle } from './getElementAngle';
import { normalizeAngle } from 'utils';

export const handleRotateElement = (
  cursorOffsetAngle: RefObject<number>,
  dispatch: Dispatch,
  elementRef: RefObject<HTMLDivElement>,
  event: MouseEvent,
): void => {
  const cursorCurrentAngle = getElementAngle(elementRef, event);
  const angle = cursorCurrentAngle + cursorOffsetAngle.current;
  const targetAngle = normalizeAngle(angle);

  dispatch(rotateElements(targetAngle));
};
