// types
import { ElementType, LayoutType, TElement } from 'types';

// utils
import { isBaseParent } from 'utils';

export const extendChildrenAfterGridChanged = (element: TElement): void => {
  const { id, layout } = element;
  const { grid, type } = layout;
  const { columns, rows } = grid;
  const missingGridCells = columns * rows - element.children.length;

  if (!isBaseParent(id) && type === LayoutType.grid && missingGridCells > -1) {
    element.children = [
      ...element.children,
      ...Array.from(Array(missingGridCells), () => ({ id: 'unknown', type: ElementType.grid })),
    ];
  }
};
