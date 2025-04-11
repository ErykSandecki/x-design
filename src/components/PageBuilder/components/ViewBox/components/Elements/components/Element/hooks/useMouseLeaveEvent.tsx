import { isEmpty } from 'lodash';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { TElement } from 'types';

// store
import { store } from 'store';
import { updateEventsStatus } from 'store/pageBuilder/actions';

// utils
import { eventSelectorCreator } from 'store/pageBuilder/selectors';

export type TUseMouseLeaveEvent = (event: MouseEvent) => void;

export const useMouseLeaveEvent = (
  mouseMode: MouseMode,
  parentId: TElement['parentId'],
): TUseMouseLeaveEvent => {
  const dispatch = useDispatch();

  const handleMouseLeave = (): void => {
    if (mouseMode === MouseMode.default) {
      const draggableElements = eventSelectorCreator('draggableElements')(
        store.getState(),
      );

      if (!isEmpty(draggableElements)) {
        dispatch(updateEventsStatus({ possibleParent: parentId }));
      }
    }
  };

  return handleMouseLeave;
};
