import { cloneDeep, first } from 'lodash';

// others
import { BASE_2D } from 'shared';

// types
import { TPageBuilderState } from '../types';

// utils
import { findMainParent } from './findMainParent';
import { getAbsolutePosition } from './getAbsolutePosition';

export const handleChangePosition = (
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const { z } = currentPage.areaCoordinates;
  const allId = selectedElements.map(({ id }) => id);
  const clonedElements = cloneDeep(elements);
  const { id, parentId } = first(selectedElements);
  const mainParent = findMainParent(parentId, currentPage.elements.staticData);
  const currentPosition = elements.allData[id].position;
  const reversePosition =
    currentPosition === 'relative' ? 'absolute' : 'relative';
  const isRelative = reversePosition === 'relative';
  const filteredChildren = currentPage.elements.allData[
    parentId
  ].children.filter((id) => !allId.includes(id));

  selectedElements.forEach(({ id }) => {
    const targetCoordinates = isRelative
      ? BASE_2D
      : getAbsolutePosition(id, mainParent, z);

    clonedElements.allData[id].alignment = undefined;
    clonedElements.allData[id].position = reversePosition;
    clonedElements.allData[id].coordinates = targetCoordinates;
    clonedElements.dynamicData[id].alignment = undefined;
    clonedElements.dynamicData[id].position = reversePosition;
    clonedElements.dynamicData[id].coordinates = targetCoordinates;
    clonedElements.staticData[id].position = reversePosition;
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
            [parentId]: {
              ...currentPage.elements.allData[parentId],
              children: [...filteredChildren, ...allId],
            },
          },
          dynamicData: {
            ...currentPage.elements.dynamicData,
            ...clonedElements.dynamicData,
          },
          staticData: {
            ...currentPage.elements.staticData,
            ...clonedElements.staticData,
            [parentId]: {
              ...currentPage.elements.staticData[parentId],
              children: [...filteredChildren, ...allId],
            },
          },
        },
        selectedElements: selectedElements.map((selectedElement) => ({
          ...selectedElement,
          position: reversePosition,
        })),
      },
    },
  };
};
