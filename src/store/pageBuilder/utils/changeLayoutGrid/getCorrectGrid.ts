// types
import { ElementType, TElement, TGrid } from 'types';
import { TChangeLayoutGridAction } from '../../types';

// utils
import { gridSize, isOdd } from 'utils';

export const getTotalChildren = (children: TElement['children']): number => {
  const totalElements = children.filter(({ type }) => type !== ElementType.grid).length;
  return isOdd(totalElements) ? totalElements + 1 : totalElements;
};

export const getCorrectGrid = (cells: TChangeLayoutGridAction['payload'], element: TElement): TGrid => {
  const { children, layout } = element;
  const totalChildren = getTotalChildren(children);
  const grid = { ...layout.grid, ...cells };
  const totalColumns = grid.columns * grid.rows;

  return totalColumns < totalChildren ? gridSize(totalChildren, totalColumns) : grid;
};
