// types
import { LayoutType, TElement } from 'types';
import { TFlipElementsAction } from '../../types';

export const reverseChildren = (
  axis: TFlipElementsAction['payload'],
  children: TElement['children'],
  layout: TElement['layout'],
): TElement['children'] => {
  if (axis === 'x' && (layout.type === LayoutType.horizontal || layout.type === LayoutType.grid)) {
    return [...children].reverse();
  } else if (axis === 'y' && layout.type !== LayoutType.horizontal) {
    return [...children].reverse();
  }

  return children;
};
