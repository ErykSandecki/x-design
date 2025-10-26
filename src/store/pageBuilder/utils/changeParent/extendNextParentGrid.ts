// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';
import { LayoutType, TElement, TGrid } from 'types';
import { TEvents } from 'store/pageBuilder/types';

// utils
import { isBaseParent } from 'utils';

export const getExtraCells = (
  columns: TGrid['columns'],
  rows: TGrid['rows'],
  elementsCount: number,
  perBy: number,
): number => {
  const total = rows * columns;

  if (elementsCount > total) {
    return Math.ceil((elementsCount - total) / perBy);
  }

  return 0;
};

export const extendNextParentGrid = (
  nextParent: TElement,
  possibleAnchorPosition: TEvents['possibleAnchorPosition'],
): void => {
  const { children, id, layout } = nextParent;
  const { grid, type } = layout;
  const { columns, rows } = grid;

  if (!isBaseParent(id) && type === LayoutType.grid) {
    const isBottom = possibleAnchorPosition === DropAnchorsPosition.bottom;
    const isLeft = possibleAnchorPosition === DropAnchorsPosition.left;
    const isRight = possibleAnchorPosition === DropAnchorsPosition.right;
    const isTop = possibleAnchorPosition === DropAnchorsPosition.top;
    const hasHorizontalAnchor = isLeft || isRight;
    const hasVerticalAnchor = isBottom || isTop;
    const totalCells = columns * rows;
    const missingCells = totalCells !== children.length;
    const needColumns = !hasVerticalAnchor && missingCells && (isLeft || isRight || columns > rows);
    const needRows = !hasHorizontalAnchor && missingCells && (isTop || isBottom || rows >= columns);
    const extraColumns = columns + getExtraCells(columns, rows, children.length, rows);
    const extraRows = rows + getExtraCells(columns, rows, children.length, columns);
    const totalColumns = needColumns ? extraColumns : columns;
    const totalRows = needRows ? extraRows : rows;

    nextParent.layout.grid = {
      columns: totalColumns,
      rows: totalRows,
    };
  }
};
