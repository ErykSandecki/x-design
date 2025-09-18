import { isEmpty, isEqual } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// store
import { elementAttributeSelectorCreator } from 'store/pageBuilder/selectors';
import {
  setElementsCoordinates,
  updatePrevState,
} from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

// utils
import { getOffsetXY } from 'store/pageBuilder/utils/getOffsetXY';

export type TUseHandleUpdateCoordinates = void;

export const useHandleUpdateCoordinates = (
  id: TElement['id'],
  parentId: TElement['parentId'],
): TUseHandleUpdateCoordinates => {
  const alignment = useSelector(
    elementAttributeSelectorCreator('alignment', id),
    isEqual,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(alignment)) {
      const coordinates = getOffsetXY(id, parentId, true);

      dispatch(updatePrevState());
      dispatch(setElementsCoordinates(coordinates, 'static', false));
    }
  }, [alignment]);
};
