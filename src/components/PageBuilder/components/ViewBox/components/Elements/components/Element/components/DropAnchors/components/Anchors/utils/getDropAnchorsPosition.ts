// others
import { HORIZONTAL_ANCHORS, VERTICAL_ANCHORS } from '../constants';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';

export const getDropAnchorsPosition = (isFlowVertical: boolean, isGrid: boolean): Array<DropAnchorsPosition> => {
  if (isGrid) {
    return [...HORIZONTAL_ANCHORS, ...VERTICAL_ANCHORS];
  }

  return isFlowVertical ? VERTICAL_ANCHORS : HORIZONTAL_ANCHORS;
};
