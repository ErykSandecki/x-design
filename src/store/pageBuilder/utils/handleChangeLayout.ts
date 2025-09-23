import { cloneDeep } from 'lodash';

// types
import { TChangeLayoutAction, TPageBuilderState } from '../types';

export const handleChangeLayout = (
  layoutType: TChangeLayoutAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const clonedElements = cloneDeep(elements);

  selectedElements.forEach(({ id }) => {
    clonedElements.allData[id].layout.type = layoutType;
    clonedElements.dynamicData[id].layout.type = layoutType;
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
