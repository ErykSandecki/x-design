import { cloneDeep, first } from 'lodash';

// types
import { TChangeAlignmentAction, TPageBuilderState } from '../types';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';

export const handleChangeAlignment = (
  payload: TChangeAlignmentAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const { parentId } = first(selectedElements);
  const clonedElements = cloneDeep(elements);
  const allId = selectedElements.map(({ id }) => id);
  const filteredChildren = currentPage.elements.allData[
    parentId
  ].children.filter((id) => !allId.includes(id));

  selectedElements.forEach(({ id }) => {
    const { alignment } = currentPage.elements.allData[id];

    clonedElements.allData[id].alignment = { ...alignment, ...payload };
    clonedElements.allData[id].position = 'absolute';
    clonedElements.dynamicData[id].alignment = { ...alignment, ...payload };
    clonedElements.dynamicData[id].position = 'absolute';
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
        selectedElements: selectedElements.map((selectedElement) => ({
          ...selectedElement,
          position: 'absolute',
        })),
      },
    },
  };
};
