// types
import { ElementType, LayoutType, TElement } from 'types';

// utils
import { isBaseParent } from 'utils';

export const extendNextParentChildrenAfterGridChanged = (nextParent: TElement): void => {
  const { id, layout } = nextParent;
  const { grid, type } = layout;
  const { columns, rows } = grid;

  if (!isBaseParent(id) && type === LayoutType.grid) {
    const missingGridCells = columns * rows - nextParent.children.length;

    nextParent.children = [
      ...nextParent.children,
      ...Array.from(Array(missingGridCells), () => ({ id: 'unknown', type: ElementType.grid })),
    ];
  }
};
