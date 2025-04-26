import { cloneDeep, first } from 'lodash';

// others
import { BASE_2D } from 'shared';

// types
import { T2DCoordinates, TElement } from 'types';
import { TPageBuilderState } from '../types';

// utils
import { getOffsetXY } from './getOffsetXY';

export const getAbsolutePosition = (
  id: TElement['id'],
  parentId: TElement['parentId'],
  z: number,
): T2DCoordinates => {
  const { x, y } = getOffsetXY(id, parentId);
  return { x: Math.abs(x) / z, y: Math.abs(y) / z };
};

export const handleChangePosition = (
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const { z } = currentPage.areaCoordinates;
  const allId = selectedElements.map(({ id }) => id);
  const clonedElements = cloneDeep(elements);
  const { id, parentId } = first(selectedElements);
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
      : getAbsolutePosition(id, parentId, z);

    clonedElements.allData[id].position = reversePosition;
    clonedElements.allData[id].coordinates = targetCoordinates;
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
        selectedElements: selectedElements.map(
          (selectedElement) => selectedElement,
        ),
      },
    },
  };
};
