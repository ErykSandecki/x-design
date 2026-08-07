// types
import { TPageBuilderState, TRotateElementsActionPayload } from '../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';

export const handleRotateElements = (angle: TRotateElementsActionPayload, state: TPageBuilderState): void => {
  const currentPage = state.pages[state.currentPage];
  const { selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);
  const fixedAngle = parseFloat(angle.toFixed(2));

  currentPage.elements = {
    ...currentPage.elements,
    ...mapFilteredValues(currentPage.elements, ids, (element) => ({ ...element, angle: fixedAngle })),
  };
};
