// types
import { TPageBuilderState, TRotateElementsAction } from '../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';

export const handleRotateElements = (
  angle: TRotateElementsAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);
  const fixedAngle = parseFloat(angle.toFixed(2));

  return {
    ...state,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          ...mapFilteredValues(currentPage.elements, ids, (element) => ({ ...element, angle: fixedAngle })),
        },
      },
    },
  };
};
