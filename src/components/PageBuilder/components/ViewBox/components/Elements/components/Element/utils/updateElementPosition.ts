import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { setElementsCoordinates } from 'store/pageBuilder/actions';

// types
import { T2DCoordinates, TElement } from 'types';

// utils
import { caculateMovePosition } from '../../../../../utils/caculateMovePosition';

export const updateElementPosition = (
  cursorPosition: RefObject<T2DCoordinates>,
  dispatch: Dispatch,
  event: MouseEvent,
  parentId: TElement['parentId'],
): void => {
  const coordinates = caculateMovePosition(cursorPosition, event, parentId);

  dispatch(setElementsCoordinates(coordinates, 'dynamic'));
};
