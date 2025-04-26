import { cloneDeep, first } from 'lodash';

// types
import { TChangeAlignmentAction, TPageBuilderState } from '../types';

// utils
import { getAbsolutePosition } from './getOffsetXY';

export const handleChangeAlignment = (
  payload: TChangeAlignmentAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const { z } = currentPage.areaCoordinates;
  const { parentId } = first(selectedElements);
  const clonedElements = cloneDeep(elements);
  const allId = selectedElements.map(({ id }) => id);
  const filteredChildren = currentPage.elements.allData[
    parentId
  ].children.filter((id) => !allId.includes(id));

  selectedElements.forEach(({ id }) => {
    const { alignment } = currentPage.elements.allData[id];
    const targetCoordinates = getAbsolutePosition(id, parentId, z);

    clonedElements.allData[id].alignment = { ...alignment, ...payload };
    clonedElements.allData[id].position = 'absolute';
    clonedElements.allData[id].coordinates = targetCoordinates;
    clonedElements.dynamicData[id].alignment = { ...alignment, ...payload };
    clonedElements.dynamicData[id].position = 'absolute';
    clonedElements.dynamicData[id].coordinates = targetCoordinates;
    clonedElements.staticData[id].position = 'absolute';
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
