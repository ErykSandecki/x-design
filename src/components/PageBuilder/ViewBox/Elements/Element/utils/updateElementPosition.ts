import { Dispatch } from '@reduxjs/toolkit';
import { RefObject } from 'react';

// store
import { setElementsCoordinates } from 'store/pageBuilder/slice';

// types
import { TElement } from 'types';

// utils
import { caculateMovePosition } from '../../../utils/caculateMovePosition';

export const updateElementPosition = (
  cursorPosition: RefObject<T2DCoordinates>,
  dispatch: Dispatch,
  event: MouseEvent,
  parentId: TElement['parentId'],
): void => {
  const coordinates = caculateMovePosition(cursorPosition, event, parentId);

  dispatch(setElementsCoordinates(coordinates, 'dynamic'));
};
