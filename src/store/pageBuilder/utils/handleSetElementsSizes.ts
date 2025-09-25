import { cloneDeep } from 'lodash';

// types
import { TPageBuilderState, TSetElementsSizesActionPayload } from '../types';

export const handleSetElementsSizes = (
  sizeType: TSetElementsSizesActionPayload['sizeType'],
  state: TPageBuilderState,
  value: TSetElementsSizesActionPayload['value'],
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const clonedElements = cloneDeep(elements);

  selectedElements.forEach(({ id }) => {
    clonedElements.allData[id][sizeType].value = value;
    clonedElements.dynamicData[id][sizeType].value = value;
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
