import { isEmpty } from 'lodash';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

// types
import { MouseMode } from 'types/enums/mouseMode';
import { TElement } from 'types';

// store
import { store } from 'store';
import { updateEventsStatus } from 'store/pageBuilder/actions';

// utils
import { eventSelectorCreator } from 'store/pageBuilder/selectors';

export type TUseMouseEnterEvent = TFunc<[MouseEvent]>;

export const useMouseEnterEvent = (
  id: TElement['id'],
  isSelected: boolean,
  mouseMode: MouseMode,
): TUseMouseEnterEvent => {
  const dispatch = useDispatch();

  const handleMouseEnter = (): void => {
    const draggableElements = eventSelectorCreator('draggableElements')(store.getState());

    if (!isEmpty(draggableElements) && !isSelected && mouseMode === MouseMode.default) {
      dispatch(updateEventsStatus({ hoverOnElement: id, possibleParent: id }));
    } else {
      dispatch(updateEventsStatus({ hoverOnElement: id }));
    }
  };

  return handleMouseEnter;
};
