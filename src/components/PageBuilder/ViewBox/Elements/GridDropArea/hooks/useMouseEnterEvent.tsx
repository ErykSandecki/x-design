import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';

// store
import { eventSelectorCreator } from 'store/pageBuilder/selectors';
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { MouseMode, TElement } from 'types';

export type TUseMouseEnterEvent = TFunc;

export const useMouseEnterEvent = (
  index: number,
  mouseMode: MouseMode,
  parentId: TElement['parentId'],
  setIsHovered: TFunc<[boolean]>,
): TUseMouseEnterEvent => {
  const dispatch = useDispatch();

  const handleMouseEnter = (): void => {
    if (mouseMode === MouseMode.default) {
      const draggableElements = eventSelectorCreator('draggableElements')(window.store.getState());

      if (!isEmpty(draggableElements)) {
        setIsHovered(true);
        dispatch(
          updateEventsStatus({
            isGridDropArea: true,
            possibleIndexPosition: index,
            possibleParent: parentId,
          }),
        );
      }
    }
  };

  return handleMouseEnter;
};
