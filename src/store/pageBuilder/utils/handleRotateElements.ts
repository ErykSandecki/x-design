import { cloneDeep } from 'lodash';

// types
import { TPageBuilderState, TRotateElementsAction } from '../types';

export const handleRotateElements = (
  rotate: TRotateElementsAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const clonedElements = cloneDeep(elements);
  const fixedAngle = parseFloat(rotate.toFixed(2));

  selectedElements.forEach(({ id }) => {
    clonedElements.allData[id].rotate = fixedAngle;
    clonedElements.dynamicData[id].rotate = fixedAngle;
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
