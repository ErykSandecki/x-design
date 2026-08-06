// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';

export const HORIZONTAL_ANCHORS = [DropAnchorsPosition.left, DropAnchorsPosition.right];
export const VERTICAL_ANCHORS = [DropAnchorsPosition.bottom, DropAnchorsPosition.top];

export const ANCHORS_MODIFICATORS: Record<string, string> = {
  bottom: 'Anchors--bottom',
  left: 'Anchors--left',
  right: 'Anchors--right',
  top: 'Anchors--top',
};
