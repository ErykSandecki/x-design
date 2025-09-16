import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { rotateElement } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

// utils
import { getDeltaAngle } from './getDeltaAngle';
import { getElementAngle } from './getElementAngle';

export const handleRotateElement = (
  cursorBaseAngleRef: RefObject<number>,
  dispatch: Dispatch,
  elementRef: RefObject<HTMLDivElement>,
  event: MouseEvent,
  id: TElement['id'],
  rotate: TElement['rotate'],
): void => {
  const cursorBaseAngle = cursorBaseAngleRef.current;
  const cursorCurrentAngle = getElementAngle(elementRef, event);
  const totalRotation =
    rotate + getDeltaAngle(cursorBaseAngle, cursorCurrentAngle);

  dispatch(rotateElement(id, totalRotation));
};
