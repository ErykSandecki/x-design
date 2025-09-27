import { cloneDeep, first } from 'lodash';

// types
import { TChangeAlignmentAction, TPageBuilderState } from '../../types';

// utils
import { getDefaultCoordinates } from './getDefaultCoordinates';

export const handleChangeAlignment = (
  payload: TChangeAlignmentAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const { parentId } = first(selectedElements);
  const clonedElements = cloneDeep(elements);
  const allId = selectedElements.map(({ id }) => id);
  const filteredChildren = currentPage.elements.allData[parentId].children.filter((id) => !allId.includes(id));

  selectedElements.forEach(({ id, parentId }) => {
    const { alignment } = currentPage.elements.allData[id];
    const targetAlignment = { ...alignment, ...payload };
    const coordinates = getDefaultCoordinates(targetAlignment, id, parentId);

    clonedElements.allData[id].alignment = targetAlignment;
    clonedElements.allData[id].position = 'absolute';
    clonedElements.allData[id].coordinates = coordinates;
    clonedElements.dynamicData[id].alignment = targetAlignment;
    clonedElements.dynamicData[id].position = 'absolute';
    clonedElements.dynamicData[id].coordinates = coordinates;
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
            [parentId]: {
              ...currentPage.elements.staticData[parentId],
              children: [...filteredChildren, ...allId],
            },
          },
        },
        selectedElements: selectedElements.map((selectedElement) => ({
          ...selectedElement,
          position: 'absolute',
        })),
      },
    },
  };
};
