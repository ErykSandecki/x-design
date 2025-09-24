import { isEmpty } from 'lodash';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

// types
import { MouseMode } from 'types/enums/mouseMode';

// store
import { store } from 'store';
import { updateEventsStatus } from 'store/pageBuilder/actions';

// utils
import { eventSelectorCreator } from 'store/pageBuilder/selectors';

export type TUseMouseLeaveEvent = (event: MouseEvent) => void;

export const useMouseLeaveEvent = (
  mouseMode: MouseMode,
): TUseMouseLeaveEvent => {
  const dispatch = useDispatch();

  const handleMouseLeave = (): void => {
    if (mouseMode === MouseMode.default) {
      const draggableElements = eventSelectorCreator('draggableElements')(
        store.getState(),
      );

      if (!isEmpty(draggableElements)) {
        dispatch(
          updateEventsStatus({
            possibleAnchorElementId: '-1',
            possibleAnchorPosition: null,
          }),
        );
      }
    }
  };

  return handleMouseLeave;
};
