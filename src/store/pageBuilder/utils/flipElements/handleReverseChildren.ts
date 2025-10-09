// types
import { LayoutType, TChildren, TElement } from 'types';
import { TFlipElementsAction, TStrictAxis } from '../../types';

export const reverseChildren = (
  axis: TFlipElementsAction['payload'],
  children: TElement['children'],
  layout: TElement['layout'],
): TElement['children'] => {
  if (axis === 'x' && layout.type === LayoutType.horizontal) {
    return [...children].reverse();
  } else if (axis === 'y' && layout.type === LayoutType.vertical) {
    return [...children].reverse();
  }

  return children;
};

export const handleReverseChildren = (axis: TStrictAxis, element: TElement): Array<TChildren> => {
  if (axis.length === 2) {
    const reversedChildren = reverseChildren(axis[0], element.children, element.layout);
    return reverseChildren(axis[1], reversedChildren, element.layout);
  }

  return reverseChildren(axis[0], element.children, element.layout);
};
