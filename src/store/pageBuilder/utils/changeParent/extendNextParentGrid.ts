// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';
import { LayoutType, TElement } from 'types';
import { TEvents } from 'store/pageBuilder/types';

// utils
import { isBaseParent } from 'utils';

export const extendNextParentGrid = (
  draggableElements: TEvents['draggableElements'],
  nextParent: TElement,
  possibleAnchorPosition: TEvents['possibleAnchorPosition'],
): void => {
  const { id, layout } = nextParent;
  const { grid, type } = layout;
  const { columns, rows } = grid;

  if (!isBaseParent(id) && type === LayoutType.grid) {
    const isBottom = possibleAnchorPosition === DropAnchorsPosition.bottom;
    const isLeft = possibleAnchorPosition === DropAnchorsPosition.left;
    const isRight = possibleAnchorPosition === DropAnchorsPosition.right;
    const isTop = possibleAnchorPosition === DropAnchorsPosition.top;
    const additional = draggableElements.length;
    const totalColumns = isLeft || isRight ? columns + additional : columns;
    const totalRows = isBottom || isTop ? rows + additional : rows;

    nextParent.layout.grid = {
      columns: totalColumns,
      rows: totalRows,
    };
  }
};
