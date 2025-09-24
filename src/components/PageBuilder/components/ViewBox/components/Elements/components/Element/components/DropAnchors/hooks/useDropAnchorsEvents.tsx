import { useSelector } from 'react-redux';

// hooks
import { useMouseEnterEvent } from './useMouseEnterEvent';
import { useMouseLeaveEvent } from './useMouseLeaveEvent';

// store
import {
  elementAllDataSelectorCreator,
  eventSelectorCreator,
} from 'store/pageBuilder/selectors';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';
import { LayoutType, TElement } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

export type TUseDropAnchorsEvents = {
  anchorPos: DropAnchorsPosition;
  displayNextPrompt: boolean;
  displayPrevPrompt: boolean;
  isFlowVertical: boolean;
  isGrid: boolean;
  onMouseEnter: (dropAreaPosition: DropAnchorsPosition) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const useDropAnchorsEvents = (
  id: TElement['id'],
  mouseMode: MouseMode,
  parentId: TElement['parentId'],
): TUseDropAnchorsEvents => {
  const parentData = useSelector(elementAllDataSelectorCreator(parentId));
  const elId = useSelector(eventSelectorCreator('possibleAnchorElementId'));
  const anchorPos = useSelector(eventSelectorCreator('possibleAnchorPosition'));
  const isBottom = anchorPos === DropAnchorsPosition.bottom;
  const isLeft = anchorPos === DropAnchorsPosition.left;
  const isRight = anchorPos === DropAnchorsPosition.right;
  const isTop = anchorPos === DropAnchorsPosition.top;
  const isDraggingOn = elId === id;
  const displayPrevPrompt = isDraggingOn && (isTop || isLeft);
  const displayNextPrompt = isDraggingOn && (isBottom || isRight);
  const isDefault = parentData.layout.type === LayoutType.default;
  const isVertical = parentData.layout.type === LayoutType.vertical;
  const isFlowVertical = isVertical || isDefault;
  const isGrid = parentData.layout.type === LayoutType.grid;

  return {
    anchorPos: anchorPos as DropAnchorsPosition,
    displayNextPrompt,
    displayPrevPrompt,
    isFlowVertical,
    isGrid,
    onMouseEnter: useMouseEnterEvent(id, mouseMode),
    onMouseLeave: useMouseLeaveEvent(mouseMode),
  };
};
