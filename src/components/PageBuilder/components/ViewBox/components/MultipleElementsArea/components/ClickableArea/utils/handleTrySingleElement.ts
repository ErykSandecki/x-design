import { Dispatch } from 'redux';

// store
import { allDataSelector } from 'store/pageBuilder/selectors';
import { selectElements } from 'store/pageBuilder/actions';
import { store } from 'store';

// types
import { TElement } from 'types';

export const handleTrySingleElement = (
  dispatch: Dispatch,
  isMoving: boolean,
  possibleElementToSelect: TElement['id'],
): void => {
  if (!isMoving && possibleElementToSelect !== '-1') {
    const { parentId, position, type } = allDataSelector(store.getState())[
      possibleElementToSelect
    ];

    dispatch(
      selectElements([
        {
          id: possibleElementToSelect,
          parentId,
          position,
          type,
        },
      ]),
    );
  }
};
