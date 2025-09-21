import { cloneDeep } from 'lodash';

// types
import { LayoutType, TElement } from 'types';
import {
  TElementStaticData,
  TFlipElementsAction,
  TPageBuilderState,
} from '../types';

// utils
import { findAllChildren } from './findAllChildren';
import { negateValue } from 'utils/math/negateValue';

export const reverseChildren = (
  axis: TFlipElementsAction['payload'],
  children: TElementStaticData['children'],
  layout: TElement['layout'],
): TElementStaticData['children'] => {
  if (
    axis === 'x' &&
    (layout.type === LayoutType.horizontal || layout.type === LayoutType.grid)
  ) {
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
  const { allData } = elements;
  const clonedElements = cloneDeep(elements);

  selectedElements.forEach(({ id }) => {
    const element = clonedElements.allData[id];
    const angle = negateValue(element.angle);
    const children = reverseChildren(axis, element.children, element.layout);

    clonedElements.allData[id].angle = angle;
    clonedElements.allData[id].children = children;
    clonedElements.dynamicData[id].angle = angle;
    clonedElements.staticData[id].children = children;

    findAllChildren(allData, allData[selectedElements[0].id].children).forEach(
      (id) => {
        const element = clonedElements.allData[id];
        const children = reverseChildren(
          axis,
          element.children,
          element.layout,
        );

        clonedElements.allData[id].children = children;
        clonedElements.staticData[id].children = children;
      },
    );
  });

  return {
    ...state,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          allData: {
            ...currentPage.elements.allData,
            ...clonedElements.allData,
          },
          dynamicData: {
            ...currentPage.elements.dynamicData,
            ...clonedElements.dynamicData,
          },
          staticData: {
            ...currentPage.elements.staticData,
            ...clonedElements.staticData,
          },
        },
      },
    },
  };
};
