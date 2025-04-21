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
) => {
  if (!isMoving && possibleElementToSelect !== '-1') {
    const { parentId, type } = allDataSelector(store.getState())[
      possibleElementToSelect
    ];

    dispatch(
      selectElements([
        {
          id: possibleElementToSelect,
          parentId,
          type,
        },
      ]),
    );
  }
};
