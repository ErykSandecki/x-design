import { cloneDeep } from 'lodash';

// types
import { TPageBuilderState } from '../types';

export const handleFitLayout = (
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const clonedElements = cloneDeep(elements);

  selectedElements.forEach(({ id }) => {
    clonedElements.allData[id].height = 'auto';
    clonedElements.allData[id].width = 'auto';
    clonedElements.dynamicData[id].height = 'auto';
    clonedElements.dynamicData[id].width = 'auto';
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
        },
      },
    },
  };
};
