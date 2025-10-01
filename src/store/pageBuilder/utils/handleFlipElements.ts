// types
import { LayoutType, TElement } from 'types';
import { TFlipElementsAction, TPageBuilderState } from '../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';
import { findAllChildren } from './findAllChildren';
import { negateValue } from 'utils/math/negateValue';

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

export const handleFlipElements = (
  axis: TFlipElementsAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);
  const childrenData = ids.map((id) => findAllChildren(elements, elements[id].children)).flat();
  const childrenIds = extractObjectValues(childrenData, ['id']);

  return {
    ...state,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          ...mapFilteredValues(currentPage.elements, ids, (element) => ({
            ...element,
            angle: negateValue(element.angle),
            children: reverseChildren(axis, element.children, element.layout),
          })),
          ...mapFilteredValues(currentPage.elements, childrenIds, (element) => ({
            ...element,
            children: reverseChildren(axis, element.children, element.layout),
          })),
        },
      },
    },
  };
};
