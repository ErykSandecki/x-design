import { cloneDeep } from 'lodash';

// types
import { TPageBuilderState, TRotateElementsAction } from '../types';

export const handleRotateElements = (
  angle: TRotateElementsAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { elements, selectedElements } = currentPage;
  const clonedElements = cloneDeep(elements);
  const fixedAngle = parseFloat(angle.toFixed(2));

  selectedElements.forEach(({ id }) => {
    clonedElements.allData[id].angle = fixedAngle;
    clonedElements.dynamicData[id].angle = fixedAngle;
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
