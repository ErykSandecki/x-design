import { first } from 'lodash';

// types
import { ElementType, TElement, TGrid } from 'types';
import { TChangeLayoutGridAction } from '../../types';

// utils
import { gridSize, isOdd } from 'utils';

export const getTotalChildren = (children: TElement['children']): number => {
  const totalElements = children.filter(({ type }) => type !== ElementType.grid).length;
  return isOdd(totalElements) ? totalElements + 1 : totalElements;
};

export const getCorrectGrid = (cell: TChangeLayoutGridAction['payload'], element: TElement): TGrid => {
  const { children, layout } = element;
  const totalChildren = getTotalChildren(children);
  const key1 = first(Object.keys(cell));
  const grid = { ...layout.grid, [key1]: cell[key1] };
  const { columns, rows } = grid;
  const totalColumns = columns * rows;

  return totalColumns < totalChildren ? gridSize(totalChildren, totalColumns) : grid;
};
