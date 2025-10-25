import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';

// store
import { eventSelectorCreator } from 'store/pageBuilder/selectors';
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { MouseMode } from 'types';

export type TUseMouseLeaveEvent = TFunc;

export const useMouseLeaveEvent = (mouseMode: MouseMode, setIsHovered: TFunc<[boolean]>): TUseMouseLeaveEvent => {
  const dispatch = useDispatch();

  const handleMouseLeave = (): void => {
    if (mouseMode === MouseMode.default) {
      const draggableElements = eventSelectorCreator('draggableElements')(window.store.getState());

      if (!isEmpty(draggableElements)) {
        setIsHovered(false);
        dispatch(
          updateEventsStatus({
            isGridDropArea: false,
            possibleIndexPosition: null,
          }),
        );
      }
    }
  };

  return handleMouseLeave;
};
