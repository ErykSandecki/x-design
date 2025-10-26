// types
import { LayoutType, TChildren, TElement, TGrid } from 'types';
import { TFlipElementsAction, TStrictAxis } from '../../types';

export const flipHorizontal = (
  children: TElement['children'],
  columns: TGrid['columns'],
  rows: TGrid['rows'],
): TElement['children'] => {
  const result = [];

  for (let r = 0; r < rows; r++) {
    const start = r * columns;
    const end = start + columns;
    const row = children.slice(start, end).reverse();

    result.push(...row);
  }

  return result;
};

export const flipVertical = (
  children: TElement['children'],
  columns: TGrid['columns'],
  rows: TGrid['rows'],
): TElement['children'] => {
  const result = [];

  for (let r = rows - 1; r >= 0; r--) {
    const start = r * columns;
    const end = start + columns;

    result.push(...children.slice(start, end));
  }

  return result;
};

export const reverseChildren = (
  axis: TFlipElementsAction['payload'],
  children: TElement['children'],
  layout: TElement['layout'],
): TElement['children'] => {
  const { grid, type } = layout;
  const { columns, rows } = grid;

  switch (true) {
    case axis === 'x' && type === LayoutType.horizontal:
      return [...children].reverse();
    case axis === 'y' && type === LayoutType.vertical:
      return [...children].reverse();
    case type === LayoutType.grid && axis === 'x':
      return flipHorizontal(children, columns, rows);
    case type === LayoutType.grid && axis === 'y':
      return flipVertical(children, columns, rows);
    default:
      return children;
  }
};

export const handleReverseChildren = (axis: TStrictAxis, element: TElement): Array<TChildren> => {
  if (axis.length === 2) {
    const reversedChildren = reverseChildren(axis[0], element.children, element.layout);
    return reverseChildren(axis[1], reversedChildren, element.layout);
  }

  return reverseChildren(axis[0], element.children, element.layout);
};
