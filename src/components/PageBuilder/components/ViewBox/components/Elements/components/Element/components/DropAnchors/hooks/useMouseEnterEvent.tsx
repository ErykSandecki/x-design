import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';

// store
import { eventSelectorCreator } from 'store/pageBuilder/selectors';
import { store } from 'store';
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';
import { MouseMode } from 'types/enums/mouseMode';
import { TElement } from 'types';

export type TUseMouseEnterEvent = TFunc<[DropAnchorsPosition]>;

export const useMouseEnterEvent = (
  id: TElement['id'],
  index: number,
  mouseMode: MouseMode,
  parentId: TElement['parentId'],
): TUseMouseEnterEvent => {
  const dispatch = useDispatch();

  const handleMouseEnter = (dropAnchorPosition: DropAnchorsPosition): void => {
    if (mouseMode === MouseMode.default) {
      const draggableElements = eventSelectorCreator('draggableElements')(store.getState());
      const isTop = dropAnchorPosition === DropAnchorsPosition.top;
      const isLeft = dropAnchorPosition === DropAnchorsPosition.left;
      const targetIndex = isTop || isLeft ? index : index + 1;

      if (!isEmpty(draggableElements)) {
        dispatch(
          updateEventsStatus({
            possibleAnchorElementId: id,
            possibleAnchorPosition: dropAnchorPosition,
            possibleIndexPosition: targetIndex,
            possibleParent: parentId,
          }),
        );
      }
    }
  };

  return handleMouseEnter;
};
