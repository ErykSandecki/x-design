import { size } from 'lodash';
import { useDispatch } from 'react-redux';
import { RefObject, useEffect } from 'react';

// store
import { selectedElementsSelector } from 'store/pageBuilder/selectors';
import { selectElements } from 'store/pageBuilder/actions';
import { store } from 'store';

// types
import { TObject, TRectCoordinates } from 'types';
import { TRectAreaExtended } from '../../../../PageBuilder/types';

// utils
import { getCollidedElements } from '../utils/getCollidedElements';

export type TUseHandleSelectElement = void;

export const useHandleSelectElement = (
  rectCoordinates: RefObject<TObject<TRectCoordinates>>,
  selectableArea: TRectAreaExtended,
): TUseHandleSelectElement => {
  const dispatch = useDispatch();

  const handleSelectItems = (): void => {
    const collidedElements = getCollidedElements(
      rectCoordinates,
      selectableArea,
    );
    const selectedElements = selectedElementsSelector(store.getState());

    if (size(collidedElements) > 0 || size(selectedElements)) {
      dispatch(selectElements(collidedElements));
    }
  };

  useEffect(() => {
    if (selectableArea?.visible) {
      handleSelectItems();
    }
  }, [selectableArea]);
};
