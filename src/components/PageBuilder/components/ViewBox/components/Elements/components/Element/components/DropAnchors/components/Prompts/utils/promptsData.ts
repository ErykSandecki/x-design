// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';

export const promptsData = (
  anchorPos: DropAnchorsPosition,
  displayNextPrompt: boolean,
  displayPrevPrompt: boolean,
  isFlowVertical: boolean,
  isGrid: boolean,
): Array<{ key: DropAnchorsPosition; visible: boolean }> => [
  {
    key: DropAnchorsPosition.bottom,
    visible: anchorPos === DropAnchorsPosition.bottom && displayNextPrompt && (isGrid || isFlowVertical),
  },
  {
    key: DropAnchorsPosition.left,
    visible: anchorPos === DropAnchorsPosition.left && displayPrevPrompt && (isGrid || !isFlowVertical),
  },
  {
    key: DropAnchorsPosition.right,
    visible: anchorPos === DropAnchorsPosition.right && displayNextPrompt && (isGrid || !isFlowVertical),
  },
  {
    key: DropAnchorsPosition.top,
    visible: anchorPos === DropAnchorsPosition.top && displayPrevPrompt && (isGrid || isFlowVertical),
  },
];
