import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';

// store
import { eventSelectorCreator } from 'store/pageBuilder/selectors';
import { store } from 'store';
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { DropAnchorsPosition } from '../enums';
import { MouseMode } from 'types/enums/mouseMode';

export type TUseMouseEnterEvent = (
  dropAreaPosition: DropAnchorsPosition,
) => void;

export const useMouseEnterEvent = (
  index: number,
  mouseMode: MouseMode,
): TUseMouseEnterEvent => {
  const dispatch = useDispatch();

  const handleMouseEnter = (dropAreaPosition: DropAnchorsPosition): void => {
    if (mouseMode === MouseMode.default) {
      const draggableElements = eventSelectorCreator('draggableElements')(
        store.getState(),
      );
      const targetIndex =
        dropAreaPosition === DropAnchorsPosition.top ||
        dropAreaPosition === DropAnchorsPosition.left
          ? index
          : index + 1;

      if (!isEmpty(draggableElements)) {
        dispatch(
          updateEventsStatus({
            possibleIndexPosition: targetIndex,
          }),
        );
      }
    }
  };

  return handleMouseEnter;
};
