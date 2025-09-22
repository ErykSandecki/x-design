import { cloneDeep, first } from 'lodash';

// others
import { BASE_2D } from 'shared';

// types
import { TPageBuilderState } from '../types';

export const handleChangePosition = (
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const ids = selectedElements.map(({ id }) => id);
  const clonedElements = cloneDeep(elements);
  const { id, parentId } = first(selectedElements);
  const currentPosition = elements.allData[id].position;
  const reversePosition =
    currentPosition === 'relative' ? 'absolute' : 'relative';
  const filteredChildren = currentPage.elements.allData[
    parentId
  ].children.filter((id) => !ids.includes(id));

  selectedElements.forEach(({ id }) => {
    const targetCoordinates = BASE_2D;

    clonedElements.allData[id].alignment = {};
    clonedElements.allData[id].position = reversePosition;
    clonedElements.allData[id].coordinates = targetCoordinates;
    clonedElements.dynamicData[id].alignment = {};
    clonedElements.dynamicData[id].position = reversePosition;
    clonedElements.dynamicData[id].coordinates = targetCoordinates;
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
              children: [...filteredChildren, ...ids],
            },
          },
          dynamicData: {
            ...currentPage.elements.dynamicData,
            ...clonedElements.dynamicData,
          },
          staticData: {
            ...currentPage.elements.staticData,
            [parentId]: {
              ...currentPage.elements.staticData[parentId],
              children: [...filteredChildren, ...ids],
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
