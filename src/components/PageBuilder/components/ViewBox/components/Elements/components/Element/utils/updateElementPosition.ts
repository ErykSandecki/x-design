import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import {
  setElementCoordinates,
  setElementsCoordinates,
} from 'store/pageBuilder/actions';

// types
import { T2DCoordinates, TElement } from 'types';
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { caculateMovePosition } from '../../../../../utils/caculateMovePosition';

export const updateElementPosition = (
  cursorPosition: RefObject<T2DCoordinates>,
  dispatch: Dispatch,
  event: MouseEvent,
  id: TSelectedElement['id'],
  isMultiple: boolean,
  parentId: TElement['parentId'],
) => {
  const coordinates = caculateMovePosition(cursorPosition, event, parentId);

  if (isMultiple) {
    dispatch(setElementsCoordinates(coordinates, 'dynamic'));
  } else {
    dispatch(setElementCoordinates(coordinates, id));
  }
};
