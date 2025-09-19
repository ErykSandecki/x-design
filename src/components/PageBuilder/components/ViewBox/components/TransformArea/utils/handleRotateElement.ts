import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { rotateElement } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

// utils
import { getElementAngle } from './getElementAngle';

export const handleRotateElement = (
  cursorOffsetAngle: RefObject<number>,
  dispatch: Dispatch,
  elementRef: RefObject<HTMLDivElement>,
  event: MouseEvent,
  id: TElement['id'],
): void => {
  const cursorCurrentAngle = getElementAngle(elementRef, event);
  const angle = cursorCurrentAngle + cursorOffsetAngle.current;
  const rotate = ((((angle + 180) % 360) + 360) % 360) - 180;

  dispatch(rotateElement(id, rotate));
};
