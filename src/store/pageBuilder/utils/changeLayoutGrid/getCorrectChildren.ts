// types
import { ElementType, TElement, TGrid } from 'types';

export const getCorrectChildren = (children: TElement['children'], grid: TGrid): TElement['children'] => {
  const total = grid.columns * grid.rows;
  const targetChildren = children.filter(({ type }) => type !== ElementType.grid);
  const missing = total - targetChildren.length;

  return missing <= 0
    ? targetChildren
    : [...targetChildren, ...Array.from(Array(missing), () => ({ id: 'unknown', type: ElementType.grid }))];
};
