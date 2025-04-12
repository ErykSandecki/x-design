import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';

// store
import { eventSelectorCreator } from 'store/pageBuilder/selectors';
import { store } from 'store';
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { DropAreaPosition } from '../enums';
import { MouseMode } from 'components/PageBuilder/enums';

export type TUseMouseEnterEvent = (dropAreaPosition: DropAreaPosition) => void;

export const useMouseEnterEvent = (
  index: number,
  mouseMode: MouseMode,
): TUseMouseEnterEvent => {
  const dispatch = useDispatch();

  const handleMouseEnter = (dropAreaPosition: DropAreaPosition): void => {
    if (mouseMode === MouseMode.default) {
      const draggableElements = eventSelectorCreator('draggableElements')(
        store.getState(),
      );
      const targetIndex =
        dropAreaPosition === DropAreaPosition.top ||
        dropAreaPosition === DropAreaPosition.left
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
